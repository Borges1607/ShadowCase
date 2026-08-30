import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import DossierPanel from '@/components/game/DossierPanel';
import { IconUsers } from '@/game/icons';
import type { Suspect } from '@/game/types';
import { mono, typewriter } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Retratos de arquivo: dessaturados, como fotos 3x4 grampeadas ao dossiê. */
export default function SuspectsPanel({ suspects }: { suspects: Suspect[] }) {
    return (
        <DossierPanel Icon={IconUsers} title="Suspeitos">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {suspects.map((suspect) => (
                    <Box key={suspect.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            component="img"
                            src={suspect.photo}
                            alt={suspect.name}
                            sx={{
                                width: 32,
                                height: 32,
                                objectFit: 'cover',
                                filter: 'grayscale(1)',
                                opacity: 0.5,
                                flexShrink: 0,
                            }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                            <Typography sx={typewriter(11, alpha(amber[200], 0.7))}>
                                {suspect.name}
                            </Typography>
                            <Typography sx={mono(8, alpha(amber[800], 0.45), '0.05em')}>
                                {suspect.occupation}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </DossierPanel>
    );
}
