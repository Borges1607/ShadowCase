import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import AnagramPuzzle from '@/components/challenges/AnagramPuzzle';
import CipherPuzzle from '@/components/challenges/CipherPuzzle';
import MapPuzzle from '@/components/challenges/MapPuzzle';
import MorsePuzzle from '@/components/challenges/MorsePuzzle';
import SafePuzzle from '@/components/challenges/SafePuzzle';
import SuccessBox from '@/components/challenges/SuccessBox';
import TestimonyPuzzle from '@/components/challenges/TestimonyPuzzle';
import type { RequestPayload } from '@inertiajs/core';

import type { PuzzleProps } from '@/components/challenges/types';
import TopBar from '@/components/game/TopBar';
import BackLink from '@/components/ui/BackLink';
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import { CHALLENGE_ICONS, IconCheck } from '@/game/icons';
import type { ChallengeInfo } from '@/game/types';
import { body, display, mono } from '@/theme/styles';
import { amber, emerald } from '@/theme/tokens';

/* eslint-disable @typescript-eslint/no-explicit-any */
const PUZZLES: Record<string, (props: PuzzleProps<any>) => React.ReactElement> = {
    cipher: CipherPuzzle,
    morse: MorsePuzzle,
    safe: SafePuzzle,
    testimony: TestimonyPuzzle,
    anagram: AnagramPuzzle,
    map: MapPuzzle,
};

export interface ChallengeProps {
    caseId: string;
    challenge: ChallengeInfo;
    /** Dados públicos do puzzle — nunca a resposta. */
    puzzle: Record<string, unknown>;
    /** Progresso parcial guardado pelo servidor. */
    state: Record<string, unknown>;
}

/**
 * Tela de um desafio.
 *
 * Toda tentativa é um POST: o navegador não sabe a resposta e não tem como
 * saber. O retorno vem em `flash.attempt` e a conclusão, na prop `challenge`.
 */
export default function Challenge({ caseId, challenge, puzzle, state }: ChallengeProps) {
    const { flash } = usePage().props;
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [processing, setProcessing] = useState(false);

    const caseHref = `/caso/${caseId}`;
    const Icon = CHALLENGE_ICONS[challenge.id];
    const Puzzle = PUZZLES[challenge.id];

    const submit = (data: RequestPayload) => {
        setProcessing(true);
        router.post(`${caseHref}/desafio/${challenge.id}`, data, {
            // O estado local do puzzle (discos, letras) sobrevive à ida ao servidor.
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash.attempt?.correct === false) {
                    setWrongAttempts((count) => count + 1);
                }
            },
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title={challenge.title} />

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <TopBar
                    maxWidth={768}
                    left={<BackLink href={caseHref}>Voltar</BackLink>}
                    center={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {Icon && <Icon sx={{ fontSize: 14, color: amber[600] }} />}
                            <Typography sx={mono(10, alpha(amber[700], 0.5))}>
                                {challenge.title}
                            </Typography>
                        </Box>
                    }
                    right={<DifficultyBadge difficulty={challenge.difficulty} />}
                />

                <Box sx={{ maxWidth: 768, mx: 'auto', px: 3, py: 5 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h1" sx={{ ...display(30, amber[100]), mb: 1 }}>
                            {challenge.title}
                        </Typography>
                        <Typography sx={body(16, alpha(amber[200], 0.5))}>
                            {challenge.subtitle}
                        </Typography>
                    </Box>

                    {/*
                     * Ordem importa: ao resolver, o desafio já consta como
                     * concluído E vem `solved` no flash. O acerto recém-feito
                     * merece a caixa de comemoração, não o aviso de revisita.
                     */}
                    {flash.attempt?.solved ? (
                        <SuccessBox clue={challenge.clue ?? ''} caseHref={caseHref} />
                    ) : challenge.completed ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Revisitar um desafio resolvido mostra a pista, não o puzzle. */}
                            <Box
                                sx={{
                                    border: 1,
                                    borderColor: alpha(emerald[800], 0.4),
                                    bgcolor: alpha(emerald[950], 0.5),
                                    p: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                <IconCheck
                                    sx={{ fontSize: 20, color: emerald[400], flexShrink: 0 }}
                                />
                                <Box>
                                    <Typography
                                        sx={{ ...mono(9, alpha(emerald[500], 0.8)), mb: 0.5 }}
                                    >
                                        Já concluído
                                    </Typography>
                                    <Typography sx={body(14, alpha(emerald[300], 0.7))}>
                                        {challenge.clue}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <BackLink href={caseHref}>Voltar ao Caso</BackLink>
                            </Box>
                        </Box>
                    ) : Puzzle ? (
                        <Puzzle
                            payload={puzzle}
                            state={state}
                            attempt={flash.attempt ?? null}
                            wrongAttempts={wrongAttempts}
                            submit={submit}
                            processing={processing}
                        />
                    ) : null}
                </Box>
            </Box>
        </>
    );
}
