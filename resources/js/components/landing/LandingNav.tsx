import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { IconLogin, IconSearch } from '@/game/icons';
import { display, mono } from '@/theme/styles';
import { amber, fonts, noir } from '@/theme/tokens';

const NAV_LINKS = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Como Funciona', href: '#como' },
    { label: 'Casos', href: '#casos' },
];

/**
 * Barra fixa do topo. Começa transparente sobre o hero e ganha fundo opaco
 * assim que a página rola — o mesmo truque do protótipo para não competir com
 * a imagem de abertura.
 */
export default function LandingNav({ loginHref }: { loginHref: string }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Box
            component="nav"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 500ms',
                ...(scrolled
                    ? {
                          borderBottom: 1,
                          borderColor: alpha(amber[900], 0.3),
                          bgcolor: alpha(noir.background, 0.95),
                          backdropFilter: 'blur(12px)',
                      }
                    : { borderBottom: 1, borderColor: 'transparent', bgcolor: 'transparent' }),
            }}
        >
            <Box
                sx={{
                    maxWidth: 1280,
                    mx: 'auto',
                    px: 3,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 28,
                            height: 28,
                            border: 1,
                            borderColor: alpha(amber[700], 0.5),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <IconSearch sx={{ fontSize: 13, color: amber[500] }} />
                    </Box>
                    <Box>
                        <Typography
                            component="span"
                            sx={{
                                ...display(14, amber[400]),
                                letterSpacing: '0.15em',
                                display: 'block',
                            }}
                        >
                            AGÊNCIA SOMBRA
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                ...mono(8, alpha(amber[800], 0.5), '0.35em'),
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            Investigações Privadas · 1943
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {NAV_LINKS.map((link) => (
                        <MuiLink
                            key={link.href}
                            href={link.href}
                            sx={{
                                ...mono(10, alpha(amber[700], 0.6)),
                                transition: 'color 200ms',
                                '&:hover': { color: amber[400] },
                            }}
                        >
                            {link.label}
                        </MuiLink>
                    ))}
                </Stack>

                <NoirButton
                    component={Link}
                    href={loginHref}
                    tone="ghost"
                    scale="sm"
                    startIcon={<IconLogin sx={{ fontSize: 13 }} />}
                    sx={{ fontFamily: fonts.mono, flexShrink: 0 }}
                >
                    Entrar
                </NoirButton>
            </Box>
        </Box>
    );
}
