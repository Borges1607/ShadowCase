import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BackLink from '@/components/ui/BackLink';
import { display } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Placeholder — o dossiê do caso entra aqui na próxima etapa. */
export default function CaseHub({ caseId }: { caseId: string }) {
    return (
        <>
            <Head title="Dossiê do Caso" />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    p: 3,
                }}
            >
                <Typography sx={display(30, amber[100])}>Dossiê {caseId}</Typography>
                <BackLink href="/central">Voltar à Central</BackLink>
            </Box>
        </>
    );
}
