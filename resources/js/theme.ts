import { createTheme } from '@mui/material/styles';

/**
 * Tema base do ShadowCase.
 *
 * Usa CSS variables + color schemes do MUI, o que permite alternar
 * entre claro/escuro sem re-renderizar a árvore inteira.
 */
const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#8a6d2f' },
                secondary: { main: '#455a64' },
                background: { default: '#f5f4f1', paper: '#ffffff' },
            },
        },
        dark: {
            palette: {
                primary: { main: '#c8a15a' },
                secondary: { main: '#78909c' },
                background: { default: '#0e0f12', paper: '#16181d' },
            },
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
        button: { textTransform: 'none', fontWeight: 600 },
    },
});

export default theme;
