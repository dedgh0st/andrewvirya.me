import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteIntegrations from "@/components/site-integrations";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewvirya.me"),
  title: "andrewvirya.me | Home",
  description:
    "Andrew Virya Victorio's personal website and portfolio. Offensive Security Practitioner, Penetration Tester, and Cybersecurity Enthusiast.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andrew Virya Victorio",
  givenName: "Andrew",
  familyName: "Victorio",
  alternateName: "dedgh0st",
  chineseName: "陈浩鑫",
  url: "https://andrewvirya.me",
  sameAs: [
    "https://linkedin.com/in/andrew-virya-victorio",
    "https://github.com/dedgh0st",
    "https://gravatar.com/andrewvirya",
    "https://instagram.com/avv_210",
    "https://x.com/avv_210",
    "https://medium.com/@dedgh0st",
    "https://www.tiktok.com/@andrewvirya",
    "https://tryhackme.com/p/dedgh0st",
    "https://profile.hackthebox.com/profile/019e8001-428b-707f-9de5-38f47a199e8e",
    "https://www.root-me.org/dedgh0st?lang=en#a4da3ae0a561b5a1af81129c4f421e28",
    "https://ratctf.com/users/dedgh0st",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMonoHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <script id="person-jsonld" type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </script>
        <SiteIntegrations />
        {children}
        <Analytics />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
