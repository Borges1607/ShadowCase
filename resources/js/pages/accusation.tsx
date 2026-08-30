import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import TopBar from '@/components/game/TopBar';
import BackLink from '@/components/ui/BackLink';
import NoirButton from '@/components/ui/NoirButton';
import { IconAlert, IconAward } from '@/game/icons';
import type { Suspect } from '@/game/types';
import { body, display, mono, monoRaw } from '@/theme/styles';
import { amber, noir, red } from '@/theme/tokens';

export interface AccusationProps {
    caseId: string;
    suspects: Suspect[];
    /** Só as pistas conquistadas — é sobre elas que a acusação se apoia. */
    clues: string[];
}

/**
 * Acusação final.
 *
 * Dois passos antes de enviar: escolher e confirmar. O peso da decisão é parte
 * da narrativa — o servidor registra o veredicto e o caso fecha.
 */
export default function Accusation({ caseId, suspects, clues }: AccusationProps) {
    const { agent } = usePage().props;
    const [selected, setSelected] = useState<string | null>(null);
    const [confirming, setConfirming] = useState(false);
    const [processing, setProcessing] = useState(false);

    const caseHref = `/caso/${caseId}`;
    const accused = suspects.find((suspect) => suspect.id === selected);

    const accuse = () => {
        setProcessing(true);
        router.post(
            `${caseHref}/acusacao`,
            { suspect: selected },
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title="Acusação Final" />

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <TopBar
                    maxWidth={1024}
                    left={<BackLink href={caseHref}>Caso</BackLink>}
                    center={
                        <Typography sx={{ ...display(14, amber[400]), letterSpacing: '0.15em' }}>
                            Acusação Final
                        </Typography>
                    }
                    right={
                        <Typography sx={monoRaw(9, alpha(amber[800], 0.4))}>
                            {agent?.badge}
                        </Typography>
                    }
                />

                <Box sx={{ maxWidth: 1024, mx: 'auto', px: 3, py: 6 }}>
                    <Box sx={{ mb: 5 }}>
                        <Typography sx={{ ...mono(9, alpha(amber[700], 0.5)), mb: 1 }}>
                            Tribunal · Rio de Janeiro · 1948
                        </Typography>
                        <Typography variant="h1" sx={{ ...display(36, amber[100]), mb: 1.5 }}>
                            Quem roubou o diamante?
                        </Typography>
                        <Typography sx={{ ...body(16, alpha(amber[200], 0.5)), maxWidth: 576 }}>
                            Com base nas evidências, identifique o culpado. Sua reputação está em
                            jogo.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 3,
                            gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
                            alignItems: 'start',
                        }}
                    >
                        <Box
                            sx={{
                                border: 1,
                                borderColor: alpha(amber[900], 0.25),
                                bgcolor: noir.card,
                                position: { lg: 'sticky' },
                                top: { lg: 96 },
                            }}
                        >
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: alpha(amber[900], 0.2),
                                    px: 2.5,
                                    py: 1.5,
                                }}
                            >
                                <Typography sx={mono(9, alpha(amber[700], 0.5))}>
                                    Evidências ({clues.length})
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {clues.map((clue) => (
                                    <Box
                                        key={clue}
                                        sx={{
                                            borderLeft: 2,
                                            borderColor: alpha(amber[700], 0.4),
                                            pl: 1.5,
                                        }}
                                    >
                                        <Typography sx={body(12, alpha(amber[200], 0.6))}>
                                            {clue}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography sx={mono(9, alpha(amber[700], 0.5))}>
                                Selecione o culpado:
                            </Typography>

                            {suspects.map((suspect) => {
                                const isSelected = selected === suspect.id;

                                return (
                                    <ButtonBase
                                        key={suspect.id}
                                        onClick={() => {
                                            setSelected(suspect.id);
                                            setConfirming(false);
                                        }}
                                        disabled={processing}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            textAlign: 'left',
                                            overflow: 'hidden',
                                            border: 1,
                                            borderColor: isSelected
                                                ? alpha(amber[600], 0.6)
                                                : alpha(amber[900], 0.25),
                                            transition: 'border-color 200ms',
                                            '&:hover': {
                                                borderColor: isSelected
                                                    ? undefined
                                                    : alpha(amber[800], 0.4),
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={suspect.photo}
                                            alt={suspect.name}
                                            sx={{
                                                width: 80,
                                                height: 96,
                                                objectFit: 'cover',
                                                filter: 'grayscale(1)',
                                                opacity: 0.5,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                p: 2,
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                sx={{ ...display(18, amber[100]), mb: 0.25 }}
                                            >
                                                {suspect.name}
                                            </Typography>
                                            <Typography sx={monoRaw(10, alpha(amber[800], 0.5))}>
                                                {suspect.occupation} · {suspect.age} anos
                                            </Typography>
                                            {isSelected && (
                                                <Typography
                                                    sx={{
                                                        ...monoRaw(9, amber[500]),
                                                        mt: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <IconAlert sx={{ fontSize: 12 }} />
                                                    Selecionado para acusação
                                                </Typography>
                                            )}
                                        </Box>
                                        {isSelected && (
                                            <Box
                                                sx={{
                                                    width: 4,
                                                    alignSelf: 'stretch',
                                                    bgcolor: amber[600],
                                                }}
                                            />
                                        )}
                                    </ButtonBase>
                                );
                            })}

                            {accused && !confirming && (
                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor: alpha(amber[900], 0.3),
                                        bgcolor: noir.card,
                                        p: 2.5,
                                    }}
                                >
                                    <Typography sx={{ ...body(14, alpha(amber[200], 0.7)), mb: 2 }}>
                                        Você está prestes a acusar{' '}
                                        <Box component="strong" sx={{ color: amber[300] }}>
                                            {accused.name}
                                        </Box>
                                        . Esta decisão é irreversível.
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                        <NoirButton
                                            onClick={() => setConfirming(true)}
                                            tone="solid"
                                            startIcon={<IconAward sx={{ fontSize: 14 }} />}
                                            sx={{
                                                bgcolor: amber[700],
                                                '&:hover': { bgcolor: amber[600] },
                                            }}
                                        >
                                            Confirmar
                                        </NoirButton>
                                        <NoirButton
                                            onClick={() => setSelected(null)}
                                            tone="outline"
                                        >
                                            Cancelar
                                        </NoirButton>
                                    </Box>
                                </Box>
                            )}

                            {confirming && (
                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor: alpha(red[900], 0.5),
                                        bgcolor: alpha(red[950], 0.4),
                                        p: 2.5,
                                    }}
                                >
                                    <Typography sx={{ ...mono(9, alpha(red[500], 0.7)), mb: 1.5 }}>
                                        ⚠ Confirmação Final
                                    </Typography>
                                    <Typography
                                        sx={{ ...body(14, alpha(amber[200], 0.7)), mb: 2.5 }}
                                    >
                                        Uma acusação errada destruirá sua carreira. Tem certeza
                                        absoluta?
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                        <NoirButton
                                            onClick={accuse}
                                            disabled={processing}
                                            tone="solid"
                                            sx={{
                                                bgcolor: red[800],
                                                color: amber[100],
                                                '&:hover': { bgcolor: red[700] },
                                            }}
                                        >
                                            {processing ? 'Registrando…' : 'Sim, estou certo(a)'}
                                        </NoirButton>
                                        <NoirButton
                                            onClick={() => setConfirming(false)}
                                            tone="outline"
                                        >
                                            Reconsiderar
                                        </NoirButton>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
