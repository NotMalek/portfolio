import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";

export const metadata = {
    title: "Abdelmalek Anes | Personal Portfolio",
    description: "Abdelmalek Anes is a last year software engineering student.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="!scroll-smooth">
        <body className="portfolio-main">
        <ThemeContextProvider>
            {children}
        </ThemeContextProvider>
        </body>
        </html>
    );
}