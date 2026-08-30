<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    /**
     * Vitrine pública do jogo.
     *
     * O conteúdo narrativo (casos, desafios, suspeitos) ainda vive no frontend,
     * em resources/js/game/data.ts. Quando os casos virarem registros no banco,
     * é aqui que eles passam a ser carregados e enviados como props.
     */
    public function __invoke(): Response
    {
        return Inertia::render('landing', [
            'loginUrl' => route('login'),
        ]);
    }
}
