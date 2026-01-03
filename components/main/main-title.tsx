export default function MainTitle() {
  return (
    <div className="main__title">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
        AI Image Generator
      </span>
      <h2 className="py-1 md:py-2 text-2xl font-bold text-slate-900 md:text-3xl font-nanumNeo">
        이번엔 무슨 로고를 만들어 볼까요?
      </h2>
      <p className="text-sm text-muted-foreground font-nanumNeo">
        프롬프트 한 줄로, 원하는 스타일을 빠르게 생성해보세요.
      </p>
    </div>
  );
}
