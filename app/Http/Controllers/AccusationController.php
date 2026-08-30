<?php

namespace App\Http\Controllers;

use App\Game\Challenges;
use App\Game\Suspects;
use App\Http\Controllers\Concerns\GuardsCases;
use App\Support\CaseProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccusationController extends Controller
{
    use GuardsCases;

    public function create(string $case): Response|RedirectResponse
    {
        if ($redirect = $this->guardAccusation($case)) {
            return $redirect;
        }

        $completed = CaseProgress::completed($case);

        return Inertia::render('accusation', [
            'caseId' => $case,
            'suspects' => Suspects::listing(),
            // Só as pistas conquistadas — a acusação se apoia no que foi provado.
            'clues' => array_values(array_filter(array_map(
                fn (array $challenge) => $challenge['clue'],
                Challenges::listing($completed),
            ))),
        ]);
    }

    /**
     * Acusação final. Irreversível: registrado o veredicto, o caso está fechado
     * até um reinício.
     */
    public function store(Request $request, string $case): RedirectResponse
    {
        if ($redirect = $this->guardAccusation($case)) {
            return $redirect;
        }

        $validated = $request->validate([
            'suspect' => ['required', 'string', 'in:'.implode(',', Suspects::ids())],
        ], [
            'suspect.required' => 'Escolha um suspeito antes de acusar.',
            'suspect.in' => 'Este suspeito não faz parte do caso.',
        ]);

        $suspect = Suspects::find($validated['suspect']);

        CaseProgress::recordVerdict($case, $suspect->id, $suspect->isGuilty());

        return redirect()->route('verdict.show', ['case' => $case]);
    }

    /**
     * Além das checagens do caso, a acusação exige provas suficientes — e não
     * se acusa duas vezes.
     */
    protected function guardAccusation(string $case): ?RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        if (CaseProgress::verdict($case) !== null) {
            return redirect()->route('verdict.show', ['case' => $case]);
        }

        $required = (int) config('game.challenges_to_accuse');

        if (count(CaseProgress::completed($case)) < $required) {
            return redirect()
                ->route('cases.show', ['case' => $case])
                ->with('error', "Complete pelo menos {$required} desafios antes de acusar.");
        }

        return null;
    }
}
