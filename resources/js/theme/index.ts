import { alpha, createTheme } from '@mui/material/styles';

import { amber, emerald, fonts, noir, red } from './tokens';

/**
 * Tema do ShadowCase.
 *
 * O jogo é dark-only por design — a estética noir depende do preto quente de
 * fundo, então não existe color scheme claro. `cssVariables` fica ligado porque
 * o blade injeta `data-mui-color-scheme` antes da primeira pintura.
 */
const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
    },
    defaultColorScheme: 'dark',
    colorSchemes: {
        light: false,
        dark: {
            palette: {
                primary: {
                    main: amber[600],
                    light: amber[500],
                    dark: amber[700],
                    contrastText: noir.background,
                },
                secondary: { main: amber[800], contrastText: noir.foreground },
                error: { main: red[500], dark: red[800], contrastText: amber[100] },
                success: { main: emerald[500], dark: emerald[800] },
                background: { default: noir.background, paper: noir.card },
                text: {
                    primary: noir.foreground,
                    secondary: alpha(noir.foreground, 0.5),
                    disabled: noir.mutedForeground,
                },
                divider: alpha(amber[900], 0.25),
                action: {
                    hover: alpha(amber[900], 0.2),
                    selected: alpha(amber[900], 0.3),
                    disabled: alpha(amber[900], 0.35),
                    disabledBackground: 'transparent',
                },
            },
        },
    },

    /** Cantos retos em tudo — o protótipo usa `--radius: 0rem`. */
    shape: { borderRadius: 0 },

    typography: {
        fontFamily: fonts.body,
        h1: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.0 },
        h2: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.15 },
        h3: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.2 },
        h4: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.3 },
        h5: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.35 },
        h6: { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1.4 },
        body1: { fontFamily: fonts.body, lineHeight: 1.65 },
        body2: { fontFamily: fonts.body, lineHeight: 1.6 },
        button: {
            fontFamily: fonts.mono,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 400,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: noir.background,
                    // Rolagem suave para as âncoras da landing (#sobre, #casos…).
                    scrollBehavior: 'smooth',
                },
                // Barra de rolagem discreta, no tom do dossiê.
                '*::-webkit-scrollbar': { width: 8, height: 8 },
                '*::-webkit-scrollbar-track': { background: noir.background },
                '*::-webkit-scrollbar-thumb': { background: alpha(amber[900], 0.35) },
                '*::-webkit-scrollbar-thumb:hover': { background: alpha(amber[800], 0.5) },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true, disableRipple: true },
            styleOverrides: {
                root: { borderRadius: 0, minWidth: 0 },
            },
        },
        MuiLink: {
            defaultProps: { underline: 'none' },
        },
    },
});

export default theme;
