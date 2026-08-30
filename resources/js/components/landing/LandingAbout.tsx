import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';

import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { IconFile, IconPlay, IconShield, IconStar, IconUsers, IconZap } from '@/game/icons';
import { body, display } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

interface Feature {
    Icon: SvgIconComponent;
    title: string;
    body: string;
}

const FEATURES: Feature[] = [
    {
        Icon: IconFile,
        title: 'Investigação Imersiva',
        body: 'Explore dossiês, analise evidências físicas e testemunhais. Cada pista foi projetada para se conectar a outras — nada é irrelevante.',
    },
    {
        Icon: IconZap,
        title: '6 Tipos de Puzzle',
        body: 'Cifras de César, código Morse, cofres numéricos, anagramas, mapas de crime e muito mais. Cada desafio exige uma habilidade diferente.',
    },
    {
        Icon: IconUsers,
        title: 'Suspeitos Vivos',
        body: 'Cada suspeito tem álibi, motivo e contradições. Analise depoimentos, cruze informações e decida em quem não confiar.',
    },
    {
        Icon: IconStar,
        title: 'Narrativa Noir',
        body: 'Ambientado no Brasil dos anos 40, o jogo combina estética noir clássica com personagens e locais brasileiros da época.',
    },
    {
        Icon: IconShield,
        title: 'Acusação com Peso',
        body: 'A acusação final é irreversível. Uma decisão errada deixa o culpado livre. Certifique-se de ter as provas antes de agir.',
    },
    {
        Icon: IconPlay,
        title: 'Protótipo Colaborativo',
        body: 'Este site é um protótipo em desenvolvimento. Novos casos, mecânicas e personagens serão adicionados progressivamente.',
    },
];

export default function LandingAbout() {
    return (
        <Box component="section" id="sobre" sx={{ py: 14, bgcolor: noir.backgroundAlt }}>
            <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3 }}>
                <Box sx={{ maxWidth: 672, mb: 8 }}>
                    <SectionEyebrow>Sobre o Projeto</SectionEyebrow>
                    <Typography
                        variant="h2"
                        sx={{ ...display({ xs: 36, md: 48 }, amber[100]), mb: 2.5 }}
                    >
                        Um jogo de detetive
                        <br />
                        <Box component="span" sx={{ color: amber[500] }}>
                            construído a dois.
                        </Box>
                    </Typography>
                    <Typography sx={body(16, alpha(amber[200], 0.55))}>
                        Agência Sombra nasceu de uma ideia simples: criar uma experiência de
                        investigação noir ambientada no Brasil dos anos 40, com puzzles reais,
                        suspeitos críveis e uma narrativa que se abre conforme você investiga. Este
                        é o protótipo — o ponto de partida.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        },
                    }}
                >
                    {FEATURES.map((feature) => (
                        <Box
                            key={feature.title}
                            sx={{
                                border: 1,
                                borderColor: alpha(amber[900], 0.2),
                                bgcolor: noir.card,
                                p: 3,
                                transition: 'border-color 200ms',
                                '&:hover': { borderColor: alpha(amber[800], 0.35) },
                                // O ícone acompanha o hover do cartão inteiro.
                                '&:hover .feature-icon-frame': {
                                    borderColor: alpha(amber[700], 0.5),
                                },
                                '&:hover .feature-icon': { color: amber[500] },
                            }}
                        >
                            <Box
                                className="feature-icon-frame"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    border: 1,
                                    borderColor: alpha(amber[900], 0.35),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    transition: 'border-color 200ms',
                                }}
                            >
                                <feature.Icon
                                    className="feature-icon"
                                    sx={{
                                        fontSize: 16,
                                        color: alpha(amber[700], 0.6),
                                        transition: 'color 200ms',
                                    }}
                                />
                            </Box>
                            <Typography variant="h3" sx={{ ...display(18, amber[100]), mb: 1 }}>
                                {feature.title}
                            </Typography>
                            <Typography sx={body(14, alpha(amber[200], 0.5))}>
                                {feature.body}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
