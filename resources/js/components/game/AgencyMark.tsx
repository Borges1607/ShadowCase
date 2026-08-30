import { Link } from '@inertiajs/react';
import { styled } from '@mui/material/styles';

import { IconShield } from '@/game/icons';
import { amber, fonts } from '@/theme/tokens';

/** Como no BackLink, `styled()` contorna a tipagem polimórfica do MUI 9. */
const Anchor = styled(Link)({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
    color: amber[400],
    transition: 'color 200ms',
    '&:hover': { color: amber[300] },
});

const Wordmark = styled('span')({
    fontFamily: fonts.display,
    fontSize: 14,
    letterSpacing: '0.15em',
    color: 'inherit',
});

/** Escudo + nome da agência, levando de volta à vitrine pública. */
export default function AgencyMark({ href = '/' }: { href?: string }) {
    return (
        <Anchor href={href}>
            <IconShield sx={{ fontSize: 16, color: amber[600] }} />
            <Wordmark>AGÊNCIA SOMBRA</Wordmark>
        </Anchor>
    );
}
