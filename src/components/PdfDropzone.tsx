"use client";

import { useCallback, useRef, useState } from "react";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

type Props = {
  onFile: (file: File) => void;
  disabled?: boolean;
};

export default function PdfDropzone({ onFile, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateAndSend = useCallback(
    (file: File | undefined | null) => {
      if (!file) return;
      setLocalError(null);

      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        setLocalError("Please choose a PDF file.");
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        const mb = (file.size / (1024 * 1024)).toFixed(1);
        setLocalError(
          `That file is ${mb} MB. Please pick a PDF under 10 MB.`,
        );
        return;
      }
      onFile(file);
    },
    [onFile],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files?.[0];
      validateAndSend(file);
    },
    [disabled, validateAndSend],
  );

  const onBrowse = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={onBrowse}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onBrowse();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={[
          "flex flex-col items-center justify-center gap-3",
          "rounded-2xl border-2 border-dashed px-6 py-14 text-center transition",
          "cursor-pointer select-none",
          dragging
            ? "border-slate-900 bg-slate-50"
            : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50",
          disabled ? "opacity-60 pointer-events-none" : "",
        ].join(" ")}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3v12" />
            <path d="m7 8 5-5 5 5" />
            <path d="M5 21h14" />
          </svg>
        </div>
        <div className="text-base font-medium text-slate-900">
          Drop a PDF here, or click to choose
        </div>
        <div className="text-sm text-slate-500">
          Up to 10 MB &middot; processed entirely in your browser
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => validateAndSend(e.target.files?.[0])}
        />
      </div>

      {localError && (
        <p
          role="alert"
          className="mt-3 text-sm text-red-600"
        >
          {localError}
        </p>
      )}
    </div>
  );
}
