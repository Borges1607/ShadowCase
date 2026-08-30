import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';

import { mono } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

export interface DossierPanelProps {
    Icon: SvgIconComponent;
    title: string;
    children: ReactNode;
    /** Limita a altura do corpo e o torna rolável — usado na lista de pistas. */
    maxBodyHeight?: number;
}

/** Painel lateral do dossiê: cabeçalho com ícone e um corpo com borda separadora. */
export default function DossierPanel({ Icon, title, children, maxBodyHeight }: DossierPanelProps) {
    return (
        <Box sx={{ border: 1, borderColor: alpha(amber[900], 0.25), bgcolor: noir.card }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: alpha(amber[900], 0.2),
                    px: 2.5,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Icon sx={{ fontSize: 14, color: alpha(amber[700], 0.5) }} />
                <Typography sx={mono(9, alpha(amber[700], 0.5))}>{title}</Typography>
            </Box>

            <Box
                sx={{
                    p: 2,
                    maxHeight: maxBodyHeight,
                    overflowY: maxBodyHeight ? 'auto' : undefined,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
