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

it('abre o dossiê do caso ativo', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-01')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('case-hub')
            ->where('caseId', 'case-01')
            ->where('completedChallenges', [])
            ->where('challengesToAccuse', 4)
        );
});

it('lista os desafios já resolvidos', function () {
    $this->withSession(caseAgentSession(['case-01' => ['cipher', 'safe']]))
        ->get('/caso/case-01')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('completedChallenges', ['cipher', 'safe'])
        );
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

it('abre a tela de desafio a partir do dossiê', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-01/desafio/cipher')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('challenge')
            ->where('challengeId', 'cipher')
        );
});

it('abre a acusação a partir do dossiê', function () {
    $this->withSession(caseAgentSession())
        ->get('/caso/case-01/acusacao')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page->component('accusation'));
});
