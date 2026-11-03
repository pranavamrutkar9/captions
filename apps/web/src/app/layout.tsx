import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code-Mixed Captions MVP",
  description: "Editable, script-aware captions for Hinglish, Tanglish, and Benglish videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

