import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import NoirButton from '@/components/ui/NoirButton';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import StatusBadge from '@/components/ui/StatusBadge';
import { CASES, CHALLENGES } from '@/game/data';
import {
    IconChevronRight,
    IconClock,
    IconLock,
    IconMapPin,
    IconUsers,
    IconZap,
} from '@/game/icons';
import { body, display, mono, monoRaw, typewriter } from '@/theme/styles';
import { amber, noir } from '@/theme/tokens';

export default function LandingCases({ startHref }: { startHref: string }) {
    const [active, setActive] = useState(0);
    const detectiveCase = CASES[active];

    const meta = [
        { Icon: IconMapPin, value: detectiveCase.location },
        { Icon: IconClock, value: detectiveCase.date },
        { Icon: IconUsers, value: `${detectiveCase.suspects} suspeitos` },
        { Icon: IconZap, value: `${detectiveCase.challenges} desafios` },
    ];

    return (
        <Box component="section" id="casos" sx={{ py: 14, maxWidth: 1280, mx: 'auto', px: 3 }}>
            <Box sx={{ mb: 6 }}>
                <SectionEyebrow>Casos de Investigação</SectionEyebrow>
                <Typography variant="h2" sx={display(36, amber[100])}>
                    Escolha seu Caso
                </Typography>
            </Box>

            <Tabs
                value={active}
                onChange={(_, next: number) => setActive(next)}
                slotProps={{ indicator: { sx: { display: 'none' } } }}
                sx={{
                    minHeight: 0,
                    borderBottom: 1,
                    borderColor: alpha(amber[900], 0.25),
                    '& .MuiTabs-flexContainer': { gap: 0 },
                }}
            >
                {CASES.map((item) => (
                    <Tab
                        key={item.id}
                        disableRipple
                        iconPosition="end"
                        icon={item.locked ? <IconLock sx={{ fontSize: 11 }} /> : undefined}
                        label={
                            <>
                                <Box
                                    component="span"
                                    sx={{ display: { xs: 'none', sm: 'inline' } }}
                                >
                                    Caso #{item.number}
                                </Box>
                                <Box
                                    component="span"
                                    sx={{ display: { xs: 'inline', sm: 'none' } }}
                                >
                                    #{item.number}
                                </Box>
                            </>
                        }
                        sx={{
                            ...mono(10, alpha(amber[800], 0.5)),
                            minHeight: 0,
                            gap: 1.5,
                            px: 3,
                            py: 2,
                            borderBottom: 2,
                            borderColor: 'transparent',
                            transition: 'all 200ms',
                            '&:hover': {
                                color: alpha(amber[700], 0.7),
                                bgcolor: alpha(amber[950], 0.1),
                            },
                            '&.Mui-selected': {
                                color: amber[400],
                                borderColor: amber[600],
                                bgcolor: alpha(amber[950], 0.2),
                            },
                        }}
                    />
                ))}
            </Tabs>

            <Box
                sx={{
                    border: 1,
                    borderTop: 0,
                    borderColor: alpha(amber[900], 0.25),
                    bgcolor: noir.card,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                }}
            >
                {/* Foto da cena, dessaturada — sugere o clima sem revelar nada. */}
                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 256, lg: 'auto' },
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        key={detectiveCase.id}
                        src={detectiveCase.image}
                        alt={detectiveCase.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(1)',
                            opacity: 0.4,
                            transition: 'all 500ms',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(to right, transparent, ${alpha(noir.card, 0.8)})`,
                        }}
                    />
                    <Box
                        sx={{
                            display: { xs: 'block', lg: 'none' },
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(to top, ${noir.card}, transparent 50%)`,
                        }}
                    />

                    <Typography
                        sx={{
                            ...display(60, alpha(amber[500], 0.2)),
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            lineHeight: 1,
                        }}
                    >
                        #{detectiveCase.number}
                    </Typography>

                    {detectiveCase.locked && (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: alpha(noir.background, 0.7),
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <IconLock
                                    sx={{ fontSize: 32, color: alpha(amber[800], 0.5), mb: 1 }}
                                />
                                <Typography sx={mono(10, alpha(amber[800], 0.5))}>
                                    Em Desenvolvimento
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <StatusBadge status={detectiveCase.status} />
                        <Box
                            component="span"
                            sx={{
                                ...monoRaw(8, alpha(amber[800], 0.4)),
                                border: 1,
                                borderColor: alpha(amber[900], 0.2),
                                px: 1,
                                py: 0.25,
                            }}
                        >
                            {detectiveCase.difficulty}
                        </Box>
                    </Box>

                    <Typography variant="h3" sx={{ ...display(24, amber[100]), lineHeight: 1.3 }}>
                        {detectiveCase.title}
                    </Typography>
                    <Typography sx={{ ...typewriter(12, alpha(amber[600], 0.6)), mt: 0.5, mb: 3 }}>
                        {detectiveCase.tagline}
                    </Typography>

                    <Typography sx={{ ...body(14, alpha(amber[200], 0.55)), mb: 3 }}>
                        {detectiveCase.description}
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1.5,
                            mb: 3,
                        }}
                    >
                        {meta.map((item) => (
                            <Box
                                key={item.value}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <item.Icon
                                    sx={{
                                        fontSize: 13,
                                        color: alpha(amber[800], 0.4),
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography sx={monoRaw(9, alpha(amber[700], 0.6))}>
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {!detectiveCase.locked && (
                        <>
                            <Box sx={{ mb: 3 }}>
                                <Typography sx={{ ...mono(8, alpha(amber[800], 0.4)), mb: 1 }}>
                                    Evidências Iniciais:
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                                    {detectiveCase.cluePreview.map((clue) => (
                                        <Box
                                            key={clue}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    bgcolor: alpha(amber[700], 0.4),
                                                    mt: '6px',
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Typography sx={body(12, alpha(amber[200], 0.45))}>
                                                {clue}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography sx={{ ...mono(8, alpha(amber[800], 0.4)), mb: 1 }}>
                                    Desafios Incluídos:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                    {CHALLENGES.map((challenge) => (
                                        <Box
                                            key={challenge.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                border: 1,
                                                borderColor: alpha(amber[900], 0.25),
                                                px: 1,
                                                py: 0.5,
                                            }}
                                        >
                                            <challenge.Icon
                                                sx={{ fontSize: 11, color: alpha(amber[700], 0.5) }}
                                            />
                                            <Typography sx={monoRaw(8, alpha(amber[700], 0.5))}>
                                                {challenge.title}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}

                    <Box sx={{ mt: 'auto' }}>
                        {detectiveCase.locked ? (
                            <Box
                                sx={{
                                    border: 1,
                                    borderColor: alpha(amber[900], 0.2),
                                    p: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography sx={mono(9, alpha(amber[900], 0.4))}>
                                    Este caso ainda está em desenvolvimento
                                </Typography>
                            </Box>
                        ) : (
                            <NoirButton
                                component={Link}
                                href={startHref}
                                tone="solid"
                                fullWidth
                                startIcon={<IconChevronRight sx={{ fontSize: 14 }} />}
                                sx={{ bgcolor: amber[700], '&:hover': { bgcolor: amber[600] } }}
                            >
                                Aceitar o Caso
                            </NoirButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
