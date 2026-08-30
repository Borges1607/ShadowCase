<?php

use Inertia\Testing\AssertableInertia;

/** Agente identificado, com progresso e veredicto opcionais. */
function accusationSession(array $completed = [], ?array $verdict = null): array
{
    return [
        'agent' => ['name' => 'Maria Oliveira', 'badge' => 'AG-1234'],
        'progress' => ['case-01' => $completed],
        'verdict' => $verdict ? ['case-01' => $verdict] : [],
    ];
}

/** Quatro desafios: o mínimo para acusar. */
function enoughProgress(): array
{
    return ['cipher', 'morse', 'safe', 'testimony'];
}

// ─── Acesso à acusação ───────────────────────────────────────────────────────

it('abre a acusação com os suspeitos e as evidências conquistadas', function () {
    $this->withSession(accusationSession(enoughProgress()))
        ->get('/caso/case-01/acusacao')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('accusation')
            ->has('suspects', 3)
            ->has('clues', 4)
            ->where('suspects.0.name', "Condessa Vera D'Almeida")
        );
});

it('não revela quem é o culpado na tela de acusação', function () {
    $response = $this->withSession(accusationSession(enoughProgress()))
        ->get('/caso/case-01/acusacao');

    foreach ($response->viewData('page')['props']['suspects'] as $suspect) {
        expect($suspect)->toHaveKeys(['id', 'name', 'age', 'occupation', 'photo'])
            ->and($suspect)->not->toHaveKey('guilty');
    }
});

it('bloqueia a acusação sem provas suficientes', function () {
    $this->withSession(accusationSession(['cipher', 'morse']))
        ->get('/caso/case-01/acusacao')
        ->assertRedirect('/caso/case-01')
        ->assertSessionHas('error', 'Complete pelo menos 4 desafios antes de acusar.');
});

it('bloqueia a acusação para quem não se identificou', function () {
    $this->get('/caso/case-01/acusacao')->assertRedirect('/entrar');
});

// ─── A acusação em si ────────────────────────────────────────────────────────

it('registra a acusação correta e leva ao desfecho', function () {
    $this->withSession(accusationSession(enoughProgress()))
        ->post('/caso/case-01/acusacao', ['suspect' => 's1'])
        ->assertRedirect('/caso/case-01/veredicto');

    expect(session('verdict.case-01'))->toBe(['suspect' => 's1', 'correct' => true]);
});

it('registra a acusação errada como errada', function () {
    $this->withSession(accusationSession(enoughProgress()))
        ->post('/caso/case-01/acusacao', ['suspect' => 's2'])
        ->assertRedirect('/caso/case-01/veredicto');

    expect(session('verdict.case-01'))->toBe(['suspect' => 's2', 'correct' => false]);
});

it('recusa um suspeito que não faz parte do caso', function () {
    $this->withSession(accusationSession(enoughProgress()))
        ->post('/caso/case-01/acusacao', ['suspect' => 's99'])
        ->assertSessionHasErrors('suspect');

    expect(session('verdict.case-01'))->toBeNull();
});

it('não deixa acusar sem provas suficientes, nem pelo POST', function () {
    $this->withSession(accusationSession(['cipher']))
        ->post('/caso/case-01/acusacao', ['suspect' => 's1'])
        ->assertRedirect('/caso/case-01');

    expect(session('verdict.case-01'))->toBeNull();
});

it('não deixa acusar duas vezes', function () {
    $session = accusationSession(enoughProgress(), ['suspect' => 's2', 'correct' => false]);

    $this->withSession($session)
        ->post('/caso/case-01/acusacao', ['suspect' => 's1'])
        ->assertRedirect('/caso/case-01/veredicto');

    // O veredicto original permanece.
    expect(session('verdict.case-01'))->toBe(['suspect' => 's2', 'correct' => false]);
});

it('desvia da acusação quem já deu o veredicto', function () {
    $this->withSession(accusationSession(enoughProgress(), ['suspect' => 's1', 'correct' => true]))
        ->get('/caso/case-01/acusacao')
        ->assertRedirect('/caso/case-01/veredicto');
});

// ─── Desfecho ────────────────────────────────────────────────────────────────

it('mostra a vitória para a acusação certa', function () {
    $this->withSession(accusationSession(enoughProgress(), ['suspect' => 's1', 'correct' => true]))
        ->get('/caso/case-01/veredicto')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('victory')
            ->where('accused.id', 's1')
            ->where('culprit.id', 's1')
            ->where('completedCount', 4)
        );
});

it('mostra a derrota para a acusação errada', function () {
    $this->withSession(accusationSession(enoughProgress(), ['suspect' => 's3', 'correct' => false]))
        ->get('/caso/case-01/veredicto')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('defeat')
            ->where('accused.id', 's3')
            ->where('culprit.id', 's1')
        );
});

it('devolve ao dossiê quem ainda não acusou', function () {
    $this->withSession(accusationSession(enoughProgress()))
        ->get('/caso/case-01/veredicto')
        ->assertRedirect('/caso/case-01');
});

it('recomeçar apaga progresso, estado dos puzzles e veredicto', function () {
    $session = accusationSession(enoughProgress(), ['suspect' => 's1', 'correct' => true]);
    $session['progress_state'] = ['case-01' => ['anagram' => ['solved' => [0, 1]]]];

    $this->withSession($session)
        ->delete('/caso/case-01/veredicto')
        ->assertRedirect('/central');

    expect(session('verdict.case-01'))->toBeNull()
        ->and(session('progress.case-01'))->toBeNull()
        ->and(session('progress_state.case-01'))->toBeNull();
});
