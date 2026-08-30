import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';

import LandingAbout from '@/components/landing/LandingAbout';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingCases from '@/components/landing/LandingCases';
import LandingChallengePreview from '@/components/landing/LandingChallengePreview';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingHero from '@/components/landing/LandingHero';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingNav from '@/components/landing/LandingNav';
import type { ChallengeSummary } from '@/game/types';

export interface LandingProps {
    /** Rota de acesso do agente — o único caminho para dentro do jogo. */
    loginUrl: string;
    /** Títulos dos desafios, vindos de AppGameChallenges. */
    challenges: ChallengeSummary[];
}

/**
 * Vitrine pública da Agência Sombra: apresenta o jogo, os tipos de desafio e os
 * casos, e conduz até a tela de acesso.
 */
export default function Landing({ loginUrl, challenges }: LandingProps) {
    const scrollToCases = () => {
        document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Resolva o Crime" />

            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
                <LandingNav loginHref={loginUrl} />
                <LandingHero onExplore={scrollToCases} />
                <LandingAbout />
                <LandingChallengePreview />
                <LandingHowItWorks />
                <LandingCases startHref={loginUrl} challenges={challenges} />
                <LandingCTA startHref={loginUrl} />
                <LandingFooter />
            </Box>
        </>
    );
}
