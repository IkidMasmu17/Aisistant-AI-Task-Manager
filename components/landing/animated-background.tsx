import { motion } from "framer-motion";

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Animated gradient blobs */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                animate={{
                    x: [-100, 100, -100],
                    y: [-100, 150, -100],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ x: -100, y: -100 }}
            />

            <motion.div
                className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)",
                    filter: "blur(90px)",
                }}
                animate={{
                    x: [100, -50, 100],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ x: 100, y: 0 }}
            />

            <motion.div
                className="absolute bottom-0 left-1/2 w-[550px] h-[550px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
                animate={{
                    x: [-50, 50, -50],
                    y: [50, -50, 50],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                initial={{ x: -50, y: 50 }}
            />

            {/* Static gradient overlay for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)",
                }}
            />
        </div>
    );
}
