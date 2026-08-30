<?php

namespace App\Game;

/**
 * Elenco de suspeitos de "O Diamante Desaparecido".
 *
 * Junto com Challenges, este arquivo é a fronteira do spoiler: quem roubou o
 * diamante se sabe daqui para dentro, e a acusação é conferida no servidor.
 */
final class Suspects
{
    /** @var array<string, Suspect>|null */
    private static ?array $cache = null;

    /** @return array<string, Suspect> */
    public static function all(): array
    {
        return self::$cache ??= [
            's1' => new Suspect(
                id: 's1',
                name: "Condessa Vera D'Almeida",
                age: 42,
                occupation: 'Socialite',
                photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&auto=format',
                guilty: true,
            ),
            's2' => new Suspect(
                id: 's2',
                name: 'Dr. Augusto Ferreira',
                age: 55,
                occupation: 'Curador',
                photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&auto=format',
                guilty: false,
            ),
            's3' => new Suspect(
                id: 's3',
                name: 'Raimundo "Ricky" Sousa',
                age: 31,
                occupation: 'Segurança',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format',
                guilty: false,
            ),
        ];
    }

    public static function find(string $id): ?Suspect
    {
        return self::all()[$id] ?? null;
    }

    /** Identificadores válidos, para a validação da acusação. */
    public static function ids(): array
    {
        return array_keys(self::all());
    }

    /** Fichas públicas de todos os suspeitos. */
    public static function listing(): array
    {
        return array_values(array_map(
            fn (Suspect $suspect) => $suspect->toArray(),
            self::all(),
        ));
    }

    /** O culpado — usado só para montar o desfecho, nunca antes da acusação. */
    public static function culprit(): Suspect
    {
        foreach (self::all() as $suspect) {
            if ($suspect->isGuilty()) {
                return $suspect;
            }
        }

        throw new \LogicException('O caso precisa de exatamente um culpado.');
    }
}
