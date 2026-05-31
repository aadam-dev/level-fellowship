"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  Layers,
  TrendingDown,
  GraduationCap,
  Users,
  BookOpen,
  Presentation,
  Scale,
} from "lucide-react";
import { campusPhases, revenuePillars, teamMembers } from "@/content/proposal";
import { problemCopy, audienceCopy, trustCopy, westFocusCopy, ctaBand } from "@/content/site";
import { marketingImages } from "@/content/images";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";

const problemIcons = {
  trending: TrendingDown,
  layers: Layers,
  alert: AlertTriangle,
};

export function ProblemSection() {
  return (
    <SectionShell>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <FadeIn>
          <SectionHeader
            label="The gap"
            title={problemCopy.title}
            description={problemCopy.subtitle}
            className="mb-0"
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="image-frame relative aspect-[4/3]">
            <Image
              src={marketingImages.campus.src}
              alt={marketingImages.campus.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </FadeIn>
      </div>
      <StaggerChildren className="mt-14 grid md:grid-cols-3 gap-6">
        {problemCopy.items.map((p, idx) => {
          const keys = ["trending", "layers", "alert"] as const;
          const IconComp = problemIcons[keys[idx]] ?? AlertTriangle;
          return (
            <StaggerItem key={p.title}>
              <div className="glass-panel p-8 h-full card-interactive">
                <div className="icon-tile w-11 h-11 mb-5">
                  <IconComp className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[var(--navy)] text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </SectionShell>
  );
}

export function ToolkitSplit() {
  return (
    <SectionShell variant="muted">
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
        <SectionHeader
          label="Delivery"
          title="One standard. Every chapter."
          description="Students get workbooks. Ambassadors get the full instructor kit. No reinventing the session each week."
          className="mb-0 lg:mb-0"
        />
        <div className="image-frame relative aspect-video">
          <Image
            src={marketingImages.workshop.src}
            alt={marketingImages.workshop.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <FadeIn>
          <div className="glass-panel-strong p-8 md:p-10 h-full card-interactive">
            <div className="icon-tile w-12 h-12 mb-4">
              <BookOpen className="w-6 h-6 text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--navy)]">Student workbooks</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              Digital and print workbooks with checkpoints. Students prove they did the work before
              exams count.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="glass-panel-strong p-8 md:p-10 h-full card-interactive">
            <div className="icon-tile w-12 h-12 mb-4">
              <Presentation className="w-6 h-6 text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-[var(--navy)]">Instructor toolkit</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              Same slides, master script, and lesson plan at every chapter. Volunteers deliver
              without reinventing the session.
            </p>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

export function CampusPhases() {
  return (
    <SectionShell>
      <SectionHeader
        label="Distribution"
        title="How chapters scale"
        description="Anchor societies first, then ISoc nodes, then a trained ambassador layer."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {campusPhases.map((phase) => (
          <FadeIn key={phase.phase}>
            <div className="glass-panel p-8 h-full card-interactive border-t-4 border-t-[var(--accent)]">
              <Badge variant="outline">{phase.phase}</Badge>
              <h3 className="font-semibold text-[var(--navy)] mt-4 text-lg">{phase.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {phase.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}

export function AudienceSection() {
  const icons = [GraduationCap, Users];
  return (
    <SectionShell variant="contrast">
      <SectionHeader
        label="Who it is for"
        title="Built for students and ambassadors"
        align="center"
        className="mx-auto"
      />
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {audienceCopy.map((b, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={b.title} delay={i * 0.06}>
              <div className="glass-panel p-8 h-full flex flex-col items-center text-center card-interactive">
                <div className="icon-tile w-14 h-14 mb-5">
                  <Icon className="w-7 h-7 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[var(--navy)] text-lg">{b.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-3 flex-1 leading-relaxed">
                  {b.description}
                </p>
                <Button asChild variant="outline" className="mt-8 w-full justify-center">
                  <Link href={b.href}>{b.cta}</Link>
                </Button>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function WestFocusSection() {
  return (
    <SectionShell>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <SectionHeader
          label={westFocusCopy.label}
          title={westFocusCopy.title}
          description={westFocusCopy.description}
          className="mb-0"
        />
        <ul className="space-y-4">
          {westFocusCopy.bullets.map((bullet, i) => (
            <FadeIn key={bullet} delay={i * 0.06}>
              <li className="glass-panel p-6 text-sm text-[var(--text-secondary)] leading-relaxed card-interactive border-l-4 border-l-[var(--accent)] pl-5">
                {bullet}
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

export function TrustBand() {
  return (
    <SectionShell variant="muted">
      <div className="grid lg:grid-cols-2 gap-10 items-center glass-panel-strong p-8 md:p-12 lg:p-14 card-interactive">
        <FadeIn>
          <div className="icon-tile w-12 h-12 mb-5">
            <Scale className="w-6 h-6 text-[var(--accent)]" strokeWidth={1.5} />
          </div>
          <h2 className="headline text-2xl md:text-3xl lg:text-4xl">{trustCopy.title}</h2>
          <p className="text-[var(--text-secondary)] mt-5 leading-relaxed text-base md:text-lg">
            {trustCopy.body}
          </p>
          <Button asChild variant="accent" size="lg" className="mt-8">
            <Link href={trustCopy.href}>{trustCopy.cta}</Link>
          </Button>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="image-frame relative aspect-[4/3]">
            <Image
              src={marketingImages.governance.src}
              alt={marketingImages.governance.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

export function RevenuePillars() {
  return (
    <SectionShell>
      <SectionHeader
        label="Sustainability"
        title="Revenue without donation dependence"
        description="Four commercial channels fund delivery while campuses keep ownership of the student experience."
      />
      <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {revenuePillars.map((pillar) => (
          <StaggerItem key={pillar.id}>
            <div className="glass-panel p-6 h-full flex flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                {pillar.id.replace("_", " ")}
              </p>
              <h3 className="text-base font-semibold text-[var(--navy)] mt-3">{pillar.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed flex-1">
                {pillar.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionShell>
  );
}

export function TeamGrid() {
  return (
    <SectionShell variant="muted">
      <SectionHeader
        label="Leadership"
        title="The team behind the platform"
        description="Program, product, and research leads operating the UK rollout."
        align="center"
        className="mx-auto"
      />
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, i) => (
          <FadeIn key={member.name} delay={i * 0.08}>
            <div className="glass-panel-strong p-8 text-center h-full card-interactive">
              <div className="logo-mark w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold text-white mx-auto">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-[var(--navy)] mt-5 text-lg">{member.name}</h3>
              <p className="text-sm text-[var(--accent)] font-medium mt-1">{member.title}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                {member.focus}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}

export function CTABand() {
  return (
    <SectionShell className="pb-28">
      <div className="relative overflow-hidden rounded-2xl cta-band p-8 sm:p-12 md:p-16 text-center text-white">
        <FadeIn className="relative z-10 max-w-2xl mx-auto">
          <h2 className="headline text-2xl sm:text-3xl md:text-4xl text-white">{ctaBand.title}</h2>
          <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">{ctaBand.body}</p>
          <div className="mt-10 btn-group justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--accent-deep)] hover:bg-slate-100 w-full sm:min-w-[200px] justify-center shadow-md"
            >
              <Link href="/auth/login">{ctaBand.primary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="inverse"
              className="w-full sm:min-w-[200px] justify-center"
            >
              <Link href="/events">{ctaBand.secondary}</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
