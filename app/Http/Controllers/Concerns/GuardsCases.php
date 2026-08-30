<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\RedirectResponse;

/**
 * Porteiro dos casos, compartilhado por quem serve telas de dentro de um caso.
 *
 * É um trait e não uma classe-base porque a tela de desafio não é uma
 * especialização da tela de caso — as duas só precisam da mesma checagem.
 */
trait GuardsCases
{
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
