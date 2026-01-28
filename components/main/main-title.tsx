import { APP_ENG_TITLE, APP_SHORT_DESCRIPTION } from "@/lib/constants";

export default function MainTitle() {
  return (
    <div className="main__title text-center border-t border-gray-300/20 py-8">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand break-all">
        {APP_ENG_TITLE}
      </span>
      <h2 className="py-1 md:py-2 text-2xl md:text-3xl text-slate-900 font-anyvid break-all">
        상상한 이미지를 바로 만들어요. <br className="md:hidden" />
        지금!
      </h2>
      <p className="text-sm text-muted-foreground font-anyvid">
        {APP_SHORT_DESCRIPTION}
      </p>
    </div>
  );
}
