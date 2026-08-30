import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { body, display } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

const STEPS = [
    {
        n: '01',
        title: 'Crie sua Identidade',
        body: 'Escolha um nome de agente e acesse o sistema da Agência Sombra com a senha operacional.',
    },
    {
        n: '02',
        title: 'Aceite um Caso',
        body: 'Escolha entre os casos disponíveis. Cada um tem dificuldade, duração e suspeitos diferentes.',
    },
    {
        n: '03',
        title: 'Resolva os Desafios',
        body: 'Complete puzzles de diferentes tipos para coletar pistas. Cada desafio revela uma nova informação.',
    },
    {
        n: '04',
        title: 'Faça a Acusação',
        body: 'Com provas suficientes, identifique o culpado. Erro significa que ele escapa — para sempre.',
    },
];

export default function LandingHowItWorks() {
    return (
        <Box component="section" id="como" sx={{ py: 14, maxWidth: 1280, mx: 'auto', px: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 8 }}>
                <Box sx={{ height: '1px', flex: 1, bgcolor: alpha(amber[900], 0.25) }} />
                <Typography variant="h2" sx={display(30, amber[200])}>
                    Como Funciona
                </Typography>
                <Box sx={{ height: '1px', flex: 1, bgcolor: alpha(amber[900], 0.25) }} />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
                }}
            >
                {/* Linha que costura os quatro passos — só faz sentido lado a lado. */}
                <Box
                    aria-hidden
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        top: 32,
                        left: 'calc(12.5% + 1rem)',
                        right: 'calc(12.5% + 1rem)',
                        height: '1px',
                        bgcolor: alpha(amber[900], 0.25),
                        zIndex: 0,
                    }}
                />

                {STEPS.map((step) => (
                    <Box key={step.n} sx={{ position: 'relative', zIndex: 1 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                border: 1,
                                borderColor: alpha(amber[700], 0.4),
                                bgcolor: noir.background,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2.5,
                            }}
                        >
                            <Typography sx={display(24, amber[500])}>{step.n}</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ ...display(18, amber[100]), mb: 1 }}>
                            {step.title}
                        </Typography>
                        <Typography sx={body(14, alpha(amber[200], 0.5))}>{step.body}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
