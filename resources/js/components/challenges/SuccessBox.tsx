import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { IconCheck } from '@/game/icons';
import { body, mono } from '@/theme/styles';
import { emerald, fonts } from '@/theme/tokens';

const BackToCase = styled(Link)({
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: emerald[600],
    textDecoration: 'none',
    display: 'inline-block',
    border: `1px solid ${alpha(emerald[900], 0.4)}`,
    padding: '8px 16px',
    transition: 'color 200ms',
    '&:hover': { color: emerald[400] },
});

export interface SuccessBoxProps {
    clue: string;
    caseHref: string;
}

/** Recompensa do puzzle resolvido: a pista que ele destrava. */
export default function SuccessBox({ clue, caseHref }: SuccessBoxProps) {
    return (
        <Box
            sx={{
                border: 1,
                borderColor: alpha(emerald[800], 0.5),
                bgcolor: alpha(emerald[950], 0.6),
                p: 3,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <IconCheck sx={{ fontSize: 16, color: emerald[400] }} />
                <Typography sx={mono(9, alpha(emerald[500], 0.8))}>
                    Desafio Concluído — Nova Pista Desbloqueada
                </Typography>
            </Box>

            <Typography sx={{ ...body(14, alpha(emerald[300], 0.8)), mb: 2.5 }}>{clue}</Typography>

            <BackToCase href={caseHref}>Voltar ao Caso →</BackToCase>
        </Box>
    );
}
