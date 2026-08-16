import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "A new portfolio experience is on the way.",
};

const highlights = [
  "Selected work and case studies",
  "A sharper visual identity",
  "Launch-ready contact details",
];

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen overflow-hidden bg-[#f4efe7] text-stone-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.55),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.22),_transparent_24%),linear-gradient(180deg,_#f8f3ec_0%,_#efe6da_100%)]" />
      <div className="absolute inset-x-6 top-6 -z-10 h-40 rounded-full bg-white/55 blur-3xl sm:inset-x-16" />
      <div className="absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(120,113,108,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.08)_1px,transparent_1px)] [background-position:center] [background-size:36px_36px]" />

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-16 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
        <div className="flex items-center justify-between text-sm uppercase tracking-[0.32em] text-stone-600">
          <span>Portfolio</span>
          <span>Launching Soon</span>
        </div>

        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-stone-900/10 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-stone-700 shadow-[0_1px_0_rgba(255,255,255,0.7)] backdrop-blur">
              Under Construction
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance text-stone-950 sm:text-6xl lg:text-7xl">
              A tighter portfolio is being built behind the curtain.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
              This site is in transition while I package the work, writing, and
              contact details into a cleaner public launch. The placeholder is
              temporary. The next version is meant to feel finished.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-stone-50">
                Full launch in progress
              </div>
              <p className="text-sm text-stone-600">
                Contact details and finished case studies will be added with the
                public release.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-stone-900/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(120,53,15,0.12)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              What&apos;s coming
            </p>
            <ul className="mt-6 space-y-4 text-sm text-stone-700">
              {highlights.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-t border-stone-900/8 pt-4 first:border-t-0 first:pt-0"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-950 text-xs font-semibold text-stone-50">
                    0{index + 1}
                  </span>
                  <span className="pt-1 text-base leading-6 text-stone-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
