import { motion } from "framer-motion";
import { AlertTriangle, Shield, Pill, BookOpen, Activity, Clock, Globe, User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BackendData {
  disease: string;
  probability: number;
  time: number | string;
  overview: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  language: string;
  user_type: string;
  [key: string]: any;
}

interface AnalysisResultsProps {

  data: BackendData;
  imageUrl: string;
}

const languageNames: Record<string, string> = {
  en: "English",
  rw: "Kinyarwanda",
  ksw: "Kiswahili",
  fr: "French",
};

const userTypeNames: Record<string, string> = {
  doctor: "Medical Professional",
  non_doctor: "General User",
};

const AnalysisResults = ({ data, imageUrl }: AnalysisResultsProps) => {
  const { t } = useTranslation();
  const confidencePercent = Math.round(data.probability * 100);
  const processingTime = typeof data.time === 'number' ? data.time : parseFloat(data.time) || 0;

  const sectionConfig = [
    { key: "overview", title: t('results.overview'), icon: BookOpen },
    { key: "symptoms", title: t('results.symptoms'), icon: Activity },
    { key: "causes", title: t('results.causes'), icon: Shield },
    ...(data.treatments && data.treatments.length > 0
      ? [{ key: "treatments", title: t('results.treatments'), icon: Pill }]
      : []),
  ] as const;

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-0"
    >
      {/* Header with image */}
      <motion.div variants={fadeUp} className="relative">
        <div className="w-full h-48 overflow-hidden relative">
          <img src={imageUrl} alt={data.disease} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 ${confidencePercent > 80 ? "bg-green-400" : confidencePercent > 50 ? "bg-yellow-400" : "bg-destructive"}`} />
              <span className="text-xs font-mono text-primary-foreground/70">{confidencePercent}% {t('results.confidence')}</span>
            </div>
            <h2 className="text-xl font-semibold text-primary-foreground">{data.disease}</h2>
          </div>
        </div>
      </motion.div>

      {/* Confidence bar */}
      <motion.div variants={fadeUp} className="px-5 py-3 surface-elevated border-b border-border">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground font-medium">{t('results.diagnosticConfidence')}</span>
          <span className="font-mono text-foreground">{confidencePercent}%</span>
        </div>
        <div className="w-full h-1 bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercent}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Processing Time & Language */}
      <motion.div variants={fadeUp} className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{t('results.processingTime')}: {processingTime.toFixed(3)}s</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{languageNames[data.language] || data.language}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{userTypeNames[data.user_type] || data.user_type}</span>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      {sectionConfig.map((section) => {
        const content = data[section.key];

        return (
          <motion.div
            key={section.key}
            variants={fadeUp}
            className="px-5 py-4 border-b border-border hover:bg-accent/50 transition-colors duration-150"
          >
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            </div>
            {typeof content === "string" ? (
              <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
            ) : (
              <ul className="space-y-2">
                {(content as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        );
      })}

      {/* Treatment Info for Non-Doctors */}
      {data.user_type === "non_doctor" && (!data.treatments || data.treatments.length === 0) && (
        <motion.div variants={fadeUp} className="px-5 py-4 border-b border-border bg-blue-50/50">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">Treatment Information Restricted</p>
              <p className="text-xs text-blue-600 mt-1">
                Treatment recommendations are only available for medical professionals. Please consult a doctor for proper medical advice.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div variants={fadeUp} className="px-5 py-3 bg-accent/50 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t('results.disclaimer')}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResults;
