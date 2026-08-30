import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { body, mono, monoRaw, typewriter } from '@/theme/styles';
import { amber, emerald, noir, red } from '@/theme/tokens';

import type { MapPayload, PuzzleProps } from './types';

/**
 * Mapa do crime.
 *
 * A planta chega sem marcação nenhuma: qual sala é a certa é decisão do
 * servidor, tomada só depois do clique.
 */
export default function MapPuzzle({
    payload,
    attempt,
    submit,
    processing,
}: PuzzleProps<MapPayload>) {
    const answered = attempt?.target ?? null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1.5 }}>
                    Pistas sobre o local:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {payload.clues.map((clue, index) => (
                        <Box
                            key={clue}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                bgcolor: noir.inset,
                                border: 1,
                                borderColor: alpha(amber[900], 0.15),
                                px: 2,
                                py: 1.25,
                            }}
                        >
                            <Typography sx={monoRaw(9, alpha(amber[700], 0.5))}>
                                #{index + 1}
                            </Typography>
                            <Typography sx={body(14, alpha(amber[200], 0.55))}>{clue}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Planta do Museu — clique no local do crime:
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 1,
                        maxWidth: 512,
                    }}
                >
                    {payload.rooms.map((room) => {
                        const isAnswered = answered === room.id;
                        const isRight = isAnswered && attempt?.correct === true;
                        const isWrong = isAnswered && attempt?.correct === false;

                        return (
                            <ButtonBase
                                key={room.id}
                                onClick={() => submit({ room: room.id })}
                                disabled={processing || isRight}
                                sx={{
                                    height: 80,
                                    p: 1,
                                    border: 1,
                                    borderColor: isRight
                                        ? emerald[600]
                                        : isWrong
                                          ? alpha(red[700], 0.5)
                                          : alpha(amber[900], 0.2),
                                    bgcolor: isRight
                                        ? alpha(emerald[950], 0.7)
                                        : isWrong
                                          ? alpha(red[950], 0.5)
                                          : noir.card,
                                    transition: 'all 200ms',
                                    '&:hover': {
                                        borderColor: isAnswered
                                            ? undefined
                                            : alpha(amber[800], 0.4),
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        ...typewriter(
                                            11,
                                            isRight
                                                ? emerald[400]
                                                : isWrong
                                                  ? alpha(red[400], 0.7)
                                                  : alpha(amber[200], 0.6),
                                        ),
                                        lineHeight: 1.25,
                                        textAlign: 'center',
                                    }}
                                >
                                    {room.label}
                                </Typography>
                            </ButtonBase>
                        );
                    })}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mt: 1.5,
                        maxWidth: 512,
                        ...mono(8, alpha(amber[900], 0.4)),
                    }}
                >
                    <span>← Oeste</span>
                    <Box component="span" sx={{ flex: 1, textAlign: 'center' }}>
                        ↑ Norte
                    </Box>
                    <span>Leste →</span>
                </Box>
            </Box>
        </Box>
    );
}
