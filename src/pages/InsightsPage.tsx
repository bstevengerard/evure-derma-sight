import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BarChart3, TrendingUp, Zap } from "lucide-react";

const InsightsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-base font-semibold text-foreground">{t('insights.title')}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{t('insights.subtitle')}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-16 h-16 bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 border border-accent/20 rounded-lg shadow-sm"
          >
            <BarChart3 className="w-8 h-8 text-accent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3"
          >
            {t('insights.title')} - {t('insights.comingSoon')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base text-muted-foreground mb-6 max-w-md leading-relaxed"
          >
            {t('insights.desc')}
          </motion.p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border rounded-lg bg-secondary/50 border-border hover:bg-secondary hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">{t('insights.basic.title')}</h4>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t('insights.basic.trends')}</li>
                <li>{t('insights.basic.risk')}</li>
                <li>{t('insights.basic.treatment')}</li>
                <li>{t('insights.basic.charts')}</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border rounded-lg bg-accent/10 border-accent/20 hover:bg-accent/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">{t('insights.advanced.title')}</h4>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t('insights.advanced.ai')}</li>
                <li>{t('insights.advanced.population')}</li>
                <li>{t('insights.advanced.benchmark')}</li>
                <li>{t('insights.advanced.dashboards')}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
