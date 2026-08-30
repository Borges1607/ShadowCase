import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { display, mono } from '@/theme/styles';
import { amber, emerald, red } from '@/theme/tokens';

import type { AnagramPayload, PuzzleProps } from './types';

/**
 * Anagrama cifrado — três palavras em sequência.
 *
 * O servidor guarda quais palavras já saíram, então avançar depende de acertar
 * de verdade: não adianta pular para a última.
 */
export default function AnagramPuzzle({
    payload,
    state,
    attempt,
    submit,
    processing,
}: PuzzleProps<AnagramPayload>) {
    const solved = (state.solved as number[] | undefined) ?? [];

    // Primeira palavra ainda não resolvida.
    const currentIndex = payload.words.findIndex((_, index) => !solved.includes(index));
    const wordIndex = currentIndex === -1 ? payload.words.length - 1 : currentIndex;
    const word = payload.words[wordIndex];

    const [placed, setPlaced] = useState<(string | null)[]>([]);
    const [available, setAvailable] = useState<boolean[]>([]);

    // Zera o tabuleiro sempre que a palavra da vez muda.
    useEffect(() => {
        setPlaced(new Array(word.length).fill(null));
        setAvailable(new Array(word.scrambled.length).fill(true));
    }, [wordIndex, word.length, word.scrambled.length]);

    const justFailed = attempt !== null && !attempt.correct && Number(attempt.target) === wordIndex;

    // Erro: deixa o jogador ver o que montou antes de devolver as letras à bandeja.
    useEffect(() => {
        if (!justFailed) return;

        const timer = setTimeout(() => {
            setPlaced(new Array(word.length).fill(null));
            setAvailable(new Array(word.scrambled.length).fill(true));
        }, 700);

        return () => clearTimeout(timer);
    }, [justFailed, word.length, word.scrambled.length]);

    const pick = (letterIndex: number) => {
        if (!available[letterIndex] || processing) return;

        const slot = placed.findIndex((entry) => entry === null);
        if (slot === -1) return;

        const nextPlaced = [...placed];
        nextPlaced[slot] = word.scrambled[letterIndex];
        const nextAvailable = [...available];
        nextAvailable[letterIndex] = false;

        setPlaced(nextPlaced);
        setAvailable(nextAvailable);

        if (nextPlaced.every((entry) => entry !== null)) {
            submit({ word: wordIndex, answer: nextPlaced.join('') });
        }
    };

    const slotColor = (letter: string | null) => {
        if (justFailed && letter) return red[400];

        return letter ? amber[300] : alpha(amber[900], 0.2);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
                {payload.words.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: 4,
                            flex: 1,
                            bgcolor: solved.includes(index)
                                ? emerald[600]
                                : index === wordIndex
                                  ? amber[600]
                                  : alpha(amber[900], 0.2),
                            transition: 'background-color 300ms',
                        }}
                    />
                ))}
            </Box>

            <Typography sx={mono(9, alpha(amber[700], 0.5))}>
                Palavra {wordIndex + 1} de {payload.words.length}
            </Typography>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Letras disponíveis — clique para posicionar:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {word.scrambled.map((letter, index) => (
                        <ButtonBase
                            key={index}
                            onClick={() => pick(index)}
                            disabled={!available[index] || processing}
                            sx={{
                                width: 40,
                                height: 40,
                                border: 1,
                                borderColor: available[index]
                                    ? alpha(amber[700], 0.5)
                                    : alpha(amber[900], 0.2),
                                color: available[index] ? amber[300] : alpha(amber[900], 0.3),
                                transition: 'all 200ms',
                                '&:hover': available[index]
                                    ? { borderColor: amber[500], bgcolor: alpha(amber[900], 0.2) }
                                    : undefined,
                            }}
                        >
                            <Typography sx={display(18, 'inherit')}>
                                {available[index] ? letter : ''}
                            </Typography>
                        </ButtonBase>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography sx={{ ...mono(8, alpha(amber[700], 0.4)), mb: 2 }}>
                    Sua resposta:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {placed.map((letter, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 40,
                                height: 40,
                                border: 1,
                                borderColor: justFailed
                                    ? alpha(red[700], 0.5)
                                    : letter
                                      ? alpha(amber[600], 0.5)
                                      : alpha(amber[900], 0.25),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 200ms',
                            }}
                        >
                            <Typography sx={display(18, slotColor(letter))}>
                                {letter ?? '_'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {justFailed && (
                <Typography sx={mono(9, alpha(red[500], 0.7), '0.02em')}>
                    ✗ Não é essa a palavra. As letras voltaram para a bandeja.
                </Typography>
            )}

            {/*
             * Palavra aceita e desafio ainda em curso. Não há botão "Próxima":
             * o servidor já registrou a palavra, então `wordIndex` avançou
             * sozinho e o tabuleiro acima já é o da palavra seguinte.
             */}
            {attempt?.correct && !attempt.solved && (
                <Box
                    sx={{
                        border: 1,
                        borderColor: alpha(emerald[800], 0.4),
                        bgcolor: alpha(emerald[950], 0.4),
                        p: 2,
                    }}
                >
                    <Typography sx={mono(9, alpha(emerald[500], 0.8))}>
                        ✓ Palavra correta — vamos à próxima.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
