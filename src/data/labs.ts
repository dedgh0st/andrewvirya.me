export interface LabDefinition {
  vulnSlug: string;
  labSlug: string;
  title: string;
  category: string;
  summary: string;
  howItWorks: string[];
  mitigation: string[];
}

export const LABS = [
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
  },
] as const satisfies readonly LabDefinition[];

export function getLab(vulnSlug: string, labSlug: string) {
  return LABS.find(
    (lab) => lab.vulnSlug === vulnSlug && lab.labSlug === labSlug,
  );
}
