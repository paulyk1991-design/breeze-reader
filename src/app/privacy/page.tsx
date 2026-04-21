import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Breeze Reader",
  description:
    "Breeze Reader's privacy policy. We do not collect, store, or transmit any user data — everything runs locally in your browser.",
  robots: { index: true, follow: true },
};

const lastUpdated = "April 21, 2026";

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-5 pt-16 pb-16 sm:pt-20">
          <header className="mb-10">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              ← Back to Breeze Reader
            </Link>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="space-y-8 text-[15px] leading-relaxed text-slate-700">
            <Section title="Introduction">
              <p>
                This Privacy Policy describes how Breeze Reader (the web app
                at this site and the Breeze Reader Chrome extension) handles
                information. The short version: we don&rsquo;t collect
                anything. Breeze Reader is designed to work entirely on your
                own device, and nothing you read with it is sent to us or to
                any third party.
              </p>
            </Section>

            <Section title="What we collect">
              <p>
                <strong>Nothing.</strong> Breeze Reader does not collect any
                personal information, browsing history, PDF content, webpage
                content, cookies, IP addresses, device identifiers, or
                analytics data. We do not require an account and there is no
                login.
              </p>
            </Section>

            <Section title="How we use data">
              <p>
                We don&rsquo;t use any data &mdash; because we don&rsquo;t
                have any. All processing happens locally, in your browser or
                extension, and the results stay on your device unless you
                choose to copy them elsewhere.
              </p>
            </Section>

            <Section title="Third-party sharing">
              <p>
                We do not share data with third parties. We have no data to
                share, sell, rent, or transfer. Breeze Reader does not
                integrate with advertising networks or analytics providers.
              </p>
            </Section>

            <Section title="Cookies & tracking">
              <p>
                Breeze Reader does not set cookies, use local storage for
                tracking, or fingerprint your device. There are no tracking
                pixels, beacons, or third-party scripts.
              </p>
            </Section>

            <Section title="The web app (PDF converter)">
              <p>
                When you open a PDF in the Breeze Reader web app, the file is
                read and transformed entirely in your browser using PDF.js. No
                part of the PDF is uploaded to our servers (we don&rsquo;t
                operate any PDF-processing server). When you close or refresh
                the tab, the file is gone from the page&rsquo;s memory.
              </p>
            </Section>

            <Section title="The Chrome extension">
              <p>
                The Breeze Reader Chrome extension uses the minimum
                permissions needed to do its job:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>activeTab</strong> &mdash; lets the extension read
                  the text of the current tab <em>only</em> when you click
                  the toolbar icon. It cannot read any tab you haven&rsquo;t
                  activated the extension on.
                </li>
                <li>
                  <strong>scripting</strong> &mdash; lets the extension apply
                  the breeze-formatting styles to the text on that same tab.
                </li>
              </ul>
              <p>
                The extension does not track browsing, does not run in the
                background, and does not send any data anywhere. Text it
                reads from a page is processed in memory on your device and
                is not stored or transmitted.
              </p>
            </Section>

            <Section title="Children's privacy">
              <p>
                Breeze Reader is a general-audience reading tool and is not
                directed at children under 13. Because we do not collect
                personal information from anyone, we do not knowingly collect
                personal information from children. If you believe a child
                has somehow provided information to us, please contact us
                and we will confirm that we have nothing on file.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                If we update this Privacy Policy, we will change the
                &ldquo;Last updated&rdquo; date at the top of the page. For
                material changes, we will make a reasonable effort to notify
                users through the web app or extension. Continued use of
                Breeze Reader after an update means you accept the revised
                policy.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this policy? Email{" "}
                <a
                  href="mailto:paulyk1991@gmail.com"
                  className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
                >
                  paulyk1991@gmail.com
                </a>
                .
              </p>
            </Section>
          </div>
        </article>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-5 py-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between">
          <div>
            Your files are processed entirely in your browser. Nothing is
            uploaded.
          </div>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
