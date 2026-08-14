import type { ReactNode } from "react";

type WidgetFrameProps = {
  readonly id: string;
  readonly title: string;
  readonly eyebrow?: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export function WidgetFrame({ id, title, eyebrow, children, className = "" }: WidgetFrameProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`rounded-widget bg-surface-subtle p-5 sm:p-6 ${className}`}>
      <header className="mb-6">
        {eyebrow ? <p className="mb-1 text-caption font-semibold text-tertiary">{eyebrow}</p> : null}
        <h2 id={titleId} className="text-section-title font-bold text-primary">{title}</h2>
      </header>
      {children}
    </section>
  );
}
