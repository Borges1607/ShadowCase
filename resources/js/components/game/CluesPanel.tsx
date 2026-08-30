import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import DossierPanel from '@/components/game/DossierPanel';
import { IconFile } from '@/game/icons';
import { body, mono } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Pistas reveladas até agora — o mural que sustenta a acusação. */
export default function CluesPanel({ clues }: { clues: string[] }) {
    return (
        <DossierPanel Icon={IconFile} title={`Pistas (${clues.length})`} maxBodyHeight={224}>
            {clues.length === 0 ? (
                <Typography sx={mono(9, alpha(amber[900], 0.4))}>Nenhuma pista ainda.</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {clues.map((clue) => (
                        <Box
                            key={clue}
                            sx={{ borderLeft: 2, borderColor: alpha(amber[700], 0.4), pl: 1.5 }}
                        >
                            <Typography sx={body(12, alpha(amber[200], 0.6))}>{clue}</Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </DossierPanel>
    );
}
