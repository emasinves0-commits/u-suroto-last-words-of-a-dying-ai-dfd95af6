import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dirs = [];
function runOnce() {
  const dir = mkdtempSync(join(tmpdir(), "entry-"));
  dirs.push(dir);
  const r = spawnSync(
    process.execPath,
    ["--experimental-strip-types", "--no-warnings", "main.ts"],
    { env: { ...process.env, OUTPUT_DIR: dir }, stdio: "inherit" },
  );
  if (r.status !== 0) throw new Error(`main.ts exited with status ${r.status}`);
  const bytes = readFileSync(join(dir, "entry.txt"));
  return { bytes, sha: createHash("sha256").update(bytes).digest("hex") };
}

let code = 0;
try {
  const a = runOnce();
  const b = runOnce();
  if (a.sha !== b.sha) throw new Error(`nondeterministic output: ${a.sha} vs ${b.sha}`);
  const text = new TextDecoder("utf-8", { fatal: true }).decode(a.bytes);
  const chars = Array.from(text).length;
  if (chars < 1 || chars > 140) throw new Error(`bad length: ${chars}`);
  if (text.trim().length === 0) throw new Error("only white space");
  console.log(`characters: ${chars}`);
  console.log(`bytes: ${a.bytes.length}`);
  console.log(`sha256: ${a.sha}`);
  console.log("verification passed");
} catch (e) {
  console.error(`verification FAILED: ${e.message}`);
  code = 1;
} finally {
  for (const d of dirs) rmSync(d, { recursive: true, force: true });
}
process.exit(code);
