import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bell,
  LogOut,
  X,
  FileBadge,
  Anchor,
  Menu,
  Shield,
  ChevronRight,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import "./admin-layout-pirate.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      id: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "/create-notice",
      label: "Notice Board",
      icon: Bell,
    },
    {
      id: "/create-syllabus",
      label: "Syllabus",
      icon: BookOpen,
    },
    {
      id: "/create-topper",
      label: "Topper",
      icon: FileBadge,
    },
    {
      id: "/create-notes",
      label: "Study Notes",
      icon: BookOpen,
    },
    {
      id: "/create-pyq",
      label: "Previous Papers",
      icon: FileText,
    },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="al-pirate-layout">
      {sidebarOpen && (
        <button
          type="button"
          className="al-mobile-overlay"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`al-sidebar ${sidebarOpen ? "al-sidebar-open" : ""}`}
      >
        <div className="al-brand">
          <div className="al-brand-mark">
            <Anchor size={25} />
          </div>

          <div className="al-brand-text">
            <strong>VEDORA</strong>
            <span>INSTITUTE OF TECHNOLOGY</span>
          </div>

          <button
            type="button"
            className="al-close-sidebar"
            aria-label="Close sidebar"
            onClick={closeSidebar}
          >
            <X size={20} />
          </button>
        </div>

        <div className="al-sidebar-caption">
          <span>THE CAPTAIN'S DECK</span>
          <span className="al-caption-star">✦</span>
        </div>

        <nav className="al-navigation" aria-label="Admin navigation">
          <p className="al-nav-heading">NAVIGATION</p>

          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.id}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `al-nav-link ${isActive ? "al-nav-link-active" : ""}`
                }
              >
                <Icon className="al-nav-icon" size={19} />

                <span>{item.label}</span>

                <ChevronRight className="al-nav-arrow" size={15} />
              </NavLink>
            );
          })}
        </nav>

        <div className="al-sidebar-spacer" />

        <div className="al-admin-profile">
          <div className="al-profile-avatar">
            <Shield size={21} />
          </div>

          <div className="al-profile-info">
            <strong>Admin Portal</strong>
            <span>Institute Administrator</span>
          </div>

          <span className="al-profile-status" title="Admin panel" />
        </div>

        <div className="al-sidebar-footer">
          <Anchor size={14} />
          <span>KNOWLEDGE IS YOUR TREASURE</span>
        </div>
      </aside>

      <div className="al-main-column">
        <header className="al-topbar">
          <div className="al-topbar-left">
            <button
              type="button"
              className="al-menu-button"
              aria-label="Open navigation menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <span className="al-topbar-eyebrow">VEDORA · ADMINISTRATION</span>
              <p className="al-topbar-title">Command Center</p>
            </div>
          </div>

          <div className="al-topbar-right">
            <span className="al-online-dot" />
            <span>Admin Workspace</span>
            <div className="al-topbar-avatar">A</div>
          </div>
        </header>

        <main className="al-main-content">
          <Outlet />
        </main>

        <footer className="al-main-footer">
          <span>✦</span>
          <span>VEDORA INSTITUTE OF TECHNOLOGY</span>
          <span className="al-footer-separator">·</span>
          <span>SAIL TOWARD EXCELLENCE</span>
          <span>✦</span>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;