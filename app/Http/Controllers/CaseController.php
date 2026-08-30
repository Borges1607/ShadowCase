<?php

namespace App\Http\Controllers;

use App\Support\CaseProgress;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CaseController extends Controller
{
    /**
     * Dossiê do caso: progresso, desafios, pistas reveladas e suspeitos.
     */
    public function show(string $case): Response|RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        return Inertia::render('case-hub', [
            'caseId' => $case,
            'completedChallenges' => CaseProgress::completed($case),
            'challengesToAccuse' => (int) config('game.challenges_to_accuse'),
        ]);
    }

    /**
     * Recusa casos que não existem (404) e desvia os que existem mas ainda não
     * abriram — os dois merecem respostas diferentes.
     *
     * Devolve null quando o caso pode ser jogado.
     */
    protected function guardCase(string $case): ?RedirectResponse
    {
        abort_unless(in_array($case, (array) config('game.cases'), true), 404);

        if ($case !== config('game.active_case')) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Este caso ainda está em desenvolvimento.');
        }

        return null;
    }
}
