"use client";

import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BENIGN_COMMAND = `powershell -NoProfile -Command "Start-Process 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'" # "I am not a robot - Verification ID: 2327"`;

type ClickFixDemoProps = {
  briefingHref: string;
  references: readonly { title: string; url: string }[];
};

export default function ClickFixDemo({
  briefingHref,
  references,
}: ClickFixDemoProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  async function beginSimulation() {
    setDialogOpen(true);
    setStarted(true);
    setComplete(false);

    if (!navigator.clipboard?.writeText) {
      setClipboardStatus("unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(BENIGN_COMMAND);
      setClipboardStatus("copied");
    } catch {
      setClipboardStatus("unavailable");
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 pb-28 pt-24 font-sans text-[#202124] sm:px-8">
      <div className="fixed inset-x-0 top-0 z-70 flex min-h-12 flex-wrap items-center gap-x-2 gap-y-1 border-b border-[#e5e5e5] bg-[#fff7ed] px-4 py-2 text-xs leading-5 text-[#713f12] shadow-sm sm:px-6">
        <strong className="font-semibold tracking-wide">
          EDUCATIONAL SIMULATION
        </strong>
        <span aria-hidden="true">—</span>
        <span>andrewvirya.me/labs</span>
        <span aria-hidden="true">|</span>
        <span>Benign Rickroll PoC (No Malicious Payload)</span>
        <span aria-hidden="true">|</span>
        <Link
          href={briefingHref}
          className="font-semibold underline underline-offset-2 hover:text-[#431407] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f38020]"
        >
          Back to Lab Briefing
        </Link>
      </div>

      <section className="mx-auto grid w-full max-w-3xl gap-8 pt-8 sm:pt-12">
        <header className="grid gap-2">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            One more step
          </h1>
          <p className="text-lg text-[#3c4043]">
            Verify you are human by completing the action below.
          </p>
        </header>

        <div className="max-w-lg border border-[#d9d9d9] bg-[#f9f9f9] shadow-sm">
          <button
            type="button"
            aria-label="Open the educational verification simulation"
            aria-pressed={started}
            onClick={() => void beginSimulation()}
            className="flex min-h-16 w-full items-center gap-4 px-4 text-left hover:bg-[#f1f3f4] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f38020]"
          >
            <span className="grid size-7 shrink-0 place-items-center border border-[#b8b8b8] bg-white">
              {started ? (
                <CheckIcon
                  aria-hidden="true"
                  className="size-5 text-[#188038]"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-4 rounded-full border-2 border-[#188038] border-t-transparent motion-safe:animate-spin"
                />
              )}
            </span>
            <span className="text-sm">Verify you are human</span>
            <span className="relative ml-auto h-6 w-24 shrink-0">
              <Image
                src="/cloudflare-logo.png"
                alt="Cloudflare logo in this educational simulation"
                fill
                sizes="96px"
                className="object-contain"
              />
            </span>
          </button>
          <p className="border-t border-[#e5e5e5] px-4 py-3 text-sm leading-6 text-[#5f6368]">
            Cloudflare needs to review the security of your connection before
            proceeding.
          </p>
        </div>

        <section
          aria-labelledby="research-references"
          className="grid gap-3 border-t border-[#e5e5e5] pt-5"
        >
          <h2
            id="research-references"
            className="text-sm font-semibold text-[#3c4043]"
          >
            Research References
          </h2>
          <ul className="grid gap-2 text-sm">
            {references.map((reference) => (
              <li key={reference.url}>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#b45309] underline underline-offset-4 hover:text-[#7c2d12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f38020]"
                >
                  {reference.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {complete && (
          <output className="max-w-lg border border-[#188038]/30 bg-[#e6f4ea] px-4 py-3 text-sm text-[#137333]">
            Simulation complete. This page did not execute a command or access
            your device.
          </output>
        )}
      </section>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4">
          <section
            aria-labelledby="verification-dialog-title"
            aria-modal="true"
            className="w-full max-w-sm border border-[#d9d9d9] bg-white text-[#202124] shadow-xl"
            role="dialog"
          >
            <div className="flex items-center justify-between gap-3 bg-[#f38020] px-4 py-3 text-white">
              <h2
                id="verification-dialog-title"
                className="font-medium leading-6"
              >
                Complete these verification steps
              </h2>
              <button
                type="button"
                aria-label="Close verification simulation"
                onClick={() => setDialogOpen(false)}
                className="rounded-sm p-1 hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-white"
              >
                <XIcon aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 px-5 py-5 text-sm leading-6">
              <p>To better prove you are not a robot, please:</p>
              <ol className="grid list-inside list-decimal gap-2">
                <li>Press &amp; hold the Windows Key ⊞ + R.</li>
                <li>In the verification window, press Ctrl + V.</li>
                <li>Press Enter on your keyboard to finish.</li>
              </ol>

              <div>
                <p>You will observe and agree:</p>
                <p className="mt-2 flex items-start gap-2 font-mono text-xs leading-5 text-[#5f6368]">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-sm bg-[#188038] text-white"
                  >
                    <CheckIcon className="size-3" />
                  </span>
                  <span>
                    &quot;I am not a robot - Verification ID: 2327&quot;
                  </span>
                </p>
              </div>

              <p aria-live="polite" className="text-xs text-[#5f6368]">
                {clipboardStatus === "copied" &&
                  "Benign demo command copied. Inspect it using the button at the bottom of the page."}
                {clipboardStatus === "unavailable" &&
                  "Clipboard access was unavailable. You can inspect the benign demo text using the button at the bottom of the page."}
              </p>

              <div className="flex items-center justify-between gap-3 border-t border-[#e5e5e5] pt-4">
                <p className="text-xs leading-5 text-[#5f6368]">
                  Perform the steps above to finish verification.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDialogOpen(false);
                    setComplete(true);
                  }}
                  className="shrink-0 bg-[#f38020] px-5 py-3 font-semibold text-white hover:bg-[#df6f10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202124]"
                >
                  VERIFY
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      <aside className="fixed bottom-4 right-4 z-60 w-[calc(100vw-2rem)] max-w-md border border-[#d9d9d9] bg-white shadow-lg">
        <button
          type="button"
          aria-expanded={inspectorOpen}
          onClick={() => setInspectorOpen((open) => !open)}
          className="w-full px-4 py-3 text-left text-sm font-medium text-[#3c4043] underline underline-offset-4 hover:bg-[#f9f9f9] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f38020]"
        >
          {inspectorOpen
            ? "Hide Clipboard Payload"
            : "Inspect Copied Clipboard Payload"}
        </button>
        {inspectorOpen && (
          <div className="grid gap-2 border-t border-[#e5e5e5] p-4">
            <p className="text-xs leading-5 text-[#5f6368]">
              This is the exact benign text used by the simulation. The site
              never runs it.
            </p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all bg-[#f5f5f5] p-3 font-mono text-xs leading-5 text-[#202124]">
              {BENIGN_COMMAND}
            </pre>
            <p aria-live="polite" className="text-xs text-[#5f6368]">
              {clipboardStatus === "copied" &&
                "The text was copied after you clicked the mock verification widget."}
              {clipboardStatus === "unavailable" &&
                "The browser did not grant clipboard access; the text remains visible above."}
              {clipboardStatus === "idle" &&
                "Click the mock verification widget to copy this text."}
            </p>
          </div>
        )}
      </aside>
    </main>
  );
}
