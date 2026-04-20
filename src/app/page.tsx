"use client";

import { useCallback, useState } from "react";
import PdfDropzone from "@/components/PdfDropzone";
import BionicOutput from "@/components/BionicOutput";
import { extractPdfText, PdfExtractionError } from "@/lib/pdf";

type Status =
  | { kind: "idle" }
  | { kind: "processing"; fileName: string }
  | { kind: "ready"; fileName: string; text: string }
  | { kind: "error"; message: string };

export default function Home() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleFile = useCallback(async (file: File) => {
    setStatus({ kind: "processing", fileName: file.name });
    try {
      const text = await extractPdfText(file);
      setStatus({ kind: "ready", fileName: file.name, text });
    } catch (err) {
      const message =
        err instanceof PdfExtractionError
          ? err.message
          : "Something went wrong reading that PDF. Try a different file.";
      setStatus({ kind: "error", message });
    }
  }, []);

  const reset = useCallback(() => setStatus({ kind: "idle" }), []);

  return (
    <>
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5 pt-16 pb-10 sm:pt-24">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              <b className="font-extrabold">Bion</b>ic{" "}
              <b className="font-extrabold">Read</b>ing,{" "}
              <b className="font-extrabold">str</b>aight{" "}
              <b className="font-extrabold">fr</b>om{" "}
              <b className="font-extrabold">yo</b>ur{" "}
              <b className="font-extrabold">PD</b>Fs.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
              Drop in a PDF and get it back with the first few letters of each
              word bolded &mdash; a pattern that helps many readers move
              through text faster. Everything runs in your browser.
            </p>
          </div>

          {status.kind === "idle" && <PdfDropzone onFile={handleFile} />}

          {status.kind === "processing" && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
              <svg
                className="h-6 w-6 animate-spin text-slate-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                />
              </svg>
              <div className="text-sm font-medium text-slate-900">
                Reading {status.fileName}…
              </div>
              <div className="text-xs text-slate-500">
                Extracting text &middot; nothing leaves your browser
              </div>
            </div>
          )}

          {status.kind === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
              <div className="text-sm font-medium text-red-700">
                {status.message}
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex items-center rounded-lg border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                Try another PDF
              </button>
            </div>
          )}

          {status.kind === "ready" && (
            <BionicOutput
              text={status.text}
              fileName={status.fileName}
              onReset={reset}
            />
          )}
        </section>

        {status.kind === "idle" && (
          <section className="mx-auto max-w-3xl px-5 pb-16">
            <div className="grid gap-4 sm:grid-cols-3">
              <Feature
                title="Fully private"
                body="Your PDF is parsed on your device with PDF.js. No uploads, no servers, no tracking."
              />
              <Feature
                title="Readable output"
                body="Bold weights scale with word length so short words stay light and long words stay anchored."
              />
              <Feature
                title="One-click copy"
                body="Paste the formatted text into Docs, Notion, or anywhere that accepts rich text."
              />
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-6 text-center text-xs text-slate-500">
          Your files are processed entirely in your browser. Nothing is
          uploaded.
        </div>
      </footer>
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1.5 text-sm text-slate-600">{body}</div>
    </div>
  );
}
