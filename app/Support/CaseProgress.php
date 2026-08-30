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

    /** Zera o caso — usado ao recomeçar depois do veredicto. */
    public static function reset(string $caseId): void
    {
        session()->forget(self::SESSION_KEY.'.'.$caseId);
    }
}
