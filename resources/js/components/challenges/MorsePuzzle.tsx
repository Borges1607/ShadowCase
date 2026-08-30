import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { IconEye } from '@/game/icons';
import { mono, monoRaw } from '@/theme/styles';
import { amber, fonts, noir, red } from '@/theme/tokens';

import type { MorsePayload, PuzzleProps } from './types';

/** Um símbolo morse desenhado como ponto ou traço. */
function Symbol({ code }: { code: string }) {
    return (
        <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center', height: 32 }}>
            {code.split('').map((mark, i) => (
                <Box
                    key={i}
                    sx={{
                        width: mark === '.' ? 8 : 20,
                        height: 8,
                        borderRadius: mark === '.' ? '50%' : 0,
                        bgcolor: amber[500],
                    }}
                />
            ))}
        </Box>
    );
}

/**
 * Código Morse interceptado.
 *
 * A tabela é material de consulta e fica escondida por padrão — quem quiser
 * decifrar de cabeça pode; quem preferir consultar, abre.
 */
export default function MorsePuzzle({
    payload,
    wrongAttempts,
    submit,
    processing,
}: PuzzleProps<MorsePayload>) {
    const [guess, setGuess] = useState('');
    const [showTable, setShowTable] = useState(false);

    const check = () => submit({ answer: guess });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 1.5 }}>
                    Mensagem Interceptada (Telégrafo · 14 Nov 1948):
                </Typography>
                <Box
                    sx={{
                        bgcolor: noir.inset,
                        border: 1,
                        borderColor: alpha(amber[900], 0.2),
                        p: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1.5,
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        {payload.message.split(' ').map((symbol, i) =>
                            symbol === '/' ? (
                                <Box
                                    key={i}
                                    sx={{
                                        width: '1px',
                                        height: 32,
                                        bgcolor: alpha(amber[900], 0.3),
                                        mx: 0.5,
                                        alignSelf: 'center',
                                    }}
                                />
                            ) : (
                                <Symbol key={i} code={symbol} />
                            ),
                        )}
                    </Box>
                    <Typography
                        sx={{
                            ...monoRaw(14, alpha(amber[600], 0.6), '0.3em'),
                            textAlign: 'center',
                        }}
                    >
                        {payload.message}
                    </Typography>
                </Box>
            </Box>

            <Box>
                <ButtonBase
                    onClick={() => setShowTable((visible) => !visible)}
                    sx={{
                        ...mono(9, alpha(amber[700], 0.6)),
                        gap: 1,
                        mb: 1.5,
                        transition: 'color 200ms',
                        '&:hover': { color: amber[500] },
                    }}
                >
                    <IconEye sx={{ fontSize: 13 }} />
                    {showTable ? 'Ocultar' : 'Mostrar'} tabela morse
                </ButtonBase>

                {showTable && (
                    <Box
                        sx={{
                            bgcolor: noir.inset,
                            border: 1,
                            borderColor: alpha(amber[900], 0.2),
                            p: 2,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 1,
                        }}
                    >
                        {Object.entries(payload.table).map(([letter, code]) => (
                            <Box
                                key={letter}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Typography sx={{ ...monoRaw(12, amber[400]), width: 16 }}>
                                    {letter}
                                </Typography>
                                <Typography sx={monoRaw(10, alpha(amber[700], 0.6))}>
                                    {code}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
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
                        placeholder="Ex: OLA MUNDO"
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
                                textTransform: 'uppercase',
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
                        ✗ Incorreto — tentativa #{wrongAttempts}. Use a tabela morse.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
