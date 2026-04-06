import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelpCircle, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/Sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserTypeSwitcher from "@/components/UserTypeSwitcher";

const Layout = () => {
  const [activeView, setActiveView] = useState("analyze");
  const [userType, setUserType] = useState("non_doctor");
  const { t, i18n } = useTranslation();

  const skinDiseases = [
    "Acne", "Eczema", "Psoriasis", "Melanoma", "Basal Cell Carcinoma", 
    "Vitiligo", "Rosacea", "Atopic Dermatitis", "Contact Dermatitis",
    "Seborrheic Dermatitis", "Actinic Keratosis", "Shingles"
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Global Header */}
        <header className="h-14 shrink-0 border-b border-border surface-elevated flex items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-semibold text-foreground font-display tracking-tight"> 
                {t(`nav.${activeView}`)}
            </h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20">
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">
                DermaSight
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="flex items-center gap-2 bg-secondary/60 px-3 py-1.5 border border-border/40">
              <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                placeholder={t('header.search')}
                className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-48"
              />
            </div>
            <LanguageSwitcher />
            <UserTypeSwitcher userType={userType} onUserTypeChange={setUserType} />
            
            {/* Notifications */}
            <button className="w-8 h-8 rounded-full bg-secondary hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Bell className="w-4 h-4" />
            </button>
            
            {/* Help Circle - Skin Diseases List */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary-foreground transition-all">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <h3 className="px-4 py-2 text-sm font-semibold text-foreground border-b border-border">
                  {t('header.supportedDiseases', { defaultValue: "Supported Diseases" })}
                </h3>

                <div className="max-h-64 overflow-y-auto py-1">
                  {skinDiseases.map((disease, i) => (
                    <DropdownMenuItem key={i} className="justify-start px-4 py-2 text-xs cursor-pointer hover:bg-accent">
                      {disease}
                    </DropdownMenuItem>
                  ))}
                </div>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Outlet context={{ language: i18n.language as string, userType }} />
      </main>
    </div>
  );
};

export default Layout;

