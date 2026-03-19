import Image from "next/image";
import Link from "next/link";
import SiteNavbar from "@/components/common/SiteNavbar";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  MapPin,
  PhoneCall,
} from "lucide-react";

const valueCards = [
  {
    title: "Rapid Turnaround",
    description:
      "Most tests are completed in 24-48 hours so you can make faster health decisions with confidence.",
  },
  {
    title: "Confidential Testing",
    description:
      "Every visit and result is handled discreetly with patient privacy and data protection as top priorities.",
  },
  {
    title: "Comprehensive Services",
    description:
      "From DNA and drug screening to STD and wellness testing, we provide a full diagnostics menu in one place.",
  },
];

export const metadata = {
  title: "About 24-7 Labs",
  description:
    "Learn more about 24-7 Labs, our mission, services, and why patients trust us for fast and accurate diagnostics in Tampa.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_42%)] text-slate-900">
      <SiteNavbar />

      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-14 pt-16 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--tl-primary)]">
                About 24-7 Labs
              </p>
              <h1 className="mt-3 font-display text-4xl font-black leading-tight text-slate-900 md:text-5xl">
                Tampa&apos;s 24-hour testing lab built for speed, clarity, and
                care.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                24-7 Labs was created to make diagnostics easier to access for
                individuals, families, and organizations. Our team delivers
                reliable testing without referral requirements, with a focus on
                fast turnaround and compassionate patient support.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <Clock3 className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Open 24/7
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <BadgeCheck className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    CLIA Certified
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <MapPin className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Tampa, Florida
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-3 shadow-[0_30px_80px_-40px_rgba(38,127,199,0.65)]">
              <Image
                src="/images/DSC09527-Edit.jpg"
                alt="24-7 Labs location"
                width={760}
                height={520}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto w-full max-w-[1220px] px-4 lg:px-6">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              What patients value most
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {valueCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-sky-100 bg-[#f7fbff] p-6 shadow-sm"
                >
                  <h3 className="font-display text-lg font-extrabold text-[var(--tl-primary-strong)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto w-full max-w-[1220px] rounded-3xl border border-sky-100 bg-[linear-gradient(135deg,#125287_0%,#1f77be_100%)] px-6 py-10 text-white shadow-xl shadow-sky-200 lg:px-10">
            <h2 className="font-display text-3xl font-extrabold">
              Need help choosing a test?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-sky-100 md:text-base">
              Our team can help you select the right diagnostic panel and book a
              convenient appointment at one of our locations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:8139323741"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-[var(--tl-primary-strong)]"
              >
                <PhoneCall className="h-4 w-4" />
                +1 (813) 932-3741
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
