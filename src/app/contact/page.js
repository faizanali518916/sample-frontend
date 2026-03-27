import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import { getLocaleFromCookieStore } from "@/lib/locale";

const contactTranslations = {
  en: {
    eyebrow: "Contact 24-7 Labs",
    title: "We're here to help you book, test, and get answers fast.",
    body: "Reach out to our team for appointment support, test information, and location details. You can call us directly or send a quick message below.",
    locationTitle: "Main Location",
    supportHours: "Open daily with 24-hour testing support",
    callNow: "Call Now",
    formTitle: "Send a quick message",
    formSubtitle: "We usually respond quickly during business hours.",
    firstName: "First Name",
    firstNamePlaceholder: "First name",
    lastName: "Last Name",
    lastNamePlaceholder: "Last name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    message: "Message",
    messagePlaceholder: "How can we help you today?",
    submit: "Submit",
  },
  es: {
    eyebrow: "Contacto 24-7 Labs",
    title:
      "Estamos aqui para ayudarte a agendar, realizarte pruebas y obtener respuestas rapido.",
    body: "Contacta a nuestro equipo para apoyo con citas, informacion de pruebas y detalles de ubicaciones. Puedes llamarnos directamente o enviar un mensaje rapido abajo.",
    locationTitle: "Ubicacion principal",
    supportHours: "Abierto todos los dias con soporte de pruebas las 24 horas",
    callNow: "Llamar ahora",
    formTitle: "Envia un mensaje rapido",
    formSubtitle: "Normalmente respondemos rapido durante el horario laboral.",
    firstName: "Nombre",
    firstNamePlaceholder: "Nombre",
    lastName: "Apellido",
    lastNamePlaceholder: "Apellido",
    email: "Correo electronico",
    emailPlaceholder: "tu@ejemplo.com",
    message: "Mensaje",
    messagePlaceholder: "Como podemos ayudarte hoy?",
    submit: "Enviar",
  },
};

export const metadata = {
  title: "Contact 24-7 Labs",
  description:
    "Contact 24-7 Labs in Tampa for appointments, diagnostics support, and general inquiries.",
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookieStore(cookieStore);
  const t = contactTranslations[locale] || contactTranslations.en;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4faff_0%,#ffffff_45%)] text-slate-900">
      <main>
        <section className="mx-auto w-full max-w-[1220px] px-4 pb-10 pt-12 sm:pt-16 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--tl-primary)]">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {t.body}
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
          <aside className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-[#f2f9ff] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--tl-primary)]">
                {t.locationTitle}
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
                {t.supportHours}
              </p>
            </div>

            <a
              href="tel:8139323741"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
            >
              <PhoneCall className="h-4 w-4" />
              {t.callNow}
            </a>
          </aside>

          <form className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-extrabold text-slate-900">
              {t.formTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{t.formSubtitle}</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                {t.firstName}
                <input
                  type="text"
                  placeholder={t.firstNamePlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                {t.lastName}
                <input
                  type="text"
                  placeholder={t.lastNamePlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                {t.email}
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                {t.message}
                <textarea
                  rows={6}
                  placeholder={t.messagePlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)] sm:w-auto"
            >
              {t.submit}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
