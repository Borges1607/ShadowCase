<?php

namespace App\Support;

/**
 * Progresso do detetive dentro de um caso.
 *
 * Enquanto não há banco, os desafios concluídos ficam na sessão — mesma vida
 * útil do agente logado. A forma dos dados (`['case-01' => ['cipher', ...]]`)
 * já antecipa a tabela que virá depois.
 */
final class CaseProgress
{
    private const SESSION_KEY = 'progress';

    /** Estado interno de puzzles de vários passos (o anagrama, hoje). */
    private const STATE_KEY = 'progress_state';

    /** Acusação final já feita no caso. */
    private const VERDICT_KEY = 'verdict';

    /** IDs dos desafios já concluídos no caso. */
    public static function completed(string $caseId): array
    {
        return array_values(session()->get(self::SESSION_KEY.'.'.$caseId, []));
    }

    public static function isCompleted(string $caseId, string $challengeId): bool
    {
        return in_array($challengeId, self::completed($caseId), true);
    }

    /** Marca um desafio como resolvido. Repetir a chamada não duplica o registro. */
    public static function markCompleted(string $caseId, string $challengeId): void
    {
        $completed = self::completed($caseId);

        if (! in_array($challengeId, $completed, true)) {
            $completed[] = $challengeId;
            session()->put(self::SESSION_KEY.'.'.$caseId, $completed);
        }
    }

    /** Progresso parcial dentro de um desafio, entre uma tentativa e a próxima. */
    public static function challengeState(string $caseId, string $challengeId): array
    {
        return (array) session()->get(self::STATE_KEY.'.'.$caseId.'.'.$challengeId, []);
    }

    public static function setChallengeState(string $caseId, string $challengeId, array $state): void
    {
        session()->put(self::STATE_KEY.'.'.$caseId.'.'.$challengeId, $state);
    }

    /**
     * Registra a acusação final. Ela é irreversível: só some com um reset.
     */
    public static function recordVerdict(string $caseId, string $suspectId, bool $correct): void
    {
        session()->put(self::VERDICT_KEY.'.'.$caseId, [
            'suspect' => $suspectId,
            'correct' => $correct,
        ]);
    }

    /** Veredicto já dado neste caso, ou null se a acusação ainda não veio. */
    public static function verdict(string $caseId): ?array
    {
        return session()->get(self::VERDICT_KEY.'.'.$caseId);
    }

    /** Zera o caso — usado ao recomeçar depois do veredicto. */
    public static function reset(string $caseId): void
    {
        session()->forget(self::SESSION_KEY.'.'.$caseId);
        session()->forget(self::STATE_KEY.'.'.$caseId);
        session()->forget(self::VERDICT_KEY.'.'.$caseId);
    }
}
