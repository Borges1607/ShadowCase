import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { amber } from '@/theme/tokens';
import { mono } from '@/theme/styles';

export interface SectionEyebrowProps {
    children: React.ReactNode;
    /** Comprimento do traço que antecede o rótulo. */
    dashWidth?: number;
    letterSpacing?: string;
    color?: string;
}

/**
 * Rótulo de seção no formato "— TEXTO EM CAIXA ALTA", presente no topo de
 * praticamente toda seção do protótipo.
 */
export default function SectionEyebrow({
    children,
    dashWidth = 32,
    letterSpacing = '0.4em',
    color = alpha(amber[700], 0.5),
}: SectionEyebrowProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ height: '1px', width: dashWidth, bgcolor: color }} />
            <Typography component="span" sx={mono(9, color, letterSpacing)}>
                {children}
            </Typography>
        </Box>
    );
}
