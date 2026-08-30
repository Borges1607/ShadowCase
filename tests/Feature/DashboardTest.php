<?php

use Inertia\Testing\AssertableInertia;

/** Sessão de um agente já identificado. */
function agentSession(array $progress = []): array
{
    return [
        'agent' => ['name' => 'Maria Oliveira', 'badge' => 'AG-1234'],
        'progress' => $progress,
    ];
}

it('mostra a central com o caso ativo e nenhum progresso', function () {
    $this->withSession(agentSession())
        ->get('/central')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard')
            ->where('activeCaseId', 'case-01')
            ->where('completedChallenges', [])
            ->where('agent.name', 'Maria Oliveira')
        );
});

it('informa os desafios já resolvidos no caso ativo', function () {
    $this->withSession(agentSession(['case-01' => ['cipher', 'morse']]))
        ->get('/central')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('completedChallenges', ['cipher', 'morse'])
        );
});

it('ignora o progresso de outros casos', function () {
    $this->withSession(agentSession(['case-02' => ['cipher']]))
        ->get('/central')
        ->assertInertia(fn (AssertableInertia $page) => $page->where('completedChallenges', []));
});

it('abre o dossiê do caso para o agente identificado', function () {
    $this->withSession(agentSession())
        ->get('/caso/case-01')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('case-hub')
            ->where('caseId', 'case-01')
        );
});

it('bloqueia o dossiê para quem não se identificou', function () {
    $this->get('/caso/case-01')->assertRedirect('/entrar');
});
