"use client";

import React from 'react';
import Image from 'next/image';
import { experiencesData, projectsData, skillsData } from '@/lib/data';
type RouterCallback = () => void;
type CommandResponse = React.ReactNode | null;
import { TrainAnimation, RocketAnimation, MatrixRain } from '@/components/terminal/animations';

const COMMANDS = {
    HELP: 'help',
    LS: 'ls',
    CAT: 'cat',
    CLEAR: 'clear',
    PWD: 'pwd',
    WHOAMI: 'whoami',
    CONTACT: 'contact',
    RESUME: 'resume',
    TRAIN: 'train',
    ROCKET: 'rocket',
    MATRIX: 'matrix',
    EXIT: 'exit',
} as const;

export const processCommand = async (
    command: string,
    onExit?: RouterCallback
): Promise<CommandResponse> => {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');

    switch (cmd) {
        case COMMANDS.HELP:
            if (args.length > 0) {
                return `help: too many arguments`;
            }
            return React.createElement('div', { className: 'space-y-1 text-green-500 animate-fadeIn' }, [
                React.createElement('p', { key: 'title', className: 'font-bold' }, 'Available commands:'),
                React.createElement('p', { key: 'ls' }, '  ls               - List available sections'),
                React.createElement('p', { key: 'cat' }, '  cat [section]    - Display content of a section (e.g., cat about)'),
                React.createElement('p', { key: 'whoami' }, '  whoami           - Display about me'),
                React.createElement('p', { key: 'pwd' }, '  pwd              - Print current directory'),
                React.createElement('p', { key: 'clear' }, '  clear            - Clear terminal'),
                React.createElement('p', { key: 'contact' }, '  contact          - Display contact information'),
                React.createElement('p', { key: 'resume' }, '  resume           - Download resume'),
                React.createElement('p', { key: 'train' }, '  train            - Show a moving train animation'),
                React.createElement('p', { key: 'rocket' }, '  rocket           - Show a rocket launch animation'),
                React.createElement('p', { key: 'matrix' }, '  matrix           - Show the Matrix rain effect'),
                React.createElement('p', { key: 'exit' }, '  exit             - Return to main website'),
                React.createElement('p', { key: 'spacer' }, ''),
                React.createElement('p', { key: 'sections-title', className: 'font-bold' }, 'Available sections for cat:'),
                React.createElement('p', { key: 'sections' }, '  about, skills, projects, experience'),
            ]);

        case COMMANDS.LS:
            if (args.length > 0) {
                return `ls: too many arguments`;
            }
            return React.createElement('div', { className: 'grid grid-cols-4 gap-2 animate-fadeIn' }, [
                React.createElement('span', { key: 'about', className: 'text-blue-400 hover:text-blue-300 transition-colors' }, 'about '),
                React.createElement('span', { key: 'skills', className: 'text-blue-400 hover:text-blue-300 transition-colors' }, 'skills '),
                React.createElement('span', { key: 'projects', className: 'text-blue-400 hover:text-blue-300 transition-colors' }, 'projects '),
                React.createElement('span', { key: 'experience', className: 'text-blue-400 hover:text-blue-300 transition-colors' }, 'experience'),
            ]);

        case COMMANDS.CAT:
            if (args.length === 0) {
                return 'cat: missing operand';
            }
            if (args.length > 1) {
                return 'cat: too many arguments';
            }
            const section = args[0];
            switch (section) {
                case 'about':
                    return React.createElement('div', { className: 'space-y-4 animate-fadeIn' }, [
                        React.createElement('p', { key: 'intro' }, "Hi! I'm Malek, a Software Engineering student at Concordia University."),
                        React.createElement('p', { key: 'passion' }, "I'm passionate about building scalable systems and solving complex problems."),
                        React.createElement('p', { key: 'current' }, "Currently, I'm working as an Embedded Software Developer Intern at Caterpillar."),
                    ]);

                case 'projects':
                    return React.createElement('div', { className: 'grid grid-cols-2 gap-6 animate-fadeIn' },
                        projectsData.map((project, index) =>
                            React.createElement('div', { key: `project-${index}`, className: 'col-span-1 group' },
                                React.createElement('div', { className: 'border border-green-500/20 rounded-lg p-4 h-full hover:bg-green-500/5 transition-all duration-300' }, [
                                    React.createElement('div', { key: `img-container-${index}`, className: 'relative aspect-video mb-4 overflow-hidden rounded-md bg-zinc-900' },
                                        React.createElement(Image, {
                                            key: `img-${index}`,
                                            src: project.imageUrl,
                                            alt: project.title,
                                            fill: true,
                                            style: { objectFit: 'cover' },
                                            className: 'transform group-hover:scale-105 transition-transform duration-300',
                                            sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        })
                                    ),
                                    React.createElement('h3', { key: `title-${index}`, className: 'text-yellow-500 text-lg mb-2' }, project.title),
                                    React.createElement('p', { key: `desc-${index}`, className: 'text-sm mb-4 text-green-300' }, project.description),
                                    React.createElement('div', { key: `tags-${index}`, className: 'flex flex-wrap gap-2' },
                                        project.tags.map((tag, tagIndex) =>
                                            React.createElement('span', {
                                                key: `tag-${index}-${tagIndex}`,
                                                className: 'px-2 py-1 bg-green-500/10 rounded-md text-xs border border-green-500/20 hover:bg-green-500/20 transition-colors'
                                            }, tag)
                                        )
                                    ),
                                    project.link && React.createElement('a', {
                                        key: `link-${index}`,
                                        href: project.link,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        className: 'mt-4 inline-block text-blue-400 hover:text-blue-300 hover:underline transition-colors'
                                    }, 'View Project →')
                                ])
                            )
                        )
                    );

                case 'experience':
                    return React.createElement('div', { className: 'space-y-4 animate-fadeIn' },
                        experiencesData.map((exp, index) =>
                            React.createElement('div', { key: `exp-${index}`, className: 'border-b border-green-500/20 pb-4 hover:bg-green-500/5 transition-colors p-2 rounded-md' }, [
                                React.createElement('h3', { key: `title-${index}`, className: 'text-yellow-500' }, exp.title),
                                React.createElement('p', { key: `location-${index}`, className: 'text-xs text-green-400' }, `${exp.location} | ${exp.date}`),
                                React.createElement('p', { key: `desc-${index}`, className: 'text-sm mt-2' }, exp.description)
                            ])
                        )
                    );

                case 'skills':
                    return React.createElement('div', { className: 'flex flex-wrap gap-2 animate-fadeIn' },
                        skillsData.map((skill, index) =>
                            React.createElement('span', {
                                key: `skill-${index}`,
                                className: 'px-2 py-1 bg-green-500/10 rounded-md text-sm border border-green-500/20 hover:bg-green-500/20 transition-colors'
                            }, skill)
                        )
                    );

                default:
                    return `cat: ${section}: No such file or directory`;
            }

        case COMMANDS.PWD:
            if (args.length > 0) {
                return `pwd: too many arguments`;
            }
            return "/home/malek/portfolio";

        case COMMANDS.WHOAMI:
            if (args.length > 0) {
                return `whoami: too many arguments`;
            }
            return "malek";

        case COMMANDS.CONTACT:
            if (args.length > 0) {
                return `contact: too many arguments`;
            }
            return React.createElement('div', { className: 'space-y-2 animate-fadeIn' }, [
                React.createElement('p', { key: 'github' }, [
                    '• GitHub: ',
                    React.createElement('a', {
                        key: 'github-link',
                        href: 'https://github.com/NotMalek',
                        className: 'text-blue-400 hover:text-blue-300 hover:underline transition-colors'
                    }, '@NotMalek')
                ]),
                React.createElement('p', { key: 'linkedin' }, [
                    '• LinkedIn: ',
                    React.createElement('a', {
                        key: 'linkedin-link',
                        href: 'https://www.linkedin.com/in/abdelmalek-anes-687a16173/',
                        className: 'text-blue-400 hover:text-blue-300 hover:underline transition-colors'
                    }, 'Malek')
                ]),
                React.createElement('p', { key: 'email' }, '• Email: abdelmalek.anes@outlook.com')
            ]);

        case COMMANDS.RESUME:
            if (args.length > 0) {
                return `resume: too many arguments`;
            }
            return React.createElement('div', { className: 'animate-fadeIn' }, [
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

        case COMMANDS.TRAIN:
            if (args.length > 0) {
                return `train: too many arguments`;
            }
            return React.createElement('div', { className: 'overflow-hidden' },
                React.createElement(TrainAnimation)
            );

        case COMMANDS.ROCKET:
            if (args.length > 0) {
                return `rocket: too many arguments`;
            }
            return React.createElement('div', { className: 'overflow-hidden' },
                React.createElement(RocketAnimation)
            );

        case COMMANDS.MATRIX:
            if (args.length > 0) {
                return `matrix: too many arguments`;
            }
            return React.createElement('div', { className: 'overflow-hidden' },
                React.createElement(MatrixRain)
            );

        case COMMANDS.EXIT:
            if (args.length > 0) {
                return `exit: too many arguments`;
            }
            if (onExit) {
                onExit();
                return React.createElement('p', { className: 'animate-fadeIn text-yellow-500' }, "Exiting terminal...");
            }
            return "Unable to exit terminal";

        case COMMANDS.CLEAR:
            if (args.length > 0) {
                return `clear: too many arguments`;
            }
            return null;

        default:
            return `Command '${command}' not found. Type 'help' to see available commands.`;
    }
};