import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import type { Difficulty } from '@/game/types';
import { mono } from '@/theme/styles';
import { amber, emerald, red } from '@/theme/tokens';

/** Verde → âmbar → vermelho: a cor sozinha já diz o quanto o puzzle cobra. */
const TONES: Record<Difficulty, { text: string; border: string }> = {
    FÁCIL: { text: emerald[400], border: alpha(emerald[900], 0.5) },
    MÉDIO: { text: amber[400], border: alpha(amber[800], 0.5) },
    DIFÍCIL: { text: red[400], border: alpha(red[900], 0.5) },
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
    const tone = TONES[difficulty];

    return (
        <Box
            component="span"
            sx={{
                ...mono(8, tone.text, '0.15em'),
                border: 1,
                borderColor: tone.border,
                px: 0.75,
                py: 0.25,
                display: 'inline-block',
                whiteSpace: 'nowrap',
            }}
        >
            {difficulty}
        </Box>
    );
}
