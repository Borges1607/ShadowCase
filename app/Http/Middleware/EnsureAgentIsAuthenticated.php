<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Protege as telas internas do jogo.
 *
 * O "login" da Agência Sombra não usa o guard do Laravel — não há tabela de
 * usuários, só um agente guardado na sessão —, então a verificação é esta.
 */
class EnsureAgentIsAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->has('agent')) {
            // Guardado para o redirect()->intended() depois do login.
            $request->session()->put('url.intended', $request->fullUrl());

            return redirect()
                ->route('login')
                ->with('error', 'Identifique-se para acessar o sistema.');
        }

        return $next($request);
    }
}
