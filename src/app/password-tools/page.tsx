import type { Metadata } from "next";
import PasswordToolsShell from "./password-tools-shell";

export const metadata: Metadata = {
  title: "Password Security Suite | andrewvirya.me",
  description:
    "Check password guidelines, query HIBP Pwned Passwords, and generate secrets locally in your browser.",
};

export default function PasswordToolsPage() {
  return <PasswordToolsShell />;
}
