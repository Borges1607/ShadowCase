import type { SvgIconComponent } from '@mui/icons-material';

/**
 * Detetive logado, guardado na sessão pelo AgentSessionController.
 * O jogo não usa a tabela de usuários — não há cadastro, só nome + senha da agência.
 */
export interface Agent {
    name: string;
    /** Distintivo sorteado no login, ex.: "AG-4821". */
    badge: string;
}

export type Difficulty = 'FÁCIL' | 'MÉDIO' | 'DIFÍCIL';

/** Metadados de um desafio — o puzzle em si mora em components/challenges. */
export interface ChallengeInfo {
    id: string;
    title: string;
    subtitle: string;
    difficulty: Difficulty;
    /** Pista revelada ao concluir. */
    clue: string;
    Icon: SvgIconComponent;
}

export interface Suspect {
    id: string;
    name: string;
    age: number;
    occupation: string;
    photo: string;
    guilty: boolean;
}

export type CaseStatus = 'DISPONÍVEL' | 'EM BREVE' | 'ABERTO' | 'FRIO' | 'RESOLVIDO';

export interface DetectiveCase {
    id: string;
    /** Número do dossiê, com zeros à esquerda ("001"). */
    number: string;
    title: string;
    tagline: string;
    status: CaseStatus;
    date: string;
    location: string;
    difficulty: string;
    duration: string;
    description: string;
    suspects: number;
    challenges: number;
    locked: boolean;
    image: string;
    /** Evidências mostradas antes de aceitar o caso. */
    cluePreview: string[];
}
