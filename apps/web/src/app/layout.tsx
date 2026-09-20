import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "TVET Bangladesh | Freelancing & Skill-Training Platform",
  description:
    "Next-generation freelancing marketplace and live practical training for technical graduates in Bangladesh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
