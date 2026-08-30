import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import StatusBadge from '@/components/ui/StatusBadge';
import { IconChevronRight, IconClock, IconLock, IconMapPin } from '@/game/icons';
import type { DetectiveCase } from '@/game/types';
import { display, mono, monoRaw } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

/** Cartão clicável: o caso inteiro é o alvo, não só o botão do rodapé. */
const CardLink = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    border: `1px solid ${alpha(amber[900], 0.3)}`,
    backgroundColor: noir.card,
    transition: 'border-color 300ms',
    '&:hover': { borderColor: alpha(amber[700], 0.4) },
    '&:hover .case-title': { color: amber[400] },
    '&:hover .case-cta': { color: amber[400], borderColor: alpha(amber[700], 0.5) },
    '&:focus-visible': { outline: `1px solid ${amber[600]}`, outlineOffset: 2 },
});

function CaseBody({ detectiveCase }: { detectiveCase: DetectiveCase }) {
    return (
        <Box sx={{ p: 3, flex: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <Typography sx={monoRaw(9, alpha(amber[800], 0.5))}>
                    #{detectiveCase.number}
                </Typography>
                <StatusBadge status={detectiveCase.agentStatus} />
            </Box>

            <Typography
                variant="h3"
                className="case-title"
                sx={{ ...display(18, amber[100]), mb: 1.5, transition: 'color 200ms' }}
            >
                {detectiveCase.title}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {[
                    { Icon: IconMapPin, value: detectiveCase.location },
                    { Icon: IconClock, value: detectiveCase.date },
                ].map((item) => (
                    <Box key={item.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <item.Icon
                            sx={{ fontSize: 11, color: alpha(amber[800], 0.4), flexShrink: 0 }}
                        />
                        <Typography sx={monoRaw(9, alpha(amber[800], 0.4))}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export interface CaseCardProps {
    detectiveCase: DetectiveCase;
    /** Rota do dossiê; ignorada quando o caso está bloqueado. */
    href: string;
}

export default function CaseCard({ detectiveCase, href }: CaseCardProps) {
    if (detectiveCase.locked) {
        return (
            <Box
                aria-disabled
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: 1,
                    borderColor: alpha(amber[900], 0.15),
                    bgcolor: noir.backgroundAlt,
                    opacity: 0.5,
                    cursor: 'not-allowed',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        borderBottom: 1,
                        borderColor: alpha(amber[900], 0.15),
                        px: 2.5,
                        py: 1,
                    }}
                >
                    <IconLock sx={{ fontSize: 12, color: alpha(amber[900], 0.4) }} />
                    <Typography sx={mono(8, alpha(amber[900], 0.4))}>Bloqueado</Typography>
                </Box>
                <CaseBody detectiveCase={detectiveCase} />
            </Box>
        );
    }

    return (
        <CardLink href={href}>
            <CaseBody detectiveCase={detectiveCase} />
            <Box sx={{ px: 3, pb: 3 }}>
                <Box
                    className="case-cta"
                    sx={{
                        ...mono(9, amber[700]),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        border: 1,
                        borderColor: alpha(amber[900], 0.3),
                        py: 1.25,
                        transition: 'all 200ms',
                    }}
                >
                    Investigar
                    <IconChevronRight sx={{ fontSize: 12 }} />
                </Box>
            </Box>
        </CardLink>
    );
}
