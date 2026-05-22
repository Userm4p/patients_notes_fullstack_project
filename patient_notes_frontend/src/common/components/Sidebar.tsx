import { NavLink } from "react-router";
import { NotesIcon, PatientsIcon } from "../assets";
import type { SidebarProps } from "../types";

const navItems = [
  {
    label: "Notes",
    to: "/notes",
    icon: <NotesIcon className="h-5 w-5" />,
  },
  {
    label: "Patients",
    to: "/patients",
    icon: <PatientsIcon className="h-5 w-5" />,
  },
];

export const Sidebar = ({ isCollapsed, isMobileOpen, onNavigate }: SidebarProps) => {
  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menu lateral"
          onClick={onNavigate}
          className="fixed inset-0 z-20 bg-slate-900/40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white px-3 py-5 shadow-xl transition-all duration-200 md:static md:z-10 md:h-[calc(100vh-4rem)] md:translate-x-0 md:shadow-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        <nav className="flex h-full flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                } ${isCollapsed ? "justify-center" : "justify-start"}`
              }
            >
              {isCollapsed ? (
                <span aria-hidden="true">{item.icon}</span>
              ) : (
                <>
                  <span aria-hidden="true" className="mr-2 inline-flex text-current">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};