<?php

use App\Http\Controllers\AgentSessionController;
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

    // Placeholder: substituído pelo dossiê do caso.
    Route::get('/caso/{case}', fn (string $case) => Inertia::render('case-hub', [
        'caseId' => $case,
    ]))->name('cases.show');
});
