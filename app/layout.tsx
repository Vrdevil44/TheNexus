import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { HackerModeProvider } from "@/lib/context/HackerModeContext";
import BackgroundManager from "@/components/dom/BackgroundManager";
import HackerModeOverlay from "@/components/ui/HackerModeOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibhu Dikshit | The Nexus",
  description: "Infrastructure-first IT Specialist & Full Stack Developer. Exploring the convergence of physical and digital systems.",
  keywords: ["IT Infrastructure", "Full Stack Developer", "Next.js", "React", "Three.js", "Network Engineering", "Vibhu Dikshit"],
  openGraph: {
    title: "Vibhu Dikshit | The Nexus",
    description: "Infrastructure-first IT Specialist & Full Stack Developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Google Fonts for UI Controller */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Bebas+Neue&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Lato:wght@400;700&family=Source+Sans+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Fira+Code:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Courier+Prime:wght@400;700&family=Space+Mono:wght@400;700&family=Lobster&family=Pacifico&family=Righteous&family=Fredoka+One&family=Bangers&family=Abril+Fatface&family=Cormorant+Garamond:wght@400;600&family=Cinzel:wght@400;700&family=Great+Vibes&family=Orbitron:wght@400;700&family=Rajdhani:wght@400;600&family=Syncopate:wght@400;700&family=Poppins:wght@400;500;600;700&family=Inconsolata:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <HackerModeProvider>
            <BackgroundManager />
            <HackerModeOverlay />
            {children}
          </HackerModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
