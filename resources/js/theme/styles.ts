import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

import { amber, fonts, noir } from './tokens';

/**
 * Fábricas de estilo para os quatro "papéis" tipográficos do protótipo.
 *
 * O Figma usava utilitários Tailwind (`font-mono text-[9px] tracking-widest`).
 * Aqui cada papel vira uma função que devolve um objeto `sx`, evitando repetir
 * a mesma dezena de propriedades em toda tela.
 */

/** Rótulo técnico: caixa alta, tracking largo, tamanhos minúsculos. */
export function mono(fontSize: number, color: string, letterSpacing = '0.1em'): SxProps<Theme> {
    return {
        fontFamily: fonts.mono,
        fontSize,
        color,
        letterSpacing,
        textTransform: 'uppercase',
        lineHeight: 1.5,
    };
}

/** Igual a `mono`, mas preservando a caixa original (códigos, cifras, placas). */
export function monoRaw(fontSize: number, color: string, letterSpacing = '0.1em'): SxProps<Theme> {
    return { fontFamily: fonts.mono, fontSize, color, letterSpacing, lineHeight: 1.5 };
}

/** Títulos serifados. */
export function display(fontSize: number | Record<string, number>, color: string): SxProps<Theme> {
    return { fontFamily: fonts.display, fontSize, color, lineHeight: 1.15 };
}

/** Texto corrido da narrativa. */
export function body(fontSize: number, color: string): SxProps<Theme> {
    return { fontFamily: fonts.body, fontSize, color, lineHeight: 1.65 };
}

/** Máquina de escrever — depoimentos e etiquetas de dossiê. */
export function typewriter(fontSize: number, color: string): SxProps<Theme> {
    return { fontFamily: fonts.typewriter, fontSize, color, lineHeight: 1.5 };
}

// ─── Superfícies recorrentes ─────────────────────────────────────────────────

/** Cartão de dossiê: borda dourada tênue sobre o fundo de papel escuro. */
export const card: SxProps<Theme> = {
    border: 1,
    borderColor: alpha(amber[900], 0.25),
    bgcolor: noir.card,
};

/** Bloco recuado: campos, cifras, planta do museu. */
export const inset: SxProps<Theme> = {
    border: 1,
    borderColor: alpha(amber[900], 0.2),
    bgcolor: noir.inset,
};

/** Borda padrão dos separadores dourados. */
export const hairline = alpha(amber[900], 0.25);
