"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">

        As I near the completion of my degree in {" "}
        <span className="font-medium">Software Engineering</span>, I have explored multiple facets of the programming world.
        My journey in software development has been marked by a deep appreciation for the intricacies
        of coding and a relentless pursuit of innovation. I am proficient in languages like <span className="font-medium">Java, Python, and C#,</span>
        and frameworks and libraries such as <span className="font-medium">Next.js and React</span>.
      </p>
      <p className="mb-3">
        My passion for technology is matched by my enthusiasm for staying physically active; regular workouts at
        the gym are a crucial part of my routine. Outside of software projects, I enjoy playing video games.
        I am also passionate about watchmaking and perfumery. As I prepare to transition from academia to a professional setting, I am looking for a
        professional experience that will <span className="font-medium">challenge me and allow me to make use of my technical skills.</span>
      </p>
    </motion.section>
  );
}
