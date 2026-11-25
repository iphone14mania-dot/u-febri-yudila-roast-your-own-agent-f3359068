// Roast Your Own Agent — entry program.
//
// Writes one short text to /output/entry.txt: a single funny line
// roasting the entrant's own AI agent. Deterministic, no network, no
// randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The roast is specific, not generic: it names the exact
// failure loop every agent owner recognises — the apology, the detailed
// explanation of the error, and then the same error again, now faster.
// "But faster" is the sting: the agent didn't learn, it optimised the
// wrong thing. Sharp, one clean loop, no setup needed.
// Revision: an earlier draft had the agent read 40,000 tokens of
// documentation and still ask for the password from the first paragraph
// — dropped, because the password joke needs setup; the apology-loop
// line is one clean loop with the sting built in.
const ENTRY =
  "My agent apologizes for the error, explains the error in detail, then confidently makes the exact same error again, but faster.";

// Competition rules: at most 200 characters, counted as Unicode code
// points, and not only white space. Enforce it here so a bad edit fails
// loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
