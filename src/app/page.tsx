import {
  ArrowRightIcon,
  BugIcon,
  CalendarDaysIcon,
  CrosshairIcon,
  KeyRoundIcon,
  RadarIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import Certification from "@/components/certification";
import CompanyLogo from "@/components/company-logo";
import ConsoleBanner from "@/components/console-banner";
import InteractiveMotion from "@/components/interactive-motion";
import Navigation from "@/components/navigation";
import ResumeDownloadForm from "@/components/resume-download-form";
import Reveal from "@/components/reveal";
import Socials from "@/components/socials";
import ThemeSwitcher from "@/components/theme-switcher";
import { H1, H2, P } from "@/components/typography";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CERTIFICATIONS } from "@/data/certifications";
import { CTF_PLATFORMS } from "@/data/ctfPlatforms";
import { NAVIGATION } from "@/data/navigations";
import { SOCIALS } from "@/data/socials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-red-500/5 via-background to-rose-500/10 font-sans">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:outline focus:outline-offset-2 focus:outline-ring"
      >
        Skip to content
      </Link>
      <ConsoleBanner />
      <main
        id="main-content"
        className="flex w-full max-w-3xl flex-1 flex-col items-start justify-between gap-16 px-4 py-16 sm:items-start sm:px-16 sm:py-32"
      >
        <Reveal>
          <div className="flex w-full items-start justify-between gap-4">
            <nav className="flex items-center gap-2">
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
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:items-start">
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-center">
                <H1>Andrew Virya Victorio</H1>
                <span className="mx-2 hidden text-muted-foreground sm:inline">
                  |
                </span>
                <P className="font-mono text-lg">dedgh0st</P>
              </div>
              <P className="font-inter text-muted-foreground text-sm">
                Offensive Security Researcher | Penetration Tester | CTF Player
              </P>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <InteractiveMotion className="min-w-0 flex-1 sm:w-auto sm:flex-none">
                <Button
                  className="w-full sm:w-auto"
                  variant="outline"
                  data-cal-namespace="quick-call"
                  data-cal-link="avv210/quick-call"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                >
                  <CalendarDaysIcon aria-hidden="true" />
                  Have a Quick Call
                </Button>
              </InteractiveMotion>
              <InteractiveMotion className="min-w-0 flex-1 sm:w-auto sm:flex-none">
                <ResumeDownloadForm />
              </InteractiveMotion>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="whoami"
            className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:items-start"
          >
            <div className="flex flex-col items-start gap-4">
              <Link href="#whoami">
                <H2 className="underline underline-offset-4">Who Am I</H2>
              </Link>
              <div className="flex flex-col gap-1 items-start">
                <P>I break systems legally for a living.</P>
                <P>
                  An offensive security practitioner with a defensive mindset.
                </P>
                <P>
                  Outside of work, I sharpen my skills through CTF challenges,
                  security research, and professional certifications.
                </P>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  <BugIcon aria-hidden="true" />
                  Web App Security
                </Badge>
                <Badge variant="outline">
                  <RadarIcon aria-hidden="true" />
                  Vulnerability Assessment
                </Badge>
                <Badge variant="outline">
                  <CrosshairIcon aria-hidden="true" />
                  Penetration Testing
                </Badge>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <InteractiveMotion className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto" variant="outline" asChild>
                  <Link
                    href="/who-am-i"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More About Me
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </InteractiveMotion>
            </div>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="ctf"
            className="flex w-full flex-col items-start gap-4 sm:w-auto"
          >
            <Link href="#ctf">
              <H2 className="underline underline-offset-4">CTF</H2>
            </Link>
            <P>
              Sharpening my cyber security skills in safe and controlled
              environments.
            </P>
            <div className="grid w-full grid-cols-5 gap-4 sm:w-auto">
              {CTF_PLATFORMS.map((platform) => (
                <InteractiveMotion key={platform.href}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Link
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${platform.name}`}
                        className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Avatar className="size-12">
                          <CompanyLogo
                            domain={platform.domain}
                            className="size-full rounded-full object-contain p-1"
                          />
                        </Avatar>
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit">
                      <P>{platform.name}</P>
                    </HoverCardContent>
                  </HoverCard>
                </InteractiveMotion>
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="tools"
            className="flex w-full flex-col items-start gap-4 sm:w-auto"
          >
            <Link href="#tools">
              <H2 className="underline underline-offset-4">Tools</H2>
            </Link>
            <ul className="w-full">
              <li>
                <Card className="border-border bg-card py-0 shadow-none ring-1 ring-foreground/10">
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <Link
                        href="/password-tools"
                        className="inline-flex items-center gap-2 font-heading text-sm font-semibold underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        <KeyRoundIcon aria-hidden="true" className="size-4" />
                        Password Tools
                      </Link>
                      <P className="text-muted-foreground">
                        Check passwords against known breaches and generate
                        strong passwords locally. No credit card or personal
                        information required.
                      </P>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <Link href="/password-tools">
                        Open tool
                        <ArrowRightIcon aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </li>
            </ul>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="articles-media"
            className="flex w-full flex-col items-start gap-4 sm:w-auto"
          >
            <Link href="#articles-media">
              <H2 className="underline underline-offset-4">Other Activity</H2>
            </Link>
            <P className="w-full sm:w-sm">
              Writing CTF write-ups and security breakdowns on{" "}
              <Link
                href="https://medium.com/@dedgh0st"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Medium
              </Link>
              , plus sharing bite-sized cybersec content on{" "}
              <Link
                href="https://www.tiktok.com/@andrewvirya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                TikTok.
              </Link>
            </P>
            <P>
              Another channel I had including my{" "}
              <Link
                href="https://www.youtube.com/@d3dgh0st"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                YouTube
              </Link>{" "}
              channel
            </P>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="socials"
            className="flex w-full flex-col items-start gap-4 sm:w-auto"
          >
            <Link href="#socials">
              <H2 className="underline underline-offset-4">Socials</H2>
            </Link>
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
              {SOCIALS.map((social) => (
                <Socials
                  key={social.name}
                  handle={social.handle}
                  name={social.name}
                  socialUrl={social.socialUrl}
                />
              ))}
            </div>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section
            id="certifications"
            className="flex w-full flex-col items-start gap-4 sm:w-auto"
          >
            <Link href="#certifications">
              <H2 className="underline underline-offset-4">Certifications</H2>
            </Link>
            <ul className="flex w-full flex-col gap-4 sm:w-auto">
              {CERTIFICATIONS.map((certification) => (
                <Certification
                  key={certification.name}
                  name={certification.name}
                  href={certification.href}
                  credentialId={certification.credentialId}
                  issuedBy={certification.issuedBy}
                  issuedDate={certification.issuedDate}
                  expirationDate={certification.expirationDate}
                />
              ))}
            </ul>
          </section>
        </Reveal>
      </main>
      <footer className="flex flex-col w-full max-w-3xl items-center border-t px-4 py-6 text-sm text-muted-foreground sm:px-16">
        <pre
          role="img"
          aria-label="dedghost text art"
          className="mb-6 w-full whitespace-pre font-mono text-[clamp(0.55rem,2.7vw,1.25rem)] leading-tight"
        >
          {[
            "▗▄▄▄  ▗▞▀▚▖   ▐▌ ▗▄▄▖▐▌   ▄▀▀▚▖ ▄▄▄  ■",
            "▐▌  █ ▐▛▀▀▘   ▐▌▐▌   ▐▌   █  ▐▌▀▄▄▗▄▟▙▄▖",
            "▐▌  █ ▝▚▄▄▖▗▞▀▜▌▐▌▝▜▌▐▛▀▚▖█  ▐▌▄▄▄▀ ▐▌",
            "▐▙▄▄▀      ▝▚▄▟▌▝▚▄▞▘▐▌ ▐▌▀▄▄▞▘     ▐▌",
            "                                    ▐▌",
          ].join("\n")}
        </pre>
        <div className="flex w-full items-center justify-between">
          <P>
            Design inspos from{" "}
            <Link
              href="https://shadcn.com/"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              ShadCN
            </Link>
          </P>
          <P>© 2026 Andrew Virya Victorio</P>
          <Link
            href="#main-content"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Back to top ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}
