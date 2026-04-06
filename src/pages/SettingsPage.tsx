import { useTranslation } from "react-i18next";
import { Settings, Shield, Globe, Zap, Bell, User, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const { t } = useTranslation();

  const settingsSections = [
    {
      title: "profile",
      icon: User,
      description: t('settings.profile') || "Manage your account information",
      comingSoon: true
    },
    {
      title: "language",
      icon: Globe,
      description: t('settings.language') || "App language & region",
      comingSoon: false
    },
    {
      title: "notifications",
      icon: Bell,
      description: t('settings.notifications') || "Analysis alerts & updates",
      comingSoon: true
    },
    {
      title: "privacy",
      icon: Shield,
      description: t('settings.privacy') || "Data protection controls",
      comingSoon: true
    },
    {
      title: "aiModel",
      icon: Zap,
      description: t('settings.aiModel') || "Diagnostic model version",
      comingSoon: true
    },
    {
      title: "reports",
      icon: TrendingUp,
      description: t('settings.reports') || "PDF export preferences",
      comingSoon: true
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-foreground/20 flex items-center justify-center rounded-lg">
          <Settings className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground">{t('settings.title') || "Settings"}</h1>
          <p className="text-xs text-muted-foreground">{t('settings.subtitle') || "Customize preferences"}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {settingsSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative p-6 rounded-xl border border-border hover:border-primary/50 bg-gradient-to-r from-background to-secondary/30 hover:to-primary/5 transition-all duration-300 overflow-hidden"
              >
                {section.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full font-medium">
                      {t('comingSoon') || "Soon"}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-foreground/20 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                    <section.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1 leading-tight">
                      {t(`settings.${section.title}`) || section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  {section.comingSoon ? (
                    <span className="text-xs text-muted-foreground">
                      {t('comingSoon.soon') || "Coming soon"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-600 font-medium">
                        {t('available') || "Available"}
                      </span>
                    </div>
                  )}
                  <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    {t('manage') || "Manage"} →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
