<?php

namespace App\Game;

use App\Game\Puzzles\AnagramPuzzle;
use App\Game\Puzzles\CaesarCipherPuzzle;
use App\Game\Puzzles\CrimeMapPuzzle;
use App\Game\Puzzles\MorseCodePuzzle;
use App\Game\Puzzles\SafeCodePuzzle;
use App\Game\Puzzles\TestimonyPuzzle;

/**
 * Catálogo dos desafios do caso "O Diamante Desaparecido".
 *
 * Este arquivo é a fronteira do spoiler: pistas, respostas e explicações vivem
 * daqui para dentro. O frontend só recebe o que a tela precisa desenhar.
 */
final class Challenges
{
    /** @var array<string, Challenge>|null */
    private static ?array $cache = null;

    /** @return array<string, Challenge> */
    public static function all(): array
    {
        return self::$cache ??= [
            'cipher' => new Challenge(
                id: 'cipher',
                title: 'Cifra de César',
                subtitle: 'Decodifique a mensagem criptografada',
                difficulty: 'FÁCIL',
                clue: 'A chave está escondida no Quarto 7 do Hotel Majestic, próximo ao porto.',
                puzzle: new CaesarCipherPuzzle,
            ),
            'morse' => new Challenge(
                id: 'morse',
                title: 'Código Morse',
                subtitle: 'Interprete os sinais telegráficos interceptados',
                difficulty: 'FÁCIL',
                clue: 'O crime ocorreu à meia-noite — o relógio às 23h47 era uma isca.',
                puzzle: new MorseCodePuzzle,
            ),
            'safe' => new Challenge(
                id: 'safe',
                title: 'Cofre Numérico',
                subtitle: 'Descubra a combinação do cofre secreto',
                difficulty: 'MÉDIO',
                clue: 'O curador sabia a combinação e a revelou a um cúmplice.',
                puzzle: new SafeCodePuzzle,
            ),
            'testimony' => new Challenge(
                id: 'testimony',
                title: 'Depoimento Mentiroso',
                subtitle: 'Encontre a contradição nas declarações',
                difficulty: 'MÉDIO',
                clue: 'A Condessa esteve na Sala do Cofre — as pegadas de lama provam.',
                puzzle: new TestimonyPuzzle,
            ),
            'anagram' => new Challenge(
                id: 'anagram',
                title: 'Anagrama Cifrado',
                subtitle: 'Reorganize as letras secretas',
                difficulty: 'DIFÍCIL',
                clue: 'Três palavras-chave: CHAVE + QUARTO + PROVA.',
                puzzle: new AnagramPuzzle,
            ),
            'map' => new Challenge(
                id: 'map',
                title: 'Mapa do Crime',
                subtitle: 'Identifique o local exato do roubo',
                difficulty: 'DIFÍCIL',
                clue: 'O diamante saiu pela janela leste da Sala do Cofre.',
                puzzle: new CrimeMapPuzzle,
            ),
        ];
    }

    public static function find(string $id): ?Challenge
    {
        return self::all()[$id] ?? null;
    }

    public static function count(): int
    {
        return count(self::all());
    }

    /**
     * Fichas de todos os desafios, marcando os já concluídos.
     *
     * @param  list<string>  $completed
     */
    public static function listing(array $completed): array
    {
        return array_values(array_map(
            fn (Challenge $challenge) => $challenge->toArray(in_array($challenge->id, $completed, true)),
            self::all(),
        ));
    }
}
