"use client";

import { useMemo, useState } from "react";
import { bionicText } from "@/lib/bionic";

type Props = {
  text: string;
  fileName?: string;
  onReset: () => void;
};

export default function BionicOutput({ text, fileName, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  const segments = useMemo(() => bionicText(text), [text]);

  const copyToClipboard = async () => {
    try {
      const html = segments
        .map((s) => {
          if (s.type === "space") return s.text.replace(/\n/g, "<br/>");
          if (s.type === "bold") return `<b>${escapeHtml(s.text)}</b>`;
          return escapeHtml(s.text);
        })
        .join("");

      if (
        typeof ClipboardItem !== "undefined" &&
        navigator.clipboard?.write
      ) {
        const blobHtml = new Blob([html], { type: "text/html" });
        const blobText = new Blob([text], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // ignore
      }
    }
  };

  const wordCount = useMemo(
    () => (text.match(/\S+/g) ?? []).length,
    [text],
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-slate-900">
            {fileName ?? "Converted text"}
          </div>
          <div className="text-xs text-slate-500">
            {wordCount.toLocaleString()} words &middot; breeze formatted
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 active:bg-slate-900"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Process another PDF
          </button>
        </div>
      </div>

      <div
        className="max-h-[65vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-800 shadow-sm"
        style={{ fontSize: "1.0625rem" }}
      >
        <p className="whitespace-pre-wrap break-words">
          {segments.map((seg, i) => {
            if (seg.type === "bold") {
              return (
                <b key={i} className="font-semibold text-slate-900">
                  {seg.text}
                </b>
              );
            }
            return <span key={i}>{seg.text}</span>;
          })}
        </p>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
