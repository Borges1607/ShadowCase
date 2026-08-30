<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Cifra de César.
 *
 * O deslocamento vai junto no payload de propósito: a tela desenha a
 * decodificação letra a letra, que é o que torna este o desafio mais fácil do
 * caso. O que fica no servidor é a conferência da resposta digitada.
 */
final class CaesarCipherPuzzle implements Puzzle
{
    private const ENCRYPTED = 'SURFXUH D FKDYH QR TXDUWR 7';

    private const ANSWER = 'PROCURE A CHAVE NO QUARTO 7';

    private const SHIFT = 3;

    public function payload(): array
    {
        return [
            'encrypted' => self::ENCRYPTED,
            'shift' => self::SHIFT,
        ];
    }

    public function rules(): array
    {
        return ['answer' => ['required', 'string', 'max:120']];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $guess = mb_strtoupper(trim((string) $input['answer']));

        // Espaços repetidos não deveriam reprovar quem decifrou certo.
        $guess = (string) preg_replace('/\s+/u', ' ', $guess);

        return PuzzleAttempt::single($guess === self::ANSWER);
    }
}
