# Breeze Reader

Breeze Reader makes reading effortless by bolding the first few letters of each word — a simple visual assist that helps your eyes move through text faster. Drop in a PDF and get the focus-bolded output back, ready to read or copy elsewhere.

Built with Next.js 16, TypeScript, Tailwind CSS, and [PDF.js](https://mozilla.github.io/pdf.js/). Everything runs in the browser — **nothing is uploaded**.

## Features

- Drag-and-drop or click-to-upload PDF input (up to 10 MB)
- Client-side PDF text extraction via PDF.js
- Focus-bolded output with weights that scale to word length
- Copy-to-clipboard preserves bold formatting (rich text + plain text)
- Responsive, clean, light-mode design
- Friendly error handling for corrupted or image-only PDFs

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

The `copy-pdf-worker` script runs automatically before `dev` and `build` to sync the PDF.js worker into `public/`.

## Deploy

Deploy to Vercel with no configuration. No server-side code, no environment variables.

## Privacy

PDFs are read and transformed entirely in the browser. They are never sent to a server.
