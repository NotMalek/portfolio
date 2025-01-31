import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import othelloImg from "@/public/othello.png";
import dashImg from "@/public/dash.png";
import customADTImg from "@/public/customADT.png";
import monitorIMG from "@/public/monitor.png";
import AIssistantImg from "@/public/AIssistant.png";
import distributedTaskImg from "@/public/distributedTask.png";
import virualMachineImg from "@/public/virtualMachine.png";
import quolanceImg from "@/public/Quolance.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
] as const;

export const experiencesData = [
  {
    title: "DEC, Health Science",
    location: "Vanier College - Montreal, QC",
    description:
      "I graduated after 2 years of hard work. CEGEP is not for the weak.",
    icon: React.createElement(LuGraduationCap),
    date: "2019-2021",
  },
  {
    title: "Started Bachelor's in Software Engineering",
    location: "Concordia University - Montreal, QC",
    description:
        "My journey in Software Engineering starts in winter 2022. I was very excited to learn and grow in this field.",
    icon: React.createElement(LuGraduationCap),
    date: "2022",
  },
  {
    title: "Software Developer Intern",
    location: "Bombardier Inc. - Montreal, QC",
    description:
      "\n" +
        "During my summer 2023 internship at Bombardier Inc., I used filtering to extract and analyze employee data using Power BI and DAX. " +
        "I also automated routine tasks with Python and Excel VBA, increasing operational efficiency. Finally, I managed SQL databases on Microsoft " +
        "Azure while ensuring scalability and security.",
    icon: React.createElement(CgWorkAlt),
    date: "2023",
  },
  {
    title: "Embedded Software Developer Intern",
    location: "Caterpillar - Montreal, QC",
    description:
        "\n" +
        "During my fall-winter 2024-2025 internship at Caterpillar, I designed and implemented embedded software applications for autonomous and staffed mining machines using C++ on Linux. " +
        "I developed automated test procedures to validate software modules, ensuring reliability and performance. " +
        "Additionally, I reviewed engineering documentation, including requirements, specifications, and validation test plans, while collaborating in a scaled Agile environment.",
    icon: React.createElement(CgWorkAlt),
    date: "2024",
  },
  {
    title: "Expected completion of Bachelor's in Software Engineering",
    location: "Concordia University - Montreal, QC",
    description:
      "2025 marks the year I am expected to complete my Bachelor's in Software Engineering. I am excited to see what the future holds.",
    icon: React.createElement(LuGraduationCap),
    date: "2025",
  },
] as const;

export const projectsData = [
  {
    title: "Stack-Based Virtual Machine",
    description:
        "A sophisticated stack-based virtual machine with assembly language support, featuring real-time execution visualization.",
    tags: ["Rust", "Next.js", "TypeScript", "Tailwind CSS", "WebAssembly"],
    imageUrl: virualMachineImg,
    link: "https://github.com/NotMalek/VirtualMachine",
  },
  {
    title: "Distributed Task Processing System",
    description:
        "A distributed system featuring auto-scaling workers, work stealing, priority-based scheduling, and comprehensive monitoring.",
    tags: ["Go", "Redis", "Next.js", "React"],
    imageUrl: distributedTaskImg,
    link: "https://github.com/NotMalek/DistributedTaskProcessingSystem",
  },
  {
    title: "System Monitor",
    description:
        "A lightweight system monitoring application providing real-time visualization of core system metrics with integrated data persistence capabilities.",
    tags: ["Python", "psutil", "Matplotlib", "seaborn", "aiosqlite"],
    imageUrl: monitorIMG,
    link: "https://github.com/NotMalek/system_monitor",
  },
  {
    title: "Quolance",
    description:
        "A comprehensive freelancing platform built with Spring Boot and React, featuring secure user authentication, real-time collaboration, and end-to-end tested functionality.",
    tags: ["Spring Boot", "React", "Next.js", "JUnit", "Cypress"],
    imageUrl: quolanceImg, // Make sure to import this image
    link: "https://github.com/abdelh17/Quolance",
  },
  {
    title: "SmartClass A.I.ssistant",
    description:
        "An intelligent classroom assistant using PyTorch-based CNN to analyze and interpret student facial responses in real-time lectures.",
    tags: ["Python", "Pytorch", "Matplotlib"],
    imageUrl: AIssistantImg,
    link: "https://github.com/abdelh17/SmartClassAIssistant",
  },
  {
    title: "Othello Strategy Game",
    description:
        "An oriented strategy game with a robust back-end architecture and the ability to load previously saved games.",
    tags: ["Java"],
    imageUrl: othelloImg,
    link: "https://github.com/NotMalek/othello",
  },
  {
    title: "Custom ADT",
    description:
        "A custom abstract data type implementation optimized for storing and manipulating large numbers of objects with efficient time and space complexities.",
    tags: ["Java"],
    imageUrl: customADTImg,
    link: "https://github.com/NotMalek/Custom-ADT",
  },
  {
    title: "Simple Data Visualizer",
    description:
        "An interactive dashboard comparing and visualizing performance differences between Pandas and Polars across various data processing tasks.",
    tags: ["Python", "Pandas", "Polars"],
    imageUrl: dashImg,
    link: "https://github.com/NotMalek/SimpleDataVisualizer",
  },
] as const;

export const skillsData = [
  "React",
  "Angular",
  "Tailwind CSS",
  "TypeScript",
  "Next.js",
  "Java/Spring Boot",
  "Python/Django",
  "C#",
  "C/C++",
  "Go",
  "Node.js/Express.js",
  "Azure",
  "AWS",
  "Docker",
  "Jenkins",
  "Git",
  "Jest",
  "JUnit"
] as const;
