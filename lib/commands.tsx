"use client";

import React from 'react';
import Image from 'next/image';
import { experiencesData, projectsData, skillsData } from '@/lib/data';
import type { SectionName } from '@/lib/types';

const COMMANDS = {
    HELP: 'help',
    LS: 'ls',
    CAT: 'cat',
    CLEAR: 'clear',
    PWD: 'pwd',
    WHOAMI: 'whoami',
    CONTACT: 'contact',
    RESUME: 'resume',
    EXIT: 'exit',
} as const;

type RouterCallback = () => void;
type CommandResponse = React.ReactNode | null;

export const processCommand = async (
    command: string,
    onExit?: RouterCallback
): Promise<CommandResponse> => {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');

    switch (cmd) {
        case COMMANDS.HELP:
            return React.createElement('div', { className: 'space-y-1 text-green-500' }, [
                React.createElement('p', null, 'Available commands:'),
                React.createElement('p', null, '  ls               - List available sections'),
                React.createElement('p', null, '  cat [section]    - Display content of a section (e.g., cat about)'),
                React.createElement('p', null, '  whoami           - Display about me'),
                React.createElement('p', null, '  pwd              - Print current directory'),
                React.createElement('p', null, '  clear            - Clear terminal'),
                React.createElement('p', null, '  contact          - Display contact information'),
                React.createElement('p', null, '  resume           - Download resume'),
                React.createElement('p', null, '  exit             - Return to main website'),
                React.createElement('p', null, ''),
                React.createElement('p', null, 'Available sections for cat:'),
                React.createElement('p', null, '  about, projects, experience, skills'),
            ]);

        case COMMANDS.LS:
            return React.createElement('div', { className: 'grid grid-cols-4 gap-2' }, [
                React.createElement('span', { className: 'text-blue-400' }, 'about'),
                React.createElement('span', { className: 'text-blue-400' }, 'projects'),
                React.createElement('span', { className: 'text-blue-400' }, 'experience'),
                React.createElement('span', { className: 'text-blue-400' }, 'skills'),
            ]);

        case COMMANDS.CAT:
            const section = args[0];
            switch (section) {
                case 'about':
                    return React.createElement('div', { className: 'space-y-4' }, [
                        React.createElement('p', null, "Hi! I'm Malek, a Software Engineering student at Concordia University."),
                        React.createElement('p', null, "I'm passionate about building scalable systems and solving complex problems."),
                        React.createElement('p', null, "Currently, I'm working as an Embedded Software Developer Intern at Caterpillar."),
                    ]);

                case 'projects':
                    return React.createElement('div', { className: 'grid grid-cols-2 gap-6' },
                        projectsData.map((project, index) =>
                            React.createElement('div', { key: index, className: 'col-span-1 group' },
                                React.createElement('div', { className: 'border border-green-500/20 rounded-lg p-4 h-full hover:bg-green-500/5 transition-colors' }, [
                                    React.createElement('div', { className: 'relative aspect-video mb-4 overflow-hidden rounded-md bg-zinc-900' },
                                        React.createElement(Image, {
                                            src: project.imageUrl,
                                            alt: project.title,
                                            fill: true,
                                            style: { objectFit: 'cover' },
                                            className: 'transform group-hover:scale-105 transition-transform duration-200',
                                            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        })
                                    ),
                                    React.createElement('h3', { className: 'text-yellow-500 text-lg mb-2' }, project.title),
                                    React.createElement('p', { className: 'text-sm mb-4 text-green-300' }, project.description),
                                    React.createElement('div', { className: 'flex flex-wrap gap-2' },
                                        project.tags.map((tag, tagIndex) =>
                                            React.createElement('span', {
                                                key: tagIndex,
                                                className: 'px-2 py-1 bg-green-500/10 rounded-md text-xs border border-green-500/20'
                                            }, tag)
                                        )
                                    ),
                                    project.link && React.createElement('a', {
                                        href: project.link,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        className: 'mt-4 inline-block text-blue-400 hover:underline'
                                    }, 'View Project →')
                                ])
                            )
                        )
                    );

                case 'experience':
                    return React.createElement('div', { className: 'space-y-4' },
                        experiencesData.map((exp, index) =>
                            React.createElement('div', { key: index, className: 'border-b border-green-500/20 pb-4' }, [
                                React.createElement('h3', { className: 'text-yellow-500' }, exp.title),
                                React.createElement('p', { className: 'text-xs text-green-400' }, `${exp.location} | ${exp.date}`),
                                React.createElement('p', { className: 'text-sm mt-2' }, exp.description)
                            ])
                        )
                    );

                case 'skills':
                    return React.createElement('div', { className: 'flex flex-wrap gap-2' },
                        skillsData.map((skill, index) =>
                            React.createElement('span', {
                                key: index,
                                className: 'px-2 py-1 bg-green-500/10 rounded-md text-sm border border-green-500/20'
                            }, skill)
                        )
                    );

                default:
                    return `cat: ${section}: No such file or directory`;
            }

        case COMMANDS.PWD:
            return "/home/malek/portfolio";

        case COMMANDS.WHOAMI:
            return "malek";

        case COMMANDS.CONTACT:
            return React.createElement('div', { className: 'space-y-2' }, [
                React.createElement('p', null, [
                    '• GitHub: ',
                    React.createElement('a', {
                        href: 'https://github.com/NotMalek',
                        className: 'text-blue-400 hover:underline'
                    }, '@NotMalek')
                ]),
                React.createElement('p', null, [
                    '• LinkedIn: ',
                    React.createElement('a', {
                        href: 'YOUR_LINKEDIN_URL',
                        className: 'text-blue-400 hover:underline'
                    }, 'Malek')
                ]),
                React.createElement('p', null, '• Email: your.email@example.com')
            ]);

        case COMMANDS.EXIT:
            if (onExit) {
                onExit();
                return "Exiting terminal...";
            }
            return "Unable to exit terminal";

        case COMMANDS.CLEAR:
            return null;

        default:
            return `Command '${command}' not found. Type 'help' to see available commands.`;
    }
};