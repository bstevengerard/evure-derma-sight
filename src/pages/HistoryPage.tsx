import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock, FileText, TrendingUp } from "lucide-react";

const HistoryPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 rounded-lg"
          >
            <Clock className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-foreground mb-3"
          >
            {t('history.title')} - {t('history.comingSoon')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base text-muted-foreground mb-6 max-w-md leading-relaxed"
          >
            {t('history.desc')}
          </motion.p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border rounded-lg bg-secondary/50 border-border hover:bg-secondary hover:border-border hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">{t('history.features.title')}</h4>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t('history.features.results')}</li>
                <li>{t('history.features.pdf')}</li>
                <li>{t('history.features.trends')}</li>
                <li>{t('history.features.share')}</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 border rounded-lg bg-accent/10 border-accent/20 hover:bg-accent/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">{t('history.advanced.title')}</h4>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                <li>{t('history.advanced.tracking')}</li>
                <li>{t('history.advanced.treatment')}</li>
                <li>{t('history.advanced.doctor')}</li>
                <li>{t('history.advanced.export')}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
