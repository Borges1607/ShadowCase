import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';

import { IconBook, IconGrid, IconHash, IconKey, IconMic, IconRadio } from '@/game/icons';
import { mono, monoRaw, typewriter } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

interface PuzzlePreview {
    Icon: SvgIconComponent;
    label: string;
    /** Entrada crua do puzzle. */
    example: string;
    /** O que se obtém ao resolver. */
    result: string;
}

const PREVIEWS: PuzzlePreview[] = [
    { Icon: IconKey, label: 'Cifra de César', example: 'SURF → ?', result: 'PROC' },
    { Icon: IconRadio, label: 'Código Morse', example: '-- . ..', result: 'MEI' },
    { Icon: IconHash, label: 'Cofre Numérico', example: '[ 1 ][ ? ][ 4 ][ 8 ]', result: '1948' },
    { Icon: IconMic, label: 'Depoimento', example: '3 declarações', result: 'Encontre a mentira' },
    { Icon: IconBook, label: 'Anagrama', example: 'V H A C E →', result: 'CHAVE' },
    { Icon: IconGrid, label: 'Mapa do Crime', example: 'Planta baixa', result: 'Sala do Cofre' },
];

/**
 * Faixa que mostra, sem entregar a resposta, o formato de cada tipo de puzzle.
 * Serve de amostra para quem ainda não decidiu se entra no jogo.
 */
export default function LandingChallengePreview() {
    return (
        <Box
            component="section"
            sx={{
                py: 10,
                bgcolor: noir.backgroundAlt,
                borderTop: 1,
                borderBottom: 1,
                borderColor: alpha(amber[900], 0.2),
            }}
        >
            <Box sx={{ maxWidth: 1280, mx: 'auto', px: 3 }}>
                <Typography
                    sx={{ ...mono(9, alpha(amber[700], 0.5), '0.4em'), textAlign: 'center', mb: 5 }}
                >
                    Tipos de Desafio Disponíveis
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 1.5,
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(6, 1fr)',
                        },
                    }}
                >
                    {PREVIEWS.map((preview) => (
                        <Box
                            key={preview.label}
                            sx={{
                                border: 1,
                                borderColor: alpha(amber[900], 0.2),
                                bgcolor: noir.card,
                                p: 2,
                                textAlign: 'center',
                                transition: 'border-color 200ms',
                                '&:hover': { borderColor: alpha(amber[800], 0.4) },
                                '&:hover .preview-icon-frame': {
                                    borderColor: alpha(amber[700], 0.5),
                                },
                                '&:hover .preview-icon': { color: amber[500] },
                            }}
                        >
                            <Box
                                className="preview-icon-frame"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    border: 1,
                                    borderColor: alpha(amber[900], 0.3),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 1.5,
                                    transition: 'border-color 200ms',
                                }}
                            >
                                <preview.Icon
                                    className="preview-icon"
                                    sx={{
                                        fontSize: 14,
                                        color: alpha(amber[700], 0.6),
                                        transition: 'color 200ms',
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    ...typewriter(10, alpha(amber[200], 0.6)),
                                    mb: 1,
                                    lineHeight: 1.25,
                                }}
                            >
                                {preview.label}
                            </Typography>
                            <Typography sx={monoRaw(8, alpha(amber[800], 0.4))}>
                                {preview.example}
                            </Typography>
                            <Box
                                sx={{
                                    height: '1px',
                                    width: 32,
                                    bgcolor: alpha(amber[900], 0.3),
                                    mx: 'auto',
                                    my: 0.75,
                                }}
                            />
                            <Typography sx={monoRaw(8, alpha(amber[600], 0.6))}>
                                {preview.result}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
