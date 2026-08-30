<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Acesso à Agência Sombra.
 *
 * Não existe cadastro: o detetive informa um nome livre e a senha única da
 * agência. A conferência é feita aqui, no servidor, para que a senha nunca
 * chegue ao bundle JavaScript.
 */
class AgentSessionController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->session()->has('agent')) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('login', [
            // O jogo é uma demonstração pública e entrega a senha de propósito.
            'passwordHint' => config('game.show_password_hint')
                ? config('game.agency_password')
                : null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:60'],
            'password' => ['required', 'string'],
        ], [
            'name.required' => 'Informe seu nome de agente.',
            'name.max' => 'O nome do agente deve ter no máximo 60 caracteres.',
            'password.required' => 'Informe a senha da agência.',
        ]);

        // hash_equals evita vazar o tamanho da senha por tempo de resposta.
        if (! hash_equals((string) config('game.agency_password'), $validated['password'])) {
            throw ValidationException::withMessages([
                'password' => 'Senha incorreta. Acesso negado.',
            ]);
        }

        $request->session()->regenerate();
        $request->session()->put('agent', [
            'name' => $validated['name'],
            'badge' => 'AG-'.random_int(1000, 9999),
        ]);

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Encerra a sessão.
     *
     * Invalida tudo, não só o agente: o progresso não pertence a uma conta —
     * pertence à sessão. Esquecer só o agente deixaria o próximo detetive
     * herdando o caso já resolvido pelo anterior.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
