<?php

use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', LandingController::class)->name('home');

// Placeholder: substituído pela tela de acesso do agente.
Route::get('/entrar', fn () => Inertia::render('login'))->name('login');
