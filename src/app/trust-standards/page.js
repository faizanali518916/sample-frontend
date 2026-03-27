import {
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { cookies } from "next/headers";
import { getLocaleFromCookieStore } from "@/lib/locale";

const trustTranslations = {
  en: {
    eyebrow: "Trust & Standards",
    title: "CLIA, CAP, and HIPAA explained in plain language.",
    body: "You'll see terms like CLIA, CAP, and HIPAA across this site. This page explains what they mean in plain language and what they mean for your experience.",
    badges: [
      "Clinical-lab quality",
      "Recurring external review",
      "Privacy and security controls",
    ],
    whatItMeans: "What this means for you",
    standards: [
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
    ],
  },
  es: {
    eyebrow: "Confianza y estandares",
    title: "CLIA, CAP e HIPAA explicados en lenguaje sencillo.",
    body: "Veras terminos como CLIA, CAP e HIPAA en este sitio. Esta pagina explica que significan en un lenguaje claro y que representan para tu experiencia.",
    badges: [
      "Calidad de laboratorio clinico",
      "Revision externa recurrente",
      "Controles de privacidad y seguridad",
    ],
    whatItMeans: "Que significa esto para ti",
    standards: [
      {
        id: "clia",
        short: "CLIA",
        title: "Laboratorios con certificacion CLIA",
        description:
          "CLIA es un programa de calidad de laboratorios en Estados Unidos bajo supervision federal. Un laboratorio con certificacion CLIA debe seguir procesos validados, controles de calidad y pruebas de competencia.",
        points: [
          "Tu muestra se procesa en un laboratorio sujeto a estandares de calidad clinica.",
          "Los metodos de prueba y controles de calidad deben cumplir requisitos definidos.",
          "Los resultados se producen en un entorno clinico regulado.",
        ],
      },
      {
        id: "cap",
        short: "CAP",
        title: "Acreditacion CAP",
        description:
          "La acreditacion CAP (College of American Pathologists) es un programa riguroso de inspeccion por pares utilizado por laboratorios clinicos de alto rendimiento.",
        points: [
          "Los laboratorios se inspeccionan con estandares detallados de calidad y operacion.",
          "La acreditacion se revisa y mantiene con evaluaciones externas recurrentes.",
          "Es una capa adicional de calidad sobre los requisitos regulatorios basicos.",
        ],
      },
      {
        id: "hipaa",
        short: "HIPAA",
        title: "Cumplimiento HIPAA",
        description:
          "HIPAA es un marco de privacidad y seguridad en Estados Unidos para informacion medica protegida (PHI). Regula como se usa, divulga y protege la informacion relacionada con la salud.",
        points: [
          "El acceso a PHI se limita a flujos operativos y clinicos necesarios.",
          "Los sistemas deben aplicar controles de seguridad para almacenamiento, transferencia y acceso.",
          "Las practicas de privacidad definen como se usan los datos y como solicitar ayuda.",
        ],
      },
    ],
  },
};

export const metadata = {
  title: "Trust & Standards | 24-7 Labs",
  description:
    "Learn what CLIA, CAP, and HIPAA mean in plain language and how 24-7 Labs applies these standards to patient testing and data handling.",
};

export default async function TrustStandardsPage() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookieStore(cookieStore);
  const t = trustTranslations[locale] || trustTranslations.en;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f9ff_0%,#ffffff_42%)] text-[var(--tl-ink)]">
      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-8 pt-12 sm:pt-16 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--tl-primary)]">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-black leading-tight text-[var(--tl-metallic-black)] sm:text-4xl md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            {t.body}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <Stethoscope className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                {t.badges[0]}
              </p>
            </div>
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <ClipboardCheck className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                {t.badges[1]}
              </p>
            </div>
            <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
              <ShieldCheck className="h-5 w-5 text-[var(--tl-primary)]" />
              <p className="mt-2 text-sm font-semibold text-slate-700">
                {t.badges[2]}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 py-4 sm:py-6 lg:px-6">
          {t.standards.map((standard) => (
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
                  {t.whatItMeans}
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
      </main>
    </div>
  );
}
