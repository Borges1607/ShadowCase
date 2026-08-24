import type { Page, PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

/** Props compartilhadas por HandleInertiaRequests::share(). */
export interface SharedProps extends InertiaPageProps {
    appName: string;
    auth: {
        user: User | null;
    };
    flash: {
        success: string | null;
        error: string | null;
    };
}

export type AppPage<T = Record<string, unknown>> = Page<SharedProps & T>;
