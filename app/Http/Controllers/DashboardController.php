<?php

namespace App\Http\Controllers;

use App\Game\Challenges;
use App\Support\CaseProgress;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Central de operações do detetive.
     *
     * A lista de casos ainda vem de resources/js/game/data.ts; daqui saem o
     * progresso do agente e a contagem de desafios, que passou a ser do servidor.
     */
    public function __invoke(): Response
    {
        $activeCase = (string) config('game.active_case');

        return Inertia::render('dashboard', [
            'activeCaseId' => $activeCase,
            'completedCount' => count(CaseProgress::completed($activeCase)),
            'totalChallenges' => Challenges::count(),
        ]);
    }
}
