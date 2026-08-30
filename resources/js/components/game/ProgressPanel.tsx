import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { mono, monoRaw } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

export interface ProgressPanelProps {
    done: number;
    total: number;
    /** Quantos desafios faltam liberar antes da acusação; null quando já liberada. */
    requiredToAccuse: number | null;
}

/** Barra de avanço do caso, com o aviso do que ainda trava a acusação. */
export default function ProgressPanel({ done, total, requiredToAccuse }: ProgressPanelProps) {
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return (
        <Box
            sx={{
                border: 1,
                borderColor: alpha(amber[900], 0.25),
                bgcolor: noir.card,
                p: 2.5,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={mono(9, alpha(amber[700], 0.5))}>Progresso</Typography>
                <Typography sx={monoRaw(9, amber[500])}>{percent}%</Typography>
            </Box>

            <Box
                role="progressbar"
                aria-valuenow={done}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-label="Desafios concluídos"
                sx={{ height: 4, bgcolor: alpha(amber[900], 0.2) }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: `${percent}%`,
                        bgcolor: amber[600],
                        transition: 'width 500ms',
                    }}
                />
            </Box>

            {requiredToAccuse !== null && (
                <Typography sx={{ ...mono(8, alpha(amber[800], 0.45)), mt: 1.5 }}>
                    Complete pelo menos {requiredToAccuse} desafios para fazer uma acusação
                </Typography>
            )}
        </Box>
    );
}
