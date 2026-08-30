import type { RequestPayload } from '@inertiajs/core';

import type { PuzzleAttempt } from '@/game/types';

/**
 * Contrato entre a tela de desafio e cada puzzle.
 *
 * O puzzle não sabe validar nada: ele desenha o `payload`, junta a tentativa e
 * chama `submit`. Quem decide é o servidor, e a resposta volta em `attempt`.
 */
export interface PuzzleProps<TPayload> {
    payload: TPayload;
    /** Progresso parcial guardado pelo servidor (usado pelo anagrama). */
    state: Record<string, unknown>;
    /** Resultado da última tentativa, ou null antes da primeira. */
    attempt: PuzzleAttempt | null;
    /** Quantas tentativas erradas nesta sessão de tela. */
    wrongAttempts: number;
    submit: (data: RequestPayload) => void;
    processing: boolean;
}

export interface CipherPayload {
    encrypted: string;
    shift: number;
}

export interface MorsePayload {
    message: string;
    table: Record<string, string>;
}

export interface SafePayload {
    riddles: string[];
    dials: number;
}

export interface TestimonyPayload {
    suspectId: string;
    intro: string;
    interrogatedAt: string;
    statements: { id: number; text: string }[];
}

export interface AnagramPayload {
    words: { scrambled: string[]; length: number }[];
}

export interface MapPayload {
    clues: string[];
    rooms: { id: string; label: string }[];
}
