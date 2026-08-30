import { router } from '@inertiajs/react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { IconUsers } from '@/game/icons';
import type { Agent } from '@/game/types';
import { mono, monoRaw } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/**
 * Identificação do detetive no canto da barra: nome, distintivo e a saída.
 *
 * O nome some em telas estreitas — o distintivo no ícone basta para se
 * reconhecer, e a barra não pode competir com o conteúdo do caso.
 */
export default function AgentIdentity({ agent }: { agent: Agent }) {
    return (
        <>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                <Typography sx={monoRaw(10, amber[400])}>{agent.name}</Typography>
                <Typography sx={mono(8, alpha(amber[800], 0.5), '0.05em')}>
                    {agent.badge}
                </Typography>
            </Box>

            <Tooltip title="Encerrar sessão" placement="bottom-end">
                <ButtonBase
                    onClick={() => router.post('/sair')}
                    aria-label="Encerrar sessão"
                    sx={{
                        width: 32,
                        height: 32,
                        border: 1,
                        borderColor: alpha(amber[700], 0.4),
                        color: amber[600],
                        flexShrink: 0,
                        transition: 'all 200ms',
                        '&:hover': { borderColor: amber[600], bgcolor: alpha(amber[900], 0.25) },
                        '&:focus-visible': { outline: `1px solid ${amber[600]}`, outlineOffset: 2 },
                    }}
                >
                    <IconUsers sx={{ fontSize: 15 }} />
                </ButtonBase>
            </Tooltip>
        </>
    );
}
