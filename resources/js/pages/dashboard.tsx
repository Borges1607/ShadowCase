import { Head, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import AgencyMark from '@/components/game/AgencyMark';
import AgentIdentity from '@/components/game/AgentIdentity';
import CaseCard from '@/components/game/CaseCard';
import TopBar from '@/components/game/TopBar';
import { CASES, CHALLENGES } from '@/game/data';
import { body, display, mono } from '@/theme/styles';
import { amber } from '@/theme/tokens';

export interface DashboardProps {
    /** Único caso jogável — os demais aparecem bloqueados. */
    activeCaseId: string;
    /** IDs dos desafios já resolvidos no caso ativo. */
    completedChallenges: string[];
}

/** Central de operações: quem é o agente, como vai o caso e o que há na mesa. */
export default function Dashboard({ activeCaseId, completedChallenges }: DashboardProps) {
    const { agent } = usePage().props;

    const done = completedChallenges.length;
    const total = CHALLENGES.length;

    const stats = [
        { label: 'Desafios Concluídos', value: `${done}/${total}` },
        { label: 'Casos Ativos', value: '1' },
        { label: 'Status', value: 'Operacional' },
    ];

    return (
        <>
            <Head title="Central de Operações" />

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                <TopBar
                    left={<AgencyMark />}
                    right={agent ? <AgentIdentity agent={agent} /> : null}
                />

                <Box sx={{ maxWidth: 1152, mx: 'auto', px: 3, py: 6 }}>
                    <Box sx={{ mb: 6 }}>
                        <Typography sx={{ ...mono(10, alpha(amber[700], 0.5)), mb: 1 }}>
                            Central de Operações
                        </Typography>
                        <Typography variant="h1" sx={{ ...display(36, amber[100]), mb: 0.5 }}>
                            Agente {agent?.name}
                        </Typography>
                        <Typography sx={body(16, alpha(amber[200], 0.5))}>
                            {done} de {total} desafios concluídos no caso ativo.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 2,
                            mb: 6,
                            border: 1,
                            borderColor: alpha(amber[900], 0.25),
                            bgcolor: 'background.paper',
                            p: 3,
                        }}
                    >
                        {stats.map((stat) => (
                            <Box key={stat.label} sx={{ textAlign: 'center' }}>
                                <Typography sx={{ ...display(30, amber[400]), mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={mono(9, alpha(amber[800], 0.5))}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Typography variant="h2" sx={{ ...display(24, amber[200]), mb: 3 }}>
                        Casos Atribuídos
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 2.5,
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        }}
                    >
                        {CASES.map((detectiveCase) => (
                            <CaseCard
                                key={detectiveCase.id}
                                detectiveCase={{
                                    ...detectiveCase,
                                    // O caso ativo é jogável mesmo que o dossiê o marque de outra forma.
                                    locked: detectiveCase.id !== activeCaseId,
                                }}
                                href={`/caso/${detectiveCase.id}`}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
