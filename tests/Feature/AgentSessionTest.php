<?php

use Inertia\Testing\AssertableInertia;

it('exibe a tela de acesso com a dica de senha', function () {
    $this->get('/entrar')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('login')
            ->where('passwordHint', config('game.agency_password'))
        );
});

it('esconde a dica quando desligada por configuração', function () {
    config(['game.show_password_hint' => false]);

    $this->get('/entrar')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page->where('passwordHint', null));
});

it('autentica o agente com a senha correta', function () {
    $this->post('/entrar', [
        'name' => 'Maria Oliveira',
        'password' => config('game.agency_password'),
    ])->assertRedirect('/central');

    expect(session('agent.name'))->toBe('Maria Oliveira')
        ->and(session('agent.badge'))->toMatch('/^AG-\d{4}$/');
});

it('recusa a senha incorreta sem criar sessão', function () {
    $this->post('/entrar', ['name' => 'Maria Oliveira', 'password' => 'errada'])
        ->assertSessionHasErrors(['password' => 'Senha incorreta. Acesso negado.']);

    expect(session()->has('agent'))->toBeFalse();
});

it('exige o nome do agente', function () {
    $this->post('/entrar', ['name' => '', 'password' => config('game.agency_password')])
        ->assertSessionHasErrors(['name' => 'Informe seu nome de agente.']);
});

it('bloqueia a central para quem não se identificou', function () {
    $this->get('/central')->assertRedirect('/entrar');
});

it('leva o agente já identificado direto para a central', function () {
    $this->withSession(['agent' => ['name' => 'Maria', 'badge' => 'AG-1234']])
        ->get('/entrar')
        ->assertRedirect('/central');
});

it('devolve o agente à página que tentou abrir antes do login', function () {
    $this->get('/central')->assertRedirect('/entrar');

    $this->post('/entrar', [
        'name' => 'Maria Oliveira',
        'password' => config('game.agency_password'),
    ])->assertRedirect('/central');
});

it('encerra a sessão do agente', function () {
    $this->withSession(['agent' => ['name' => 'Maria', 'badge' => 'AG-1234']])
        ->post('/sair')
        ->assertRedirect('/');

    expect(session()->has('agent'))->toBeFalse();
});
