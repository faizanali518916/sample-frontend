"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Sparkles,
  Star,
} from "lucide-react";
import AITestFinderModal from "@/components/common/AITestFinderModal";

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        {subtitle}
      </p>
      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[var(--tl-primary)]" />
    </div>
  );
}

function WhyChooseFeatureCard({ feature, iconLeft = false, iconAlt }) {
  return (
    <article className="group flex items-start justify-between gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:shadow-lg">
      {iconLeft ? (
        <>
          <Image
            src={feature.icon}
            alt={iconAlt}
            width={54}
            height={54}
            className="h-12 w-12"
          />
          <div>
            <h3 className="font-display text-base font-extrabold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {feature.description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3 className="font-display text-base font-extrabold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {feature.description}
            </p>
          </div>
          <Image
            src={feature.icon}
            alt={iconAlt}
            width={54}
            height={54}
            className="h-12 w-12"
          />
        </>
      )}
    </article>
  );
}

export default function HomePage({ locale = "en" }) {
  const t = useTranslations("HomePage");
  const isSpanish = locale?.toLowerCase().startsWith("es");
  const heroSlides = t.raw("Hero.slides");
  const serviceCards = t.raw("Services.items");
  const whyChooseFeatures = t.raw("WhyChoose.items");
  const whyChooseLeftTape = [...whyChooseFeatures, ...whyChooseFeatures];
  const whyChooseRightBase = [
    ...whyChooseFeatures.slice(3),
    ...whyChooseFeatures.slice(0, 3),
  ];
  const whyChooseRightTape = [...whyChooseRightBase, ...whyChooseRightBase];
  const processSteps = t.raw("Process.items");
  const certificationLogos = t.raw("Reviews.certificationLogos");
  const certificationMarqueeLogos = [
    ...certificationLogos,
    ...certificationLogos,
  ];
  const reviews = t.raw("Reviews.items");
  const faqLeft = t.raw("FAQ.itemsLeft");
  const faqRight = t.raw("FAQ.itemsRight");
  const appointmentLocations = t.raw("Appointment.locations");
  const breadcrumbItems = t.raw("Breadcrumb.items");

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [activeServiceCard, setActiveServiceCard] = useState(0);
  const [activeWhyFeature, setActiveWhyFeature] = useState(0);
  const [activeFaqId, setActiveFaqId] = useState(null);
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsBooting(false);
    }, 1300);

    return () => window.clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isBooting ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBooting]);

  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    if (revealElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const delay = entry.target.getAttribute("data-reveal-delay");
          if (delay) {
            entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const getCardIndexAtViewportLine = (selector, currentIndex = 0) => {
      // Keep this interaction to true mobile single-column layout.
      if (window.innerWidth >= 640) {
        return currentIndex;
      }

      const cards = Array.from(document.querySelectorAll(selector));
      if (cards.length === 0) {
        return 0;
      }

      const activationLine = window.innerHeight * 0.5;
      const clampedCurrentIndex = Math.min(
        cards.length - 1,
        Math.max(0, currentIndex),
      );
      const currentTop =
        cards[clampedCurrentIndex]?.getBoundingClientRect().top ??
        activationLine;

      // Hysteresis: keep current card active while its top stays near center.
      if (Math.abs(currentTop - activationLine) <= 34) {
        return clampedCurrentIndex;
      }

      let closestIndex = clampedCurrentIndex;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const top = card.getBoundingClientRect().top;
        const distance = Math.abs(top - activationLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const handleSectionScroll = () => {
      const sections = [
        { id: "home", element: document.getElementById("home") },
        { id: "services", element: document.getElementById("services") },
        { id: "about", element: document.getElementById("about") },
        { id: "appointment", element: document.getElementById("appointment") },
        { id: "forms", element: document.getElementById("forms") },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      setActiveServiceCard((prev) =>
        getCardIndexAtViewportLine("[data-mobile-service-card]", prev),
      );
      setActiveWhyFeature((prev) =>
        getCardIndexAtViewportLine("[data-mobile-why-card]", prev),
      );
    };

    let rafId = null;
    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      rafId = window.requestAnimationFrame(() => {
        handleSectionScroll();
        isTicking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleSectionScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="relative isolate overflow-clip bg-white text-slate-900">
      {isBooting && (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-[radial-gradient(circle_at_20%_20%,#eff8ff,#dcecff_45%,#cde3f9_100%)]">
          <div className="absolute inset-0 surface-noise opacity-40" />
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <div className="relative grid h-28 w-28 place-items-center">
              <span className="absolute h-28 w-28 rounded-full border-2 border-[var(--tl-primary)]/20" />
              <span className="absolute h-28 w-28 rounded-full border-2 border-transparent border-t-[var(--tl-primary)] border-r-[var(--tl-primary)]/45 animate-spin" />
              <span className="absolute h-20 w-20 rounded-full border-2 border-transparent border-b-[var(--tl-primary)]/50 border-l-[var(--tl-primary)]/60 animate-[spin_2.4s_linear_infinite_reverse]" />
              <Image
                src="/images/24x7-logo.png"
                alt={t("Hero.logoAlt")}
                width={90}
                height={52}
                className="h-11 w-auto"
                priority
              />
            </div>

            <div className="space-y-2">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--tl-primary-strong)]">
                {t("Hero.loadingTitle")}
              </p>
              <p className="text-sm text-slate-600">
                {t("Hero.loadingSubtitle")}
              </p>
            </div>

            <div className="progress-shimmer h-1.5 w-56 rounded-full bg-slate-200/80" />
          </div>
        </div>
      )}

      <main>
        <section
          id="home"
          data-reveal
          className="scroll-reveal relative overflow-hidden bg-[linear-gradient(140deg,#d8ebff_0%,#f3f9ff_40%,#c5e0fb_100%)] pb-16 pt-10 md:pb-24 md:pt-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-drift absolute -left-24 top-12 h-72 w-72 rounded-full bg-[var(--tl-primary)]/20 blur-3xl" />
            <div className="animate-drift absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1240px] gap-8 px-4 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-6">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tl-primary-strong)]">
                <Clock3 className="h-4 w-4" />
                {t("Hero.badge")}
              </span>

              <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl xl:text-6xl">
                <span className="hero-line block">{t("Hero.line1")}</span>
                <span className="hero-line mt-1 block text-[var(--tl-primary)]">
                  {t("Hero.line2")}
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
                {t("Hero.body")}
              </p>

              <div className="grid max-w-xl gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-sky-100 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="text-sm text-slate-600">
                    {t("Hero.hoursWeekdays")}
                    <br />
                    {t("Hero.hoursSaturday")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="text-sm text-slate-600">
                    6107 Memorial Hwy.
                    <br />
                    Suite F, Tampa, Florida
                  </p>
                </div>
              </div>

              <p className="max-w-lg text-sm font-semibold text-slate-700 md:text-base">
                {t("Hero.subText")}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#appointment"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:bg-[var(--tl-primary-strong)] sm:w-auto"
                >
                  {t("Hero.scheduleButton")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:8139323741"
                  className="phone-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--tl-primary)]/50 bg-white/90 px-6 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:bg-white sm:w-auto"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t("Hero.callButton")}
                </a>
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-50/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white sm:w-auto"
                >
                  {t("Hero.locationsButton")}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[var(--tl-primary)]/30 via-cyan-200/20 to-transparent blur-2xl" />
              <div className="relative z-10 overflow-hidden rounded-[24px] border border-white/80 bg-white/70 p-3 shadow-[0_30px_80px_-40px_rgba(38,127,199,0.7)] backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                  {heroSlides.map((slide, index) => (
                    <Image
                      key={slide.image}
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className={`object-cover transition-all duration-700 ${
                        index === activeSlide
                          ? "scale-100 opacity-100"
                          : "scale-105 opacity-0"
                      }`}
                      priority={index === 0}
                    />
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/90 px-3 py-2.5 sm:mt-4 sm:px-4 sm:py-3">
                  <p className="min-w-0 text-xs font-semibold text-slate-700 sm:text-sm">
                    {t("Hero.trustedBy")}
                  </p>
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.image}
                        type="button"
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeSlide
                            ? "w-8 bg-[var(--tl-primary)]"
                            : "w-2.5 bg-slate-300"
                        }`}
                        aria-label={t("Hero.slideAria", { index: index + 1 })}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAiFinderOpen(true)}
                className="relative z-10 mt-5 w-full rounded-[20px] border-2 border-[var(--tl-primary-strong)] bg-white/98 px-6 py-4 text-center font-display text-[1.45rem] font-bold text-[var(--tl-primary-strong)] shadow-[0_18px_38px_-28px_rgba(2,6,14,0.6)] transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  {isSpanish
                    ? "Encuentra la prueba correcta con IA"
                    : "Find the Right Test with AI"}
                </div>
              </button>
            </div>
          </div>
        </section>

        <section
          id="services"
          data-reveal
          data-reveal-delay="70"
          className="scroll-reveal relative bg-white py-16 md:py-24 services-section"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title={t("Services.title")}
              subtitle={t("Services.subtitle")}
            />

            <div className="mt-12 flex flex-col items-center gap-6 sm:grid sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {serviceCards.map((service, index) => {
                const isActive = index === activeServiceCard;

                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    data-mobile-service-card
                    className={`service-card group relative mx-auto self-center h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-[#1f6db2] to-[#0d4f87] px-4 pb-5 pt-4 text-white shadow-lg transition-[padding,box-shadow,border-color] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(16,90,151,0.85)] sm:min-h-[300px] lg:min-h-[320px] ${
                      isActive
                        ? "border-sky-100/65 shadow-sky-100 max-[639px]:border-sky-200/70 max-[639px]:pb-6 max-[639px]:shadow-[0_22px_52px_-34px_rgba(16,90,151,0.85)]"
                        : "border-sky-100/65 shadow-sky-100 xl:border-sky-100"
                    }`}
                  >
                    <span className="pointer-events-none absolute -right-16 -top-14 h-36 w-36 rounded-full bg-cyan-300/20 blur-xl transition group-hover:scale-125" />
                    <span className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-blue-900/20 blur-xl" />

                    <div className="relative">
                      <div
                        className={`flex items-center gap-3 transition-[margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? "mb-0 max-[639px]:mb-5" : "mb-0"
                        }`}
                      >
                        <div
                          className={`inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "h-12 w-12 max-[639px]:h-16 max-[639px]:w-16"
                              : "h-12 w-12"
                          }`}
                        >
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={38}
                            height={38}
                            className={`transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive
                                ? "h-7 w-7 max-[639px]:h-9 max-[639px]:w-9"
                                : "h-7 w-7"
                            }`}
                          />
                        </div>
                        <h3
                          className={`min-w-0 font-display font-bold leading-tight ${
                            isActive
                              ? "text-[1.04rem] sm:text-lg"
                              : "text-[1.04rem] sm:text-lg"
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <p
                        className={`overflow-hidden text-sm leading-relaxed text-blue-50/90 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "delay-[160ms] mt-3 max-h-44 opacity-100"
                            : "delay-0 mt-0 max-h-0 opacity-0 sm:mt-3 sm:max-h-36 sm:opacity-100"
                        }`}
                      >
                        {service.description}
                      </p>
                      <span
                        className={`overflow-hidden text-xs font-semibold uppercase tracking-wider text-cyan-100 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "delay-[220ms] mt-5 inline-flex max-h-8 items-center gap-2 opacity-100"
                            : "delay-0 mt-0 inline-flex max-h-0 items-center gap-2 opacity-0 sm:mt-5 sm:max-h-8 sm:opacity-100"
                        }`}
                      >
                        {t("Services.learnMore")}
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </span>
                    </div>

                    <span className="absolute right-4 top-3 text-xs font-bold text-white/45">
                      0{index + 1}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="about"
          data-reveal
          data-reveal-delay="100"
          className="scroll-reveal relative overflow-hidden bg-[#f0f7ff] py-16 md:py-24 why-choose-section"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(38,127,199,0.18),transparent_55%)]" />
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title={t("WhyChoose.title")}
              subtitle={t("WhyChoose.subtitle")}
            />

            <div className="mt-14 hidden items-center gap-10 xl:grid xl:grid-cols-[1fr_340px_1fr]">
              <div className="marquee-vertical h-[430px]">
                <div className="marquee-vertical-track-down">
                  <div className="marquee-vertical-group gap-7">
                    {whyChooseLeftTape.map((feature, index) => (
                      <WhyChooseFeatureCard
                        key={`why-left-${feature.title}-${index}`}
                        feature={feature}
                        iconAlt={t("WhyChoose.featureIconAlt")}
                      />
                    ))}
                  </div>
                  <div
                    className="marquee-vertical-group gap-7"
                    aria-hidden="true"
                  >
                    {whyChooseLeftTape.map((feature, index) => (
                      <WhyChooseFeatureCard
                        key={`why-left-dup-${feature.title}-${index}`}
                        feature={feature}
                        iconAlt={t("WhyChoose.featureIconAlt")}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mx-auto h-[420px] w-full max-w-[320px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--tl-primary)]/25 to-transparent blur-3xl" />
                <Image
                  src="/images/img-03.png"
                  alt={t("WhyChoose.microscopeAlt")}
                  fill
                  sizes="320px"
                  className="object-contain drop-shadow-[0_24px_35px_rgba(18,67,112,0.28)]"
                />
              </div>

              <div className="marquee-vertical h-[430px]">
                <div className="marquee-vertical-track-up">
                  <div className="marquee-vertical-group gap-7">
                    {whyChooseRightTape.map((feature, index) => (
                      <WhyChooseFeatureCard
                        key={`why-right-${feature.title}-${index}`}
                        feature={feature}
                        iconLeft
                        iconAlt={t("WhyChoose.featureIconAlt")}
                      />
                    ))}
                  </div>
                  <div
                    className="marquee-vertical-group gap-7"
                    aria-hidden="true"
                  >
                    {whyChooseRightTape.map((feature, index) => (
                      <WhyChooseFeatureCard
                        key={`why-right-dup-${feature.title}-${index}`}
                        feature={feature}
                        iconLeft
                        iconAlt={t("WhyChoose.featureIconAlt")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:grid sm:grid-cols-2 xl:hidden">
              {whyChooseFeatures.map((feature, index) => {
                const isActive = index === activeWhyFeature;

                return (
                  <article
                    key={feature.title}
                    data-mobile-why-card
                    className={`feature-card mx-auto self-center w-full overflow-hidden rounded-2xl border shadow-sm transition-[padding,box-shadow,border-color,background-color] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "border-sky-300 bg-[#f7fbff] px-4 pb-6 pt-4 shadow-[0_16px_38px_-24px_rgba(3,86,197,0.45)]"
                        : "border-sky-100 bg-white px-4 pb-4 pt-4"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={feature.icon}
                        alt={t("WhyChoose.featureIconAlt")}
                        width={46}
                        height={46}
                        className="h-11 w-11 shrink-0"
                      />
                      <div className="min-w-0 pr-1">
                        <h3 className="font-display text-base font-extrabold leading-tight text-slate-900">
                          {feature.title}
                        </h3>
                        <p
                          className={`overflow-hidden text-sm text-slate-600 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "delay-[160ms] mt-2 max-h-24 opacity-100"
                              : "delay-0 mt-0 max-h-0 opacity-0"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="#appointment"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--tl-primary-strong)]"
              >
                {t("WhyChoose.bookTestButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          data-reveal
          data-reveal-delay="130"
          className="scroll-reveal bg-white py-16 md:py-24 process-section"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title={t("Process.title")}
              subtitle={t("Process.subtitle")}
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step) => (
                <div
                  key={step.title}
                  className="how-it-works-gradient-border group rounded-[26px] p-[2.5px] shadow-[0_16px_40px_-30px_rgba(3,86,197,0.7)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-28px_rgba(3,86,197,0.75)]"
                >
                  <article className="relative h-full rounded-[24px] border border-white/70 bg-white p-7 transition-colors duration-300 group-hover:bg-[#f8fbff]">
                    <span className="absolute right-6 top-6 text-xs font-bold uppercase tracking-wider text-sky-200">
                      {t("Process.badge")}
                    </span>
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={70}
                      height={70}
                      className="h-[70px] w-[70px]"
                    />
                    <h3 className="mt-6 font-display text-xl font-extrabold text-[var(--tl-primary-strong)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          data-reveal
          data-reveal-delay="150"
          className="scroll-reveal bg-[#f8fbff] py-16 md:py-24 review-section"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 lg:px-6">
            <div className="mx-auto w-full max-w-[1360px]">
              <div className="marquee-right border-b border-sky-100 pb-10">
                <div className="marquee-track-right-fast gap-6">
                  <div className="marquee-group items-center gap-6">
                    {certificationMarqueeLogos.map((logo, index) => (
                      <div
                        key={`primary-${logo}-${index}`}
                        className="cert-logo-focus rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
                      >
                        <Image
                          src={logo}
                          alt={t("Reviews.certificationAlt")}
                          width={160}
                          height={70}
                          className="h-[50px] w-auto"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className="marquee-group items-center gap-6"
                    aria-hidden="true"
                  >
                    {certificationMarqueeLogos.map((logo, index) => (
                      <div
                        key={`duplicate-${logo}-${index}`}
                        className="cert-logo-focus rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
                      >
                        <Image
                          src={logo}
                          alt=""
                          width={160}
                          height={70}
                          className="h-[50px] w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  {t("Reviews.title")}
                </h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--tl-primary)]" />
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/DSC09527-Edit.jpg"
                      alt={t("Reviews.placeImageAlt")}
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {t("Reviews.placeName")}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {t("Reviews.googleReviews")}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
                  >
                    {t("Reviews.writeReview")}
                  </button>
                </aside>

                <div className="min-w-0 space-y-4">
                  <div className="marquee-right hidden min-w-0 md:block">
                    <div className="marquee-track-left-to-right gap-4">
                      <div className="marquee-group gap-4">
                        {reviews.map((review) => (
                          <article
                            key={`primary-${review.name}`}
                            className="w-[300px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm lg:w-[340px]"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                                  {review.avatar}
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-slate-900">
                                    {review.name}
                                  </h3>
                                  <p className="text-xs text-slate-500">
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                              <BadgeCheck className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                              {review.text}
                            </p>
                          </article>
                        ))}
                      </div>
                      <div className="marquee-group gap-4" aria-hidden="true">
                        {reviews.map((review) => (
                          <article
                            key={`duplicate-${review.name}`}
                            className="w-[300px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm lg:w-[340px]"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                                  {review.avatar}
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-slate-900">
                                    {review.name}
                                  </h3>
                                  <p className="text-xs text-slate-500">
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                              <BadgeCheck className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <Star className="h-3.5 w-3.5 fill-current" />
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                              {review.text}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="review-card rounded-3xl border border-sky-100 bg-white p-5 shadow-sm md:hidden">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevReview}
                        aria-label={t("Reviews.previousAria")}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-slate-900">
                          {reviews[activeReview].name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {reviews[activeReview].date}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={nextReview}
                        aria-label={t("Reviews.nextAria")}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="review-stars mt-4 flex justify-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <p className="mt-3 text-center text-sm text-slate-600">
                      {reviews[activeReview].text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="appointment"
          data-reveal
          data-reveal-delay="170"
          className="scroll-reveal relative isolate overflow-hidden bg-[linear-gradient(120deg,rgba(7,41,73,0.95),rgba(12,89,151,0.9))] py-16 md:py-24"
        >
          <div className="relative mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-8">
                <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                  {t("Appointment.title")}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100">
                  {t("Appointment.body")}
                </p>
                <div className="mt-7 space-y-3 text-sm text-blue-50">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("Appointment.address")}
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("Appointment.openAllDay")}
                  </p>
                  <p className="flex items-start gap-2">
                    <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("Appointment.phone")}
                  </p>
                  <p className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("Appointment.email")}
                  </p>
                </div>
              </div>

              <form
                className="rounded-3xl border border-white/15 bg-white/95 p-5 shadow-2xl shadow-black/20 sm:p-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    {t("Appointment.fields.name.label")}
                    <input
                      type="text"
                      placeholder={t("Appointment.fields.name.placeholder")}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    {t("Appointment.fields.email.label")}
                    <input
                      type="email"
                      placeholder={t("Appointment.fields.email.placeholder")}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    {t("Appointment.fields.phone.label")}
                    <input
                      type="tel"
                      placeholder={t("Appointment.fields.phone.placeholder")}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    {t("Appointment.fields.selectLocation.label")}
                    <select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15">
                      {appointmentLocations.map((location) => (
                        <option key={location}>{location}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                    {t("Appointment.fields.date.label")}
                    <input
                      type="date"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                    {t("Appointment.fields.symptoms.label")}
                    <textarea
                      rows={5}
                      placeholder={t("Appointment.fields.symptoms.placeholder")}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                </div>

                <div className="mt-5 text-center sm:text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[var(--tl-primary-strong)]"
                  >
                    {t("Appointment.sendRequest")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section
          data-reveal
          data-reveal-delay="190"
          className="scroll-reveal h-[320px] w-full sm:h-[380px] md:h-[450px]"
        >
          <iframe
            title={t("Appointment.mapTitle")}
            aria-label={t("Appointment.mapAria")}
            src="https://maps.google.com/maps?q=24-7%20Labs%20Memorial%20Hwy&t=m&z=13&output=embed&iwloc=near"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        <section
          id="forms"
          data-reveal
          data-reveal-delay="220"
          className="scroll-reveal bg-white py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title={t("FAQ.title")}
              subtitle={t("FAQ.subtitle")}
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {[faqLeft, faqRight].map((list, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {list.map((item, itemIndex) => {
                    const faqId = `${columnIndex}-${itemIndex}`;
                    const isActive = activeFaqId === faqId;

                    return (
                      <article
                        key={item.question}
                        onMouseEnter={() => setActiveFaqId(faqId)}
                        onMouseLeave={() =>
                          setActiveFaqId((current) =>
                            current === faqId ? null : current,
                          )
                        }
                        onClick={() =>
                          setActiveFaqId((current) =>
                            current === faqId ? null : faqId,
                          )
                        }
                        className={`group overflow-hidden rounded-2xl border border-sky-100 transition-colors duration-300 ${
                          isActive ? "bg-white" : "bg-[#e5f3ff]"
                        }`}
                      >
                        <div className="faq-question flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-800">
                          <span>{item.question}</span>
                          <span
                            className={`faq-question-icon grid h-6 w-6 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 leading-none transition-transform duration-300 ${
                              isActive ? "rotate-45" : "rotate-0"
                            }`}
                          >
                            +
                          </span>
                        </div>
                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                            isActive
                              ? "grid-rows-[1fr] border-t border-sky-100 opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <p className="overflow-hidden px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600">
                            {item.answer}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Breadcrumb dots indicator for scroll progress */}
      <div className="fixed bottom-6 left-6 z-40 hidden gap-2 sm:flex">
        {breadcrumbItems.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            aria-label={t("Breadcrumb.goTo", { label: section.label })}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "w-8 bg-[var(--tl-primary)]"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            title={section.label}
          />
        ))}
      </div>

      <AITestFinderModal
        isOpen={isAiFinderOpen}
        onClose={() => setIsAiFinderOpen(false)}
        locale={locale}
      />
    </div>
  );
}
