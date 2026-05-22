import type { PropsWithChildren } from "react";
import { useAppLayout } from "../hooks";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleSidebarCollapse,
    toggleMobileSidebar,
    closeMobileSidebar,
  } = useAppLayout();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleSidebarCollapse={toggleSidebarCollapse}
        onToggleMobileSidebar={toggleMobileSidebar}
      />

      <div className="mx-auto flex">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onNavigate={closeMobileSidebar}
        />
        <main className="min-h-[calc(100vh-4rem)] w-full p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};