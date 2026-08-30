import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';

import NoirButton from '@/components/ui/NoirButton';
import { NOIR_BACKDROP } from '@/game/data';
import { IconRestart } from '@/game/icons';
import { body, display, mono } from '@/theme/styles';
import { amber, emerald, noir, red } from '@/theme/tokens';

/** Verde para o caso encerrado, vermelho para o culpado que escapou. */
const TONES = {
    success: {
        frame: alpha(emerald[600], 0.6),
        icon: emerald[500],
        eyebrow: alpha(emerald[600], 0.6),
        subject: emerald[400],
        boxBorder: alpha(emerald[800], 0.4),
        boxBg: alpha(emerald[950], 0.5),
        lead: alpha(emerald[300], 0.8),
        note: alpha(emerald[300], 0.6),
        stat: emerald[400],
    },
    failure: {
        frame: alpha(red[800], 0.5),
        icon: red[500],
        eyebrow: alpha(red[600], 0.6),
        subject: red[400],
        boxBorder: alpha(red[900], 0.35),
        boxBg: alpha(red[950], 0.4),
        lead: alpha(red[300], 0.7),
        note: alpha(red[300], 0.5),
        stat: red[400],
    },
} as const;

export interface VerdictLayoutProps {
    tone: keyof typeof TONES;
    Icon: SvgIconComponent;
    eyebrow: string;
    /** Primeira linha do título, antes da quebra. */
    title: string;
    /** Segunda linha, colorida pelo tom — "Agente Fulano". */
    subject: string;
    epilogue: { lead: string; note: string };
    stats?: { label: string; value: string }[];
    actionLabel: string;
    onRestart: () => void;
    children?: ReactNode;
}

/**
 * Casca das telas de desfecho.
 *
 * Vitória e derrota são a mesma composição — moldura, veredicto, epílogo e a
 * saída — mudando só a cor e o que se lê.
 */
export default function VerdictLayout({
    tone,
    Icon,
    eyebrow,
    title,
    subject,
    epilogue,
    stats,
    actionLabel,
    onRestart,
}: VerdictLayoutProps) {
    const palette = TONES[tone];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                component="img"
                src={NOIR_BACKDROP}
                alt=""
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.07,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to bottom, ${noir.background}, ${alpha(noir.background, 0.9)} 50%, ${noir.background})`,
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 10, maxWidth: 512, textAlign: 'center' }}>
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        border: 2,
                        borderColor: palette.frame,
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                    }}
                >
                    <Icon sx={{ fontSize: 40, color: palette.icon }} />
                </Box>

                <Typography sx={{ ...mono(10, palette.eyebrow, '0.5em'), mb: 1.5 }}>
                    {eyebrow}
                </Typography>

                <Typography
                    variant="h1"
                    sx={{ ...display(48, amber[100]), mb: 2, lineHeight: 1.15 }}
                >
                    {title}
                    <br />
                    <Box component="span" sx={{ color: palette.subject }}>
                        {subject}
                    </Box>
                </Typography>

                <Box
                    sx={{
                        border: 1,
                        borderColor: palette.boxBorder,
                        bgcolor: palette.boxBg,
                        p: 3,
                        mb: 4,
                        textAlign: 'left',
                    }}
                >
                    <Typography sx={{ ...body(16, palette.lead), mb: 1.5 }}>
                        {epilogue.lead}
                    </Typography>
                    <Typography sx={body(14, palette.note)}>{epilogue.note}</Typography>
                </Box>

                {stats && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 2,
                            mb: 4,
                            border: 1,
                            borderColor: alpha(amber[900], 0.25),
                            bgcolor: 'background.paper',
                            p: 2.5,
                        }}
                    >
                        {stats.map((stat) => (
                            <Box key={stat.label}>
                                <Typography sx={display(24, palette.stat)}>{stat.value}</Typography>
                                <Typography sx={{ ...mono(8, alpha(amber[800], 0.5)), mt: 0.5 }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                <NoirButton
                    onClick={onRestart}
                    tone="outline"
                    startIcon={<IconRestart sx={{ fontSize: 14 }} />}
                    sx={{
                        mx: 'auto',
                        borderColor: alpha(amber[700], 0.5),
                        color: amber[500],
                        '&:hover': { bgcolor: alpha(amber[900], 0.2), color: amber[400] },
                    }}
                >
                    {actionLabel}
                </NoirButton>
            </Box>
        </Box>
    );
}
