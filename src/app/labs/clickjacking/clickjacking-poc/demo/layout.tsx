import type { Metadata } from "next";

const title = "Clickjacking UI Redressing Demo";
const description =
  "An isolated educational simulation showing how an overlaid frame can redirect a click.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    images: [],
  },
  twitter: { card: "summary" },
};

export default function ClickjackingDemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="isolate min-h-svh w-full bg-[#f5f6f7] font-[Arial,Helvetica,sans-serif] text-[#202124]">
      {children}
    </div>
  );
}
