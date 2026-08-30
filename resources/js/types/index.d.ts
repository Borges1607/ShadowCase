import type { Page } from '@inertiajs/core';

import type { Agent, PuzzleAttempt } from '@/game/types';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

/**
 * Props compartilhadas por HandleInertiaRequests::share().
 *
 * Não estende `PageProps` do Inertia de propósito: global.d.ts faz o caminho
 * inverso (`PageProps extends SharedProps`), e herdar nos dois sentidos criaria
 * um ciclo que o TypeScript resolve como `{}` — deixando `usePage().props` sem
 * tipagem alguma.
 */
export interface SharedProps {
    appName: string;
    /** Detetive na sessão, ou null antes do login. */
    agent: Agent | null;
    auth: {
        user: User | null;
    };
    flash: {
        success: string | null;
        error: string | null;
        /** Resultado da última tentativa em um puzzle. */
        attempt: PuzzleAttempt | null;
    };
}

export type AppPage<T = Record<string, unknown>> = Page<SharedProps & T>;
