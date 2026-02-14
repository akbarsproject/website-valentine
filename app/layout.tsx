import type { Metadata } from "next";
import type { Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Permission to Be My Valentine?",
  description: "Immersive cinematic Valentine experience.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Permission to Be My Valentine?",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} min-h-full bg-[var(--app-bg)] text-[var(--app-fg)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
