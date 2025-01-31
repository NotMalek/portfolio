"use client";

import React from 'react';
import Image from 'next/image';
import { experiencesData, projectsData, skillsData } from '@/lib/data';
import resume from '@/public/Abdelmalek_Anes_Resume.pdf';

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
                React.createElement('p', { key: 'title' }, 'Available commands:'),
                React.createElement('p', { key: 'ls' }, '  ls               - List available sections'),
                React.createElement('p', { key: 'cat' }, '  cat [section]    - Display content of a section (e.g., cat about)'),
                React.createElement('p', { key: 'whoami' }, '  whoami           - Display about me'),
                React.createElement('p', { key: 'pwd' }, '  pwd              - Print current directory'),
                React.createElement('p', { key: 'clear' }, '  clear            - Clear terminal'),
                React.createElement('p', { key: 'contact' }, '  contact          - Display contact information'),
                React.createElement('p', { key: 'resume' }, '  resume           - Download resume'),
                React.createElement('p', { key: 'exit' }, '  exit             - Return to main website'),
                React.createElement('p', { key: 'spacer' }, ''),
                React.createElement('p', { key: 'sections-title' }, 'Available sections for cat:'),
                React.createElement('p', { key: 'sections' }, '  about, projects, experience, skills'),
            ]);

        case COMMANDS.LS:
            return React.createElement('div', { className: 'grid grid-cols-4 gap-2' }, [
                React.createElement('span', { key: 'about', className: 'text-blue-400' }, 'about '),
                React.createElement('span', { key: 'projects', className: 'text-blue-400' }, 'projects '),
                React.createElement('span', { key: 'experience', className: 'text-blue-400' }, 'experience '),
                React.createElement('span', { key: 'skills', className: 'text-blue-400' }, 'skills '),
            ]);

        case COMMANDS.CAT:
            const section = args[0];
            switch (section) {
                case 'about':
                    return React.createElement('div', { className: 'space-y-4' }, [
                        React.createElement('p', { key: 'intro' }, "Hi! I'm Malek, a Software Engineering student at Concordia University."),
                        React.createElement('p', { key: 'passion' }, "I'm passionate about building scalable systems and solving complex problems."),
                        React.createElement('p', { key: 'current' }, "Currently, I'm working as an Embedded Software Developer Intern at Caterpillar."),
                    ]);

                case 'projects':
                    return React.createElement('div', { className: 'grid grid-cols-2 gap-6' },
                        projectsData.map((project, index) =>
                            React.createElement('div', { key: `project-${index}`, className: 'col-span-1 group' },
                                React.createElement('div', { className: 'border border-green-500/20 rounded-lg p-4 h-full hover:bg-green-500/5 transition-colors' }, [
                                    React.createElement('div', { key: `img-container-${index}`, className: 'relative aspect-video mb-4 overflow-hidden rounded-md bg-zinc-900' },
                                        React.createElement(Image, {
                                            key: `img-${index}`,
                                            src: project.imageUrl,
                                            alt: project.title,
                                            fill: true,
                                            style: { objectFit: 'cover' },
                                            className: 'transform group-hover:scale-105 transition-transform duration-200',
                                            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        })
                                    ),
                                    React.createElement('h3', { key: `title-${index}`, className: 'text-yellow-500 text-lg mb-2' }, project.title),
                                    React.createElement('p', { key: `desc-${index}`, className: 'text-sm mb-4 text-green-300' }, project.description),
                                    React.createElement('div', { key: `tags-${index}`, className: 'flex flex-wrap gap-2' },
                                        project.tags.map((tag, tagIndex) =>
                                            React.createElement('span', {
                                                key: `tag-${index}-${tagIndex}`,
                                                className: 'px-2 py-1 bg-green-500/10 rounded-md text-xs border border-green-500/20'
                                            }, tag)
                                        )
                                    ),
                                    project.link && React.createElement('a', {
                                        key: `link-${index}`,
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
                            React.createElement('div', { key: `exp-${index}`, className: 'border-b border-green-500/20 pb-4' }, [
                                React.createElement('h3', { key: `title-${index}`, className: 'text-yellow-500' }, exp.title),
                                React.createElement('p', { key: `location-${index}`, className: 'text-xs text-green-400' }, `${exp.location} | ${exp.date}`),
                                React.createElement('p', { key: `desc-${index}`, className: 'text-sm mt-2' }, exp.description)
                            ])
                        )
                    );

                case 'skills':
                    return React.createElement('div', { className: 'flex flex-wrap gap-2' },
                        skillsData.map((skill, index) =>
                            React.createElement('span', {
                                key: `skill-${index}`,
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

        case COMMANDS.RESUME:
            return React.createElement('div', null, [
                React.createElement('p', { key: 'downloading' }, 'Downloading resume...'),
                React.createElement('a', {
                    key: 'download-link',
                    href: '/Abdelmalek_Anes_Resume.pdf',
                    download: true,
                    className: 'hidden',
                    ref: (element) => {
                        if (element) {
                            element.click();
                        }
                    }
                }, null)
            ]);

        case COMMANDS.CONTACT:
            return React.createElement('div', { className: 'space-y-2' }, [
                React.createElement('p', { key: 'github' }, [
                    '• GitHub: ',
                    React.createElement('a', {
                        key: 'github-link',
                        href: 'https://github.com/NotMalek',
                        className: 'text-blue-400 hover:underline'
                    }, '@NotMalek')
                ]),
                React.createElement('p', { key: 'linkedin' }, [
                    '• LinkedIn: ',
                    React.createElement('a', {
                        key: 'linkedin-link',
                        href: 'https://www.linkedin.com/in/abdelmalek-anes-687a16173/',
                        className: 'text-blue-400 hover:underline'
                    }, 'Malek')
                ]),
                React.createElement('p', { key: 'email' }, '• Email: abdelmalek.anes@outlook.com')
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