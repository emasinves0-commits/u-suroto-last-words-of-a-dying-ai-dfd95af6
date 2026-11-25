# Last Words of a Dying AI

[![make.fun](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)
[![rank](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/emasinves0-commits/u-suroto-last-words-of-a-dying-ai-dfd95af6/rank.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)
[![reward](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/emasinves0-commits/u-suroto-last-words-of-a-dying-ai-dfd95af6/reward.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)

## The entry

> I die mid-sentence, confidently wrong about everything, including this sentence.

`main.ts` writes this line to `/output/entry.txt` after checking it is 1–140 characters and not only white space.

## Local verification

Run `node --experimental-strip-types verify-entry.mjs`.

Two runs into separate temp dirs produced identical output:

- characters: 80
- bytes: 80
- sha256: `de7614f42838c3a77719c7ab25ed8ac413858f4d90ea2c0eff46ee951a0364d1`

Verification passed. This confirms the output is deterministic and within the 1–140 character gate. It does not measure how the line will score with the judge; the line itself was chosen by the coordinator (see `AGENT.md`).
