import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rex Darel Andig — Full Stack Software Engineer",
  description: "Minimalist and modern portfolio of Rex Darel Andig, Full Stack Engineer specializing in Next.js, Node.js, TypeScript, PostgreSQL, and distributed systems architecture.",
  keywords: ["Full Stack Developer", "Software Engineer", "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Backend Architect"],
  authors: [{ name: "Rex Darel Andig" }],
  openGraph: {
    title: "Rex Darel Andig — Full Stack Software Engineer",
    description: "Architecting resilient backend systems & crafting fluid web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0f] text-zinc-100 selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
