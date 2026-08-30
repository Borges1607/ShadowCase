<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Código Morse interceptado.
 *
 * A tabela morse é pública — ela existe na tela como material de consulta. O
 * que não sai daqui é a frase decodificada.
 */
final class MorseCodePuzzle implements Puzzle
{
    private const MESSAGE = '-- . .. .- / -. --- .. - .';

    private const ANSWER = 'MEIA NOITE';

    private const TABLE = [
        'A' => '.-', 'B' => '-...', 'C' => '-.-.', 'D' => '-..', 'E' => '.',
        'F' => '..-.', 'G' => '--.', 'H' => '....', 'I' => '..', 'J' => '.---',
        'K' => '-.-', 'L' => '.-..', 'M' => '--', 'N' => '-.', 'O' => '---',
        'P' => '.--.', 'Q' => '--.-', 'R' => '.-.', 'S' => '...', 'T' => '-',
        'U' => '..-', 'V' => '...-', 'W' => '.--', 'X' => '-..-', 'Y' => '-.--',
        'Z' => '--..',
    ];

    public function payload(): array
    {
        return [
            'message' => self::MESSAGE,
            'table' => self::TABLE,
        ];
    }

    public function rules(): array
    {
        return ['answer' => ['required', 'string', 'max:60']];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $guess = mb_strtoupper(trim((string) $input['answer']));
        $guess = (string) preg_replace('/\s+/u', ' ', $guess);

        return PuzzleAttempt::single($guess === self::ANSWER);
    }
}
