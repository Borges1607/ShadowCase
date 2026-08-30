<?php

namespace App\Http\Controllers;

use App\Game\Challenge;
use App\Game\Challenges;
use App\Http\Controllers\Concerns\GuardsCases;
use App\Support\CaseProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChallengeController extends Controller
{
    use GuardsCases;

    public function show(string $case, string $challengeId): Response|RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        $challenge = $this->findChallenge($challengeId);
        $completed = CaseProgress::isCompleted($case, $challenge->id);

        return Inertia::render('challenge', [
            'caseId' => $case,
            'challenge' => $challenge->toArray($completed),
            // Só o necessário para desenhar o puzzle — a resposta fica no servidor.
            'puzzle' => $challenge->puzzle->payload(),
            'state' => CaseProgress::challengeState($case, $challenge->id),
        ]);
    }

    /**
     * Confere uma tentativa.
     *
     * Responde sempre com um redirect de volta à própria tela: o Inertia
     * reaproveita o estado local do puzzle e só atualiza as props.
     */
    public function check(Request $request, string $case, string $challengeId): RedirectResponse
    {
        if ($redirect = $this->guardCase($case)) {
            return $redirect;
        }

        $challenge = $this->findChallenge($challengeId);

        // Desafio já resolvido não aceita novas tentativas.
        if (CaseProgress::isCompleted($case, $challenge->id)) {
            return back();
        }

        $input = $request->validate($challenge->puzzle->rules());

        $attempt = $challenge->puzzle->check(
            $input,
            CaseProgress::challengeState($case, $challenge->id),
        );

        CaseProgress::setChallengeState($case, $challenge->id, $attempt->state);

        if ($attempt->solved) {
            CaseProgress::markCompleted($case, $challenge->id);
        }

        return back()->with('attempt', $attempt->toArray());
    }

    /** 404 para um desafio que não existe neste caso. */
    protected function findChallenge(string $challengeId): Challenge
    {
        $challenge = Challenges::find($challengeId);

        abort_if($challenge === null, 404);

        return $challenge;
    }
}
