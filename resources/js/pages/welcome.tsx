import { Head } from '@inertiajs/react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * Página placeholder — existe só para validar o pipeline
 * Laravel → Inertia → React → MUI. Substitua pelas telas reais.
 */
export default function Welcome() {
    return (
        <>
            <Head title="Início" />

            <Container maxWidth="sm">
                <Stack spacing={1} sx={{ minHeight: '100dvh', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h1">
                        ShadowCase
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Esqueleto ativo: Laravel · Inertia · React · Material UI.
                    </Typography>
                </Stack>
            </Container>
        </>
    );
}
