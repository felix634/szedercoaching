"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Bubbles from "@/components/Bubbles";
import WaveDivider from "@/components/WaveDivider";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxQuote from "@/components/ParallaxQuote";
import Marquee from "@/components/Marquee";
import DropIntro from "@/components/DropIntro";
import WaterCard from "@/components/WaterCard";
import ImageCarousel from "@/components/ImageCarousel";
import RichText from "@/components/RichText";
import { LIMITS, type ContactPayload } from "@/lib/contact";
import { phoneHref, type Heading, type HomeContent } from "@/sanity/content";

// All texts and images come from Sanity (see src/sanity/); this file only lays them out.

/** Section title from Sanity: plain part, then the highlighted part. */
function Title({ heading, highlightClassName = "gradient-text italic" }: { heading: Heading | null; highlightClassName?: string }) {
  if (!heading) return null;
  return (
    <>
      {heading.text}
      {heading.text && heading.highlight ? " " : null}
      {heading.highlight && <span className={highlightClassName}>{heading.highlight}</span>}
    </>
  );
}

/** A card's tag chips; the slot decides their look. */
function Chips({ tags, className, chipClassName }: { tags?: string[] | null; className: string; chipClassName: string }) {
  if (!tags?.length) return null;
  return (
    <div className={`flex flex-wrap ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className={chipClassName}>
          {tag}
        </span>
      ))}
    </div>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

async function submitForm(
  payload: ContactPayload,
  setStatus: (status: FormStatus) => void,
  form: HTMLFormElement
) {
  setStatus("sending");
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    form.reset();
    setStatus("success");
  } catch {
    setStatus("error");
  }
}

export default function HomePage({ content }: { content: HomeContent }) {
  const { hero, marquee, story, stats, about, offers, quote, gallery, testimonials, cooperation, contact } =
    content;
  const { card1, card2, card3, card4, card5, card6, card7, card8 } =
    offers ?? ({} as Partial<NonNullable<HomeContent["offers"]>>);
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [feedbackStatus, setFeedbackStatus] = useState<FormStatus>("idle");

  const errorMessage = `Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut${
    contact?.email ? ` oder schreiben Sie direkt an ${contact.email}` : ""
  }.`;

  return (
    <main className="relative overflow-hidden">
      <DropIntro />
      <Bubbles count={10} />
      <Navbar />

      {/* ===== HERO ===== */}
      <Hero content={hero} />

      {/* ===== MARQUEE ===== */}
      <Marquee words={marquee ?? []} />

      {/* ===== SZEDER STORY ===== */}
      <section id="geschichte" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={story?.eyebrow}>
            <Title heading={story?.heading ?? null} />
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-water-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {story?.image && (
                <ParallaxImage
                  src={story.image.url}
                  alt={story.image.alt ?? ""}
                  position={story.image.position}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="aspect-square rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-water-950/60 to-transparent" />
                </ParallaxImage>
              )}
            </div>

            <AnimatedSection delay={0.2} direction="right">
              <div className="space-y-6">
                {story?.quote && (
                  <blockquote className="font-heading text-2xl md:text-3xl italic text-cream/90 leading-relaxed border-l-2 border-water-500 pl-6">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                )}
                <div className="space-y-4 text-cream/50 text-base leading-relaxed pl-6">
                  <RichText value={story?.body ?? null} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative py-16 bg-water-900/40 border-y border-water-800/20 noise-overlay">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(stats ?? []).map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-cream/40 text-sm tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ÜBER MICH ===== */}
      <section id="über-mich" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={about?.eyebrow}>
            <Title heading={about?.heading ?? null} />
          </SectionHeading>

          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
            <div className="md:col-span-2 relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-water-400/15 via-water-600/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {about?.image && (
                <ParallaxImage
                  src={about.image.url}
                  alt={about.image.alt ?? ""}
                  position={about.image.position}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="aspect-[3/4] rounded-2xl border border-water-800/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-water-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-heading text-xl font-semibold text-cream">{about.name}</p>
                    <p className="text-water-400 text-sm">{about.role}</p>
                  </div>
                </ParallaxImage>
              )}
            </div>

            <AnimatedSection delay={0.3} direction="right" className="md:col-span-3">
              <div className="space-y-6">
                {about?.missionTitle && (
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-cream animated-underline inline-block pb-2">
                    {about.missionTitle}
                  </h3>
                )}
                <div className="space-y-5 text-cream/50 text-base md:text-lg leading-relaxed">
                  <RichText value={about?.body ?? null} />
                  {about?.highlight && <p className="text-cream/70 font-medium">{about.highlight}</p>}
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {(about?.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-water-500/10 border border-water-500/20 text-water-400 text-xs tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ANGEBOTE ===== */}
      <WaveDivider colorFrom="#0c1a35" colorTo="#172e59" />
      <section id="angebote" className="relative bg-water-900 py-24 md:py-36 noise-overlay">
        <div className="absolute inset-0 water-caustics opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={offers?.eyebrow} eyebrowClassName="text-water-400" intro={offers?.intro}>
            <Title heading={offers?.heading ?? null} />
          </SectionHeading>

          {/* === BENTO GRID === */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* ROW 1: Hero card (wide) + stacked pair */}
            <AnimatedSection delay={0.05} className="md:col-span-7">
              <WaterCard className="glass-card h-full group">
                <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-[280px]">
                  {card1?.label && (
                    <div className="absolute top-6 right-6 md:top-8 md:right-8">
                      <span className="text-[10px] tracking-wider uppercase text-water-950 bg-water-400 px-3 py-1.5 rounded-full font-semibold">
                        {card1.label}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-water-400/15 border border-water-400/25 flex items-center justify-center text-water-300 mb-6 group-hover:bg-water-400/25 transition-all duration-500">
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3 group-hover:text-water-200 transition-colors">
                      {card1?.title}
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed max-w-md">{card1?.text}</p>
                  </div>
                  <Chips
                    tags={card1?.tags}
                    className="items-center gap-3 mt-6"
                    chipClassName="text-xs text-water-400 bg-water-400/10 px-3 py-1 rounded-full border border-water-400/15"
                  />
                </div>
              </WaterCard>
            </AnimatedSection>

            <div className="md:col-span-5 flex flex-col gap-5">
              <AnimatedSection delay={0.1}>
                <WaterCard className="glass-card group">
                  <div className="p-7 flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 flex-shrink-0 group-hover:bg-water-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-cream mb-1.5 group-hover:text-water-200 transition-colors">
                        {card2?.title}
                      </h3>
                      <p className="text-cream/40 text-sm leading-relaxed">{card2?.text}</p>
                      <Chips
                        tags={card2?.tags}
                        className="gap-2 mt-2"
                        chipClassName="text-[10px] tracking-wider uppercase text-water-500 bg-water-500/10 px-3 py-1 rounded-full"
                      />
                    </div>
                  </div>
                </WaterCard>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <WaterCard className="glass-card group">
                  <div className="p-7 flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 flex-shrink-0 group-hover:bg-water-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-cream mb-1.5 group-hover:text-water-200 transition-colors">
                        {card3?.title}
                      </h3>
                      <p className="text-cream/40 text-sm leading-relaxed">{card3?.text}</p>
                      <Chips
                        tags={card3?.tags}
                        className="gap-2 mt-2"
                        chipClassName="text-[10px] tracking-wider uppercase text-water-500 bg-water-500/10 px-3 py-1 rounded-full"
                      />
                    </div>
                  </div>
                </WaterCard>
              </AnimatedSection>
            </div>

            {/* ROW 2: Image card + wide feature */}
            <AnimatedSection delay={0.2} className="md:col-span-5">
              <WaterCard className="relative overflow-hidden rounded-2xl group h-full min-h-[260px]" disableWave>
                {card4?.image && (
                  <Image
                    src={card4.image.url}
                    alt={card4.image.alt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={card4.image.position ? { objectPosition: card4.image.position } : undefined}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-water-950 via-water-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-water-950/40 to-transparent" />
                <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                  {card4?.label && (
                    <span className="text-[10px] tracking-wider uppercase text-water-300 mb-2 font-medium">
                      {card4.label}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-cream mb-2">{card4?.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed max-w-sm">{card4?.text}</p>
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="md:col-span-7">
              <WaterCard className="glass-card h-full group">
                <div className="p-8 md:p-10 h-full flex flex-col justify-between min-h-[260px]">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    {card5?.label && (
                      <span className="text-[10px] tracking-wider uppercase text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/15">
                        {card5.label}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3 group-hover:text-water-200 transition-colors">
                      {card5?.title}
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed max-w-lg">{card5?.text}</p>
                  </div>
                </div>
              </WaterCard>
            </AnimatedSection>

            {/* ROW 3: Three equal cards */}
            <AnimatedSection delay={0.3} className="md:col-span-4">
              <WaterCard className="glass-card h-full group">
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 mb-5 group-hover:bg-water-500/20 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cream mb-2 group-hover:text-water-200 transition-colors">
                    {card6?.title}
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{card6?.text}</p>
                  <Chips
                    tags={card6?.tags}
                    className="gap-2 mt-4"
                    chipClassName="text-[10px] tracking-wider uppercase text-water-500 bg-water-500/10 px-3 py-1 rounded-full"
                  />
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.35} className="md:col-span-4">
              <WaterCard className="glass-card h-full group">
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500/20 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cream mb-2 group-hover:text-water-200 transition-colors">
                    {card7?.title}
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">{card7?.text}</p>
                  <Chips
                    tags={card7?.tags}
                    className="gap-2 mt-4"
                    chipClassName="text-[10px] tracking-wider uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full"
                  />
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="md:col-span-4">
              <WaterCard className="relative overflow-hidden rounded-2xl group h-full min-h-[220px]" disableWave>
                {card8?.image && (
                  <Image
                    src={card8.image.url}
                    alt={card8.image.alt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={card8.image.position ? { objectPosition: card8.image.position } : undefined}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-water-950 via-water-950/60 to-water-950/20" />
                <div className="relative z-20 p-7 flex flex-col justify-end h-full">
                  <h3 className="font-heading text-lg font-bold text-cream mb-1">{card8?.title}</h3>
                  <p className="text-cream/60 text-sm">{card8?.text}</p>
                  {card8?.linkLabel && (
                    <a href="#kontakt" className="inline-flex items-center gap-2 mt-3 text-water-300 text-sm font-medium hover:text-water-200 transition-colors group/link">
                      {card8.linkLabel}
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </WaterCard>
            </AnimatedSection>

          </div>
        </div>
      </section>
      <WaveDivider colorFrom="#172e59" colorTo="#0c1a35" flip />

      {/* ===== PARALLAX QUOTE ===== */}
      <ParallaxQuote content={quote} />

      {/* ===== GALERIE ===== */}
      <section id="galerie" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={gallery?.eyebrow} intro={gallery?.intro}>
            <Title heading={gallery?.heading ?? null} />
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {(gallery?.groups ?? []).filter((group) => group.images?.length).map((group, i) => (
              <AnimatedSection key={group._key} delay={i * 0.1}>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-water-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-water-800/30">
                    <ImageCarousel images={group.images ?? []} alt={group.title} />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pointer-events-none">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-cream">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ERFAHRUNGEN / FEEDBACK ===== */}
      <WaveDivider colorFrom="#0c1a35" colorTo="#172e59" />
      <section id="erfahrungen" className="relative bg-water-900 py-24 md:py-36 noise-overlay">
        <div className="absolute inset-0 water-caustics opacity-15" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={testimonials?.eyebrow} eyebrowClassName="text-water-400" intro={testimonials?.intro}>
            <Title heading={testimonials?.heading ?? null} />
          </SectionHeading>

          {/* Testimonials */}
          <div className="space-y-8 mb-20 md:mb-24">
            {(testimonials?.items ?? []).map((t, i) => (
              <AnimatedSection key={t._key} delay={0.1 + i * 0.1}>
                <figure className="glass-card rounded-2xl p-8 md:p-12 hover:transform-none relative overflow-hidden">
                  <svg
                    className="absolute top-6 right-8 w-16 h-16 text-water-500/10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>

                  <div className="flex gap-1 mb-6" role="img" aria-label="Bewertung: 5 von 5 Sternen">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.041 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="space-y-4 text-cream/60 text-base md:text-lg leading-relaxed">
                    <RichText value={t.body} />
                    {t.highlight && (
                      <p className="font-heading text-xl md:text-2xl italic text-water-300 pt-2">
                        {t.highlight}
                      </p>
                    )}
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-water-500/15 border border-water-500/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-water-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-cream font-medium">{t.author}</p>
                      <p className="text-water-400/60 text-sm">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>

          {/* Feedback form */}
          <AnimatedSection>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-center text-cream mb-4">
              <Title heading={testimonials?.formHeading ?? null} highlightClassName="gradient-text" />
            </h3>
            {testimonials?.formIntro && (
              <p className="text-center text-cream/40 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
                {testimonials.formIntro}
              </p>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                submitForm(
                  {
                    type: "erfahrung",
                    name: (form.elements.namedItem("feedback-name") as HTMLInputElement).value,
                    feedback: (form.elements.namedItem("feedback-text") as HTMLTextAreaElement).value,
                    company: (form.elements.namedItem("company") as HTMLInputElement).value,
                  },
                  setFeedbackStatus,
                  form
                );
              }}
              className="glass-card rounded-2xl p-8 md:p-10 hover:transform-none"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="feedback-name" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Name</label>
                  <input
                    type="text" id="feedback-name" name="feedback-name" required maxLength={LIMITS.name}
                    className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label htmlFor="feedback-text" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Ihre Erfahrung</label>
                  <textarea
                    id="feedback-text" name="feedback-text" required rows={6} maxLength={LIMITS.message}
                    className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all resize-none text-sm"
                    placeholder="Erzählen Sie von Ihrer Erfahrung mit Szeder Coaching..."
                  />
                </div>
                {/* Honeypot: offscreen statt sr-only (Screenreader sollen es nicht vorlesen), nicht disabled (Bots überspringen disabled-Felder) */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                  <label htmlFor="feedback-company">Firma</label>
                  <input type="text" id="feedback-company" name="company" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox" id="feedback-privacy" name="feedback-privacy" required
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-water-500"
                  />
                  <label htmlFor="feedback-privacy" className="text-cream/60 text-xs leading-relaxed">
                    Ich habe die{" "}
                    <a href="/datenschutz" className="text-water-300 underline hover:text-water-200 transition-colors">
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={feedbackStatus === "sending"}
                  className="w-full py-4 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {feedbackStatus === "sending" ? "Wird gesendet…" : "Erfahrung senden"}
                </button>
                {feedbackStatus === "success" && (
                  <p role="status" className="mt-4 rounded-xl border border-water-500/20 bg-water-500/10 p-4 text-sm text-water-300">
                    Vielen Dank für Ihre Rückmeldung!
                  </p>
                )}
                {feedbackStatus === "error" && (
                  <p role="status" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
      <WaveDivider colorFrom="#172e59" colorTo="#0c1a35" flip />

      {/* ===== KOOPERATION ===== */}
      {cooperation?.partners?.length ? (
        <section id="kooperation" className="relative pt-24 md:pt-36 bg-water-950 noise-overlay">
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading eyebrow={cooperation.eyebrow} className="mb-12">
              <Title heading={cooperation.heading} />
            </SectionHeading>

            <div className="space-y-6">
              {cooperation.partners.map((partner) => (
                <AnimatedSection key={partner._key} delay={0.1}>
                  <WaterCard className="glass-card group">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
                      {partner.symbol && (
                        <div
                          aria-hidden="true"
                          className="w-16 h-16 rounded-2xl bg-water-400/15 border border-water-400/25 flex items-center justify-center flex-shrink-0 group-hover:bg-water-400/25 transition-all duration-500"
                        >
                          <span className="font-heading text-4xl font-bold gradient-text leading-none">
                            {partner.symbol}
                          </span>
                        </div>
                      )}
                      <div>
                        {partner.topics && (
                          <p className="text-water-400 text-xs tracking-wider uppercase mb-2">{partner.topics}</p>
                        )}
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3 group-hover:text-water-200 transition-colors">
                          {partner.name}
                        </h3>
                        {partner.text && <p className="text-cream/50 text-base leading-relaxed">{partner.text}</p>}
                        {partner.url && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-water-500/10 border border-water-500/25 text-water-300 text-sm font-medium hover:bg-water-500/20 hover:text-water-200 transition-colors group/link"
                          >
                            {partner.linkLabel || partner.name}
                            <span className="sr-only">(öffnet in neuem Tab)</span>
                            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </WaterCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ===== KONTAKT ===== */}
      <section id="kontakt" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow={contact?.eyebrow}>
            <Title heading={contact?.heading ?? null} />
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <AnimatedSection delay={0.1} direction="left">
              <div className="glass-card rounded-2xl p-8 md:p-10 h-full hover:transform-none">
                <h3 className="font-heading text-2xl font-semibold text-cream mb-8 animated-underline inline-block pb-2">
                  {contact?.infoTitle}
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      label: "Name",
                      value: contact?.name,
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      ),
                    },
                    {
                      label: "Telefon",
                      value: contact?.phone,
                      href: contact?.phone ? `tel:${phoneHref(contact.phone)}` : undefined,
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      ),
                    },
                    {
                      label: "E-Mail",
                      value: contact?.email,
                      href: contact?.email ? `mailto:${contact.email}` : undefined,
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      ),
                    },
                    {
                      label: "Ort",
                      value: contact?.location,
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      ),
                    },
                  ].filter((item) => item.value).map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-water-500/10 border border-water-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-water-500/20 transition-colors">
                        <svg className="w-5 h-5 text-water-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-water-500 text-xs tracking-wider uppercase mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-cream text-base hover:text-water-300 transition-colors break-all">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-cream text-base">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.2} direction="right">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  submitForm(
                    {
                      type: "kontakt",
                      name: (form.elements.namedItem("name") as HTMLInputElement).value,
                      email: (form.elements.namedItem("email") as HTMLInputElement).value,
                      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                      company: (form.elements.namedItem("company") as HTMLInputElement).value,
                    },
                    setContactStatus,
                    form
                  );
                }}
                className="glass-card rounded-2xl p-8 md:p-10 hover:transform-none"
              >
                <h3 className="font-heading text-2xl font-semibold text-cream mb-8 animated-underline inline-block pb-2">
                  {contact?.formTitle}
                </h3>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Name</label>
                    <input
                      type="text" id="name" name="name" required maxLength={LIMITS.name}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-water-400 text-xs tracking-wider uppercase mb-2">E-Mail</label>
                    <input
                      type="email" id="email" name="email" required maxLength={LIMITS.email}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                      placeholder="Ihre E-Mail-Adresse"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Nachricht</label>
                    <textarea
                      id="message" name="message" required rows={5} maxLength={LIMITS.message}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all resize-none text-sm"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>
                  {/* Honeypot: offscreen statt sr-only (Screenreader sollen es nicht vorlesen), nicht disabled (Bots überspringen disabled-Felder) */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                    <label htmlFor="contact-company">Firma</label>
                    <input type="text" id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox" id="privacy" name="privacy" required
                      className="mt-0.5 h-4 w-4 flex-shrink-0 accent-water-500"
                    />
                    <label htmlFor="privacy" className="text-cream/60 text-xs leading-relaxed">
                      Ich habe die{" "}
                      <a href="/datenschutz" className="text-water-300 underline hover:text-water-200 transition-colors">
                        Datenschutzerklärung
                      </a>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full py-4 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {contactStatus === "sending" ? "Wird gesendet…" : "Nachricht senden"}
                  </button>
                  {contactStatus === "success" && (
                    <p role="status" className="mt-4 rounded-xl border border-water-500/20 bg-water-500/10 p-4 text-sm text-water-300">
                      Vielen Dank! Ihre Nachricht wurde gesendet. Ich melde mich in Kürze bei Ihnen.
                    </p>
                  )}
                  {contactStatus === "error" && (
                    <p role="status" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-water-800/20 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Szeder Coaching"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <span className="font-heading text-base font-semibold text-cream">
                  Szeder <span className="text-water-400">Coaching</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-cream/50">
              {[
                { href: "#start", label: "Start" },
                { href: "#geschichte", label: "Geschichte" },
                { href: "#über-mich", label: "Über mich" },
                { href: "#angebote", label: "Angebote" },
                { href: "#galerie", label: "Galerie" },
                { href: "#erfahrungen", label: "Erfahrungen" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="hover:text-cream/60 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-cream/50 text-xs">
              &copy; {new Date().getFullYear()} Szeder Coaching
            </p>
          </div>

          {/* Legal links */}
          <div className="mt-8 pt-6 border-t border-water-800/20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream/50">
            <a href="/impressum" className="hover:text-cream/60 transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-cream/60 transition-colors">
              Datenschutz
            </a>
          </div>

          {/* Agency credit */}
          <p className="mt-6 text-center text-xs text-cream/30">
            made by{" "}
            <a
              href="https://prometheusdigital.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream/60 transition-colors"
            >
              Prometheus Digital Kft.
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
