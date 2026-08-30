import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BackLink from '@/components/ui/BackLink';
import { display } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Placeholder — os seis puzzles entram aqui na proxima etapa. */
export default function Challenge({
    caseId,
    challengeId,
}: {
    caseId: string;
    challengeId: string;
}) {
    return (
        <>
            <Head title="Desafio" />
            <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', gap: 2, p: 3 }}>
                <Typography sx={display(30, amber[100])}>Desafio {challengeId}</Typography>
                <BackLink href={`/caso/${caseId}`}>Voltar ao Caso</BackLink>
            </Box>
        </>
    );
}
