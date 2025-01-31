"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const TerminalButton = () => {
    const router = useRouter();

    return (
        <motion.div
            className="mt-14 mb-28 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                onClick={() => router.push("/terminal")}
                className="group relative inline-block cursor-pointer"
            >
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#00ff00] to-[#00cc00] opacity-40 blur transition duration-200 group-hover:opacity-75" />
                <button
                    className="relative rounded-lg bg-black px-8 py-4 font-mono text-lg text-[#00ff00] transition duration-200
                     hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-black"
                >
                    {'>'} DON'T CLICK ME {'<'}
                </button>
            </div>
        </motion.div>
    );
};