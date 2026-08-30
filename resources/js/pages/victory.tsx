import { Head, router } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NoirButton from '@/components/ui/NoirButton';
import type { Suspect } from '@/game/types';
import { display } from '@/theme/styles';
import { amber } from '@/theme/tokens';

export interface VerdictProps {
    caseId: string;
    accused: Suspect | null;
    culprit: Suspect;
    completedCount: number;
}

/** Placeholder — a tela de desfecho entra aqui na proxima etapa. */
export default function Verdict({ caseId, accused, culprit }: VerdictProps) {
    return (
        <>
            <Head title="Desfecho" />
            <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', gap: 2, p: 3 }}>
                <Typography sx={display(30, amber[100])}>Acusado: {accused?.name}</Typography>
                <Typography sx={display(20, amber[400])}>Culpado: {culprit.name}</Typography>
                <NoirButton
                    tone="outline"
                    scale="sm"
                    onClick={() => router.delete(`/caso/${caseId}/veredicto`)}
                >
                    Recomecar
                </NoirButton>
            </Box>
        </>
    );
}
