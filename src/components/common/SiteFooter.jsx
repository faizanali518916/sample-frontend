import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#082842] text-slate-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(38,127,199,0.35),transparent_45%)]" />
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
            24-7Labs is the first of a new line of innovative health care
            services from 24-7laboratories. Our mission is to give people the
            power to control their health with convenient, affordable, and
            easy-to-understand options.
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
            Products
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/90">
            <li>At-Home Chlamydia Testing Kit</li>
            <li>At-Home Herpes Testing Kit</li>
            <li>At-Home HIV Testing Kit</li>
            <li>At-Home COVID Testing Kit</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Resources
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/90">
            <li>
              <Link href="#" className="transition hover:text-white">
                Business Opportunities
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                Business Solutions
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                Telemedicine Service
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                Testing Locations
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">Contact</h3>
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
        Copyright {new Date().getFullYear()} 24-7 Labs. All rights reserved.
      </div>
    </footer>
  );
}
