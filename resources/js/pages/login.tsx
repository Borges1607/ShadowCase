import type { FormEvent } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import BackLink from '@/components/ui/BackLink';
import NoirButton from '@/components/ui/NoirButton';
import NoirTextField from '@/components/ui/NoirTextField';
import { NOIR_BACKDROP } from '@/game/data';
import { IconClose, IconLogin, IconShield } from '@/game/icons';
import { mono, monoRaw } from '@/theme/styles';
import { amber, noir, red } from '@/theme/tokens';

export interface LoginProps {
    /** Senha revelada de propósito na demonstração; null quando escondida. */
    passwordHint: string | null;
}

/** Ponto pulsante vermelho — dá sinal de "sistema vivo" ao painel de acesso. */
const pulse = {
    animation: 'shadowcase-pulse 2s ease-in-out infinite',
    '@keyframes shadowcase-pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.3 },
    },
};

export default function Login({ passwordHint }: LoginProps) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({ name: '', password: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post('/entrar');
    };

    // A tela mostra um erro por vez, como no dossiê original.
    const message = errors.name ?? errors.password ?? flash.error;

    return (
        <>
            <Head title="Acesso Restrito" />

            <Box
                sx={{
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
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
                        background: `linear-gradient(to bottom, ${noir.background}, ${alpha(noir.background, 0.96)} 50%, ${noir.background})`,
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 384 }}>
                    <Box sx={{ mb: 5 }}>
                        <BackLink href="/">Voltar ao Início</BackLink>
                    </Box>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                border: 2,
                                borderColor: alpha(amber[700], 0.4),
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2.5,
                                position: 'relative',
                            }}
                        >
                            <IconShield sx={{ fontSize: 32, color: amber[600] }} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: red[500],
                                    ...pulse,
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: 24,
                                color: amber[400],
                                letterSpacing: '0.15em',
                                mb: 0.5,
                            }}
                        >
                            AGÊNCIA SOMBRA
                        </Typography>
                        <Typography sx={mono(9, alpha(amber[700], 0.4), '0.35em')}>
                            Acesso Restrito
                        </Typography>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={submit}
                        sx={{ border: 1, borderColor: alpha(amber[900], 0.3), bgcolor: noir.card }}
                    >
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: alpha(amber[900], 0.2),
                                px: 3,
                                py: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 1,
                            }}
                        >
                            <Typography sx={mono(9, alpha(amber[800], 0.5))}>
                                Identificação do Agente
                            </Typography>
                            <Box
                                sx={{
                                    ...mono(8, alpha(red[500], 0.6), '0.05em'),
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    border: 1,
                                    borderColor: alpha(red[900], 0.3),
                                    px: 1,
                                    py: 0.25,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        bgcolor: red[500],
                                        ...pulse,
                                    }}
                                />
                                Seguro
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                p: 3.5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2.5,
                            }}
                        >
                            <NoirTextField
                                label="Nome do Agente"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Maria Oliveira"
                                invalid={Boolean(errors.name)}
                                autoFocus
                                autoComplete="off"
                            />

                            <NoirTextField
                                label="Senha da Agência"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••••"
                                invalid={Boolean(errors.password)}
                                autoComplete="off"
                            />

                            {message && (
                                <Typography
                                    role="alert"
                                    sx={{
                                        ...monoRaw(10, alpha(red[500], 0.8)),
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.75,
                                    }}
                                >
                                    <IconClose sx={{ fontSize: 13 }} />
                                    {message}
                                </Typography>
                            )}

                            <NoirButton
                                type="submit"
                                tone="solid"
                                fullWidth
                                disabled={processing}
                                startIcon={<IconLogin sx={{ fontSize: 14 }} />}
                                sx={{ bgcolor: amber[700], '&:hover': { bgcolor: amber[600] } }}
                            >
                                {processing ? 'Verificando…' : 'Entrar no Sistema'}
                            </NoirButton>

                            {passwordHint && (
                                <Box
                                    sx={{
                                        borderTop: 1,
                                        borderColor: alpha(amber[900], 0.2),
                                        pt: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...mono(8, alpha(amber[900], 0.35)),
                                            textAlign: 'center',
                                        }}
                                    >
                                        Senha: nome da agência + ano de fundação
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...monoRaw(8, alpha(amber[800], 0.3)),
                                            textAlign: 'center',
                                            mt: 0.5,
                                        }}
                                    >
                                        {passwordHint}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
