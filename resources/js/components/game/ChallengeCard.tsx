import { Link } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import DifficultyBadge from '@/components/ui/DifficultyBadge';
import { CHALLENGE_ICONS, IconCheck } from '@/game/icons';
import type { ChallengeInfo } from '@/game/types';
import { display, mono } from '@/theme/styles';
import { amber, emerald, noir } from '@/theme/tokens';

const CardLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'done',
})<{ done: boolean }>(({ done }) => ({
    position: 'relative',
    display: 'block',
    textAlign: 'left',
    textDecoration: 'none',
    padding: 20,
    border: '1px solid',
    transition: 'all 200ms',
    ...(done
        ? {
              borderColor: alpha(emerald[900], 0.4),
              backgroundColor: alpha(emerald[950], 0.5),
          }
        : {
              borderColor: alpha(amber[900], 0.25),
              backgroundColor: noir.card,
              '&:hover': { borderColor: alpha(amber[700], 0.4) },
              '&:hover .challenge-title': { color: amber[400] },
              '&:hover .challenge-icon': {
                  borderColor: alpha(amber[700], 0.5),
                  color: amber[500],
              },
          }),
    '&:focus-visible': { outline: `1px solid ${amber[600]}`, outlineOffset: 2 },
}));

export interface ChallengeCardProps {
    challenge: ChallengeInfo;
    done: boolean;
    href: string;
}

/** Um puzzle na grade do dossiê. Resolvido, troca o dourado pelo verde. */
export default function ChallengeCard({ challenge, done, href }: ChallengeCardProps) {
    const Icon = CHALLENGE_ICONS[challenge.id];

    return (
        <CardLink href={href} done={done}>
            {done && (
                <IconCheck
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontSize: 16,
                        color: emerald[500],
                    }}
                />
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box
                    className="challenge-icon"
                    sx={{
                        width: 28,
                        height: 28,
                        border: 1,
                        borderColor: done ? alpha(emerald[700], 0.5) : alpha(amber[900], 0.4),
                        color: done ? emerald[500] : alpha(amber[700], 0.6),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 200ms',
                    }}
                >
                    {Icon && <Icon sx={{ fontSize: 14 }} />}
                </Box>
                <DifficultyBadge difficulty={challenge.difficulty} />
            </Box>

            <Typography
                variant="h3"
                className="challenge-title"
                sx={{
                    ...display(16, done ? emerald[300] : amber[100]),
                    mb: 0.5,
                    transition: 'color 200ms',
                }}
            >
                {challenge.title}
            </Typography>

            <Typography sx={mono(9, alpha(amber[800], 0.5), '0.02em')}>
                {challenge.subtitle}
            </Typography>

            {done && (
                <Typography sx={{ ...mono(8, alpha(emerald[700], 0.8)), mt: 1 }}>
                    ✓ Pista revelada
                </Typography>
            )}
        </CardLink>
    );
}
