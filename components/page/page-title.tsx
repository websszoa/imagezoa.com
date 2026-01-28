import type { PageTitleProps } from "@/lib/types";

export default function PageTitle({
  subtitle,
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="page__title text-center border-t border-gray-300/20 pt-6 md:pt-8 pb-8 md:pb-12">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand/80">
        {subtitle}
      </span>
      <h2 className="font-nanumNeo py-1 md:py-2 text-2xl text-slate-900 md:text-3xl">
        {title}
      </h2>
      <p className="font-anyvid text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
