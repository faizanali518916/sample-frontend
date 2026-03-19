import { Manrope, Montserrat } from "next/font/google";
import RouteScrollReset from "@/components/common/RouteScrollReset";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "24-7 Labs | Tampa Testing Services",
  description:
    "24-7 Labs homepage rebuilt with Next.js and Tailwind CSS, featuring diagnostics services, scheduling, reviews, and contact details.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--tl-surface)] font-sans text-[var(--tl-ink)]">
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}
