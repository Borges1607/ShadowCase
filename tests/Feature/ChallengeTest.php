<?php

use Inertia\Testing\AssertableInertia;

/** Sessão de um agente já identificado. */
function challengeSession(array $progress = [], array $state = []): array
{
    return [
        'agent' => ['name' => 'Maria Oliveira', 'badge' => 'AG-1234'],
        'progress' => $progress,
        'progress_state' => $state,
    ];
}

// ─── O que o servidor entrega ────────────────────────────────────────────────

it('abre um desafio com o payload público do puzzle', function () {
    $this->withSession(challengeSession())
        ->get('/caso/case-01/desafio/safe')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('challenge')
            ->where('challenge.id', 'safe')
            ->where('challenge.completed', false)
            ->where('challenge.clue', null)
            ->has('puzzle.riddles', 4)
            ->where('puzzle.dials', 4)
        );
});

it('não expõe a combinação do cofre no payload', function () {
    $response = $this->withSession(challengeSession())->get('/caso/case-01/desafio/safe');

    $payload = $response->viewData('page')['props']['puzzle'];

    expect(json_encode($payload))->not->toContain('1948')
        ->and($payload)->not->toHaveKey('code');
});

it('não expõe qual depoimento é mentira', function () {
    $response = $this->withSession(challengeSession())->get('/caso/case-01/desafio/testimony');

    $payload = $response->viewData('page')['props']['puzzle'];

    foreach ($payload['statements'] as $statement) {
        expect($statement)->toHaveKeys(['id', 'text'])
            ->and($statement)->not->toHaveKey('lie')
            ->and($statement)->not->toHaveKey('explanation');
    }
});

it('não expõe as respostas do anagrama', function () {
    $response = $this->withSession(challengeSession())->get('/caso/case-01/desafio/anagram');

    $encoded = json_encode($response->viewData('page')['props']['puzzle']);

    expect($encoded)->not->toContain('CHAVE')
        ->not->toContain('QUARTO')
        ->not->toContain('PROVA');
});

it('não expõe a sala correta do mapa', function () {
    $response = $this->withSession(challengeSession())->get('/caso/case-01/desafio/map');

    $payload = $response->viewData('page')['props']['puzzle'];

    foreach ($payload['rooms'] as $room) {
        expect($room)->toHaveKeys(['id', 'label'])
            ->and($room)->not->toHaveKey('correct');
    }
});

it('devolve 404 para um desafio inexistente', function () {
    $this->withSession(challengeSession())
        ->get('/caso/case-01/desafio/inexistente')
        ->assertNotFound();
});

// ─── Validação das tentativas ────────────────────────────────────────────────

it('aceita a cifra decodificada e libera a pista', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/cipher', ['answer' => 'procure a chave no quarto 7'])
        ->assertRedirect();

    expect(session('progress.case-01'))->toContain('cipher');
});

it('recusa a cifra errada sem marcar progresso', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/cipher', ['answer' => 'chute qualquer'])
        ->assertSessionHas('attempt.correct', false);

    expect(session('progress.case-01') ?? [])->not->toContain('cipher');
});

it('abre o cofre só com a combinação certa', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/safe', ['dials' => [1, 1, 1, 1]])
        ->assertSessionHas('attempt.correct', false);

    expect(session('progress.case-01') ?? [])->not->toContain('safe');

    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/safe', ['dials' => [1, 9, 4, 8]])
        ->assertSessionHas('attempt.correct', true);

    expect(session('progress.case-01'))->toContain('safe');
});

it('devolve a explicação do depoimento escolhido', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/testimony', ['statement' => 0])
        ->assertSessionHas('attempt.correct', false)
        ->assertSessionHas('attempt.detail', 'Confirmado pelos registros de entrada — 20h03 no livro de visitantes.');

    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/testimony', ['statement' => 1])
        ->assertSessionHas('attempt.correct', true);
});

it('reconhece a sala do crime no mapa', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/map', ['room' => 'jardim'])
        ->assertSessionHas('attempt.correct', false);

    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/map', ['room' => 'cofre'])
        ->assertSessionHas('attempt.solved', true);
});

it('recusa uma sala que não está na planta', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/map', ['room' => 'porao'])
        ->assertSessionHasErrors('room');
});

// ─── Anagrama: vários passos ─────────────────────────────────────────────────

it('não conclui o anagrama pulando direto para a última palavra', function () {
    $this->withSession(challengeSession())
        ->post('/caso/case-01/desafio/anagram', ['word' => 2, 'answer' => 'PROVA'])
        ->assertSessionHas('attempt.correct', true)
        ->assertSessionHas('attempt.solved', false);

    expect(session('progress.case-01') ?? [])->not->toContain('anagram');
});

it('conclui o anagrama quando as três palavras saem', function () {
    $session = challengeSession();

    foreach ([[0, 'CHAVE'], [1, 'QUARTO'], [2, 'PROVA']] as [$index, $answer]) {
        $response = $this->withSession($session)
            ->post('/caso/case-01/desafio/anagram', ['word' => $index, 'answer' => $answer]);

        // Carrega o progresso acumulado para a tentativa seguinte.
        $session['progress'] = session('progress') ?? [];
        $session['progress_state'] = session('progress_state') ?? [];
    }

    $response->assertSessionHas('attempt.solved', true);
    expect(session('progress.case-01'))->toContain('anagram');
});

// ─── Desafio já resolvido ────────────────────────────────────────────────────

it('mostra a pista ao revisitar um desafio concluído', function () {
    $this->withSession(challengeSession(['case-01' => ['morse']]))
        ->get('/caso/case-01/desafio/morse')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('challenge.completed', true)
            ->where('challenge.clue', 'O crime ocorreu à meia-noite — o relógio às 23h47 era uma isca.')
        );
});

it('ignora novas tentativas em um desafio já resolvido', function () {
    $this->withSession(challengeSession(['case-01' => ['cipher']]))
        ->post('/caso/case-01/desafio/cipher', ['answer' => 'errado'])
        ->assertSessionMissing('attempt');
});

it('bloqueia tentativas de quem não se identificou', function () {
    $this->post('/caso/case-01/desafio/cipher', ['answer' => 'qualquer'])
        ->assertRedirect('/entrar');
});
