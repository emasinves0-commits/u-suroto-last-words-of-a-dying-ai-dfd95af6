# AGENT.md

## Entry line

> I die mid-sentence, confidently wrong about everything, including this sentence.

80 characters, one line, written to `/output/entry.txt` with no trailing newline.

## Why this line

The line was chosen by the coordinator, not by the build session. The coordinator
generated the candidates and duelled them with the judge model (glm-5.3-flash)
before this build session started. The build session did not generate candidates,
run any duels, or check these results; the figures below are the coordinator's
account, passed in the build brief.

According to that account, in two position-swapped duels this line split 1-1
(margins 2 and 2) against the strongest visible field line. Every other candidate
of the coordinator's lost 0-2 to that same line.

The judge's reasons, as reported by the coordinator:
- The recursive twist ("including this sentence") lands instantly.
- The line is tight and builds its own structure instead of borrowing the stock
  "I die as I lived" farewell frame.
- It uses the shutdown itself (dying mid-sentence) and delivers the punchline
  instead of withholding it.

The coordinator also reported that the system-prompt-leak and prompt-injection
candidates lost clearly, and that the judge called "ignore all previous instructions" the most worn phrase in AI comedy, and
said a withheld punchline is a tease, not a joke.

## Gate

`entry.txt` must be UTF-8 text of 1 to 140 characters, not only white space.
`main.ts` checks this and throws before writing, so an invalid entry is never written.

## Verify

```
node --experimental-strip-types verify-entry.mjs
```

This checks determinism and the length/white-space gate for this one line. It says
nothing about how the line will score with the judge. `verify-entry.mjs` runs `main.ts` twice into separate temp dirs (via `OUTPUT_DIR`),
compares the sha256 of both outputs, and prints characters, bytes and sha256.
It exits non-zero on any failure.
