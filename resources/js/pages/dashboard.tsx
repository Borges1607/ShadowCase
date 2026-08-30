import { Head, router, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import { display, mono } from '@/theme/styles';
import { amber } from '@/theme/tokens';

/** Placeholder — a central de operações entra aqui na próxima etapa. */
export default function Dashboard() {
    const { agent } = usePage().props;

    return (
        <>
            <Head title="Central de Operações" />
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
                <Typography sx={mono(10, alpha(amber[700], 0.5))}>Central de Operações</Typography>
                <Typography sx={display(36, amber[100])}>Agente {agent?.name}</Typography>
                <Typography sx={mono(10, alpha(amber[800], 0.6))}>{agent?.badge}</Typography>
                <NoirButton
                    tone="outline"
                    scale="sm"
                    onClick={() => router.post('/sair')}
                    sx={{ mt: 2 }}
                >
                    Encerrar Sessão
                </NoirButton>
            </Box>
        </>
    );
}
