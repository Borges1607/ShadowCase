import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { IconPlay, IconShield } from '@/game/icons';
import { body, display, mono } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

export default function LandingCTA({ startHref }: { startHref: string }) {
    return (
        <Box
            component="section"
            sx={{ py: 14, bgcolor: noir.backgroundAlt, position: 'relative', overflow: 'hidden' }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to right, ${alpha(amber[950], 0.1)}, transparent)`,
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 768,
                    mx: 'auto',
                    px: 3,
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        mb: 3,
                    }}
                >
                    <Box sx={{ height: '1px', width: 48, bgcolor: alpha(amber[700], 0.3) }} />
                    <IconShield sx={{ fontSize: 20, color: alpha(amber[700], 0.5) }} />
                    <Box sx={{ height: '1px', width: 48, bgcolor: alpha(amber[700], 0.3) }} />
                </Box>

                <Typography
                    variant="h2"
                    sx={{ ...display({ xs: 48, md: 60 }, amber[100]), mb: 2.5 }}
                >
                    Pronto para
                    <br />
                    <Box component="span" sx={{ color: amber[500] }}>
                        investigar?
                    </Box>
                </Typography>

                <Typography
                    sx={{ ...body(16, alpha(amber[200], 0.5)), maxWidth: 512, mx: 'auto', mb: 5 }}
                >
                    O &lsquo;Olho da Serpente&rsquo; foi roubado. Três suspeitos. Seis desafios. Uma
                    acusação. O culpado está esperando — e o tempo corre.
                </Typography>

                <NoirButton
                    component={Link}
                    href={startHref}
                    tone="solid"
                    scale="lg"
                    startIcon={<IconPlay sx={{ fontSize: 16 }} />}
                    sx={{ px: 6 }}
                >
                    Iniciar Investigação
                </NoirButton>

                <Typography sx={{ ...mono(9, alpha(amber[900], 0.35)), mt: 3 }}>
                    Gratuito · Sem cadastro obrigatório · Apenas a senha da agência
                </Typography>
            </Box>
        </Box>
    );
}
