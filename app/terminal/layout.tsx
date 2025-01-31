import { JetBrains_Mono } from "next/font/google";
import "../globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export default function TerminalLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${jetBrainsMono.className} terminal-page fixed inset-0`}>
            {children}
        </div>
    );
}