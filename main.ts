import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate: entry.txt is UTF-8 text of 1-140 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

const ENTRY =
  "I die mid-sentence, confidently wrong about everything, including this sentence.";

const OUTPUT_DIR = process.env.OUTPUT_DIR || "/output";
const OUTPUT_FILE = "entry.txt";

// Throws on the first failed check, so an invalid entry is never written.
function validateEntry(entry: unknown): string {
  if (typeof entry !== "string") throw new Error("entry must be a string");
  const chars = Array.from(entry).length; // count Unicode code points
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
  }
  if (entry.trim().length === 0) throw new Error("entry must not be only white space");
  return entry;
}

function main(): void {
  const entry = validateEntry(ENTRY);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const path = join(OUTPUT_DIR, OUTPUT_FILE);
  const expected = Buffer.from(entry, "utf8");
  // UTF-8, no trailing newline: same bytes on every run.
  writeFileSync(path, expected);
  // Round-trip self-check: a partial or corrupted write must never pass silently.
  const actual = readFileSync(path);
  if (!actual.equals(expected)) {
    throw new Error(
      `round-trip check failed: wrote ${actual.length} bytes, expected ${expected.length}`,
    );
  }
}

main();
