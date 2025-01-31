"use client";

import React from 'react';

interface CommandLineProps {
    command: string;
    showCursor?: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
                                                     command,
                                                     showCursor = false,
                                                 }) => {
    return (
        <div className="flex items-start">
            <span className="text-green-500 mr-2">malek@portfolio:~$</span>
            <span className="text-green-500">{command}</span>
            {showCursor && (
                <span className="w-2 h-5 ml-[1px] bg-green-500 animate-pulse-fast" />
            )}
        </div>
    );
};

export default CommandLine;