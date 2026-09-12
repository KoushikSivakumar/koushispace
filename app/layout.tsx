import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Koushik Sivakumar",
  description: "Computer Science Engineering Student · Developer · Creative Technologist",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
