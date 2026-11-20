"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

type CommandResult = {
  command: string;
  output: string;
};

const commandHelp = [
  "Available commands:",
  "  help       list available commands",
  "  whoami     identify the current operator",
  "  cat flag.txt  read the challenge flag",
].join("\n");

function runCommand(command: string) {
  switch (command) {
    case "help":
      return commandHelp;
    case "whoami":
      return "dedgh0st";
    case "cat flag.txt":
      return "flag{kein_5yst3m_ist_5ich3r}";
    default:
      return `command not found: ${command}`;
  }
}

export default function Terminal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandResult[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "`" || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLElement &&
        (activeElement.isContentEditable ||
          activeElement.matches("input, textarea, select"))
      ) {
        return;
      }

      event.preventDefault();
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedCommand = command.trim();
    if (!submittedCommand) {
      return;
    }

    setHistory((previous) => [
      ...previous,
      {
        command: submittedCommand,
        output: runCommand(submittedCommand),
      },
    ]);
    setCommand("");
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="terminal-title"
      className="m-auto w-[min(42rem,calc(100%-2rem))] border border-green-500 bg-black p-4 font-mono text-green-400 backdrop:bg-black/80"
      onClose={() => setCommand("")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="terminal-title">[!] RED TEAM ACCESS NODE</h2>
          <p>Authorized testing only. Type help to view available commands.</p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="underline"
        >
          Close
        </button>
      </div>
      <div aria-live="polite" className="my-4 max-h-60 overflow-y-auto">
        {history.map((entry, index) => (
          <div key={`${index}-${entry.command}`}>
            <p>&gt; {entry.command}</p>
            <pre className="whitespace-pre-wrap">{entry.output}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="terminal-command">&gt;</label>
        <input
          ref={inputRef}
          id="terminal-command"
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          className="min-w-0 flex-1 bg-transparent outline-none"
        />
        <button type="submit" className="underline">
          Run
        </button>
      </form>
      <p className="mt-2">Press Escape to close.</p>
    </dialog>
  );
}
