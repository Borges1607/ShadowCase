import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { google } from 'laravel-vite-plugin/fonts';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            /**
             * As quatro vozes tipográficas do jogo, auto-hospedadas via `@fonts`.
             * Os aliases viram `--font-display`, `--font-body`, etc., consumidos
             * em resources/js/theme/tokens.ts.
             */
            fonts: [
                google('Playfair Display', {
                    alias: 'display',
                    weights: [400, 600, 700],
                    styles: ['normal', 'italic'],
                    fallbacks: ['Georgia', 'serif'],
                    optimizedFallbacks: false,
                }),
                google('Crimson Pro', {
                    alias: 'body',
                    weights: [400, 600],
                    styles: ['normal', 'italic'],
                    fallbacks: ['Georgia', 'serif'],
                    optimizedFallbacks: false,
                }),
                google('Special Elite', {
                    alias: 'typewriter',
                    weights: [400],
                    fallbacks: ['Courier New', 'monospace'],
                    optimizedFallbacks: false,
                }),
                google('JetBrains Mono', {
                    alias: 'mono',
                    weights: [400, 500],
                    fallbacks: ['Courier New', 'monospace'],
                    optimizedFallbacks: false,
                }),
            ],
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, 'resources/js'),
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
