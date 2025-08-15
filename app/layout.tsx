import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MuiClientProvider from './MuiClientProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agape Quiz",
  description: "Personality Development Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiClientProvider>
          {children}
        </MuiClientProvider>
      </body>
    </html>
  );
}
