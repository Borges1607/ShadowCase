import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { body, display, mono, typewriter } from '@/theme/styles';
import { amber, emerald, noir, red } from '@/theme/tokens';

import type { PuzzleProps, TestimonyPayload } from './types';

/**
 * Depoimento mentiroso.
 *
 * Qual declaração é falsa só se sabe depois de apontar: o servidor devolve a
 * explicação da escolhida, seja ela mentira ou verdade.
 */
export default function TestimonyPuzzle({
    payload,
    attempt,
    submit,
    processing,
}: PuzzleProps<TestimonyPayload>) {
    const suspect = payload.suspect;
    const answered =
        attempt?.target !== null && attempt?.target !== undefined ? Number(attempt.target) : null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box
                sx={{
                    bgcolor: noir.inset,
                    border: 1,
                    borderColor: alpha(amber[900], 0.2),
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                {suspect && (
                    <Box
                        component="img"
                        src={suspect.photo}
                        alt={suspect.name}
                        sx={{
                            width: 64,
                            height: 64,
                            objectFit: 'cover',
                            filter: 'grayscale(1)',
                            opacity: 0.5,
                            flexShrink: 0,
                        }}
                    />
                )}
                <Box>
                    <Typography sx={{ ...display(16, amber[200]), mb: 0.25 }}>
                        {suspect?.name}
                    </Typography>
                    <Typography sx={{ ...mono(9, alpha(amber[800], 0.5), '0.02em'), mb: 1 }}>
                        {payload.interrogatedAt}
                    </Typography>
                    <Typography sx={{ ...body(14, alpha(amber[200], 0.5)), fontStyle: 'italic' }}>
                        &ldquo;{payload.intro}&rdquo;
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Clique na declaração FALSA ou CONTRADITÓRIA:
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {payload.statements.map((statement) => {
                        const isAnswered = answered === statement.id;
                        const isRight = isAnswered && attempt?.correct === true;
                        const isWrong = isAnswered && attempt?.correct === false;

                        return (
                            <Box key={statement.id}>
                                <ButtonBase
                                    onClick={() => submit({ statement: statement.id })}
                                    disabled={processing}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        border: 1,
                                        borderColor: isRight
                                            ? alpha(emerald[700], 0.5)
                                            : isWrong
                                              ? alpha(red[900], 0.5)
                                              : alpha(amber[900], 0.25),
                                        bgcolor: isRight
                                            ? alpha(emerald[950], 0.6)
                                            : isWrong
                                              ? alpha(red[950], 0.5)
                                              : noir.card,
                                        p: 2.5,
                                        transition: 'all 200ms',
                                        '&:hover': {
                                            borderColor: isAnswered
                                                ? undefined
                                                : alpha(amber[700], 0.4),
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                                    >
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                border: 1,
                                                borderColor: isRight
                                                    ? emerald[600]
                                                    : isWrong
                                                      ? red[700]
                                                      : alpha(amber[900], 0.4),
                                                color: isRight
                                                    ? emerald[400]
                                                    : isWrong
                                                      ? red[400]
                                                      : alpha(amber[700], 0.5),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                mt: '2px',
                                                fontSize: 10,
                                            }}
                                        >
                                            {isRight ? '✓' : isWrong ? '✗' : statement.id + 1}
                                        </Box>
                                        <Typography
                                            sx={typewriter(
                                                14,
                                                isRight
                                                    ? emerald[300]
                                                    : isWrong
                                                      ? alpha(red[300], 0.7)
                                                      : alpha(amber[200], 0.7),
                                            )}
                                        >
                                            &ldquo;{statement.text}&rdquo;
                                        </Typography>
                                    </Box>
                                </ButtonBase>

                                {isAnswered && attempt?.detail && (
                                    <Box
                                        sx={{
                                            borderLeft: 1,
                                            borderRight: 1,
                                            borderBottom: 1,
                                            borderColor: isRight
                                                ? alpha(emerald[900], 0.4)
                                                : alpha(red[900], 0.3),
                                            bgcolor: isRight
                                                ? alpha(emerald[950], 0.4)
                                                : alpha(red[950], 0.3),
                                            px: 2.5,
                                            py: 1.5,
                                        }}
                                    >
                                        <Typography
                                            sx={body(
                                                14,
                                                isRight
                                                    ? alpha(emerald[300], 0.8)
                                                    : alpha(red[300], 0.6),
                                            )}
                                        >
                                            <strong>
                                                {isRight
                                                    ? 'Contradição encontrada:'
                                                    : 'Isso é verdade.'}
                                            </strong>{' '}
                                            {attempt.detail}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}
