<?php

namespace App\Game;

/**
 * Um puzzle jogável.
 *
 * A regra que justifica esta interface: `payload()` só devolve o que a tela
 * precisa para desenhar o desafio. A resposta nunca sai daqui — quem decide se
 * o jogador acertou é `check()`, no servidor.
 */
interface Puzzle
{
    /** Dados públicos do puzzle. Nada aqui pode entregar a solução. */
    public function payload(): array;

    /**
     * @param  array  $input  A tentativa enviada pela tela.
     * @param  array  $state  Progresso interno acumulado em tentativas anteriores.
     */
    public function check(array $input, array $state): PuzzleAttempt;

    /** Regras de validação do formato da tentativa. */
    public function rules(): array;
}
