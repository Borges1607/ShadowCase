<?php

use Inertia\Testing\AssertableInertia;

/** Sessão de um agente já identificado. */
function caseAgentSession(array $progress = []): array
{
    return [
        'agent' => ['name' => 'Maria Oliveira', 'badge' => 'AG-1234'],
        'progress' => $progress,
    ];
}

it('abre o dossiê do caso ativo com os seis desafios', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-01')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('case-hub')
            ->where('caseId', 'case-01')
            ->where('challengesToAccuse', 4)
            ->has('challenges', 6)
            ->where('challenges.0.id', 'cipher')
            ->where('challenges.0.completed', false)
        );
});

it('não entrega a pista de um desafio ainda não resolvido', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-01')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('challenges.0.clue', null)
            ->where('challenges.5.clue', null)
        );
});

it('entrega a pista apenas do desafio já resolvido', function () {
    $this->withSession(caseAgentSession(['case-01' => ['cipher']]))
        ->get('/caso/case-01')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('challenges.0.completed', true)
            ->where('challenges.0.clue', 'A chave está escondida no Quarto 7 do Hotel Majestic, próximo ao porto.')
            ->where('challenges.1.completed', false)
            ->where('challenges.1.clue', null)
        );
});

it('nunca serve o texto de uma pista bloqueada na resposta', function () {
    $response = $this->withSession(caseAgentSession())->get('/caso/case-01');

    // Nenhuma das seis pistas pode aparecer no HTML de quem não resolveu nada.
    $response->assertDontSee('Hotel Majestic', escape: false);
    $response->assertDontSee('CHAVE + QUARTO + PROVA', escape: false);
    $response->assertDontSee('janela leste', escape: false);
});

it('devolve 404 para um caso inexistente', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-99')
        ->assertNotFound();
});

it('desvia da central um caso que existe mas ainda não abriu', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-02')
        ->assertRedirect('/central')
        ->assertSessionHas('error', 'Este caso ainda está em desenvolvimento.');
});

it('bloqueia o dossiê para quem não se identificou', function () {
    $this->get('/caso/case-01')->assertRedirect('/entrar');
});

it('serve as fichas dos suspeitos sem indício de culpa', function () {
    $response = $this->withSession(caseAgentSession())->get('/caso/case-01');

    $suspects = $response->viewData('page')['props']['suspects'];

    expect($suspects)->toHaveCount(3);

    foreach ($suspects as $suspect) {
        expect($suspect)->not->toHaveKey('guilty');
    }
});
