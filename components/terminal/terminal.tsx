"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandLine from './command-line';
import CommandOutput from './command-output';
import { processCommand } from '@/lib/commands';
import { useRouter } from 'next/navigation';

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
    const [isBooting, setIsBooting] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Boot sequence effect
    useEffect(() => {
        if (!mounted || !isBooting) return;

        let currentIndex = 0;
        let currentCharIndex = 0;
        let currentLine = '';
        let lineInterval: NodeJS.Timeout;

        const typeCharacter = async (line: string) => {
            const chars = line.split('');
            let result = '';

            setLines(prev => [...prev, {
                id: Date.now(),
                type: 'output',
                content: '',
                isTyping: true
            }]);

            for (const char of chars) {
                result += char;
                setLines(prev => [
                    ...prev.slice(0, -1),
                    {
                        id: Date.now(),
                        type: 'output',
                        content: result,
                        isTyping: true
                    }
                ]);
                // Extremely short delay between characters
                await new Promise(resolve => setTimeout(resolve, 2));
            }

            setLines(prev => [
                ...prev.slice(0, -1),
                {
                    id: Date.now(),
                    type: 'output',
                    content: result,
                    isTyping: false
                }
            ]);
        };

        const showNextLine = async () => {
            if (currentIndex >= BOOT_SEQUENCE.length) {
                setIsBooting(false);
                setBootComplete(true);
                return;
            }

            const line = BOOT_SEQUENCE[currentIndex];
            await typeCharacter(line);
            currentIndex++;

            // Minimal delays between lines
            const delay = line.startsWith('[    ') ? 10
                : line.startsWith('[OK]') ? 20
                    : line === '' ? 10
                        : 15;

            setTimeout(showNextLine, delay);
        };

        showNextLine();

        return () => {
            clearInterval(lineInterval);
        };
    }, [mounted, isBooting]);



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

    // Keyboard handler effect
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                            transition={{ duration: 0.2 }}
                            className="mb-2"
                        >
                            {line.type === 'command' ? (
                                <CommandLine command={line.content as string} />
                            ) : (
                                <CommandOutput content={line.content} />
                            )}
                            {line.isTyping && (
                                <span className="animate-pulse">▋</span>
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
    );
};

export default Terminal;