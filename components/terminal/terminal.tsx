"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandLine from './command-line';
import CommandOutput from './command-output';
import { processCommand } from '@/lib/commands';
import { useRouter } from 'next/navigation';
import BootAnimation from './boot-animation';

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
    const [userScrolled, setUserScrolled] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const isAutoScrollingRef = useRef(false);

    // Handle user scroll events
    const handleScroll = useCallback(() => {
        if (!terminalRef.current || isAutoScrollingRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;

        setUserScrolled(!isAtBottom);
    }, []);

    // Setup mutation observer for content changes
    useEffect(() => {
        const terminal = terminalRef.current;
        if (!terminal) return;

        const scrollToBottom = () => {
            if (terminal && !userScrolled) {
                isAutoScrollingRef.current = true;
                const scrollHeight = terminal.scrollHeight;
                terminal.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth'
                });
                // Reset auto-scrolling flag after animation
                setTimeout(() => {
                    isAutoScrollingRef.current = false;
                }, 100);
            }
        };

        // Create mutation observer
        observerRef.current = new MutationObserver((mutations) => {
            scrollToBottom();
        });

        // Start observing
        observerRef.current.observe(terminal, {
            childList: true,
            subtree: true,
            characterData: true
        });

        // Add scroll event listener
        terminal.addEventListener('scroll', handleScroll);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (terminal) {
                terminal.removeEventListener('scroll', handleScroll);
            }
        };
    }, [userScrolled, handleScroll]);

    // Force scroll on initial mount and lines change
    useEffect(() => {
        if (!userScrolled && terminalRef.current) {
            isAutoScrollingRef.current = true;
            const scrollHeight = terminalRef.current.scrollHeight;
            terminalRef.current.scrollTo({
                top: scrollHeight,
                behavior: 'instant'
            });
            // Reset auto-scrolling flag after scroll
            setTimeout(() => {
                isAutoScrollingRef.current = false;
            }, 100);
        }
    }, [lines, userScrolled]);

    const startBootSequence = useCallback(async () => {
        if (bootStarted) return;
        setBootStarted(true);

        setLines([]);

        for (const line of BOOT_SEQUENCE) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setLines(prev => [...prev, {
                id: Date.now() + Math.random(),
                type: 'output',
                content: line,
            }]);
        }
        setBootComplete(true);
    }, [bootStarted]);

    const handleMatrixComplete = useCallback(() => {
        setShowMatrix(false);
        startBootSequence();
    }, [startBootSequence]);

    const addLine = useCallback((type: 'command' | 'output', content: string | React.ReactNode) => {
        setLines(prev => [...prev, {
            id: Date.now() + Math.random(),
            type,
            content
        }]);
    }, []);

    const handleCommand = useCallback(async (command: string) => {
        if (!command.trim()) return;

        addLine('command', command);
        setCurrentCommand('');
        setUserScrolled(false); // Reset user scroll when new command is entered

        const exitCallback = () => {
            router.push('/');
        };

        const output = await processCommand(command, exitCallback);
        if (command.toLowerCase() === 'clear') {
            setLines([]);
            setUserScrolled(false);
        } else if (output) {
            addLine('output', output);
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
                <BootAnimation
                    onComplete={handleMatrixComplete}
                    duration={1200}
                />
            )}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showMatrix ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-black text-green-500 font-mono overflow-hidden flex flex-col"
            >
                <div
                    ref={terminalRef}
                    className="flex-1 p-4 overflow-y-auto overflow-x-hidden scroll-smooth"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#22c55e transparent',
                        WebkitOverflowScrolling: 'touch'
                    }}
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