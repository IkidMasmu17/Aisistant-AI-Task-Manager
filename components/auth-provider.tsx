"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    googleAccessToken: string | null;
    isPro: boolean;
    upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInWithEmail: async () => { },
    signUpWithEmail: async () => { },
    resetPassword: async () => { },
    logout: async () => { },
    googleAccessToken: null,
    isPro: false,
    upgradeToPro: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        console.log("🔧 AuthProvider mounted");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("🔐 Auth state changed:", user?.email || "null");
            setUser(user);
            setLoading(false);
            if (!user) setIsPro(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        console.log("🚀 Initiating Google Sign In with POPUP...");
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');

        try {
            console.log("🔄 Calling signInWithPopup...");
            const result = await signInWithPopup(auth, provider);
            console.log("✅ Sign in successful!", result.user.email);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            if (token) {
                setGoogleAccessToken(token);
                console.log("🔑 Access token saved");
            }
        } catch (error) {
            console.error("❌ Error signing in with Google", error);
            alert("Google Login Error: " + (error as Error).message);
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in with email", error);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing up with email", error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Error sending password reset email", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setGoogleAccessToken(null);
            setIsPro(false);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    const upgradeToPro = () => {
        setIsPro(true);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signInWithGoogle,
            signInWithEmail,
            signUpWithEmail,
            resetPassword,
            logout,
            googleAccessToken,
            isPro,
            upgradeToPro
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
