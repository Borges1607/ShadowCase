import { useId } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import type { InputBaseProps } from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { mono } from '@/theme/styles';
import { amber, fonts, noir } from '@/theme/tokens';

export interface NoirTextFieldProps extends Omit<InputBaseProps, 'error'> {
    label: string;
    /** Destaca a borda em vermelho quando a validação falha. */
    invalid?: boolean;
}

/**
 * Campo de texto no estilo formulário datilografado: rótulo em mono caixa-alta
 * sobre uma caixa recuada, sem cantos arredondados.
 */
export default function NoirTextField({
    label,
    invalid = false,
    sx,
    ...props
}: NoirTextFieldProps) {
    const id = useId();

    return (
        <Box>
            <Typography
                component="label"
                htmlFor={id}
                sx={{ ...mono(9, alpha(amber[700], 0.5)), display: 'block', mb: 1 }}
            >
                {label}
            </Typography>
            <InputBase
                {...props}
                id={id}
                fullWidth
                sx={[
                    {
                        bgcolor: noir.inset,
                        border: 1,
                        borderColor: invalid ? alpha('#ef4444', 0.5) : alpha(amber[900], 0.3),
                        transition: 'border-color 200ms',
                        '&:focus-within': {
                            borderColor: invalid ? alpha('#ef4444', 0.7) : alpha(amber[600], 0.5),
                        },
                        '& .MuiInputBase-input': {
                            fontFamily: fonts.mono,
                            fontSize: 14,
                            color: amber[100],
                            px: 2,
                            py: 1.5,
                            '&::placeholder': { color: alpha(amber[900], 0.5), opacity: 1 },
                        },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            />
        </Box>
    );
}
