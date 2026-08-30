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

/**
 * Ficha de um desafio, vinda de App\Game\Challenges.
 *
 * `clue` chega null enquanto o desafio não foi resolvido — a pista é o prêmio,
 * e o servidor não a entrega antes da hora.
 */
export interface ChallengeInfo {
    id: string;
    title: string;
    subtitle: string;
    difficulty: Difficulty;
    completed: boolean;
    clue: string | null;
}

/** Resultado de uma tentativa, devolvido por ChallengeController::check(). */
export interface PuzzleAttempt {
    correct: boolean;
    /** Verdadeiro só quando o desafio inteiro terminou (ver o anagrama). */
    solved: boolean;
    /** Texto de retorno, como a explicação de um depoimento. */
    detail: string | null;
    /** A que item da tela a resposta se refere, quando há vários. */
    target: string | null;
}

/**
 * Ficha de um suspeito, vinda de App\Game\Suspects.
 *
 * Não existe campo de culpa: quem roubou o diamante é decidido no servidor, e
 * só aparece na tela de desfecho — depois que a acusação já foi feita.
 */
export interface Suspect {
    id: string;
    name: string;
    age: number;
    occupation: string;
    photo: string;
}

export type CaseStatus = 'DISPONÍVEL' | 'EM BREVE' | 'ABERTO' | 'FRIO' | 'RESOLVIDO';

export interface DetectiveCase {
    id: string;
    /** Número do dossiê, com zeros à esquerda ("001"). */
    number: string;
    title: string;
    tagline: string;
    /** Status na vitrine pública — o que o visitante vê antes de entrar. */
    status: CaseStatus;
    /** Status no painel do detetive — a mesma investigação vista de dentro. */
    agentStatus: CaseStatus;
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

/** Ficha mínima usada na vitrine pública, sem nada que estrague o jogo. */
export interface ChallengeSummary {
    id: string;
    title: string;
}
