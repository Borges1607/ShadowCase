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
            ->where('completedCount', 0)
            ->where('totalChallenges', 6)
            ->where('agent.name', 'Maria Oliveira')
        );
});

it('conta os desafios já resolvidos no caso ativo', function () {
    $this->withSession(agentSession(['case-01' => ['cipher', 'morse']]))
        ->get('/central')
        ->assertInertia(fn (AssertableInertia $page) => $page->where('completedCount', 2));
});

it('ignora o progresso de outros casos', function () {
    $this->withSession(agentSession(['case-02' => ['cipher']]))
        ->get('/central')
        ->assertInertia(fn (AssertableInertia $page) => $page->where('completedCount', 0));
});

it('bloqueia a central para quem não se identificou', function () {
    $this->get('/central')->assertRedirect('/entrar');
});
