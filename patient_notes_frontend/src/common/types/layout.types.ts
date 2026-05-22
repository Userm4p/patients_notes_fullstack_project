export interface HeaderProps {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  onToggleSidebarCollapse: () => void;
  onToggleMobileSidebar: () => void;
}

export interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onNavigate: () => void;
}

export interface UseAppLayoutState {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebarCollapse: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}