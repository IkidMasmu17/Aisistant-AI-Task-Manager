import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Head>
                    <title>Aisistant</title>
                    <meta name="description" content="Personal task manager with AI integration" />
                </Head>
                <Navbar />
                <main className="container py-6">
                    <Component {...pageProps} />
                </main>
            </AuthProvider>
        </ThemeProvider>
    );
}
