<?php

namespace App\Game;

/**
 * Resultado de uma tentativa de resolver um puzzle.
 *
 * `correct` e `solved` são coisas diferentes: no anagrama, acertar uma palavra
 * é `correct` sem ser `solved` — o desafio só termina na terceira.
 */
final class PuzzleAttempt
{
    /**
     * @param  string|null  $detail  Texto de retorno mostrado ao jogador (explicação de um depoimento, por exemplo).
     * @param  string|null  $target  Qual item da tela a resposta se refere, quando o puzzle tem vários.
     * @param  array  $state  Progresso interno a guardar entre tentativas.
     */
    public function __construct(
        public readonly bool $correct,
        public readonly bool $solved,
        public readonly ?string $detail = null,
        public readonly ?string $target = null,
        public readonly array $state = [],
    ) {}

    /** Puzzle de passo único: acertar é concluir. */
    public static function single(bool $correct, ?string $detail = null, ?string $target = null): self
    {
        return new self(correct: $correct, solved: $correct, detail: $detail, target: $target);
    }

    public function toArray(): array
    {
        return [
            'correct' => $this->correct,
            'solved' => $this->solved,
            'detail' => $this->detail,
            'target' => $this->target,
        ];
    }
}
