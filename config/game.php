<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Senha da agência
    |--------------------------------------------------------------------------
    |
    | Chave única de acesso ao sistema da Agência Sombra. Não existe cadastro:
    | o detetive informa um nome e esta senha. A verificação acontece no
    | servidor, então a senha nunca chega ao bundle JavaScript.
    |
    */

    'agency_password' => env('AGENCY_PASSWORD', 'sombra1943'),

    /*
    |--------------------------------------------------------------------------
    | Dica na tela de acesso
    |--------------------------------------------------------------------------
    |
    | O jogo é uma demonstração pública, então a tela de login entrega a senha
    | de propósito. Desligue com AGENCY_PASSWORD_HINT=false para escondê-la.
    |
    */

    'show_password_hint' => (bool) env('AGENCY_PASSWORD_HINT', true),

    /*
    |--------------------------------------------------------------------------
    | Casos
    |--------------------------------------------------------------------------
    |
    | Dos três casos do dossiê, só o primeiro está implementado. Os outros
    | aparecem bloqueados na vitrine e na central de operações.
    |
    | Aqui ficam apenas os identificadores — o conteúdo narrativo ainda vive em
    | resources/js/game/data.ts. Esta lista é o que permite ao servidor separar
    | um caso inexistente (404) de um caso que existe mas ainda não abriu.
    |
    */

    'cases' => ['case-01', 'case-02', 'case-03'],

    'active_case' => 'case-01',

    /*
    |--------------------------------------------------------------------------
    | Desafios
    |--------------------------------------------------------------------------
    |
    | Ordem e identificadores dos puzzles do caso ativo, e quantos precisam
    | estar resolvidos para liberar a acusação final.
    |
    */

    'challenges' => ['cipher', 'morse', 'safe', 'testimony', 'anagram', 'map'],

    'challenges_to_accuse' => 4,

];
