"use client";

import React from 'react';

interface CommandOutputProps {
    content: React.ReactNode;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ content }) => {
    return (
        <div className="text-green-500 pl-2 command-output w-full max-w-full overflow-x-auto">
            {content}
        </div>
    );
};

export default CommandOutput;