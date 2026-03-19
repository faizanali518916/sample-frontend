import Link from "next/link";
import SiteNavbar from "@/components/common/SiteNavbar";
import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Contact 24-7 Labs",
  description:
    "Contact 24-7 Labs in Tampa for appointments, diagnostics support, and general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4faff_0%,#ffffff_45%)] text-slate-900">
      <SiteNavbar />

      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-12 pt-16 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--tl-primary)]">
            Contact 24-7 Labs
          </p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
            We&apos;re here to help you book, test, and get answers fast.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Reach out to our team for appointment support, test information, and
            location details. You can call us directly or send a quick message
            below.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
          <aside className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-[#f2f9ff] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--tl-primary)]">
                Main Location
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                6107 Memorial Hwy, Suite F Tampa, Florida
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 p-4">
              <p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                +1 (813) 932-3741
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                anytimelab@24-7labs.com
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                Open daily with 24-hour testing support
              </p>
            </div>

            <a
              href="tel:8139323741"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
          </aside>

          <form className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-extrabold text-slate-900">
              Send a quick message
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We usually respond quickly during business hours.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                First Name
                <input
                  type="text"
                  placeholder="First name"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Last Name
                <input
                  type="text"
                  placeholder="Last name"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                Email
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                Message
                <textarea
                  rows={6}
                  placeholder="How can we help you today?"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
            >
              Submit
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
