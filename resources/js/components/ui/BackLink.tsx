import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { alpha, styled } from '@mui/material/styles';

import { IconChevronLeft } from '@/game/icons';
import { amber, fonts } from '@/theme/tokens';

/**
 * O `Link` do Inertia é envolvido por `styled()` em vez de ir num
 * `component={Link}`: a tipagem polimórfica do MUI 9 não casa com as props do
 * Inertia, e `styled` resolve mantendo a navegação SPA.
 */
const Anchor = styled(Link)({
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: alpha(amber[800], 0.5),
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'color 200ms',
    '&:hover': { color: amber[600] },
    '&:hover .back-arrow': { transform: 'translateX(-2px)' },
});

export interface BackLinkProps {
    href: string;
    children: ReactNode;
}

/** Link de retorno com seta que recua no hover. Presente no topo das telas internas. */
export default function BackLink({ href, children }: BackLinkProps) {
    return (
        <Anchor href={href}>
            <IconChevronLeft
                className="back-arrow"
                sx={{ fontSize: 13, transition: 'transform 200ms' }}
            />
            {children}
        </Anchor>
    );
}
