import type { ReactNode } from "react";

interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const cardBaseClassName =
  "rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition";

export const Card = ({ title, subtitle, children, footer, onClick, className = "" }: CardProps) => {
  const content = (
    <>
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </header>
      )}

      {children && <div className="text-sm text-slate-700">{children}</div>}

      {footer && <footer className="mt-5">{footer}</footer>}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${cardBaseClassName} cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${className}`}
      >
        {content}
      </button>
    );
  }

  return <article className={`${cardBaseClassName} ${className}`}>{content}</article>;
};