import {
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const standards = [
  {
    id: "clia",
    short: "CLIA",
    title: "CLIA-certified labs",
    description:
      "CLIA is a U.S. lab quality program run under federal oversight. A CLIA-certified lab has to follow validated processes, quality controls, and proficiency checks.",
    points: [
      "Your sample is processed by a lab held to clinical testing quality standards.",
      "Testing methods and quality checks must meet defined requirements.",
      "Results are produced in a regulated clinical-lab environment.",
    ],
  },
  {
    id: "cap",
    short: "CAP",
    title: "CAP-accredited",
    description:
      "CAP (College of American Pathologists) accreditation is a rigorous, peer-based inspection program used by high-performing clinical laboratories.",
    points: [
      "Labs are inspected against detailed quality and operational standards.",
      "Accreditation is reviewed and maintained through recurring external assessments.",
      "It is an additional quality layer beyond baseline regulatory requirements.",
    ],
  },
  {
    id: "hipaa",
    short: "HIPAA",
    title: "HIPAA-compliant",
    description:
      "HIPAA is a U.S. privacy and security framework for protected health information (PHI). It governs how health-related information is used, disclosed, and protected.",
    points: [
      "Access to PHI is limited to necessary operational and clinical workflows.",
      "Systems must use security controls for storage, transfer, and access.",
      "Privacy practices define how data is used and how users can request support.",
    ],
  },
];

const phiHandlingPoints = [
  "For a visual example of how results are presented in-product, review the synthetic sample report preview.",
  "Checkout and status workflows are designed around minimum-necessary data use.",
  "Status access uses secure, short-lived links instead of persistent patient logins in V1.",
  "Marketing analytics are configured to avoid direct PHI payload fields.",
  "Policy and legal language are available in HIPAA Notice and Privacy Policy pages.",
];

const relatedResources = [
  "Sample Report",
  "HIPAA Notice",
  "Privacy Policy",
  "Terms of Service",
];

export const metadata = {
  title: "Trust & Standards | 24-7 Labs",
  description:
    "Learn what CLIA, CAP, and HIPAA mean in plain language and how 24-7 Labs applies these standards to patient testing and data handling.",
};

export default function TrustStandardsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#ffffff_42%)] text-[var(--tl-ink)]">
      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-8 pt-12 sm:pt-16 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--tl-primary)]">
            Trust &amp; Standards
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-black leading-tight text-[var(--tl-metallic-black)] sm:text-4xl md:text-5xl">
            CLIA, CAP, and HIPAA explained in plain language.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            You&apos;ll see terms like CLIA, CAP, and HIPAA across this site.
            This page explains what they mean in plain language and what they
            mean for your experience.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <Stethoscope className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Clinical-lab quality
              </p>
            </div>
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <ClipboardCheck className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Recurring external review
              </p>
            </div>
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <ShieldCheck className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Privacy and security controls
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 py-4 sm:py-6 lg:px-6">
          {standards.map((standard) => (
            <article
              key={standard.id}
              id={standard.id}
              className="scroll-mt-36 rounded-3xl border border-[#cfe0fa] bg-white p-6 shadow-[0_24px_48px_-40px_rgba(5,7,13,0.9)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--tl-primary)]">
                {standard.short}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-[var(--tl-metallic-black)] sm:text-3xl">
                {standard.title}
              </h2>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 md:text-base">
                {standard.description}
              </p>

              <div className="mt-6 rounded-2xl border border-sky-100 bg-[#f7fbff] p-4">
                <h3 className="font-display text-xl font-bold text-[var(--tl-primary-strong)]">
                  What this means for you
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {standard.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto w-full max-w-[1220px] px-4 pb-12 pt-6 sm:pb-16 lg:px-6">
          <article className="rounded-3xl border border-[#1f4f9d]/20 bg-[linear-gradient(140deg,#1a3f91_0%,#133473_45%,#05070d_100%)] p-7 text-white shadow-[0_30px_70px_-40px_rgba(3,7,16,0.95)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--tl-primary-soft)]">
              Product implementation
            </p>
            <h2 className="mt-2 font-display text-3xl font-black">
              How we handle PHI in this product
            </h2>

            <ul className="mt-5 space-y-3">
              {phiHandlingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-blue-100"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary-soft)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-white/20 pt-5">
              <h3 className="font-display text-xl font-bold">References</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedResources.map((resource) => (
                  <span
                    key={resource}
                    className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-100"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
