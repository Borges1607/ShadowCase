<?php

namespace App\Game;

/**
 * Um suspeito do caso.
 *
 * `guilty` é a resposta do jogo inteiro e por isso nunca sai desta classe:
 * `toArray()` devolve só a ficha que o dossiê exibe.
 */
final class Suspect
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly int $age,
        public readonly string $occupation,
        public readonly string $photo,
        private readonly bool $guilty,
    ) {}

    public function isGuilty(): bool
    {
        return $this->guilty;
    }

    /** Ficha pública — sem qualquer indício de culpa. */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'age' => $this->age,
            'occupation' => $this->occupation,
            'photo' => $this->photo,
        ];
    }
}
