"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Projects() {
    const { ref } = useSectionInView("Projects");

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.3
            }
        }
    };

    const projectVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            id="projects"
            className="scroll-mt-28 mb-28"
            initial="initial"
            animate="animate"
            variants={containerVariants}
        >
            <SectionHeading>My projects</SectionHeading>
            <motion.div variants={containerVariants}>
                {projectsData.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={projectVariants}
                    >
                        <Project {...project} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}