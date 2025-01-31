import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import About from "@/components/main/about";
import Experience from "@/components/main/experience";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";
import Intro from "@/components/main/intro";
import Projects from "@/components/main/projects";
import Skills from "@/components/main/skills";
import { TerminalButton } from "@/components/main/terminal-button";
import ThemeSwitch from "@/components/main/theme-switch";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <div className={`${inter.className} relative pt-28 sm:pt-36`}>
            <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
            <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

            <ThemeContextProvider>
                <ActiveSectionContextProvider>
                    <Header />
                    <main className="flex flex-col items-center px-4">
                        <Intro />
                        <TerminalButton />
                        <About />
                        <Projects />
                        <Experience />
                        <Skills />
                    </main>
                    <Footer />
                    <Toaster position="top-right" />
                    <ThemeSwitch />
                </ActiveSectionContextProvider>
            </ThemeContextProvider>
        </div>
    );
}