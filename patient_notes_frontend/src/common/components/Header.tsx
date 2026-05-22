import type { HeaderProps } from "../types";

export const Header = ({
  isSidebarCollapsed,
  isMobileSidebarOpen,
  onToggleSidebarCollapse,
  onToggleMobileSidebar,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
      <div className="mx-auto flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 md:hidden"
            aria-label={isMobileSidebarOpen ? "Cerrar menu lateral" : "Abrir menu lateral"}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              {isMobileSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={onToggleSidebarCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 md:inline-flex"
            aria-label={isSidebarCollapsed ? "Expandir menu lateral" : "Contraer menu lateral"}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
              {isSidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
              )}
            </svg>
          </button>
          <h1 className="text-sm font-semibold tracking-wide text-slate-900 md:text-base">
            Patient Notes
          </h1>
        </div>
      </div>
    </header>
  );
};