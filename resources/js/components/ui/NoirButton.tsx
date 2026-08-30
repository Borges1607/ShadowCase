import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

import { amber, fonts, noir } from '@/theme/tokens';

/** Peso visual do botão dentro da hierarquia da tela. */
export type NoirTone = 'solid' | 'outline' | 'ghost';

export type NoirSize = 'sm' | 'md' | 'lg';

const SIZES: Record<NoirSize, { fontSize: number; px: number; py: number }> = {
    sm: { fontSize: 10, px: 2.5, py: 1 },
    md: { fontSize: 12, px: 4, py: 1.75 },
    lg: { fontSize: 14, px: 6, py: 2 },
};

const TONES: Record<NoirTone, object> = {
    /** Ação principal: dourado sólido com halo no hover. */
    solid: {
        bgcolor: amber[600],
        color: noir.background,
        border: 'none',
        '&:hover': {
            bgcolor: amber[500],
            boxShadow: `0 0 28px ${alpha('#c4913a', 0.5)}`,
        },
        '&:active': { bgcolor: amber[700] },
    },
    /** Ação secundária: só contorno. */
    outline: {
        bgcolor: 'transparent',
        color: amber[600],
        border: 1,
        borderColor: alpha(amber[800], 0.5),
        '&:hover': {
            bgcolor: 'transparent',
            color: amber[400],
            borderColor: alpha(amber[600], 0.6),
        },
    },
    /** Ação discreta que se preenche no hover (nav, cartões). */
    ghost: {
        bgcolor: 'transparent',
        color: amber[500],
        border: 1,
        borderColor: alpha(amber[700], 0.5),
        '&:hover': {
            bgcolor: amber[700],
            borderColor: amber[600],
            color: noir.background,
        },
    },
};

export interface NoirButtonProps extends Omit<ButtonProps, 'size' | 'variant' | 'color'> {
    tone?: NoirTone;
    scale?: NoirSize;
}

/**
 * Botão da Agência Sombra: cantos retos, rótulo em mono caixa-alta com tracking
 * largo. Substitui as três variações de `<button>` que o protótipo repetia.
 */
export default function NoirButton({
    tone = 'solid',
    scale = 'md',
    sx,
    ...props
}: NoirButtonProps) {
    const size = SIZES[scale];

    return (
        <Button
            {...props}
            sx={[
                {
                    fontFamily: fonts.mono,
                    fontSize: size.fontSize,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                    px: size.px,
                    py: size.py,
                    borderRadius: 0,
                    transition: 'all 200ms',
                    gap: 1,
                    '& .MuiButton-startIcon': { mr: 0 },
                    '&.Mui-disabled': {
                        color: alpha(amber[900], 0.35),
                        borderColor: alpha(amber[900], 0.2),
                    },
                },
                TONES[tone],
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        />
    );
}
