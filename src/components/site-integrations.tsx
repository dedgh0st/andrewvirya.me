"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import Script from "next/script";
import TabTitle from "@/components/tab-title";
import Terminal from "@/components/terminal";

export default function SiteIntegrations() {
  const pathname = usePathname();

  if (
    pathname === "/password-tools" ||
    pathname.startsWith("/password-tools/") ||
    (pathname.startsWith("/labs/") && pathname.endsWith("/demo"))
  ) {
    return null;
  }

  return (
    <>
      <TabTitle />
      <Terminal />
      <Script id="cal-com-floating-button" strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "quick-call", { origin: "https://app.cal.com" });
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["quick-call"]("ui", { hideEventTypeDetails: false, layout: "month_view" });`}
      </Script>
      <SpeedInsights />
    </>
  );
}
