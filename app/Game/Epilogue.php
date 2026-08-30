<?php

namespace App\Game;

/**
 * Desfechos narrativos de "O Diamante Desaparecido".
 *
 * Os dois textos nomeiam o culpado, então moram aqui junto com o resto do
 * segredo. Só saem pelo VerdictController — depois da acusação feita.
 */
final class Epilogue
{
    /**
     * A frase do placar é montada aqui, e não na tela, para que a concordância
     * ("1 desafio" / "6 desafios") fique junto do texto que ela completa.
     *
     * @return array{lead: string, note: string}
     */
    public static function victory(int $completed, int $total): array
    {
        $noun = $completed === 1 ? 'desafio resolvido foi essencial' : 'desafios resolvidos foram essenciais';

        return [
            'lead' => "A Condessa Vera D'Almeida foi presa ao tentar embarcar para Lisboa. "
                ."O diamante 'Olho da Serpente' foi recuperado em seu baú, envolto em um lenço "
                .'com o monograma da família D\'Almeida.',
            'note' => "{$completed} de {$total} {$noun} para o veredicto.",
        ];
    }

    /** @return array{lead: string, note: string} */
    public static function defeat(): array
    {
        return [
            'lead' => "Sua acusação permitiu que a Condessa Vera D'Almeida escapasse com o "
                .'diamante. Ela embarcou para Lisboa antes do amanhecer.',
            'note' => 'A Agência Sombra retirou sua licença. O verdadeiro culpado ainda está em liberdade.',
        ];
    }
}
