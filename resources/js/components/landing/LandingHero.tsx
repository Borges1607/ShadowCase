import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { alpha } from '@mui/material/styles';

import FilmGrain from '@/components/ui/FilmGrain';
import NoirButton from '@/components/ui/NoirButton';
import { NOIR_BACKDROP } from '@/game/data';
import { IconArrowDown, IconPlay } from '@/game/icons';
import { body, display, mono, typewriter } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

const TAGLINE = 'Rio de Janeiro, 1948. O crime do século aguarda seu detetive.';

const STATS = [
    { value: '3', label: 'Casos Planejados' },
    { value: '6+', label: 'Tipos de Desafio' },
    { value: '1948', label: 'Rio de Janeiro' },
];

/** Efeito de máquina de escrever, letra a letra, na frase de abertura. */
function useTypewriter(text: string, speed = 40) {
    const [typed, setTyped] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) setTyped(text.slice(0, ++i));
            else clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return typed;
}

export default function LandingHero({ onExplore }: { onExplore: () => void }) {
    const typed = useTypewriter(TAGLINE);

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            <Box
                component="img"
                src={NOIR_BACKDROP}
                alt="Cena noir de investigação"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.05)',
                    filter: 'brightness(0.3) saturate(0.4)',
                }}
            />
            {/* Dois gradientes: um puxa o texto para a esquerda, o outro assenta topo e rodapé. */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to right, ${noir.background}, ${alpha(noir.background, 0.8)} 50%, transparent)`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${noir.background}, transparent 50%, ${alpha(noir.background, 0.6)})`,
                }}
            />
            <FilmGrain />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: 1280,
                    mx: 'auto',
                    px: 3,
                    py: 16,
                    width: '100%',
                }}
            >
                <Box sx={{ maxWidth: 672 }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
                        <Box sx={{ height: '1px', width: 40, bgcolor: amber[600] }} />
                        <Typography component="span" sx={mono(9, alpha(amber[600], 0.8), '0.5em')}>
                            Jogo de Mistério &amp; Investigação
                        </Typography>
                    </Stack>

                    <Typography
                        variant="h1"
                        sx={{ ...display({ xs: 60, md: 96 }, amber[50]), lineHeight: 1, mb: 3 }}
                    >
                        Resolva
                        <br />o{' '}
                        <Box component="span" sx={{ color: amber[500] }}>
                            Crime.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            ...typewriter(16, alpha(amber[200], 0.7)),
                            mb: 1,
                            minHeight: '1.5rem',
                        }}
                    >
                        {typed}
                        <Box
                            component="span"
                            sx={{
                                ml: '2px',
                                animation: 'shadowcase-blink 2s ease-in-out infinite',
                                '@keyframes shadowcase-blink': {
                                    '0%, 100%': { opacity: 1 },
                                    '50%': { opacity: 0.3 },
                                },
                            }}
                        >
                            &#9612;
                        </Box>
                    </Typography>

                    <Typography sx={{ ...body(16, alpha(amber[200], 0.45)), maxWidth: 512, mb: 6 }}>
                        Uma experiência de detetive noir ambientada no Brasil dos anos 40. Decifre
                        códigos, analise testemunhos, conecte evidências e faça a acusação certa
                        antes que o culpado escape.
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 10 }}>
                        <NoirButton
                            onClick={onExplore}
                            tone="solid"
                            startIcon={<IconPlay sx={{ fontSize: 14 }} />}
                        >
                            Ver os Casos
                        </NoirButton>
                        <NoirButton component={MuiLink} href="#sobre" tone="outline">
                            Sobre o Projeto
                        </NoirButton>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 4,
                            borderTop: 1,
                            borderColor: alpha(amber[900], 0.25),
                            pt: 4,
                        }}
                    >
                        {STATS.map((stat) => (
                            <Box key={stat.label}>
                                <Typography sx={{ ...display(30, amber[400]), mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={mono(9, alpha(amber[800], 0.5))}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <ButtonBase
                onClick={onExplore}
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    flexDirection: 'column',
                    gap: 1,
                    color: alpha(amber[700], 0.5),
                    transition: 'color 200ms',
                    '&:hover': { color: amber[500] },
                }}
            >
                <Typography component="span" sx={mono(8, 'inherit')}>
                    Explorar
                </Typography>
                <IconArrowDown
                    sx={{
                        fontSize: 16,
                        animation: 'shadowcase-bounce 1s infinite',
                        '@keyframes shadowcase-bounce': {
                            '0%, 100%': { transform: 'translateY(-15%)' },
                            '50%': { transform: 'translateY(0)' },
                        },
                    }}
                />
            </ButtonBase>
        </Box>
    );
}
