"use client";

import { CopyIcon, SparklesIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Mode = "password" | "passphrase";

const similarCharacters = new Set("0O1lI|Z2`'\"");
const symbols = "!@#$%^&*()-_=+[]{};:,.?/~";
const words = [
  "acorn",
  "amber",
  "anchor",
  "apricot",
  "arch",
  "artist",
  "atlas",
  "autumn",
  "badger",
  "bamboo",
  "beacon",
  "berry",
  "birch",
  "bison",
  "blossom",
  "breeze",
  "cabin",
  "cactus",
  "canvas",
  "cedar",
  "cello",
  "cherry",
  "circle",
  "cobalt",
  "comet",
  "coral",
  "cosmos",
  "crane",
  "cricket",
  "crystal",
  "delta",
  "desert",
  "dolphin",
  "dragon",
  "drizzle",
  "eagle",
  "earth",
  "echo",
  "elm",
  "ember",
  "falcon",
  "fern",
  "field",
  "fig",
  "finch",
  "fjord",
  "flame",
  "flannel",
  "forest",
  "fox",
  "frost",
  "galaxy",
  "garden",
  "garlic",
  "ginger",
  "glacier",
  "goblet",
  "granite",
  "grape",
  "harbor",
  "hazel",
  "heron",
  "honey",
  "island",
  "ivory",
  "jasmine",
  "jigsaw",
  "journey",
  "jungle",
  "kettle",
  "kiwi",
  "lantern",
  "laurel",
  "lemon",
  "lilac",
  "lizard",
  "maple",
  "marble",
  "meadow",
  "meteor",
  "midnight",
  "mint",
  "mosaic",
  "mountain",
  "nectar",
  "nebula",
  "nickel",
  "oasis",
  "ocean",
  "olive",
  "onyx",
  "orange",
  "orchid",
  "otter",
  "panda",
  "parrot",
  "pebble",
  "pepper",
  "phoenix",
  "piano",
  "planet",
  "plum",
  "pocket",
  "prairie",
  "quartz",
  "rabbit",
  "raven",
  "river",
  "robin",
  "rocket",
  "saffron",
  "sailor",
  "salmon",
  "sapphire",
  "shadow",
  "silver",
  "sparrow",
  "spruce",
  "starling",
  "summit",
  "sunrise",
  "thunder",
  "timber",
  "tulip",
  "tundra",
  "velvet",
  "violet",
  "walnut",
  "willow",
  "window",
  "winter",
  "wizard",
  "yonder",
  "zephyr",
  "zinnia",
];

function randomInt(max: number) {
  if (!Number.isSafeInteger(max) || max < 1) {
    throw new Error("Select at least one character type before generating.");
  }

  const range = 0x1_0000_0000;
  const limit = Math.floor(range / max) * max;
  const value = new Uint32Array(1);
  do {
    crypto.getRandomValues(value);
  } while (value[0] >= limit);
  return value[0] % max;
}

function estimateStrength(bits: number) {
  if (bits < 30) return { label: "Weak" };
  if (bits < 50) return { label: "Fair" };
  if (bits < 70) return { label: "Strong" };
  return { label: "Very strong" };
}

export default function PassGenTab() {
  const [mode, setMode] = useState<Mode>("password");
  const [length, setLength] = useState(20);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeSimilar, setIncludeSimilar] = useState(false);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (inputRef.current) inputRef.current.value = "";
    };
  }, []);

  const characterPool = useMemo(() => {
    let pool = "";
    if (includeLetters)
      pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeDigits) pool += "0123456789";
    if (includeSymbols) pool += symbols;
    if (!includeSimilar) {
      pool = Array.from(pool)
        .filter((character) => !similarCharacters.has(character))
        .join("");
    }
    return pool;
  }, [includeDigits, includeLetters, includeSimilar, includeSymbols]);

  const entropy =
    mode === "password"
      ? length * Math.log2(characterPool.length || 1)
      : length * Math.log2(words.length);
  const strength = estimateStrength(entropy);
  const characterOptions = [
    {
      id: "pass-gen-letters",
      label: "Letters",
      example: "Aa",
      checked: includeLetters,
      setChecked: setIncludeLetters,
    },
    {
      id: "pass-gen-digits",
      label: "Digits",
      example: "12345",
      checked: includeDigits,
      setChecked: setIncludeDigits,
    },
    {
      id: "pass-gen-symbols",
      label: "Symbols",
      example: "@#$!&",
      checked: includeSymbols,
      setChecked: setIncludeSymbols,
    },
    {
      id: "pass-gen-similar",
      label: "Similar characters",
      example: "1l| O0 Z2",
      checked: includeSimilar,
      setChecked: setIncludeSimilar,
    },
  ];

  const clearSecret = () => {
    setSecret("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const generate = () => {
    setError("");
    try {
      const generated =
        mode === "password"
          ? Array.from(
              { length },
              () => characterPool[randomInt(characterPool.length)],
            ).join("")
          : Array.from({ length }, () => words[randomInt(words.length)]).join(
              "-",
            );
      setSecret(generated);
    } catch (generationError) {
      setSecret("");
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to generate a secret in this browser.",
      );
    }
  };

  const copySecret = async () => {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      toast.success("Copied to clipboard.", { duration: 2500 });
    } catch {
      setError("Clipboard access failed. Copy the generated value manually.");
    }
  };

  return (
    <div className="space-y-5">
      <ToggleGroup
        type="single"
        value={mode}
        aria-label="Generator mode"
        variant="outline"
        spacing={0}
        onValueChange={(value) => {
          if (value === "password" || value === "passphrase") {
            setMode(value);
            clearSecret();
          }
        }}
        className="grid w-full grid-cols-2 border border-border p-1"
      >
        <ToggleGroupItem
          value="password"
          className="h-auto px-3 py-2 text-xs uppercase tracking-wide data-[state=on]:bg-red-600 data-[state=on]:text-white"
        >
          Password
        </ToggleGroupItem>
        <ToggleGroupItem
          value="passphrase"
          className="h-auto px-3 py-2 text-xs uppercase tracking-wide data-[state=on]:bg-red-600 data-[state=on]:text-white"
        >
          Passphrase
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-foreground">
          <Label htmlFor="pass-gen-length">
            Length {mode === "passphrase" ? "(words)" : "(characters)"}
          </Label>
          <output
            htmlFor="pass-gen-length"
            className="font-mono text-foreground"
          >
            {length}
          </output>
        </div>
        <Slider
          id="pass-gen-length"
          aria-label="Generated length"
          min={4}
          max={40}
          value={[length]}
          onValueChange={(values) => {
            const nextLength = values[0];
            if (nextLength !== undefined) {
              setLength(nextLength);
              clearSecret();
            }
          }}
          className="[&_[data-slot=slider-range]]:bg-red-600 [&_[data-slot=slider-thumb]]:border-red-600 [&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-track]]:bg-muted"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>4</span>
          <span>40</span>
        </div>
      </div>

      {mode === "password" && (
        <fieldset className="space-y-2">
          <legend className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            Character options
          </legend>
          {characterOptions.map(
            ({ id, label, example, checked, setChecked }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={(nextChecked) => {
                    setChecked(nextChecked === true);
                    clearSecret();
                  }}
                />
                <Label
                  htmlFor={id}
                  className="flex-wrap text-xs text-foreground"
                >
                  {label}
                  <span className="text-muted-foreground">
                    (e.g. {example})
                  </span>
                </Label>
              </div>
            ),
          )}
        </fieldset>
      )}

      <div className="space-y-2" aria-live="polite">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Estimated strength</span>
          <Badge
            className={`border-border bg-transparent ${
              strength.label === "Weak"
                ? "text-red-700 dark:text-red-400"
                : strength.label === "Fair"
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-emerald-700 dark:text-emerald-400"
            }`}
          >
            {strength.label} · {Math.floor(entropy)} bits
          </Badge>
        </div>
        <Progress
          aria-label={`Estimated strength: ${strength.label}`}
          value={Math.min((entropy / 80) * 100, 100)}
          className={`bg-muted ${
            strength.label === "Weak"
              ? "[&_[data-slot=progress-indicator]]:bg-red-500"
              : strength.label === "Fair"
                ? "[&_[data-slot=progress-indicator]]:bg-amber-400"
                : "[&_[data-slot=progress-indicator]]:bg-emerald-400"
          }`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pass-gen-output" className="sr-only">
          Generated secret
        </Label>
        <div className="flex flex-wrap items-stretch gap-2 sm:flex-nowrap">
          <Input
            ref={inputRef}
            id="pass-gen-output"
            type="text"
            readOnly
            value={secret}
            placeholder="Generated secret appears here"
            className="h-9 w-full min-w-0 flex-1 border-input bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-emerald-500 sm:w-auto"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Clear generated secret"
                onClick={clearSecret}
                className="h-9 border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear</TooltipContent>
          </Tooltip>
          <Button
            type="button"
            disabled={!secret}
            onClick={copySecret}
            className="h-9 bg-secondary px-3 text-secondary-foreground hover:bg-secondary/80"
          >
            <CopyIcon aria-hidden="true" />
            Copy
          </Button>
          <Button
            type="button"
            onClick={generate}
            className="h-9 bg-red-600 px-4 text-white hover:bg-red-500"
          >
            <SparklesIcon aria-hidden="true" />
            Generate
          </Button>
        </div>
      </div>

      <div className="min-h-5 text-xs" aria-live="polite">
        {error && <p className="text-red-700 dark:text-red-400">{error}</p>}
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Secrets are generated locally with the browser cryptographic random
        number generator. They are not sent to analytics or any server.
      </p>
    </div>
  );
}
