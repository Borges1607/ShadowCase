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

];
