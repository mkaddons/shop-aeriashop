type Props = { demo: string };

export function ProductDemo({ demo }: Props) {
  const url = demo.trim();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border-ink text-ink shadow-brutal-sm hover:bg-primary mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 bg-surface px-6 py-3 text-base font-medium transition-transform hover:translate-x-0.5 hover:translate-y-0.5 sm:w-auto"
    >
      Live demo
    </a>
  );
}
