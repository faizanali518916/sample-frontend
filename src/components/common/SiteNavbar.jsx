"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, X } from "lucide-react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About 24-7 Labs", href: "/about" },
  { label: "Testing Services", href: "/#services" },
  { label: "COVID-19", href: "/#services" },
  {
    label: "At-Home Testing Kits",
    href: "https://247labkit.com/",
    external: true,
  },
  { label: "Forms", href: "/#forms" },
  { label: "Schedule Appointment", href: "/#appointment" },
  { label: "Contact", href: "/contact" },
];

function isActiveRoute(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/about") {
    return pathname === "/about";
  }

  if (href === "/contact") {
    return pathname === "/contact";
  }

  return false;
}

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const offsetY = window.scrollY;
      setIsScrolled(offsetY > 10);

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (offsetY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-sky-200/90 bg-[rgba(218,233,252,0.96)] shadow-[0_12px_30px_-26px_rgba(16,80,124,0.85)] backdrop-blur-xl"
          : "border-white/60 bg-[rgba(218,233,252,0.9)]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--tl-primary)] via-cyan-300 to-[var(--tl-primary-strong)] transition-[width] duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="hidden border-b border-white/45 bg-white/35 xl:block">
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-6 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
          <span>Open 24/7 in Tampa</span>
          <span>No referral required</span>
          <span>Most results in 24-48 hours</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-4 lg:px-6">
        <div className="flex h-[74px] items-center justify-between gap-3">
          <Link href="/" className="shrink-0" aria-label="24-7 Labs home">
            <Image
              src="/images/24x7-logo.png"
              alt="24-7 Labs"
              width={214}
              height={52}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 xl:block">
            <ul className="flex items-center justify-center gap-0.5 text-[11.5px] font-semibold text-slate-700">
              {menuItems.map((item) => {
                const isActive =
                  !item.external && isActiveRoute(pathname, item.href);

                return (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex h-10 items-center rounded-full px-3 py-2 whitespace-nowrap transition hover:bg-white/75 hover:text-[var(--tl-primary-strong)]"
                      >
                        <span>{item.label}</span>
                        <span className="absolute bottom-[4px] left-3 h-[2px] w-0 rounded-full bg-[var(--tl-primary)] transition-all duration-300 group-hover:w-8" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group relative inline-flex h-10 items-center rounded-full px-3 py-2 whitespace-nowrap transition hover:bg-white/75 hover:text-[var(--tl-primary-strong)] ${
                          isActive
                            ? "bg-white/85 text-[var(--tl-primary-strong)]"
                            : ""
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`absolute bottom-[4px] left-3 h-[2px] rounded-full bg-[var(--tl-primary)] transition-all duration-300 group-hover:w-8 ${
                            isActive ? "w-8" : "w-0"
                          }`}
                        />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm shadow-white/70 transition hover:scale-105 hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm shadow-white/70 transition hover:scale-105 hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            <a
              href="tel:8139323741"
              className="nav-pill-glow hidden rounded-full bg-gradient-to-r from-[#2f89d0] to-[#1f77be] px-4 py-2 text-sm font-extrabold text-white shadow-[0_14px_28px_-18px_rgba(15,83,140,0.9)] 2xl:inline-flex"
            >
              +1 (813) 932-3741
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)] xl:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="h-4.5 w-4.5" />
              ) : (
                <Menu className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 xl:hidden ${
            mobileMenuOpen
              ? "max-h-[520px] pb-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <ul className="grid gap-1 rounded-2xl border border-white/75 bg-white/85 p-3">
            {menuItems.map((item) => (
              <li key={`mobile-${item.label}`}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-[var(--tl-primary-strong)]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-[var(--tl-primary-strong)]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
