"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

export default function Experience() {
    const { ref } = useSectionInView("Experience");
    const { theme } = useTheme();

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.section
            id="experience"
            ref={ref}
            className="scroll-mt-28 mb-28 sm:mb-40"
            initial="initial"
            animate="animate"
            variants={containerVariants}
        >
            <SectionHeading>My experience</SectionHeading>
            <VerticalTimeline
                lineColor=""
                animate={false} // Disable default animations
            >
                {experiencesData.map((item, index) => (
                    <VerticalTimelineElement
                        key={index}
                        visible={true} // Force immediate visibility
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background:
                                theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                            boxShadow: "none",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            textAlign: "left",
                            padding: "1.3rem 2rem",
                            opacity: 1, // Force full opacity
                        }}
                        contentArrowStyle={{
                            borderRight:
                                theme === "light"
                                    ? "0.4rem solid #9ca3af"
                                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
                        }}
                        date={item.date}
                        icon={item.icon}
                        iconStyle={{
                            background:
                                theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                            fontSize: "1.5rem",
                        }}
                        position={index % 2 === 0 ? "left" : "right"} // Alternate positions
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }} // Small stagger effect
                        >
                            <h3 className="font-semibold capitalize">{item.title}</h3>
                            <p className="font-normal !mt-0">{item.location}</p>
                            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                                {item.description}
                            </p>
                        </motion.div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </motion.section>
    );
}