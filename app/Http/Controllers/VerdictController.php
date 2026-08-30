<?php

namespace App\Http\Controllers;

use App\Game\Suspects;
use App\Http\Controllers\Concerns\GuardsCases;
use App\Support\CaseProgress;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VerdictController extends Controller
{
    use GuardsCases;

    /**
     * Desfecho do caso.
     *
     * É aqui — e só aqui — que o nome do culpado sai do servidor: depois que a
     * acusação já foi feita e não há mais o que estragar.
     */
    public function show(string $case): Response|RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        $verdict = CaseProgress::verdict($case);

        if ($verdict === null) {
            return redirect()->route('cases.show', ['case' => $case]);
        }

        return Inertia::render($verdict['correct'] ? 'victory' : 'defeat', [
            'caseId' => $case,
            'accused' => Suspects::find($verdict['suspect'])?->toArray(),
            'culprit' => Suspects::culprit()->toArray(),
            'completedCount' => count(CaseProgress::completed($case)),
        ]);
    }

    /** Recomeçar: apaga progresso, estado dos puzzles e veredicto. */
    public function destroy(string $case): RedirectResponse
    {
        CaseProgress::reset($case);

        return redirect()->route('dashboard');
    }
}
