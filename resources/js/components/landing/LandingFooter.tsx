import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { IconShield } from '@/game/icons';
import { display, mono } from '@/theme/styles';
import { amber } from '@/theme/tokens';

export default function LandingFooter() {
    return (
        <Box component="footer" sx={{ borderTop: 1, borderColor: alpha(amber[900], 0.2), py: 6 }}>
            <Box
                sx={{
                    maxWidth: 1280,
                    mx: 'auto',
                    px: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconShield sx={{ fontSize: 16, color: alpha(amber[700], 0.4) }} />
                    <Box>
                        <Typography
                            sx={{ ...display(12, alpha(amber[600], 0.7)), letterSpacing: '0.15em' }}
                        >
                            AGÊNCIA SOMBRA
                        </Typography>
                        <Typography sx={mono(8, alpha(amber[900], 0.4), '0.05em')}>
                            Investigações Privadas · Est. 1943
                        </Typography>
                    </Box>
                </Box>

                <Typography sx={{ ...mono(8, alpha(amber[900], 0.3)), textAlign: 'center' }}>
                    Protótipo · Todos os casos e personagens são ficcionais
                </Typography>

                <Typography sx={mono(8, alpha(amber[900], 0.3))}>Rio de Janeiro · 1948</Typography>
            </Box>
        </Box>
    );
}
