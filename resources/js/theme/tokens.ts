/**
 * Tokens visuais do ShadowCase.
 *
 * Traduzidos do protótipo Figma ("Jogo de detetive protótipo"), que era escrito
 * em Tailwind. Como o projeto usa MUI, as escalas de cor que o protótipo
 * consumia via classes (`text-amber-500`, `border-emerald-900/40`, …) viram
 * objetos consultáveis daqui — assim o visual continua idêntico sem depender
 * do Tailwind.
 */

/** Paleta noir base do Figma. */
export const noir = {
    background: '#0a0806',
    /** Fundo das seções alternadas (Sobre, CTA, preview de desafios). */
    backgroundAlt: '#0d0b09',
    card: '#100e0b',
    /** Fundo de campos e blocos "recuados" (inputs, cifras, planta do museu). */
    inset: '#080604',
    inputBackground: '#141210',
    foreground: '#e2d4b8',
    muted: '#1e1b17',
    mutedForeground: '#7a6e58',
    secondary: '#1a1714',
} as const;

/**
 * Escala amber do Tailwind — o dourado que carrega toda a identidade noir.
 * Valores literais para bater pixel a pixel com o protótipo.
 */
export const amber = {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
} as const;

/** Verde de "desafio concluído / veredicto correto". */
export const emerald = {
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
} as const;

/** Vermelho de erro, alerta e derrota. */
export const red = {
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
} as const;

/** Azul dos status "em breve" / "caso frio". */
export const blue = {
    400: '#60a5fa',
    900: '#1e3a8a',
    950: '#172554',
} as const;

/**
 * As variáveis --font-* vêm da diretiva @fonts no blade, alimentado pela config de
 * fontes em vite.config.ts. Os literais após a vírgula cobrem o intervalo até o
 * CSS das fontes carregar.
 */
export const fonts = {
    /** Títulos e números grandes. */
    display: 'var(--font-display, "Playfair Display"), Georgia, serif',
    /** Texto corrido, narrativa. */
    body: 'var(--font-body, "Crimson Pro"), Georgia, serif',
    /** Depoimentos, etiquetas de dossiê — ar de máquina de escrever. */
    typewriter: 'var(--font-typewriter, "Special Elite"), "Courier New", monospace',
    /** Rótulos técnicos em caixa alta com tracking largo. */
    mono: 'var(--font-mono, "JetBrains Mono"), "Courier New", monospace',
} as const;

/**
 * Ruído de película aplicado sobre imagens de fundo.
 * SVG inline para não depender de asset externo.
 */
export const filmGrainUrl =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
