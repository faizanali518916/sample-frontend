"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  Star,
} from "lucide-react";

const heroSlides = [
  { image: "/images/bannerSlider/heroimg1.png", alt: "Laboratory team" },
  {
    image: "/images/bannerSlider/heroimg2.png",
    alt: "Healthcare consultation",
  },
  { image: "/images/bannerSlider/heroimg3.png", alt: "Testing service sample" },
  {
    image: "/images/bannerSlider/heroimg4.png",
    alt: "24-7 Labs testing environment",
  },
];

const serviceCards = [
  {
    icon: "/images/test-tube3.png",
    title: "Drug Screening Tests",
    description:
      "At 24-7 Labs, we offer individual, five, and ten-panel drug screening tests. We also provide DOT and employer testing services. You can expect results within 24-48 hours.",
    href: "#",
  },
  {
    icon: "/images/biotechnology3.png",
    title: "DNA Testing",
    description:
      "Our DNA tests test for maternity, paternity, grand-paternity, and siblingship. You can use the test results for legal, informational, and immigration purposes. Most lab results are provided within 72 hours.",
    href: "#",
  },
  {
    icon: "/images/sexual-transmitted-disease3.png",
    title: "STD Testing",
    description:
      "We can test for all common STDs, including herpes, gonorrhea, and chlamydia. Protect yourself and your partners from STDs. Get peace of mind knowing you are taking care of your health by getting your STD test results.",
    href: "#",
  },
  {
    icon: "/images/test-tube3.png",
    title: "Covid Tests",
    description:
      "We offer COVID-19 RT-PCR the same day and the next day. Our tests are the quickest way to get results before you need to travel. Protect yourself and your loved ones while keeping your travel plans intact.",
    href: "#",
  },
  {
    icon: "/images/test-tube3.png",
    title: "Routine Health Testing",
    description:
      "We also provide routine health tests for your convenience. These tests include diabetes, cancer panels, thyroid checks, and heart health. 24-7 Labs also offers hormone and allergy testing.",
    href: "#",
  },
  {
    icon: "/images/diabetes3.png",
    title: "Allergy Testing",
    description:
      "Did you know that more than 50 million people in the United States are affected by allergies? It is time to find out what is making you miserable every day, and get relief.",
    href: "#",
  },
  {
    icon: "/images/heart-rate3-1.png",
    title: "Heart Testing",
    description:
      "Cardiovascular disease is known to be the leading cause of death in the United States. The best way to combat heart disease is by being proactive and opting for regular testing.",
    href: "#",
  },
  {
    icon: "/images/hormone-therapy3.png",
    title: "Hormone Testing",
    description:
      "Could you be experiencing hormonal imbalances? Mood fluctuations, weight gain, lethargy, and reduced sexual desire can all be signals. Our hormone tests can help identify the root cause.",
    href: "#",
  },
];

const whyChooseFeatures = [
  {
    title: "AFFORDABLE & HSA ACCEPTED",
    description: "Cost effective, quick and accurate results on every test.",
    icon: "/images/Assetnew-2.png",
  },
  {
    title: "ROUND THE CLOCK",
    description: "Operate 24/7. Day appointments available.",
    icon: "/images/Assetnew-1.png",
  },
  {
    title: "DISCRETE",
    description: "100% confidential. No insurance or doctor script required.",
    icon: "/images/Assetnew-3.png",
  },
  {
    title: "PRESCRIPTION FOR POSITIVE RESULTS",
    description:
      "Prescription for positive results from expert physicians and doctors.",
    icon: "/images/Assetnew-4.png",
  },
  {
    title: "QUICK RESULTS",
    description: "Results in 24-48 hours for almost every test.",
    icon: "/images/Assetnew-5.png",
  },
  {
    title: "ONE STOP MARKETPLACE",
    description: "One stop shop health testing marketplace.",
    icon: "/images/Assetnew-6-1.png",
  },
];

const whyChooseLeftTape = [...whyChooseFeatures, ...whyChooseFeatures];

const whyChooseRightBase = [
  ...whyChooseFeatures.slice(3),
  ...whyChooseFeatures.slice(0, 3),
];

const whyChooseRightTape = [...whyChooseRightBase, ...whyChooseRightBase];

const processSteps = [
  {
    image: "/images/calender2.png",
    title: "Step One: Select Your Date and Time",
    description: "Choose a date and time that fits your schedule.",
  },
  {
    image: "/images/location-gredient-1.png",
    title: "Step Two: Choose the Location",
    description:
      "Book an appointment at our Tampa, Temple Terrace, or New Port Richey locations.",
  },
  {
    image: "/images/get-started.png",
    title: "Step Three: Pick a Test",
    description:
      "List which test you want to schedule along with any observations or symptoms you are experiencing.",
  },
];

const certificationLogos = [
  "/images/image2.png",
  "/images/image5.png",
  "/images/image4.png",
  "/images/image3.png",
  "/images/logo_cola.png",
];

const certificationMarqueeLogos = [
  ...certificationLogos,
  ...certificationLogos,
];

const reviews = [
  {
    avatar: "N",
    name: "Neraida Fernandez",
    date: "2021-03-17",
    text: "Personas muy amables y muy buenos precios... lugar fantastico.",
  },
  {
    avatar: "S",
    name: "Solanch Coca",
    date: "2021-03-10",
    text: "Recomiendo este lugar rapido y asequible, 100% buena atencion encantada.",
  },
  {
    avatar: "C",
    name: "Carlos Harrell",
    date: "2021-03-08",
    text: "I recommend this clinic, they take real good care of you.",
  },
];

const faqLeft = [
  {
    question: "How to book an appointment with 24-7 Labs?",
    answer:
      "Fill the form at https://24-7labs.com/schedule-appointment/ and book your appointment easily. 24-7 Labs also welcomes walk-in testing.",
  },
  {
    question: "Is there a consultancy facility available?",
    answer:
      "You can book consultation service from the Testing Services tab on the website or directly at https://24-7labs.com/product/booking-consultation/.",
  },
  {
    question: "Which home kits are you providing?",
    answer:
      "At-home chlamydia, herpes, COVID, and HIV testing kits are available, plus additional options for pregnancy, hormones, diabetes, HIV, and thyroid issues.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Your test results conducted, processed, and issued by 24-7 Labs are all 100% confidential.",
  },
  {
    question: "What types of diagnostic tests are available at your labs?",
    answer:
      "24-7 Labs offers DNA, STD, drug, heart health, and COVID-19 testing, along with allergies, pregnancy, wellness, hormones, menopause, and thyroid panels.",
  },
];

const faqRight = [
  {
    question: "What is the whole process of getting tested?",
    answer:
      "Schedule a test, visit a convenient location, get tested in-lab or via at-home kit, and receive results quickly through email notification.",
  },
  {
    question: "Can I still get COVID-19 even if I am vaccinated?",
    answer:
      "Yes, COVID-19 remains a real risk. Learn more at https://24-7labs.com/covid-19/.",
  },
  {
    question: "Is a doctor referral required?",
    answer: "No referral or insurance is required for testing at 24-7 Labs.",
  },
  {
    question: "Will I get my test results the same day?",
    answer:
      "Most results are delivered within 24-48 hours with fast processing.",
  },
  {
    question: "How much time does it take to get COVID-19 test results?",
    answer:
      "Same-day and next-day options are available at 24-7 Labs testing locations.",
  },
];

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

function WhyChooseFeatureCard({ feature, iconLeft = false }) {
  return (
    <article className="group flex items-start justify-between gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:shadow-lg">
      {iconLeft ? (
        <>
          <Image
            src={feature.icon}
            alt="Feature icon"
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
            alt="Feature icon"
            width={54}
            height={54}
            className="h-12 w-12"
          />
        </>
      )}
    </article>
  );
}

function WaveDivider({ flip = false }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${flip ? "top-0 rotate-180" : "bottom-0"}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-[56px] w-full text-white"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86C585.47-6.64,670.2,1.24,743.84,22.14c65.52,18.64,127.95,53.7,194.48,61.81,31.84,3.9,64.58-1.48,96.68-6.81V120H0V0C59.71,22.54,148.73,65.52,321.39,56.44Z"
          fill="currentColor"
          opacity="0.25"
        />
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34,30.13-10,59.74-18.3,92.5-17.31,31.77,1,62.34,12.5,90.65,26.31V0Z"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,103.68,24.34,31.43,14.29,62.84,30.08,96.59,36.14,40.89,7.35,83.74-4.25,123.9-17.93,29.57-10.07,57.57-23.06,86.45-34.73,31.13-12.59,63.62-24.1,97.59-25.2,38.18-1.23,75.88,10.36,109.88,28.45V0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

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
                alt="24-7 Labs"
                width={90}
                height={52}
                className="h-11 w-auto"
                priority
              />
            </div>

            <div className="space-y-2">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--tl-primary-strong)]">
                Loading 24-7 Labs
              </p>
              <p className="text-sm text-slate-600">
                Preparing your diagnostics experience
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
          className="scroll-reveal relative overflow-hidden bg-[linear-gradient(140deg,#d8ebff_0%,#f3f9ff_40%,#c5e0fb_100%)] pb-24 pt-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="animate-drift absolute -left-24 top-12 h-72 w-72 rounded-full bg-[var(--tl-primary)]/20 blur-3xl" />
            <div className="animate-drift absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-6">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tl-primary-strong)]">
                <Clock3 className="h-4 w-4" />
                Open 24/7 for priority diagnostics
              </span>

              <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl xl:text-6xl">
                24-7 Diagnostics Testing for
                <span className="mt-1 block text-[var(--tl-primary)]">
                  STDs, Drugs, DNA, and COVID.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
                We are a full-service medical lab providing 24-hour testing for
                STDs, DNA, COVID-19, Drugs, Basic Wellness, Allergies, Heart
                Health, Diabetes, and much more.
              </p>

              <div className="grid max-w-xl gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-sky-100 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-[var(--tl-primary)]" />
                  <p className="text-sm text-slate-600">
                    Monday - Friday: 9 AM - 7 PM
                    <br />
                    Saturday: 9 AM - 1 PM
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
                Book an appointment at 24-7 Labs, the only 24-hour full-service
                testing lab in Tampa.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#appointment"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:bg-[var(--tl-primary-strong)]"
                >
                  Schedule Appointment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:8139323741"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--tl-primary)]/50 bg-white/90 px-6 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:bg-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call Us 813 932 3741
                </a>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Locations
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[var(--tl-primary)]/30 via-cyan-200/20 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[24px] border border-white/80 bg-white/70 p-3 shadow-[0_30px_80px_-40px_rgba(38,127,199,0.7)] backdrop-blur">
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

                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/90 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-700">
                    Trusted by Tampa families and providers
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
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <WaveDivider />
        </section>

        <section
          id="services"
          data-reveal
          data-reveal-delay="70"
          className="scroll-reveal relative bg-white py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title="24-Hour Full-Service Testing Available in Tampa"
              subtitle="From wellness panels to targeted diagnostics, our broad test menu helps you move quickly from uncertainty to clarity with dependable turnaround and private care."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {serviceCards.map((service, index) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-b from-[#1f6db2] to-[#0d4f87] p-6 text-white shadow-lg shadow-sky-100 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(16,90,151,0.85)]"
                >
                  <span className="pointer-events-none absolute -right-16 -top-14 h-36 w-36 rounded-full bg-cyan-300/20 blur-xl transition group-hover:scale-125" />
                  <span className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-blue-900/20 blur-xl" />

                  <div className="relative">
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={38}
                        height={38}
                        className="h-9 w-9"
                      />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-blue-50/90">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-100">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>

                  <span className="absolute right-4 top-3 text-xs font-bold text-white/45">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          data-reveal
          data-reveal-delay="100"
          className="scroll-reveal relative overflow-hidden bg-[#f0f7ff] py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(38,127,199,0.18),transparent_55%)]" />
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title="Why Choose 24-7 Labs for Testing"
              subtitle="24-7 Labs is a 24-hour full-service testing facility in the Tampa area. Our goal is to provide patients with comprehensive medical care in one convenient location."
            />

            <div className="mt-14 hidden items-center gap-10 xl:grid xl:grid-cols-[1fr_340px_1fr]">
              <div className="marquee-vertical h-[430px]">
                <div className="marquee-vertical-track-down">
                  <div className="marquee-vertical-group gap-7">
                    {whyChooseLeftTape.map((feature, index) => (
                      <WhyChooseFeatureCard
                        key={`why-left-${feature.title}-${index}`}
                        feature={feature}
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
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mx-auto h-[420px] w-full max-w-[320px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--tl-primary)]/25 to-transparent blur-3xl" />
                <Image
                  src="/images/img-03.png"
                  alt="Microscope"
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
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:hidden">
              {whyChooseFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"
                >
                  <Image
                    src={feature.icon}
                    alt="Feature icon"
                    width={46}
                    height={46}
                    className="h-11 w-11"
                  />
                  <div>
                    <h3 className="font-display text-base font-extrabold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="#appointment"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--tl-primary-strong)]"
              >
                Book Your Test
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <WaveDivider flip />
        </section>

        <section
          data-reveal
          data-reveal-delay="130"
          className="scroll-reveal bg-white py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title="How It Works"
              subtitle="We designed our appointment process to be fast, discreet, and straightforward. Use our online scheduling tool to book an appointment in minutes."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.title}
                  className="group relative rounded-3xl border border-sky-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute right-6 top-6 text-xs font-bold uppercase tracking-wider text-sky-200">
                    24-7
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
              ))}
            </div>
          </div>
        </section>

        <section
          data-reveal
          data-reveal-delay="150"
          className="scroll-reveal bg-[#f8fbff] py-24"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 lg:px-6">
            <div className="mx-auto w-full max-w-[1360px]">
              <div className="marquee-right border-b border-sky-100 pb-10">
                <div className="marquee-track-right-fast gap-6">
                  <div className="marquee-group items-center gap-6">
                    {certificationMarqueeLogos.map((logo, index) => (
                      <div
                        key={`primary-${logo}-${index}`}
                        className="rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
                      >
                        <Image
                          src={logo}
                          alt="Certification"
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
                        className="rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
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
                  Hear What Our Happy Patients Have to Say
                </h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--tl-primary)]" />
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/DSC09527-Edit.jpg"
                      alt="24-7 Labs Memorial Hwy"
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        24-7 Labs Memorial Hwy
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        294 Google reviews
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
                  >
                    Write a review
                  </button>
                </aside>

                <div className="min-w-0 space-y-4">
                  <div className="marquee-right hidden min-w-0 md:block">
                    <div className="marquee-track-right gap-4">
                      <div className="marquee-group gap-4">
                        {reviews.map((review) => (
                          <article
                            key={`primary-${review.name}`}
                            className="w-[340px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm"
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
                            className="w-[340px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm"
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

                  <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm md:hidden">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevReview}
                        aria-label="Previous review"
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
                        aria-label="Next review"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex justify-center gap-1 text-amber-500">
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
          className="scroll-reveal relative isolate overflow-hidden py-24"
        >
          <Image
            src="/images/bannerimg-back.jpg"
            alt="Laboratory interior"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,41,73,0.92),rgba(12,89,151,0.82))]" />

          <div className="relative mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur">
                <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                  Schedule an Appointment for Testing in Tampa Today
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100">
                  Book a same-day appointment for diagnostics testing at a Tampa
                  testing lab today. Our staff is available to help you schedule
                  your appointment or answer your questions.
                </p>
                <div className="mt-7 space-y-3 text-sm text-blue-50">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    6107 Memorial Hwy, Suite F Tampa, FL
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                    We work every day, 24 hours a day.
                  </p>
                  <p className="flex items-start gap-2">
                    <PhoneCall className="mt-0.5 h-4 w-4 shrink-0" />
                    +1 (813) 932-3741
                  </p>
                  <p className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                    anytimelab@24-7labs.com
                  </p>
                </div>
              </div>

              <form
                className="rounded-3xl border border-white/15 bg-white/95 p-6 shadow-2xl shadow-black/20"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Name
                    <input
                      type="text"
                      placeholder="Your name"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Phone Number
                    <input
                      type="tel"
                      placeholder="(813) 000-0000"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Select Location
                    <select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15">
                      <option>Tampa - Memorial Hwy</option>
                      <option>Temple Terrace</option>
                      <option>New Port Richey</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                    Choose Date
                    <input
                      type="date"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                    Symptoms / Tests
                    <textarea
                      rows={5}
                      placeholder="Tell us what you need help with"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
                    />
                  </label>
                </div>

                <div className="mt-5 text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[var(--tl-primary-strong)]"
                  >
                    Send Request
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
          className="scroll-reveal h-[450px] w-full"
        >
          <iframe
            title="24-7 Labs Memorial Hwy"
            aria-label="24-7 Labs Memorial Hwy"
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
          className="scroll-reveal bg-white py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Answers to common questions about appointments, privacy, testing process, and turnaround times."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[faqLeft, faqRight].map((list, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {list.map((item) => (
                    <details
                      key={item.question}
                      className="group overflow-hidden rounded-2xl border border-sky-100 bg-[#e5f3ff] open:bg-white"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-800">
                        <span>{item.question}</span>
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="border-t border-sky-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
