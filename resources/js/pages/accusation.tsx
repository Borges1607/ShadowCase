import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BackLink from '@/components/ui/BackLink';
import { display } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Placeholder — a acusacao final entra aqui mais adiante. */
export default function Accusation({ caseId }: { caseId: string }) {
    return (
        <>
            <Head title="Acusação Final" />
            <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', gap: 2, p: 3 }}>
                <Typography sx={display(30, amber[100])}>Acusação Final</Typography>
                <BackLink href={`/caso/${caseId}`}>Voltar ao Caso</BackLink>
            </Box>
        </>
    );
}
