export interface LabDefinition {
  vulnSlug: string;
  labSlug: string;
  title: string;
  category: string;
  summary: string;
  howItWorks: string[];
  mitigation: string[];
  references: { title: string; url: string }[];
}

export const LABS = [
  {
    vulnSlug: "clickjacking",
    labSlug: "clickjacking-poc",
    title: "Clickjacking: UI Redressing",
    category: "Browser Security / UI Redressing",
    summary:
      "Clickjacking places a framed interface beneath decoy content so a visible click can activate a different control. The hosted lab demonstrates browser framing defenses with a mock account action.",
    howItWorks: [
      "A page embeds another interface in a frame and places it over a decoy control.",
      "A visitor clicks what appears to be the decoy, while the frame receives the input.",
      "The hosted lab presents a mock account action protected by browser framing policy; it stores no account data.",
    ],
    mitigation: [
      "Send Content-Security-Policy with a restrictive frame-ancestors directive, such as 'none' or an explicit trusted-origin allowlist.",
      "Use X-Frame-Options: DENY or SAMEORIGIN as a compatibility fallback for older browsers.",
      "Set authentication cookies with an appropriate SameSite policy as defense in depth; do not rely on it as the framing control.",
    ],
    references: [
      {
        title: "PortSwigger Web Security Academy: Clickjacking",
        url: "https://portswigger.net/web-security/clickjacking",
      },
      {
        title: "OWASP: Clickjacking",
        url: "https://community.owasp.org/attacks/Clickjacking",
      },
    ],
  },
  {
    vulnSlug: "clickfix",
    labSlug: "captcha-verification",
    title: "ClickFix: Fake Human Verification (Clipboard-to-Shell)",
    category: "Social Engineering / Execution",
    summary:
      "ClickFix is a social-engineering technique that impersonates a routine verification or troubleshooting step to persuade someone to run a command themselves.",
    howItWorks: [
      "A page imitates a trusted verification prompt and claims the visitor must take an extra step.",
      "The prompt directs the visitor to paste clipboard contents into a system shell; this lab copies only a harmless command that opens a video.",
      "Attackers can abuse that trust by substituting harmful commands, so unexpected paste-and-run instructions should be treated as suspicious.",
    ],
    mitigation: [
      "Never paste commands from a webpage into Run, PowerShell, Terminal, or another shell.",
      "Use application control such as AppLocker or Windows Defender Application Control to restrict untrusted scripts.",
      "Apply appropriate PowerShell controls and endpoint attack-surface-reduction policies.",
      "Train users to report verification pages that ask them to run commands.",
    ],
    references: [
      {
        title: "Proofpoint: Clipboard Compromise — PowerShell Self-Pwn",
        url: "https://www.proofpoint.com/us/blog/threat-insight/clipboard-compromise-powershell-self-pwn",
      },
      {
        title:
          "Aviatrix: ClickFix Campaign — Fake Cloudflare (macOS & Windows)",
        url: "https://aviatrix.ai/threat-research-center/clickfix-campaign-fake-cloudflare-macos-windows-2026-33466/",
      },
    ],
  },
] as const satisfies readonly LabDefinition[];

export function getLab(vulnSlug: string, labSlug: string) {
  return LABS.find(
    (lab) => lab.vulnSlug === vulnSlug && lab.labSlug === labSlug,
  );
}
