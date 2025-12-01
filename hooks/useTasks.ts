"use client";

import { useState, useEffect } from "react";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Task } from "@/types";

export function useTasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newTasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore Timestamp to Date
                dueDate: doc.data().dueDate?.toDate() || null,
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            })) as Task[];
            setTasks(newTasks);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (title: string, category: string = "General") => {
        if (!user) return;

        await addDoc(collection(db, "tasks"), {
            title,
            status: "pending",
            userId: user.uid,
            createdAt: serverTimestamp(),
            priority: "medium",
            category,
            dueDate: null
        });
    };

    const toggleTask = async (taskId: string, currentStatus: "pending" | "completed") => {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
            status: currentStatus === "pending" ? "completed" : "pending"
        });
    };

    const deleteTask = async (taskId: string) => {
        await deleteDoc(doc(db, "tasks", taskId));
    };

    return { tasks, loading, addTask, toggleTask, deleteTask };
}
