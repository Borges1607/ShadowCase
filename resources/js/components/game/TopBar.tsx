import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import { amber, noir } from '@/theme/tokens';

export interface TopBarProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    /** Acompanha a largura do conteúdo da tela: 1152 na central, 768 nos desafios. */
    maxWidth?: number;
}

/**
 * Barra fixa das telas internas.
 *
 * Todas seguem o mesmo esqueleto de três colunas — voltar / identificação /
 * contexto —, mudando apenas o que entra em cada slot.
 */
export default function TopBar({ left, center, right, maxWidth = 1152 }: TopBarProps) {
    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 40,
                borderBottom: 1,
                borderColor: alpha(amber[900], 0.25),
                bgcolor: alpha(noir.background, 0.95),
                backdropFilter: 'blur(8px)',
            }}
        >
            <Box
                sx={{
                    maxWidth,
                    mx: 'auto',
                    px: 3,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>{left}</Box>
                {center && <Box sx={{ display: 'flex', alignItems: 'center' }}>{center}</Box>}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>{right}</Box>
            </Box>
        </Box>
    );
}
