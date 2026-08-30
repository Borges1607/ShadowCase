import { Head, router, usePage } from '@inertiajs/react';

import VerdictLayout from '@/components/game/VerdictLayout';
import { IconAward } from '@/game/icons';
import type { Suspect } from '@/game/types';

export interface VerdictProps {
    caseId: string;
    caseNumber: string;
    accused: Suspect | null;
    culprit: Suspect;
    epilogue: { lead: string; note: string };
    completedCount: number;
    totalChallenges: number;
}

/** Desfecho da acusação certa: o caso fecha e o diamante volta. */
export default function Victory({
    caseId,
    caseNumber,
    epilogue,
    completedCount,
    totalChallenges,
}: VerdictProps) {
    const { agent } = usePage().props;

    return (
        <>
            <Head title="Caso Resolvido" />

            <VerdictLayout
                tone="success"
                Icon={IconAward}
                eyebrow="Caso Encerrado"
                title="Caso Resolvido,"
                subject={`Agente ${agent?.name}`}
                epilogue={epilogue}
                stats={[
                    { label: 'Desafios', value: `${completedCount}/${totalChallenges}` },
                    { label: 'Caso', value: `#${caseNumber}` },
                    { label: 'Veredicto', value: 'Correto' },
                ]}
                actionLabel="Jogar Novamente"
                onRestart={() => router.delete(`/caso/${caseId}/veredicto`)}
            />
        </>
    );
}
