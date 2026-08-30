import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { IconChevronDown, IconChevronUp } from '@/game/icons';
import { body, display, mono, monoRaw } from '@/theme/styles';
import { amber, noir, red } from '@/theme/tokens';

import type { PuzzleProps, SafePayload } from './types';

const dialButtonSx = {
    width: 48,
    height: 32,
    border: 1,
    borderColor: alpha(amber[900], 0.3),
    color: alpha(amber[700], 0.6),
    transition: 'all 200ms',
    '&:hover': { borderColor: alpha(amber[700], 0.5), color: amber[500] },
};

/**
 * Cofre numérico.
 *
 * A combinação nunca chega ao cliente: os discos são só um seletor, e quem diz
 * se abriu é o servidor.
 */
export default function SafePuzzle({
    payload,
    attempt,
    wrongAttempts,
    submit,
    processing,
}: PuzzleProps<SafePayload>) {
    const [dials, setDials] = useState<number[]>(() => new Array(payload.dials).fill(0));

    const adjust = (index: number, direction: 1 | -1) =>
        setDials((previous) =>
            previous.map((value, i) => (i === index ? (value + direction + 10) % 10 : value)),
        );

    const failed = attempt !== null && !attempt.correct;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Pistas para a combinação:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {payload.riddles.map((riddle, index) => (
                        <Box
                            key={riddle}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                bgcolor: noir.inset,
                                border: 1,
                                borderColor: alpha(amber[900], 0.2),
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    border: 1,
                                    borderColor: alpha(amber[700], 0.4),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    mt: '2px',
                                }}
                            >
                                <Typography sx={monoRaw(10, amber[600])}>{index + 1}</Typography>
                            </Box>
                            <Typography sx={body(14, alpha(amber[200], 0.6))}>{riddle}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Combinação:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                    {dials.map((value, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <ButtonBase
                                onClick={() => adjust(index, 1)}
                                aria-label={`Aumentar dígito ${index + 1}`}
                                sx={dialButtonSx}
                            >
                                <IconChevronUp sx={{ fontSize: 16 }} />
                            </ButtonBase>

                            <Box
                                sx={{
                                    width: 48,
                                    height: 56,
                                    border: 2,
                                    borderColor: failed
                                        ? alpha(red[700], 0.6)
                                        : alpha(amber[700], 0.5),
                                    bgcolor: noir.inset,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'border-color 300ms',
                                }}
                            >
                                <Typography sx={display(30, amber[300])}>{value}</Typography>
                            </Box>

                            <ButtonBase
                                onClick={() => adjust(index, -1)}
                                aria-label={`Diminuir dígito ${index + 1}`}
                                sx={dialButtonSx}
                            >
                                <IconChevronDown sx={{ fontSize: 16 }} />
                            </ButtonBase>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <NoirButton
                    onClick={() => submit({ dials })}
                    disabled={processing}
                    tone="solid"
                    sx={{ bgcolor: amber[700], px: 5, '&:hover': { bgcolor: amber[600] } }}
                >
                    Abrir Cofre
                </NoirButton>
                {wrongAttempts > 0 && (
                    <Typography sx={monoRaw(9, alpha(red[500], 0.7))}>
                        ✗ Combinação incorreta. Reveja as pistas.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
