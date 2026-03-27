import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { getLocaleFromCookieStore } from "@/lib/locale";

const aboutTranslations = {
  en: {
    serviceHighlights: [
      "Allergies",
      "Pregnancy",
      "Basic Wellness",
      "Heart Health",
      "Men & Women’s Health",
      "Hormone Testing",
      "Diabetes",
      "Menopause",
      "Thyroid Testing",
      "DNA, Drug, STD, and COVID-19 Testing",
    ],
    whyChooseUs: [
      "Provides thousands of medical lab tests in a professional, convenient and cost-effective way.",
      "No long waits, we strive to see patients in 15 minutes or less.",
      "Results in 24 to 48 hours for most tests.",
      "High-quality testing with trained, experienced, and certified staff.",
      "No doctor order or insurance required for testing.",
      "Walk-ins are always welcomed.",
    ],
    eyebrow: "About 24-7 Labs",
    heroTitle:
      "Innovative diagnostics built to give people control of their health.",
    heroBody:
      "24-7 Labs is part of a new line of healthcare services from 24-7 Laboratory LLC. Our mission is to provide convenient, affordable, and easy-to-understand testing options so patients can make confident wellness decisions.",
    stats: ["Open 24/7", "Certified Team", "Tampa Bay Locations"],
    sectionLabTitle: "The lab for your wellness testing needs",
    sectionLabBody:
      "We provide medical laboratory testing for a broad range of health goals. There are no hidden fees or surprise billing, and we accept HSA/FSA plus select health insurance plans.",
    stillLooking: "Still looking?",
    stillTitle: "24-7 Labs is the lab for you.",
    managementTitle: "Our Management Team",
    managementSubtitle:
      "The best testing services, led by experienced professionals.",
    marleyRole: "President",
    marleyBio:
      "Ms. Roldan has dedicated her career to helping patients control their health through convenient and affordable testing options. She helped develop solutions for drug, paternity, legal, and comprehensive wellness testing, and has grown 24-7 Labs across multiple Florida locations.",
    linarisRole: "Chief Medical Officer & Director",
    linarisBio:
      "Dr. Linares is board certified in Internal Medicine, Pulmonary Medicine, and Sleep Medicine, with extensive clinical leadership experience in Tampa Bay since 1996. His work spans critical care, preventive medicine, and community health initiatives.",
    ctaTitle: "Need help choosing a test?",
    ctaBody:
      "Our team can help you select the right diagnostic panel and book a convenient appointment at one of our locations.",
    contactUs: "Contact Us",
  },
  es: {
    serviceHighlights: [
      "Alergias",
      "Embarazo",
      "Bienestar basico",
      "Salud cardiaca",
      "Salud para hombres y mujeres",
      "Pruebas hormonales",
      "Diabetes",
      "Menopausia",
      "Pruebas de tiroides",
      "Pruebas de ADN, drogas, ETS y COVID-19",
    ],
    whyChooseUs: [
      "Ofrecemos miles de pruebas de laboratorio medico de forma profesional, conveniente y rentable.",
      "Sin largas esperas, buscamos atender a los pacientes en 15 minutos o menos.",
      "Resultados en 24 a 48 horas para la mayoria de las pruebas.",
      "Pruebas de alta calidad con personal capacitado, experimentado y certificado.",
      "No se requiere orden medica ni seguro para realizar pruebas.",
      "Siempre recibimos pacientes sin cita previa.",
    ],
    eyebrow: "Acerca de 24-7 Labs",
    heroTitle:
      "Diagnosticos innovadores para que las personas controlen su salud.",
    heroBody:
      "24-7 Labs forma parte de una nueva linea de servicios de salud de 24-7 Laboratory LLC. Nuestra mision es ofrecer opciones de pruebas convenientes, accesibles y faciles de entender para que los pacientes tomen decisiones de bienestar con confianza.",
    stats: ["Abierto 24/7", "Equipo certificado", "Ubicaciones en Tampa Bay"],
    sectionLabTitle: "El laboratorio para tus necesidades de bienestar",
    sectionLabBody:
      "Brindamos pruebas de laboratorio medico para una amplia variedad de objetivos de salud. No hay cargos ocultos ni facturacion sorpresa, y aceptamos HSA/FSA y algunos planes de seguro medico.",
    stillLooking: "Aun buscando?",
    stillTitle: "24-7 Labs es el laboratorio para ti.",
    managementTitle: "Nuestro equipo directivo",
    managementSubtitle:
      "Los mejores servicios de pruebas, liderados por profesionales con experiencia.",
    marleyRole: "Presidenta",
    marleyBio:
      "La Sra. Roldan ha dedicado su carrera a ayudar a los pacientes a controlar su salud con opciones de pruebas convenientes y accesibles. Ayudo a desarrollar soluciones para pruebas de drogas, paternidad, legales y de bienestar integral, y ha expandido 24-7 Labs en varias ubicaciones de Florida.",
    linarisRole: "Director y jefe medico",
    linarisBio:
      "El Dr. Linares esta certificado en Medicina Interna, Medicina Pulmonar y Medicina del Sueno, con amplia experiencia en liderazgo clinico en Tampa Bay desde 1996. Su trabajo abarca cuidados criticos, medicina preventiva e iniciativas de salud comunitaria.",
    ctaTitle: "Necesitas ayuda para elegir una prueba?",
    ctaBody:
      "Nuestro equipo puede ayudarte a seleccionar el panel diagnostico correcto y agendar una cita conveniente en una de nuestras ubicaciones.",
    contactUs: "Contactanos",
  },
};

export const metadata = {
  title: "About 24-7 Labs",
  description:
    "Learn more about 24-7 Labs, our mission, services, and why patients trust us for fast and accurate diagnostics in Tampa.",
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookieStore(cookieStore);
  const t = aboutTranslations[locale] || aboutTranslations.en;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_44%)] text-[var(--tl-ink)]">
      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-14 pt-14 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--tl-primary)]">
                {t.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl font-black leading-tight text-[var(--tl-metallic-black)] md:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                {t.heroBody}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
                  <Clock3 className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {t.stats[0]}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
                  <BadgeCheck className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {t.stats[1]}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#cfe0fa] bg-white p-4 shadow-sm shadow-[#173469]/10">
                  <MapPin className="h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {t.stats[2]}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#cfe0fa] bg-white p-3 shadow-[0_34px_80px_-42px_rgba(17,58,123,0.62)]">
              <Image
                src="/images/24-7labs-business-oppurtunities-1536x1280.jpg"
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
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <article className="rounded-3xl border border-[#cfe0fa] bg-[linear-gradient(145deg,#eef5ff_0%,#f8fbff_75%)] p-7 shadow-[0_20px_55px_-42px_rgba(10,15,25,0.8)]">
                <h2 className="font-display text-3xl font-extrabold text-[var(--tl-metallic-black)]">
                  {t.sectionLabTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {t.sectionLabBody}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {t.serviceHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-3xl border border-[#1f4f9d]/20 bg-[linear-gradient(140deg,#1a3f91_0%,#133473_45%,#05070d_100%)] p-7 text-white shadow-[0_30px_70px_-40px_rgba(3,7,16,0.95)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--tl-primary-soft)]">
                  {t.stillLooking}
                </p>
                <h3 className="mt-2 font-display text-3xl font-black">
                  {t.stillTitle}
                </h3>
                <ul className="mt-6 space-y-3">
                  {t.whyChooseUs.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-blue-100/95"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary-soft)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto w-full max-w-[1220px] px-4 lg:px-6">
            <div className="mb-8 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end sm:gap-4">
              <h2 className="font-display text-3xl font-extrabold text-[var(--tl-metallic-black)] md:text-4xl">
                {t.managementTitle}
              </h2>
              <p className="text-sm font-semibold text-[var(--tl-primary-strong)] md:text-base sm:text-right">
                {t.managementSubtitle}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-[#cfe0fa] bg-white p-6 shadow-[0_24px_48px_-40px_rgba(5,7,13,0.9)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Image
                    src="/images/Chief-Medical-Officer-Director.png"
                    alt="Marley Roldan"
                    width={210}
                    height={210}
                    className="h-44 w-44 rounded-2xl object-cover sm:h-48 sm:w-48"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-[var(--tl-metallic-black)]">
                      Marley Roldan
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[var(--tl-primary)]">
                      {t.marleyRole}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {t.marleyBio}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-[#cfe0fa] bg-white p-6 shadow-[0_24px_48px_-40px_rgba(5,7,13,0.9)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Image
                    src="/images/Chief-Medical-Officer-Director-600x541.jpeg"
                    alt="Dr. Rey Linares"
                    width={210}
                    height={210}
                    className="h-44 w-44 rounded-2xl object-cover sm:h-48 sm:w-48"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-[var(--tl-metallic-black)]">
                      Dr. Rey Linares, M.D
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[var(--tl-primary)]">
                      {t.linarisRole}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {t.linarisBio}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto w-full max-w-[1220px] rounded-3xl border border-[#1f4f9d]/20 bg-[linear-gradient(135deg,#173a7b_0%,#1a3f91_42%,#05070d_100%)] px-6 py-10 text-white shadow-xl shadow-slate-300/35 lg:px-10">
            <h2 className="font-display text-3xl font-extrabold">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-blue-100 md:text-base">
              {t.ctaBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:8139323741"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-[var(--tl-primary-strong)]"
              >
                <PhoneCall className="h-4 w-4" />
                +1 (813) 932-3741
              </a>
              <a
                href="mailto:anytimelab@24-7labs.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                anytimelab@24-7labs.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {t.contactUs}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
