import {
  ArrowRightIcon,
  BookOpenTextIcon,
  CrosshairIcon,
  ExternalLinkIcon,
  MailIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import Navigation from "@/components/navigation";
import ThemeSwitcher from "@/components/theme-switcher";
import { H1, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVIGATION } from "@/data/navigations";

export const metadata: Metadata = {
  title: "About | Andrew Virya Victorio",
  description:
    "Learn about Andrew Virya Victorio (dedgh0st), an offensive security practitioner focused on web application security, penetration testing, and security research.",
};

const professionalLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrew-virya-victorio" },
  { label: "GitHub", href: "https://github.com/dedgh0st" },
  { label: "Medium", href: "https://medium.com/@dedgh0st" },
  { label: "TryHackMe", href: "https://tryhackme.com/p/dedgh0st" },
  {
    label: "Hack The Box",
    href: "https://profile.hackthebox.com/profile/019e8001-428b-707f-9de5-38f47a199e8e",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-linear-to-br from-red-500/5 via-background to-rose-500/10 font-sans">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:outline focus:outline-offset-2 focus:outline-ring"
      >
        Skip to content
      </Link>
      <main
        id="main-content"
        className="flex w-full max-w-3xl flex-1 flex-col gap-12 px-4 py-10 sm:px-16 sm:py-16"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <nav aria-label="Main navigation" className="flex items-center gap-2">
            {NAVIGATION.map((nav, idx) => (
              <Fragment key={nav.name}>
                <Navigation name={nav.name} href={nav.href} />
                {idx < NAVIGATION.length - 1 && (
                  <span className="text-muted-foreground" aria-hidden="true">
                    /
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
          <ThemeSwitcher />
        </div>

        <header className="flex flex-col items-start gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            About me / WHOAMI
          </p>
          <div className="flex flex-col items-start gap-1">
            <H1 className="text-2xl sm:text-3xl">
              I&apos;m Andrew Virya Victorio.
            </H1>
            <P className="font-mono text-muted-foreground">
              also known as dedgh0st
            </P>
          </div>
          <P className="max-w-2xl text-base leading-7 text-muted-foreground">
            I&apos;m an offensive security practitioner and penetration tester
            focused on finding weaknesses in web applications and helping make
            systems more resilient. I approach security from both sides: I want
            to understand how a system can be tested, and what makes it stronger
            afterward.
          </P>
        </header>

        <section aria-labelledby="practice-heading" className="space-y-4">
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground">
              01 / PRACTICE
            </p>
            <h2
              id="practice-heading"
              className="font-bold font-heading text-lg"
            >
              How I work
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="border-border bg-card shadow-none ring-1 ring-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-heading text-sm">
                  <CrosshairIcon
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  Offensive security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <P className="leading-6 text-muted-foreground">
                  My focus includes web application security, vulnerability
                  assessment, penetration testing, and red teaming. I value
                  careful testing, clear evidence, and findings that help teams
                  understand what to fix.
                </P>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-none ring-1 ring-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-heading text-sm">
                  <ShieldCheckIcon
                    aria-hidden="true"
                    className="size-4 text-primary"
                  />
                  Defensive perspective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <P className="leading-6 text-muted-foreground">
                  Testing is most useful when it informs better defenses. I keep
                  impact, remediation, and the people responsible for the system
                  in view throughout the process.
                </P>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="research-heading" className="space-y-4">
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground">
              02 / RESEARCH
            </p>
            <h2
              id="research-heading"
              className="font-bold font-heading text-lg"
            >
              Learning by doing, sharing what I learn
            </h2>
          </div>
          <P className="max-w-2xl leading-7 text-muted-foreground">
            Outside structured testing, I sharpen my skills through CTF
            challenges, security research, and hands-on learning platforms. I
            also write CTF walkthroughs and security breakdowns on Medium, and
            share bite-sized cybersecurity content on TikTok. I&apos;m
            continuing to build my knowledge through practical study and a
            certification journey; the certificates I have listed are available
            on my homepage.
          </P>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                href="https://medium.com/@dedgh0st"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpenTextIcon aria-hidden="true" />
                Read my writing
                <ExternalLinkIcon aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/#certifications">
                View listed certifications
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="links-heading" className="space-y-4">
          <div className="space-y-1">
            <p className="font-mono text-xs text-muted-foreground">
              03 / CONNECT
            </p>
            <h2 id="links-heading" className="font-bold font-heading text-lg">
              Find me around the web
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {professionalLinks.map(({ label, href }) => (
              <Button key={label} variant="outline" size="sm" asChild>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                  <ExternalLinkIcon aria-hidden="true" />
                </Link>
              </Button>
            ))}
          </div>
          <Button size="sm" asChild>
            <Link href="mailto:avv03@protonmail.com">
              <MailIcon aria-hidden="true" />
              Get in touch
            </Link>
          </Button>
        </section>
      </main>

      <footer className="flex w-full max-w-3xl items-center justify-between gap-4 border-t px-4 py-6 text-sm text-muted-foreground sm:px-16">
        <P>© 2026 Andrew Virya Victorio</P>
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Back to home ↑
        </Link>
      </footer>
    </div>
  );
}
