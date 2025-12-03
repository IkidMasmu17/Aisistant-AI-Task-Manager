import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/router";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for individuals starting out",
        features: [
            "Up to 3 projects",
            "Basic task management",
            "Google Calendar sync",
            "Community support"
        ],
        cta: "Start for free",
        popular: false
    },
    {
        name: "Pro",
        price: "$12",
        description: "For power users and small teams",
        features: [
            "Unlimited projects",
            "AI Task Suggestions",
            "Advanced Analytics",
            "Priority support",
            "Team collaboration"
        ],
        cta: "Upgrade to Pro",
        popular: true
    }
];

export function PricingSection() {
    const { user, isPro, upgradeToPro, signInWithGoogle } = useAuth();

    const router = useRouter();

    const handleAction = (planName: string) => {
        if (planName === "Pro") {
            if (!user) {
                router.push("/login");
            } else {
                upgradeToPro();
                alert("Successfully upgraded to Pro! (Mock)");
            }
        } else {
            if (!user) router.push("/login");
        }
    };

    return (
        <section id="pricing" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative bg-card/50 border-gray-800 ${plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                                    MOST POPULAR
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}`}
                                    variant={plan.popular ? 'default' : 'outline'}
                                    onClick={() => handleAction(plan.name)}
                                    disabled={plan.name === "Pro" && isPro}
                                >
                                    {plan.name === "Pro" && isPro ? "Current Plan" : plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
