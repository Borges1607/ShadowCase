<?php

use Inertia\Testing\AssertableInertia;

it('renderiza a landing via Inertia', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('landing')
            ->has('appName')
            ->where('loginUrl', route('login'))
            ->where('auth.user', null)
        );
});

it('responde no health check', function () {
    $this->get('/up')->assertOk();
});
