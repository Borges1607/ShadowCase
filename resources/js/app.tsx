import '../css/app.css';

import { StrictMode, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/theme';

const appName = import.meta.env.VITE_APP_NAME || 'ShadowCase';

type PageModule = { default: ComponentType };

void createInertiaApp({
    title: (title) => (title ? `${title} · ${appName}` : appName),

    resolve: (name) =>
        resolvePageComponent<PageModule>(
            `./pages/${name}.tsx`,
            import.meta.glob<PageModule>('./pages/**/*.tsx'),
        ).then((module) => module.default),

    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <ThemeProvider theme={theme} defaultMode="dark">
                    <CssBaseline enableColorScheme />
                    <App {...props} />
                </ThemeProvider>
            </StrictMode>,
        );
    },

    progress: {
        color: '#c8a15a',
    },
});
