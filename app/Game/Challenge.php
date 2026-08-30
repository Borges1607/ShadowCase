<?php

namespace App\Game;

/**
 * Um desafio do caso: a ficha que a tela mostra mais a pista que ele libera.
 *
 * A pista é o prêmio por resolver o puzzle, então nunca viaja junto com a
 * listagem — só depois que o desafio consta como concluído.
 */
final class Challenge
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $subtitle,
        public readonly string $difficulty,
        public readonly string $clue,
        public readonly Puzzle $puzzle,
    ) {}

    /** Ficha pública do desafio, com a pista apenas quando já foi conquistada. */
    public function toArray(bool $completed): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'difficulty' => $this->difficulty,
            'completed' => $completed,
            'clue' => $completed ? $this->clue : null,
        ];
    }
}
