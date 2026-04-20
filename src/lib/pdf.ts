"use client";

import type { TextItem } from "pdfjs-dist/types/src/display/api";

export class PdfExtractionError extends Error {
  kind: "corrupted" | "image-only" | "empty" | "unknown";
  constructor(
    kind: "corrupted" | "image-only" | "empty" | "unknown",
    message: string,
  ) {
    super(message);
    this.kind = kind;
  }
}

type PdfJs = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<PdfJs> | null = null;

async function loadPdfJs(): Promise<PdfJs> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((mod) => {
      mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      return mod;
    });
  }
  return pdfjsPromise;
}

function looksLikeTextItem(item: unknown): item is TextItem {
  return typeof item === "object" && item !== null && "str" in item;
}

export async function extractPdfText(file: File): Promise<string> {
  let pdfjs: PdfJs;
  try {
    pdfjs = await loadPdfJs();
  } catch {
    throw new PdfExtractionError("unknown", "Could not load the PDF engine.");
  }

  const buffer = await file.arrayBuffer();

  let pdf;
  try {
    pdf = await pdfjs.getDocument({ data: buffer }).promise;
  } catch {
    throw new PdfExtractionError(
      "corrupted",
      "This PDF looks corrupted or password-protected.",
    );
  }

  const pageTexts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    let pageText = "";
    let lastY: number | null = null;
    for (const item of content.items) {
      if (!looksLikeTextItem(item)) continue;
      const y = item.transform?.[5] ?? null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 1) {
        pageText += "\n";
      }
      pageText += item.str;
      if (item.hasEOL) pageText += "\n";
      lastY = y;
    }
    pageTexts.push(pageText.trim());
  }

  const combined = pageTexts.join("\n\n").trim();
  if (combined.length === 0) {
    throw new PdfExtractionError(
      "image-only",
      "We couldn't find any text in this PDF. It may be a scan or image-only document.",
    );
  }
  return combined;
}
