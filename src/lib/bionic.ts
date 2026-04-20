export type BionicSegment =
  | { type: "bold"; text: string }
  | { type: "rest"; text: string }
  | { type: "space"; text: string };

function boldPrefixLength(letterCount: number): number {
  if (letterCount <= 3) return 1;
  if (letterCount <= 6) return 2;
  if (letterCount <= 9) return 3;
  return 4;
}

const LETTER_RE = /\p{L}/u;

export function bionicWord(word: string): BionicSegment[] {
  const letterCount = Array.from(word).filter((c) => LETTER_RE.test(c)).length;
  if (letterCount === 0) {
    return [{ type: "rest", text: word }];
  }

  const boldTarget = boldPrefixLength(letterCount);
  let seenLetters = 0;
  let splitIdx = word.length;

  const chars = Array.from(word);
  let consumed = 0;
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    consumed += ch.length;
    if (LETTER_RE.test(ch)) {
      seenLetters++;
      if (seenLetters >= boldTarget) {
        splitIdx = consumed;
        break;
      }
    }
  }

  const boldPart = word.slice(0, splitIdx);
  const restPart = word.slice(splitIdx);
  const segments: BionicSegment[] = [{ type: "bold", text: boldPart }];
  if (restPart.length > 0) segments.push({ type: "rest", text: restPart });
  return segments;
}

export function bionicText(text: string): BionicSegment[] {
  if (!text) return [];
  const tokens = text.split(/(\s+)/);
  const out: BionicSegment[] = [];
  for (const tok of tokens) {
    if (tok.length === 0) continue;
    if (/^\s+$/.test(tok)) {
      out.push({ type: "space", text: tok });
    } else {
      out.push(...bionicWord(tok));
    }
  }
  return out;
}

export function bionicPlainText(text: string): string {
  return text;
}
