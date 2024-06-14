import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import othelloImg from "@/public/othello.png";
import dashImg from "@/public/dash.png";
import customADTImg from "@/public/customADT.png";
import monitorIMG from "@/public/monitor.png";
import AIssistantImg from "@/public/AIssistant.png";

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
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
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
        "Winter 2022 marks the beginning of my journey in Software Engineering. I was very excited to learn and grow in this field.",
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
    title: "CPU/Memory Monitor",
    description:
        "This project monitors the CPU and memory usage of your system in real-time and displays the data using a dynamically updating graph",
    tags: ["Python", "Matplotlib", "psutil"],
    imageUrl: monitorIMG,
    link: "https://github.com/NotMalek/CPU-Memory_Monitor",
  },
  {
    title: "SmartClass A.I.ssistant”",
    description:
        "Develop a CNN using PyTorch to analyze student facial responses in real-time",
    tags: ["Python", "Pytorch", "Matplotlib"],
    imageUrl: AIssistantImg,
    link: "https://github.com/abdelh17/SmartClassAIssistant",
  },
  {
    title: "Othello Strategy Game",
    description:
      "Develop an oriented strategy game, implement a robust back-end architecture and the ability to load a previously saved game",
    tags: ["Java"],
    imageUrl: othelloImg,
    link: "https://github.com/NotMalek/othello",
  },
  {
    title: "Custom ADT",
    description:
      "Custom ADT to store large numbers of objects, optimize storage and time complexities, implement optimized working methods to manipulate the data",
    tags: ["Java"],
    imageUrl: customADTImg,
    link: "https://github.com/NotMalek/Custom-ADT",
  },
  {
    title: "Simple Data Visualizer",
    description:
      "Benchmark and visualize the performance differences between Pandas and Polars, Use interactive charts to display speed comparisons across various data tasks",
    tags: ["Python", "Pandas", "Polars"],
    imageUrl: dashImg,
    link: "https://github.com/NotMalek/SimpleDataVisualizer",
  },
] as const;

export const skillsData = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "MUI",
  "Java",
  "C#",
  "C",
  "C++",
  "Python",
  "Pytorch",
  "JavaScript",
  "NodeJS",
  "Erlang",
  "Clojure",
  "PHP",
  "SQL",
  "NoSQL",
  "Supabase",
  "Neo4J",
  "MS Azure",
  "Power BI",
  "Power Automate",
  "Junit",
  "Vercel",
  "Git",
] as const;
