<?php

namespace App\Http\Controllers;

use App\Game\Challenges;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    /**
     * Vitrine pública do jogo.
     *
     * Os desafios entram só pelo título — sem nenhum caso concluído, o catálogo
     * não devolve pista alguma.
     */
    public function __invoke(): Response
    {
        return Inertia::render('landing', [
            'loginUrl' => route('login'),
            'challenges' => array_map(
                fn (array $challenge) => [
                    'id' => $challenge['id'],
                    'title' => $challenge['title'],
                ],
                Challenges::listing([]),
            ),
        ]);
    }
}
