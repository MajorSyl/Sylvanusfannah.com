/** Soft gradient orbs + faint grid behind the page. Pure CSS, no JS. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfe_0%,#f4f7fb_60%,#f6f8fb_100%)]" />
      <div className="absolute -top-40 -right-32 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(11,92,255,0.16)_0%,rgba(11,92,255,0)_70%)] blur-2xl" />
      <div className="absolute top-[30%] -left-48 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.14)_0%,rgba(6,182,212,0)_70%)] blur-2xl" />
      <div className="absolute right-[10%] bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(99,140,255,0.12)_0%,rgba(99,140,255,0)_70%)] blur-2xl" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-[linear-gradient(to_right,rgba(15,40,90,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,40,90,0.045)_1px,transparent_1px)] bg-[size:56px_56px]" />
    </div>
  );
}
