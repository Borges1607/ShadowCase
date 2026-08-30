<?php

use App\Http\Controllers\AccusationController;
use App\Http\Controllers\AgentSessionController;
use App\Http\Controllers\CaseController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\VerdictController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');

Route::get('/entrar', [AgentSessionController::class, 'create'])->name('login');
Route::post('/entrar', [AgentSessionController::class, 'store'])->name('login.store');
Route::post('/sair', [AgentSessionController::class, 'destroy'])->name('logout');

Route::middleware('agent')->group(function (): void {
    Route::get('/central', DashboardController::class)->name('dashboard');

    Route::prefix('caso/{case}')->group(function (): void {
        Route::get('/', [CaseController::class, 'show'])->name('cases.show');

        Route::get('/desafio/{challenge}', [ChallengeController::class, 'show'])
            ->name('challenges.show');
        Route::post('/desafio/{challenge}', [ChallengeController::class, 'check'])
            ->name('challenges.check');

        Route::get('/acusacao', [AccusationController::class, 'create'])->name('accusation.create');
        Route::post('/acusacao', [AccusationController::class, 'store'])->name('accusation.store');

        Route::get('/veredicto', [VerdictController::class, 'show'])->name('verdict.show');
        Route::delete('/veredicto', [VerdictController::class, 'destroy'])->name('verdict.destroy');
    });
});
