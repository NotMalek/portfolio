"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandLine from './command-line';
import CommandOutput from './command-output';
import { processCommand } from '@/lib/commands';
import { useRouter } from 'next/navigation';
import MatrixAnimation from './matrix-animation';

interface TerminalLine {
    id: number;
    type: 'command' | 'output';
    content: string | React.ReactNode;
    isTyping?: boolean;
}

const BOOT_SEQUENCE = [
    "BIOS Version 2.0.24",
    "Performing system checks...",
    "CPU: AMD Ryzen 9 5950X @ 4.9GHz",
    "Memory: 32GB DDR4-3600",
    "Storage: 2TB NVMe SSD",
    "Loading kernel...",
    "Mounting file systems...",
    "[    0.000000] Portfolio kernel loading...",
    "[    0.134522] Initializing modules...",
    "[    0.223411] Loading projects database...",
    "[    0.312331] Mapping skill tree...",
    "[    0.412331] Loading experience timeline...",
    "[OK] System check complete",
    "[OK] Network interfaces up",
    "[OK] Security protocols active",
    "[OK] Portfolio ready",
    "",
    `Welcome to Portfolio Terminal v2.0.24
© 2024 Malek. All rights reserved.

Type 'help' to see available commands.
Last login: ${new Date().toLocaleString()}`
];

const Terminal: React.FC = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [bootComplete, setBootComplete] = useState(false);
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [showMatrix, setShowMatrix] = useState(true);
    const [bootStarted, setBootStarted] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    const startBootSequence = async () => {
        if (bootStarted) return;
        setBootStarted(true);

        // Clear any existing lines
        setLines([]);

        for (const line of BOOT_SEQUENCE) {
            setLines(prev => [...prev, {
                id: Date.now(),
                type: 'output',
                content: line,
            }]);
            // Very short delay between boot sequence lines
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        setBootComplete(true);
    };

    const handleMatrixComplete = useCallback(() => {
        setShowMatrix(false);
        startBootSequence();
    }, []);

    const addLine = useCallback((type: 'command' | 'output', content: string | React.ReactNode) => {
        setLines(prev => [...prev, { id: Date.now(), type, content }]);
    }, []);

    const handleCommand = useCallback(async (command: string) => {
        if (!command.trim()) return;

        addLine('command', command);
        setCurrentCommand('');

        const exitCallback = () => {
            router.push('/');
        };

        const output = await processCommand(command, exitCallback);
        if (command.toLowerCase() === 'clear') {
            setLines([]);
        } else if (output) {
            addLine('output', output);
        }

        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [router, addLine]);

    useEffect(() => {
        setMounted(true);

        const handleKeyPress = (e: KeyboardEvent) => {
            if (!bootComplete) return;

            if (e.key === 'Enter') {
                handleCommand(currentCommand);
            } else if (e.key === 'Backspace') {
                setCurrentCommand(prev => prev.slice(0, -1));
            } else if (e.key.length === 1) {
                setCurrentCommand(prev => prev + e.key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [bootComplete, currentCommand, handleCommand]);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {showMatrix && (
                <MatrixAnimation
                    onComplete={handleMatrixComplete}
                    duration={800} // Adjust this value to control how long the matrix effect lasts
                />
            )}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showMatrix ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-black text-green-500 font-mono overflow-hidden"
            >
                <div
                    ref={terminalRef}
                    className="h-full p-4 overflow-y-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {lines.map((line) => (
                            <motion.div
                                key={line.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                                className="mb-2"
                            >
                                {line.type === 'command' ? (
                                    <CommandLine command={line.content as string} />
                                ) : (
                                    <CommandOutput content={line.content} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {bootComplete && (
                        <div className="flex items-start">
                            <CommandLine
                                command={currentCommand}
                                showCursor
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default Terminal;