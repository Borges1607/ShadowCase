<?php

namespace App\Http\Controllers;

use App\Game\Challenges;
use App\Game\Suspects;
use App\Http\Controllers\Concerns\GuardsCases;
use App\Support\CaseProgress;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CaseController extends Controller
{
    use GuardsCases;

    /**
     * Dossiê do caso: progresso, desafios, pistas reveladas e suspeitos.
     */
    public function show(string $case): Response|RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        $completed = CaseProgress::completed($case);

        return Inertia::render('case-hub', [
            'caseId' => $case,
            // As pistas só acompanham os desafios já concluídos.
            'challenges' => Challenges::listing($completed),
            // Fichas sem qualquer indício de culpa.
            'suspects' => Suspects::listing(),
            'challengesToAccuse' => (int) config('game.challenges_to_accuse'),
        ]);
    }
}
