import { Head, router, usePage } from '@inertiajs/react';

import VerdictLayout from '@/components/game/VerdictLayout';
import { IconClose } from '@/game/icons';
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

/** Desfecho da acusação errada: o culpado embarca e a licença vai junto. */
export default function Defeat({ caseId, epilogue }: VerdictProps) {
    const { agent } = usePage().props;

    return (
        <>
            <Head title="Acusação Incorreta" />

            <VerdictLayout
                tone="failure"
                Icon={IconClose}
                eyebrow="Acusação Incorreta"
                title="Engano Fatal,"
                subject={`Agente ${agent?.name}`}
                epilogue={epilogue}
                actionLabel="Tentar Novamente"
                onRestart={() => router.delete(`/caso/${caseId}/veredicto`)}
            />
        </>
    );
}
