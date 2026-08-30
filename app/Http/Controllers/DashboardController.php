<?php

namespace App\Http\Controllers;

use App\Support\CaseProgress;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Central de operações do detetive.
     *
     * O elenco de casos ainda vem de resources/js/game/data.ts; daqui sai só o
     * que pertence ao agente — o progresso guardado na sessão.
     */
    public function __invoke(): Response
    {
        $activeCase = (string) config('game.active_case');

        return Inertia::render('dashboard', [
            'activeCaseId' => $activeCase,
            'completedChallenges' => CaseProgress::completed($activeCase),
        ]);
    }
}
