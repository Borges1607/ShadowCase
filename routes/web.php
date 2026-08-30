<?php

use App\Http\Controllers\AgentSessionController;
use App\Http\Controllers\CaseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', LandingController::class)->name('home');

Route::get('/entrar', [AgentSessionController::class, 'create'])->name('login');
Route::post('/entrar', [AgentSessionController::class, 'store'])->name('login.store');
Route::post('/sair', [AgentSessionController::class, 'destroy'])->name('logout');

Route::middleware('agent')->group(function (): void {
    Route::get('/central', DashboardController::class)->name('dashboard');

    Route::prefix('caso/{case}')->group(function (): void {
        Route::get('/', [CaseController::class, 'show'])->name('cases.show');

        // Placeholder: substituído pela tela de desafio.
        Route::get('/desafio/{challenge}', fn (string $case, string $challenge) => Inertia::render(
            'challenge',
            ['caseId' => $case, 'challengeId' => $challenge],
        ))->name('challenges.show');

        // Placeholder: substituído pela acusação final.
        Route::get('/acusacao', fn (string $case) => Inertia::render(
            'accusation',
            ['caseId' => $case],
        ))->name('accusation.create');
    });
});
