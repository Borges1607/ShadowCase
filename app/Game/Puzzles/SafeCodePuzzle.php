<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Cofre numérico.
 *
 * As charadas são públicas; a combinação, não. Aqui a validação no servidor
 * paga de verdade — sem ela, bastaria ler o array no bundle.
 */
final class SafeCodePuzzle implements Puzzle
{
    private const CODE = [1, 9, 4, 8];

    private const RIDDLES = [
        'Primeiro dígito: número de continentes habitados na Terra.',
        'Segundo dígito: resultado de 4 + 5.',
        'Terceiro dígito: metade de 8.',
        'Quarto dígito: número de planetas do sistema solar.',
    ];

    public function payload(): array
    {
        return [
            'riddles' => self::RIDDLES,
            'dials' => count(self::CODE),
        ];
    }

    public function rules(): array
    {
        return [
            'dials' => ['required', 'array', 'size:'.count(self::CODE)],
            'dials.*' => ['required', 'integer', 'between:0,9'],
        ];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $dials = array_map('intval', array_values($input['dials']));

        return PuzzleAttempt::single($dials === self::CODE);
    }
}
