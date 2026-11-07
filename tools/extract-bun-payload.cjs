// Reproduce the extraction of the Bun standalone payload from jac-engine.exe.
// Layout observed in this build:
//   .bun section -> u32 zero + "// @bun" header, then file contents
//   name table -> "B:/~BUN/root/<name>\0" records
//   file records -> 52-byte entries: flags(4) name_off/len contents_off/len (base-relative)
//   trailer -> OffsetsData (byte_count, encoded=0, graph offset, entry id, compile size, ...)
//   magic -> "\n---- Bun! ----\n"
// Offsets are relative to the start of the entry file contents.
const fs = require("fs");
const path = require("path");

const exe = process.argv[2];
const outDir = process.argv[3];
const b = fs.readFileSync(exe);
const magic = Buffer.from("\n---- Bun! ----\n");
const magicAt = b.lastIndexOf(magic);
if (magicAt < 0) throw new Error("Bun trailer magic not found");

const trailer = magicAt - 28;
const byteCount = b.readUInt32LE(trailer);
const encoded = b.readUInt32LE(trailer + 4);
const graphOff = b.readUInt32LE(trailer + 8);
const base = trailer - byteCount;
if (encoded !== 0) throw new Error("compressed payload, not handled");

const namesBase = base;
const records = base + graphOff;
let o = records;
const files = [];
for (let i = 0; i < 2000; i++) {
  if (o + 52 > magicAt) break;
  const no = b.readUInt32LE(o + 4);
  const nl = b.readUInt32LE(o + 8);
  const co = b.readUInt32LE(o + 12);
  const cl = b.readUInt32LE(o + 16);
  if (nl < 1 || nl > 300) break;
  const name = b.subarray(namesBase + no, namesBase + no + nl).toString("latin1");
  if (!name.startsWith("B:/~BUN/root/")) break;
  files.push({ name: name.slice(13), off: base + co, len: cl });
  o += 52;
}

fs.mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const dest = path.join(outDir, f.name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, b.subarray(f.off, f.off + f.len));
}
console.log(`base=0x${base.toString(16)} records=0x${records.toString(16)} files=${files.length}`);
