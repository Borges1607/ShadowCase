import { Head, Link, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import ChallengeCard from '@/components/game/ChallengeCard';
import CluesPanel from '@/components/game/CluesPanel';
import ProgressPanel from '@/components/game/ProgressPanel';
import SuspectsPanel from '@/components/game/SuspectsPanel';
import TopBar from '@/components/game/TopBar';
import BackLink from '@/components/ui/BackLink';
import NoirButton from '@/components/ui/NoirButton';
import { CASES, CHALLENGES, SUSPECTS } from '@/game/data';
import { IconAward, IconShield } from '@/game/icons';
import { body, display, mono, monoRaw } from '@/theme/styles';
import { amber } from '@/theme/tokens';

export interface CaseHubProps {
    caseId: string;
    completedChallenges: string[];
    /** Mínimo de desafios resolvidos para liberar a acusação. */
    challengesToAccuse: number;
}

/** Dossiê do caso: onde o detetive escolhe o próximo desafio e pesa o que já tem. */
export default function CaseHub({ caseId, completedChallenges, challengesToAccuse }: CaseHubProps) {
    const { agent } = usePage().props;
    const detectiveCase = CASES.find((item) => item.id === caseId);

    const done = new Set(completedChallenges);
    const clues = CHALLENGES.filter((challenge) => done.has(challenge.id)).map((c) => c.clue);
    const canAccuse = done.size >= challengesToAccuse;

    return (
        <>
            <Head title={detectiveCase?.title ?? 'Dossiê do Caso'} />

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <TopBar
                    left={<BackLink href="/central">Central</BackLink>}
                    center={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <IconShield sx={{ fontSize: 16, color: amber[600] }} />
                            <Typography
                                sx={{ ...display(14, amber[400]), letterSpacing: '0.15em' }}
                            >
                                CASO #{detectiveCase?.number}
                            </Typography>
                        </Box>
                    }
                    right={
                        <Typography sx={monoRaw(9, alpha(amber[700], 0.5))}>
                            {agent?.badge}
                        </Typography>
                    }
                />

                <Box sx={{ maxWidth: 1152, mx: 'auto', px: 3, py: 5 }}>
                    <Box sx={{ mb: 5 }}>
                        <Typography sx={{ ...mono(9, alpha(amber[700], 0.5)), mb: 1 }}>
                            Caso Ativo · Nov 1948
                        </Typography>
                        <Typography variant="h1" sx={{ ...display(36, amber[100]), mb: 1 }}>
                            {detectiveCase?.title}
                        </Typography>
                        <Typography sx={body(16, alpha(amber[200], 0.5))}>
                            Complete os desafios para coletar pistas e identificar o culpado.{' '}
                            <Box component="span" sx={monoRaw(12, alpha(amber[700], 0.6))}>
                                {done.size}/{CHALLENGES.length} concluídos
                            </Box>
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 5 }}>
                        <ProgressPanel
                            done={done.size}
                            total={CHALLENGES.length}
                            requiredToAccuse={canAccuse ? null : challengesToAccuse}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 3,
                            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                            alignItems: 'start',
                        }}
                    >
                        <Box>
                            <Typography variant="h2" sx={{ ...display(20, amber[200]), mb: 2.5 }}>
                                Desafios de Investigação
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 2,
                                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                {CHALLENGES.map((challenge) => (
                                    <ChallengeCard
                                        key={challenge.id}
                                        challenge={challenge}
                                        done={done.has(challenge.id)}
                                        href={`/caso/${caseId}/desafio/${challenge.id}`}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <CluesPanel clues={clues} />
                            <SuspectsPanel suspects={SUSPECTS} />

                            {canAccuse ? (
                                <NoirButton
                                    component={Link}
                                    href={`/caso/${caseId}/acusacao`}
                                    tone="ghost"
                                    fullWidth
                                    startIcon={<IconAward sx={{ fontSize: 14 }} />}
                                    sx={{
                                        py: 2,
                                        borderColor: alpha(amber[600], 0.6),
                                        bgcolor: alpha(amber[950], 0.3),
                                        color: amber[400],
                                    }}
                                >
                                    Fazer Acusação →
                                </NoirButton>
                            ) : (
                                <NoirButton
                                    tone="ghost"
                                    fullWidth
                                    disabled
                                    startIcon={<IconAward sx={{ fontSize: 14 }} />}
                                    sx={{ py: 2 }}
                                >
                                    Bloqueado ({done.size}/{challengesToAccuse})
                                </NoirButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
