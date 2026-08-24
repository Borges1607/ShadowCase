/// <reference types="vite/client" />

import type { SharedProps } from './index';

declare module '@inertiajs/core' {
    interface PageProps extends SharedProps {}
}

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

export {};
