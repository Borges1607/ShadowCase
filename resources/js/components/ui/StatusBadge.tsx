import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import { blue, emerald, red } from '@/theme/tokens';
import { mono } from '@/theme/styles';
import type { CaseStatus } from '@/game/types';

/**
 * Cada status tem uma leitura imediata pela cor: vermelho = exige ação,
 * azul = parado, verde = encerrado.
 */
const TONES: Record<CaseStatus, { text: string; border: string; bg: string }> = {
    DISPONÍVEL: { text: red[400], border: alpha(red[900], 0.5), bg: alpha(red[950], 0.2) },
    ABERTO: { text: red[400], border: alpha(red[900], 0.5), bg: alpha(red[950], 0.2) },
    'EM BREVE': { text: blue[400], border: alpha(blue[900], 0.5), bg: alpha(blue[950], 0.2) },
    FRIO: { text: blue[400], border: alpha(blue[900], 0.5), bg: alpha(blue[950], 0.2) },
    RESOLVIDO: {
        text: emerald[400],
        border: alpha(emerald[900], 0.5),
        bg: alpha(emerald[950], 0.2),
    },
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
    const tone = TONES[status];

    return (
        <Box
            component="span"
            sx={{
                ...mono(8, tone.text, '0.15em'),
                border: 1,
                borderColor: tone.border,
                bgcolor: tone.bg,
                px: 1,
                py: 0.25,
                display: 'inline-block',
                whiteSpace: 'nowrap',
            }}
        >
            {status}
        </Box>
    );
}
