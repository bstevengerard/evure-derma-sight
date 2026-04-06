import { motion } from "framer-motion";
import { Upload, Clock, BarChart3, MessageSquare, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { id: "analyze", icon: Upload, label: t('nav.analyze') },
    { id: "history", icon: Clock, label: t('nav.history') },
    { id: "insights", icon: BarChart3, label: t('nav.insights') },
    { id: "chat", icon: MessageSquare, label: t('nav.chat') },
    { id: "settings", icon: Settings, label: t('nav.settings') }
  ];

  return (
    <div className="w-16 hover:w-48 transition-all duration-300 h-screen surface-elevated flex flex-col items-center group overflow-hidden shrink-0">
      {/* Logo */}
      <div className="w-full py-5 px-3 flex items-center gap-3 border-b border-border">
        <div className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden">
          <img src="/derma.png" alt="DermaSight" className="w-18 h-full object-cover" />
        </div>
        <span className="text-sm font-semibold text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display tracking-tight">
          {t('app.name')}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 w-full py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                navigate(item.id === "analyze" ? "/" : `/${item.id}`);
              }}
              className={`
                relative w-full flex items-center gap-3 px-3 py-3 transition-all duration-200
                ${isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="w-full py-4 px-3 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 shrink-0 bg-blue-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-700">DR</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t('header.profile')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

