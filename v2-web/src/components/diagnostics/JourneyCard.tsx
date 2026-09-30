import Image from "next/image";
import Link from "next/link";
import type { DiagnosticConfig } from "@/features/diagnostics/types";

type JourneyCardProps = {
  config: DiagnosticConfig;
};

export function JourneyCard({ config }: JourneyCardProps) {
  return (
    <Link
      href={`/diagnostic/${config.id}`}
      className="group grid min-h-[330px] overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf1] shadow-[0_18px_60px_rgba(50,44,33,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(50,44,33,0.14)] focus:outline-none focus:ring-4 focus:ring-[#b8c69a]"
    >
      <div className="relative min-h-44 bg-[#f1eadb]">
        <Image
          src={config.visual.image}
          alt={config.visual.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-8 transition duration-500 group-hover:scale-105"
          priority={config.id === "face"}
        />
        {config.isTemporaryDemo ? (
          <span className="absolute left-5 top-5 rounded-full bg-[#efe2cc]/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6a5636]">
            Demo temporaire
          </span>
        ) : null}
      </div>
      <div className="flex min-h-44 flex-col justify-between p-7">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6f45]">
            {config.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#25351f]">
            {config.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#6e695f]">{config.introduction}</p>
        </div>
        <span className="mt-8 inline-flex w-fit items-center rounded-full bg-[#2f4a2d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7efd9]">
          Commencer
        </span>
      </div>
    </Link>
  );
}
