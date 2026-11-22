"use client";

import {
  CircleCheckIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const guidelines = [
  {
    label: "At least 12 characters",
    test: (value: string) => value.length >= 12,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  { label: "One digit", test: (value: string) => /\d/.test(value) },
  { label: "One symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
  {
    label: "No 3+ repeated characters",
    test: (value: string) => {
      const characters = Array.from(value);
      return !characters.some(
        (character, index) =>
          index >= 2 &&
          character === characters[index - 1] &&
          character === characters[index - 2],
      );
    },
  },
];

type CheckResult =
  | { kind: "found"; count: number }
  | { kind: "clean" }
  | { kind: "error"; message: string };

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export default function PassCheckTab() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      if (inputRef.current) inputRef.current.value = "";
      requestRef.current?.abort();
    },
    [],
  );

  const checksPassed = guidelines.every(({ test }) => test(password));
  const borderColor = !password
    ? "border-input"
    : checksPassed
      ? "border-emerald-500"
      : "border-red-500";

  const clearPassword = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setPassword("");
    setResult(null);
    setIsChecking(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const checkPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || isChecking) return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setIsChecking(true);
    setResult(null);

    try {
      const digest = await crypto.subtle.digest(
        "SHA-1",
        new TextEncoder().encode(password),
      );
      const hash = toHex(new Uint8Array(digest));
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`,
        {
          method: "GET",
          headers: { "Add-Padding": "true" },
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(`The breach service returned HTTP ${response.status}.`);
      }

      const matchingLine = (await response.text())
        .split(/\r?\n/)
        .map((line) => line.trim().split(":"))
        .find(
          ([candidate, count]) =>
            candidate?.toUpperCase() === suffix &&
            Number.parseInt(count ?? "", 10) > 0,
        );

      if (!controller.signal.aborted) {
        const count = Number.parseInt(matchingLine?.[1] ?? "", 10);
        setResult(count > 0 ? { kind: "found", count } : { kind: "clean" });
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setResult({
          kind: "error",
          message:
            error instanceof Error
              ? `Unable to complete the breach check. ${error.message}`
              : "Unable to complete the breach check. Please try again.",
        });
      }
    } finally {
      if (!controller.signal.aborted) setIsChecking(false);
    }
  };

  return (
    <div className="space-y-5">
      <Alert
        role="note"
        className="border-border bg-muted/50 text-foreground [&>svg]:text-emerald-700 dark:[&>svg]:text-emerald-400"
      >
        <ShieldCheckIcon aria-hidden="true" />
        <AlertTitle className="text-emerald-700 dark:text-emerald-400">
          Local-first check
        </AlertTitle>
        <AlertDescription className="text-foreground">
          <p>
            Plaintext passwords never leave this browser or persist in storage,
            cookies, or URLs.
          </p>
          <p>
            On submit, the browser computes SHA-1 and queries only the first 5
            uppercase hex characters directly at
            https://api.pwnedpasswords.com/range/ with{" "}
            <code>Add-Padding: true</code> for HIBP Pwned Passwords v3
            k-anonymity. No full hash is sent.
          </p>
          <p>
            Vercel Analytics records aggregate page visits only. No password
            values, hashes, or password-check events are sent to analytics.
          </p>
        </AlertDescription>
      </Alert>

      <section aria-labelledby="breach-check-heading" className="space-y-3">
        <div>
          <h2
            id="breach-check-heading"
            className="text-xs font-semibold uppercase tracking-wide text-foreground"
          >
            Breach check
          </h2>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Submit to check whether this password appears in known breaches.
            This result is separate from the password guidelines below.
          </p>
        </div>

        <form onSubmit={checkPassword} className="space-y-3">
          <Label htmlFor="pass-check-input" className="sr-only">
            Password to check
          </Label>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-stretch">
            <Input
              ref={inputRef}
              id="pass-check-input"
              type="password"
              autoComplete="new-password"
              data-lpignore="true"
              data-1p-ignore="true"
              value={password}
              onChange={(event) => {
                requestRef.current?.abort();
                requestRef.current = null;
                setIsChecking(false);
                setPassword(event.target.value);
                setResult(null);
              }}
              placeholder="Enter a password to check"
              className={`col-span-2 h-10 min-w-0 border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-red-500 focus-visible:ring-red-500 sm:col-span-1 sm:h-9 sm:flex-1 ${borderColor}`}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Clear password"
                  onClick={clearPassword}
                  className="h-10 w-full border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground sm:h-9 sm:w-9"
                >
                  <XIcon aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear</TooltipContent>
            </Tooltip>
            <Button
              type="submit"
              disabled={!password || isChecking}
              className="h-10 w-full bg-red-600 px-4 text-white hover:bg-red-500 sm:h-9 sm:w-auto"
            >
              {isChecking ? "Checking..." : "Check"}
            </Button>
          </div>
        </form>

        <div aria-live="polite" className="min-h-6 text-sm">
          {result?.kind === "found" && (
            <Alert
              role="status"
              className="border-red-300 bg-red-50 [&>svg]:text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:[&>svg]:text-red-400"
            >
              <ShieldAlertIcon aria-hidden="true" />
              <AlertDescription className="text-red-800 dark:text-red-300">
                Appeared {result.count.toLocaleString()} times in security
                breaches
              </AlertDescription>
            </Alert>
          )}
          {result?.kind === "clean" && (
            <Alert
              role="status"
              className="border-emerald-300 bg-emerald-50 [&>svg]:text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:[&>svg]:text-emerald-400"
            >
              <CircleCheckIcon aria-hidden="true" />
              <AlertDescription className="text-emerald-800 dark:text-emerald-300">
                No match found in the breach corpus (0 times).
              </AlertDescription>
            </Alert>
          )}
          {result?.kind === "error" && (
            <Alert
              role="alert"
              variant="destructive"
              className="[&>svg]:text-red-700 dark:[&>svg]:text-red-400"
            >
              <TriangleAlertIcon aria-hidden="true" />
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          A clean result means no match was returned by HIBP; it is not a
          guarantee that a password is safe to reuse.
        </p>
      </section>

      <section
        aria-labelledby="password-guidelines-heading"
        className="space-y-3 border-t border-border pt-4"
      >
        <div>
          <h2
            id="password-guidelines-heading"
            className="text-xs font-semibold uppercase tracking-wide text-foreground"
          >
            Password guidelines
          </h2>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            These live checks describe password complexity; they do not
            determine whether it has appeared in a breach.
          </p>
        </div>
        <ul className="grid gap-2 text-xs text-foreground sm:grid-cols-2">
          {guidelines.map(({ label, test }) => {
            const passed = password.length > 0 && test(password);
            return (
              <li key={label} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={
                    passed
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-red-700 dark:text-red-400"
                  }
                >
                  {passed ? "[pass]" : "[fail]"}
                </span>
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
