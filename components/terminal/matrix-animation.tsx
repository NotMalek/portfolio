"use client";

import React, { useEffect, useRef, useState } from 'react';

interface MatrixAnimationProps {
    onComplete: () => void;
    duration?: number;
}

const MatrixAnimation: React.FC<MatrixAnimationProps> = ({
                                                             onComplete,
                                                             duration = 800
                                                         }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fontSize] = useState(14);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix character set
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()";

        // Calculate columns based on font size
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(0);

        // Start time for duration tracking
        const startTime = Date.now();

        // Animation frames counter for speed control
        let frameCount = 0;

        const draw = () => {
            // Semi-transparent black background for trailing effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text properties
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];

                // Draw the character
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Vary the green intensity
                const intensity = Math.random() * 255;
                ctx.fillStyle = `rgba(0, ${intensity}, 0, 0.8)`;

                ctx.fillText(char, x, y);

                // Reset position or move drop
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // Check if animation duration is complete
            if (Date.now() - startTime < duration) {
                frameCount++;
                requestAnimationFrame(draw);
            } else {
                onComplete();
            }
        };

        const animation = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animation);
        };
    }, [duration, fontSize, onComplete]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50"
            style={{ background: 'black' }}
        />
    );
};

export default MatrixAnimation;