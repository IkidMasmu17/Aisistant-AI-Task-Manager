import { LandingNavbar } from "@/components/landing/landing-navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ContactSection } from "@/components/landing/contact-section";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    if (loading) return null;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <LandingNavbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <PricingSection />
            </main>
            <ContactSection />
        </div>
    );
}
