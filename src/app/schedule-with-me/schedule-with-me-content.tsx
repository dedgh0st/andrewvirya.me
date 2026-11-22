"use client";

import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  HeartIcon,
  PlaneTakeoffIcon,
  UsersRoundIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

const bookingOptions = [
  {
    number: "01",
    title: "Long vacations",
    description:
      "Dream up a longer escape and find a time to plan it together.",
    href: "https://cal.com/avv210/long-vacations",
    Icon: PlaneTakeoffIcon,
    accent: "text-amber-500",
  },
  {
    number: "02",
    title: "Hangout with friends or family",
    description:
      "Set aside some time to catch up and enjoy each other's company.",
    href: "https://cal.com/avv210/hangout-with-friends-or-family",
    Icon: UsersRoundIcon,
    accent: "text-emerald-500",
  },
  {
    number: "03",
    title: "Date night",
    description: "Make an evening for us and choose a date that works.",
    href: "https://cal.com/avv210/date-night",
    Icon: HeartIcon,
    accent: "text-rose-500",
  },
];

export default function ScheduleWithMeContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-svh flex-col bg-background font-mono text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
      >
        Skip to content
      </a>

      <header className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="inline-flex min-h-9 items-center gap-2 rounded-sm px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          Home
        </Link>
        <div className="flex min-w-0 items-center gap-2">
          <p className="max-w-[48vw] truncate text-right text-[10px] text-muted-foreground sm:max-w-none sm:text-xs">
            andrewvirya.me / schedule-with-me
          </p>
          <ThemeSwitcher />
        </div>
      </header>

      <main
        id="main-content"
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
        />
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          className="relative w-full max-w-2xl"
        >
          <section aria-labelledby="schedule-title">
            <div className="mb-8 sm:mb-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
                Open calendar · Choose your occasion
              </p>
              <h1
                id="schedule-title"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Let&apos;s make some time.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Pick the kind of time you have in mind, then choose a slot that
                works for you on Cal.com.
              </p>
            </div>

            <ul className="flex flex-col gap-3 sm:gap-4">
              {bookingOptions.map(
                ({ number, title, description, href, Icon, accent }, index) => (
                  <motion.li
                    key={href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-24 items-center gap-4 border border-border bg-card/80 p-4 shadow-sm transition-colors hover:border-amber-500/50 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 sm:gap-5 sm:p-5"
                    >
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        {number}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-muted ${accent}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold sm:text-base">
                          {title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {description}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                        Book
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  </motion.li>
                ),
              )}
            </ul>

            <p className="mt-5 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
              Booking and availability are managed securely by Cal.com.
            </p>
          </section>
        </motion.div>
      </main>

      <footer className="flex flex-col items-center justify-between gap-2 border-t border-border px-4 py-4 text-center text-[10px] text-muted-foreground sm:flex-row sm:px-8 sm:text-left">
        <p>Looking forward to it · See you soon</p>
        <Link
          href="/"
          className="underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          andrewvirya.me
        </Link>
      </footer>
    </div>
  );
}
