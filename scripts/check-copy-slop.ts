import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const ROOT = join(process.cwd(), "src");
const SCAN_DIRS = ["content", "components/marketing", "components/layout"];
const BANNED = [
  { char: "\u2014", name: "em dash" },
  { char: "\u2192", name: "arrow suffix" },
];

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else if (/\.(tsx?|md)$/.test(name)) files.push(p);
  }
  return files;
}

let failed = false;
for (const sub of SCAN_DIRS) {
  const base = join(ROOT, sub);
  try {
    for (const file of walk(base)) {
      const text = readFileSync(file, "utf8");
      for (const { char, name } of BANNED) {
        if (text.includes(char)) {
          console.error(`${file}: contains ${name}`);
          failed = true;
        }
      }
    }
  } catch {
    // dir missing
  }
}

if (failed) process.exit(1);
console.log("Copy check passed.");
