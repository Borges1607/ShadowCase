<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Anagrama cifrado — três palavras em sequência.
 *
 * Único puzzle de vários passos: cada palavra acertada é registrada no estado,
 * e o desafio só conclui quando as três estiverem lá. Assim não adianta enviar
 * direto a última palavra para fechar o desafio.
 */
final class AnagramPuzzle implements Puzzle
{
    private const WORDS = [
        ['scrambled' => ['V', 'H', 'A', 'C', 'E'], 'answer' => 'CHAVE'],
        ['scrambled' => ['U', 'R', 'T', 'Q', 'A', 'O'], 'answer' => 'QUARTO'],
        ['scrambled' => ['V', 'O', 'R', 'P', 'A'], 'answer' => 'PROVA'],
    ];

    public function payload(): array
    {
        return [
            'words' => array_map(fn (array $word) => [
                'scrambled' => $word['scrambled'],
                'length' => mb_strlen($word['answer']),
            ], self::WORDS),
        ];
    }

    public function rules(): array
    {
        return [
            'word' => ['required', 'integer', 'between:0,'.(count(self::WORDS) - 1)],
            'answer' => ['required', 'string', 'max:20'],
        ];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $index = (int) $input['word'];
        $correct = mb_strtoupper(trim((string) $input['answer'])) === self::WORDS[$index]['answer'];

        /** @var list<int> $solved */
        $solved = array_map('intval', $state['solved'] ?? []);

        if ($correct && ! in_array($index, $solved, true)) {
            $solved[] = $index;
        }

        sort($solved);

        return new PuzzleAttempt(
            correct: $correct,
            solved: count($solved) === count(self::WORDS),
            target: (string) $index,
            state: ['solved' => $solved],
        );
    }
}
