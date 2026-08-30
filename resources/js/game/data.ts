import { IconBook, IconGrid, IconHash, IconKey, IconMic, IconRadio } from './icons';
import type { ChallengeInfo, DetectiveCase, Suspect } from './types';

/**
 * Conteúdo narrativo do jogo.
 *
 * Fase de frontend: mora aqui para iterar rápido. Quando o backend entrar, isto
 * migra para o banco e chega nas telas como props do Inertia — os tipos em
 * ./types.ts já descrevem o formato desse contrato.
 */

export const CHALLENGES: ChallengeInfo[] = [
    {
        id: 'cipher',
        title: 'Cifra de César',
        subtitle: 'Decodifique a mensagem criptografada',
        difficulty: 'FÁCIL',
        clue: 'A chave está escondida no Quarto 7 do Hotel Majestic, próximo ao porto.',
        Icon: IconKey,
    },
    {
        id: 'morse',
        title: 'Código Morse',
        subtitle: 'Interprete os sinais telegráficos interceptados',
        difficulty: 'FÁCIL',
        clue: 'O crime ocorreu à meia-noite — o relógio às 23h47 era uma isca.',
        Icon: IconRadio,
    },
    {
        id: 'safe',
        title: 'Cofre Numérico',
        subtitle: 'Descubra a combinação do cofre secreto',
        difficulty: 'MÉDIO',
        clue: 'O curador sabia a combinação e a revelou a um cúmplice.',
        Icon: IconHash,
    },
    {
        id: 'testimony',
        title: 'Depoimento Mentiroso',
        subtitle: 'Encontre a contradição nas declarações',
        difficulty: 'MÉDIO',
        clue: 'A Condessa esteve na Sala do Cofre — as pegadas de lama provam.',
        Icon: IconMic,
    },
    {
        id: 'anagram',
        title: 'Anagrama Cifrado',
        subtitle: 'Reorganize as letras secretas',
        difficulty: 'DIFÍCIL',
        clue: 'Três palavras-chave: CHAVE + QUARTO + PROVA.',
        Icon: IconBook,
    },
    {
        id: 'map',
        title: 'Mapa do Crime',
        subtitle: 'Identifique o local exato do roubo',
        difficulty: 'DIFÍCIL',
        clue: 'O diamante saiu pela janela leste da Sala do Cofre.',
        Icon: IconGrid,
    },
];

/** Mínimo de desafios concluídos para liberar a acusação. */
export const CHALLENGES_TO_ACCUSE = 4;

export const SUSPECTS: Suspect[] = [
    {
        id: 's1',
        name: "Condessa Vera D'Almeida",
        age: 42,
        occupation: 'Socialite',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&auto=format',
        guilty: true,
    },
    {
        id: 's2',
        name: 'Dr. Augusto Ferreira',
        age: 55,
        occupation: 'Curador',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&auto=format',
        guilty: false,
    },
    {
        id: 's3',
        name: 'Raimundo "Ricky" Sousa',
        age: 31,
        occupation: 'Segurança',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format',
        guilty: false,
    },
];

export const CASES: DetectiveCase[] = [
    {
        id: 'case-01',
        number: '001',
        title: 'O Diamante Desaparecido',
        tagline: 'Uma noite. Um crime. Três suspeitos. Zero certezas.',
        status: 'DISPONÍVEL',
        date: '14 Nov 1948',
        location: 'Museu Nacional, Rio de Janeiro',
        difficulty: 'Intermediário',
        duration: '45–90 min',
        description:
            "O diamante 'Olho da Serpente' desapareceu durante a exposição de gala do Museu Nacional. Você tem 72 horas para reconstituir o crime, conectar as evidências e identificar o culpado antes que ele fuja do país.",
        suspects: 3,
        challenges: 6,
        locked: false,
        image: 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&h=500&fit=crop&auto=format',
        cluePreview: [
            'Pegadas de lama vermelha no corredor leste',
            'Copo de champanhe com resíduos de sedativo',
            'Relógio parado às 23h47 — isca ou evidência?',
        ],
    },
    {
        id: 'case-02',
        number: '002',
        title: 'O Fantasma do Porto',
        tagline: 'Ninguém o viu. Ninguém o pegou. Ele existe?',
        status: 'EM BREVE',
        date: '03 Ago 1948',
        location: 'Porto de Santos',
        difficulty: 'Avançado',
        duration: '60–120 min',
        description:
            'Uma figura encoberta aterroriza os armazéns do porto. Sem câmeras, sem testemunhas confiáveis, sem rastros físicos. Apenas rumores — e um mapa rabiscado encontrado num bolso de casaco abandonado.',
        suspects: 4,
        challenges: 8,
        locked: true,
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=500&fit=crop&auto=format',
        cluePreview: [
            'Mapa rabiscado com coordenadas',
            'Casaco abandonado no cais 7',
            'Depoimentos contraditórios de estivadores',
        ],
    },
    {
        id: 'case-03',
        number: '003',
        title: 'A Morte do Milionário',
        tagline: 'A mansão guarda segredos que o dinheiro não pode comprar.',
        status: 'EM BREVE',
        date: '22 Jan 1948',
        location: 'Mansão Monteiro, São Paulo',
        difficulty: 'Expert',
        duration: '90–150 min',
        description:
            'Henrique Monteiro foi encontrado morto em sua biblioteca particular. A porta trancada por dentro. A janela lacrada. O mordomo alega não ter visto nada — mas seus sapatos dizem outra história.',
        suspects: 5,
        challenges: 10,
        locked: true,
        image: 'https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?w=800&h=500&fit=crop&auto=format',
        cluePreview: [
            'Biblioteca trancada por dentro',
            'Veneno identificado no brandy',
            'Carta anônima datada uma semana antes',
        ],
    },
];

/** Imagem noir usada como textura de fundo em várias telas. */
export const NOIR_BACKDROP =
    'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1800&h=1000&fit=crop&auto=format';
