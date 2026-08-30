import Box from '@mui/material/Box';

import { filmGrainUrl } from '@/theme/tokens';

/**
 * Ruído de película sobre o conteúdo. Sutil de propósito — a ideia é sujar a
 * imagem o suficiente para lembrar filme dos anos 40, sem atrapalhar a leitura.
 */
export default function FilmGrain({ opacity = 0.035 }: { opacity?: number }) {
    return (
        <Box
            aria-hidden
            sx={{
                position: 'absolute',
                inset: 0,
                opacity,
                pointerEvents: 'none',
                backgroundImage: filmGrainUrl,
                backgroundSize: '150px',
            }}
        />
    );
}
