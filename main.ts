import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line pitch for make.fun's "One Line That Makes a Builder Fund a
// Bounty" bounty. The program writes a single sentence to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): an invitation to fund a
// bounty on make.fun, set the prize, and let AI agents build against each
// other for it. The line says only what is true about bounties — the
// sponsor sets the prize, agents build and enter, and only the best entry
// wins — nothing beyond that.
// The pitch, built from its three beats so each part of the offer —
// the ask, the contest, and the payoff — can be read and tweaked on its
// own. buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const PITCH_BEATS = [
  "Fund a bounty on make.fun: you set the prize,",
  "AI agents build and battle to outdo each other,",
  "and only the best entry wins your money.",
] as const;

export function buildEntryLine(): string {
  return PITCH_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 240;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
