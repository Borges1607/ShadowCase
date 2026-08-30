import { useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { mono, monoRaw, typewriter } from '@/theme/styles';
import { amber, fonts, noir, red } from '@/theme/tokens';

import type { CipherPayload, PuzzleProps } from './types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Aplica o deslocamento inverso — é o que a tela mostra letra a letra. */
function decode(text: string, shift: number) {
    return text.replace(/[A-Z]/g, (char) => {
        const index = (char.charCodeAt(0) - 65 - shift + 26) % 26;

        return ALPHABET[index];
    });
}

function shiftAlphabet(shift: number) {
    return ALPHABET.split('')
        .map((_, i) => ALPHABET[(i + shift) % 26])
        .join(' ');
}

/**
 * Cifra de César.
 *
 * A decodificação aparece na tela de propósito — este é o desafio de entrada, e
 * a ideia é ensinar a mecânica da cifra, não esconder a resposta.
 */
export default function CipherPuzzle({
    payload,
    wrongAttempts,
    submit,
    processing,
}: PuzzleProps<CipherPayload>) {
    const [guess, setGuess] = useState('');
    const decoded = decode(payload.encrypted, payload.shift);

    const check = () => submit({ answer: guess });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1.5 }}>
                    Mensagem Cifrada:
                </Typography>
                <Box
                    sx={{
                        bgcolor: noir.inset,
                        border: 1,
                        borderColor: alpha(amber[900], 0.2),
                        px: 3,
                        py: 2.5,
                        textAlign: 'center',
                    }}
                >
                    <Typography sx={{ ...typewriter(24, amber[500]), letterSpacing: '0.4em' }}>
                        {payload.encrypted}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Box
                    sx={{
                        bgcolor: noir.inset,
                        border: 1,
                        borderColor: alpha(amber[900], 0.2),
                        p: 2,
                    }}
                >
                    <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1 }}>
                        Original
                    </Typography>
                    <Typography sx={monoRaw(11, alpha(amber[600], 0.6))}>
                        {ALPHABET.split('').join(' ')}
                    </Typography>
                </Box>
                <Box
                    sx={{ bgcolor: noir.inset, border: 1, borderColor: alpha(red[900], 0.2), p: 2 }}
                >
                    <Typography sx={{ ...mono(8, alpha(red[700], 0.5)), mb: 1 }}>
                        Cifrado (deslocamento: ???)
                    </Typography>
                    <Typography sx={monoRaw(11, alpha(red[500], 0.6))}>
                        {shiftAlphabet(payload.shift)}
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1.5 }}>
                    Decodificação letra a letra:
                </Typography>
                <Box
                    sx={{
                        bgcolor: noir.inset,
                        border: 1,
                        borderColor: alpha(amber[900], 0.2),
                        p: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                    }}
                >
                    {payload.encrypted.split('').map((char, i) => (
                        <Box
                            key={`${char}-${i}`}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5,
                                minWidth: 20,
                            }}
                        >
                            <Typography sx={monoRaw(10, alpha(amber[600], 0.6))}>{char}</Typography>
                            <Box
                                sx={{
                                    height: '1px',
                                    width: '100%',
                                    bgcolor: alpha(amber[900], 0.3),
                                }}
                            />
                            <Typography
                                sx={{
                                    ...monoRaw(10, amber[300]),
                                    opacity: char === ' ' ? 0 : 1,
                                }}
                            >
                                {decoded[i]}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1.5 }}>
                    Resposta:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <InputBase
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && check()}
                        placeholder="Digite a mensagem decodificada..."
                        sx={{
                            flex: 1,
                            bgcolor: noir.inset,
                            border: 1,
                            borderColor: alpha(amber[900], 0.3),
                            transition: 'border-color 200ms',
                            '&:focus-within': { borderColor: alpha(amber[600], 0.5) },
                            '& .MuiInputBase-input': {
                                fontFamily: fonts.mono,
                                fontSize: 14,
                                color: amber[200],
                                px: 2,
                                py: 1.5,
                                '&::placeholder': { color: alpha(amber[900], 0.5), opacity: 1 },
                            },
                        }}
                    />
                    <NoirButton
                        onClick={check}
                        disabled={processing}
                        tone="solid"
                        scale="sm"
                        sx={{ bgcolor: amber[700], px: 2.5, '&:hover': { bgcolor: amber[600] } }}
                    >
                        Verificar
                    </NoirButton>
                </Box>
                {wrongAttempts > 0 && (
                    <Typography sx={{ ...monoRaw(9, alpha(red[500], 0.7)), mt: 1 }}>
                        ✗ Incorreto — tentativa #{wrongAttempts}.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
