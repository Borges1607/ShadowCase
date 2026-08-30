<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Depoimento mentiroso.
 *
 * O payload leva só os textos das declarações. Quais são mentira e por quê
 * ficam aqui — a explicação volta como resposta da tentativa, depois que o
 * jogador se compromete com uma escolha.
 */
final class TestimonyPuzzle implements Puzzle
{
    private const SUSPECT_ID = 's1';

    private const INTRO = 'Eu não tenho nada a esconder, Detetive. Pergunte o que quiser.';

    private const INTERROGATED_AT = 'Interrogatório — 15 Nov 1948';

    private const STATEMENTS = [
        [
            'text' => 'Cheguei ao museu às 20h em ponto, junto com os demais convidados da gala.',
            'lie' => false,
            'explanation' => 'Confirmado pelos registros de entrada — 20h03 no livro de visitantes.',
        ],
        [
            'text' => 'Passei a noite inteira conversando com o Barão von Schultz na varanda norte.',
            'lie' => true,
            'explanation' => 'O Barão partiu às 21h30. A condessa ficou sem álibi verificável por mais de duas horas.',
        ],
        [
            'text' => 'Nunca me aproximei da Sala do Cofre ou do corredor leste naquela noite.',
            'lie' => true,
            'explanation' => 'Pegadas de lama vermelha no corredor leste coincidem exatamente com seu modelo de sapato.',
        ],
    ];

    public function payload(): array
    {
        return [
            'suspectId' => self::SUSPECT_ID,
            'intro' => self::INTRO,
            'interrogatedAt' => self::INTERROGATED_AT,
            'statements' => array_map(
                fn (array $statement, int $index) => ['id' => $index, 'text' => $statement['text']],
                self::STATEMENTS,
                array_keys(self::STATEMENTS),
            ),
        ];
    }

    public function rules(): array
    {
        return ['statement' => ['required', 'integer', 'between:0,'.(count(self::STATEMENTS) - 1)]];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $statement = self::STATEMENTS[(int) $input['statement']];

        return PuzzleAttempt::single(
            correct: $statement['lie'],
            detail: $statement['explanation'],
            target: (string) (int) $input['statement'],
        );
    }
}
