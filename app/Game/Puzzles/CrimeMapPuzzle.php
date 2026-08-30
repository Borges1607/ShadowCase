<?php

namespace App\Game\Puzzles;

use App\Game\Puzzle;
use App\Game\PuzzleAttempt;

/**
 * Mapa do crime.
 *
 * A planta e as pistas de localização são públicas; qual sala é a certa, não.
 */
final class CrimeMapPuzzle implements Puzzle
{
    private const CORRECT_ROOM = 'cofre';

    private const ROOMS = [
        'entrada' => 'Entrada Principal',
        'galeria' => 'Galeria Norte',
        'varanda' => 'Varanda Norte',
        'lab' => 'Laboratório',
        'gala' => 'Sala de Gala',
        'corredor' => 'Corredor Leste',
        'escritorio' => 'Escritório',
        'cofre' => 'Sala do Cofre',
        'jardim' => 'Jardim',
    ];

    private const CLUES = [
        'As pegadas de lama vermelha foram encontradas no Corredor Leste.',
        'A janela de onde o diamante foi jogado dá para o Jardim.',
        'O Jardim é adjacente ao local exato do crime.',
        'O cofre de joias fica na ala sul do museu.',
    ];

    public function payload(): array
    {
        return [
            'clues' => self::CLUES,
            'rooms' => array_map(
                fn (string $id, string $label) => ['id' => $id, 'label' => $label],
                array_keys(self::ROOMS),
                self::ROOMS,
            ),
        ];
    }

    public function rules(): array
    {
        return ['room' => ['required', 'string', 'in:'.implode(',', array_keys(self::ROOMS))]];
    }

    public function check(array $input, array $state): PuzzleAttempt
    {
        $room = (string) $input['room'];

        return PuzzleAttempt::single(
            correct: $room === self::CORRECT_ROOM,
            target: $room,
        );
    }
}
