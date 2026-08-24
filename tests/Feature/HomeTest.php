<?php

use Inertia\Testing\AssertableInertia;

it('renderiza a página inicial via Inertia', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('welcome')
            ->has('appName')
            ->where('auth.user', null)
        );
});

it('responde no health check', function () {
    $this->get('/up')->assertOk();
});
