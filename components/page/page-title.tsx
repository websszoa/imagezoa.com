interface PageTitleProps {
  subtitle: string;
  title: string;
  description: string;
}

export default function PageTitle({
  subtitle,
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="text-center border-t border-gray-300/20 pt-10 pb-12">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand/80">
        {subtitle}
      </span>
      <h2 className="font-nanumNeo py-1 md:py-2 text-2xl text-slate-900 md:text-3xl">
        {title}
      </h2>
      <p className="font-nanumNeo text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
