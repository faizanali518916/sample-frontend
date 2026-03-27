import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  FlaskConical,
  Info,
  Instagram,
  Microscope,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Twitter,
  Youtube,
} from "lucide-react";

const trustFooterItems = [
  {
    label: "CLIA Certified",
    href: "/trust-standards#clia",
    icon: FlaskConical,
  },
  {
    label: "CAP Accredited",
    href: "/trust-standards#cap",
    icon: Microscope,
  },
  {
    label: "HIPAA Compliant",
    href: "/trust-standards#hipaa",
    icon: ShieldCheck,
  },
];

const footerTranslations = {
  en: {
    trustItems: ["CLIA Certified", "CAP Accredited", "HIPAA Compliant"],
    about:
      "24-7Labs is the first of a new line of innovative health care services from 24-7laboratories. Our mission is to give people the power to control their health with convenient, affordable, and easy-to-understand options.",
    productsTitle: "Products",
    products: [
      "At-Home Chlamydia Testing Kit",
      "At-Home Herpes Testing Kit",
      "At-Home HIV Testing Kit",
      "At-Home COVID Testing Kit",
    ],
    resourcesTitle: "Resources",
    resources: [
      "Trust & Standards",
      "Business Opportunities",
      "Business Solutions",
      "Telemedicine Service",
      "Testing Locations",
      "Blog",
      "Privacy Policy",
    ],
    contactTitle: "Contact",
    copyright: "All rights reserved.",
  },
  es: {
    trustItems: [
      "Certificacion CLIA",
      "Acreditacion CAP",
      "Cumplimiento HIPAA",
    ],
    about:
      "24-7Labs es la primera de una nueva linea de servicios innovadores de salud de 24-7laboratories. Nuestra mision es dar a las personas el poder de controlar su salud con opciones convenientes, accesibles y faciles de entender.",
    productsTitle: "Productos",
    products: [
      "Kit de prueba en casa para clamidia",
      "Kit de prueba en casa para herpes",
      "Kit de prueba en casa para VIH",
      "Kit de prueba en casa para COVID",
    ],
    resourcesTitle: "Recursos",
    resources: [
      "Confianza y Estandares",
      "Oportunidades de negocio",
      "Soluciones para negocios",
      "Servicio de telemedicina",
      "Ubicaciones de pruebas",
      "Blog",
      "Politica de privacidad",
    ],
    contactTitle: "Contacto",
    copyright: "Todos los derechos reservados.",
  },
};

export default function SiteFooter({ locale = "en" }) {
  const copy = footerTranslations[locale] || footerTranslations.en;

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#082842] text-slate-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(38,127,199,0.35),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 pt-10 lg:px-6">
        <div className="rounded-[30px] border border-sky-300/25 bg-[linear-gradient(135deg,#0d3761_0%,#0b3156_50%,#082842_100%)] p-5 shadow-[0_28px_60px_-45px_rgba(6,12,20,0.9)] md:p-6">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 text-center lg:gap-x-20">
            {trustFooterItems.map((item) => {
              const Icon = item.icon;
              const itemLabel =
                copy.trustItems[
                  trustFooterItems.findIndex((x) => x.href === item.href)
                ] || item.label;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-2.5 px-1 text-[12px] font-extrabold uppercase tracking-[0.13em] text-sky-100 transition hover:text-white"
                >
                  <Icon className="h-4 w-4 text-cyan-300 transition group-hover:text-cyan-200" />
                  <span>{itemLabel}</span>
                  <Info className="h-3.5 w-3.5 text-cyan-300/85 transition group-hover:text-cyan-200" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Image
            src="/images/24x7-logo.png"
            alt="24-7 Labs"
            width={210}
            height={54}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed text-sky-100/90">
            {copy.about}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sky-200">
            <a
              href="https://www.facebook.com/247Tampa/"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/anytimelab"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfBNya1FDOPMRJxUDCDusxw"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/twentyfoursevenlabs/"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/24-7-labs/"
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {copy.productsTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/90">
            {copy.products.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {copy.resourcesTitle}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/90">
            <li>
              <Link
                href="/trust-standards"
                className="transition hover:text-white"
              >
                {copy.resources[0]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[1]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[2]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[3]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[4]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[5]}
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                {copy.resources[6]}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            {copy.contactTitle}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-sky-100/90">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              6107 Memorial Hwy, Suite F Tampa, Florida
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              anytimelab@24-7labs.com
            </li>
            <li className="flex items-start gap-2">
              <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              +1 (813) 932-3741
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[var(--tl-primary)] py-4 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
        Copyright {new Date().getFullYear()} 24-7 Labs. {copy.copyright}
      </div>
    </footer>
  );
}
