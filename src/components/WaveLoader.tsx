import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface WaveLoaderProps {
  imageSrc?: string;
  progress?: number;
}

const WaveLoader = ({ imageSrc, progress = 0 }: WaveLoaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="wave-container w-full aspect-[4/3] bg-secondary relative">
      {/* Image underneath */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Analyzing"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Grid overlay for scanning effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsla(213, 80%, 60%, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(213, 80%, 60%, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
      </div>

      {/* Wave overlay */}
      <div className="wave-overlay" />
      <div className="wave-line wave-line-1" />
      <div className="wave-line wave-line-2" />
      <div className="wave-line wave-line-3" />

      {/* Scanning line with glow effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: '0 0 20px hsla(217, 91%, 55%, 0.8), 0 0 40px hsla(217, 91%, 55%, 0.4)',
        }}
      />

      {/* Secondary scanning line (thinner, faster) */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Corner markers */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/60" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/60" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/60" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/60" />

      {/* Pulsing corner markers */}
      <motion.div
        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        <motion.div
          className="w-20 h-20 border-2 border-primary/40 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="text-center">
          <motion.p 
            className="text-sm font-medium text-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {t('analyze.analyzing')}
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{progress}% {t('analyze.complete')}</p>
        </div>

        {/* Progress bar with glow */}
        <div className="w-48 h-[2px] bg-border overflow-hidden relative">
          <motion.div
            className="h-full bg-primary relative"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: '0 0 10px hsla(217, 91%, 55%, 0.6)',
            }}
          />
          {/* Animated glow at the end of progress bar */}
          {progress > 0 && progress < 100 && (
            <motion.div
              className="absolute top-0 h-full w-4 bg-primary/50"
              animate={{ 
                left: [`${progress - 2}%`, `${progress}%`, `${progress - 2}%`],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                boxShadow: '0 0 15px hsla(217, 91%, 55%, 0.8)',
              }}
            />
          )}
        </div>

        {/* Scanning status indicators */}
        <div className="flex items-center gap-2 mt-2">
          {[t('analyze.detecting'), t('analyze.analyzing'), t('analyze.processing')].map((status, i) => (
            <motion.div
              key={status}
              className="flex items-center gap-1"
              animate={{ 
                opacity: progress > (i * 33) ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${progress > (i * 33) ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
              <span className="text-[10px] text-muted-foreground">{status}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Radial pulse effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at center, hsla(217, 91%, 55%, 0) 0%, hsla(217, 91%, 55%, 0) 100%)',
            'radial-gradient(circle at center, hsla(217, 91%, 55%, 0.1) 0%, hsla(217, 91%, 55%, 0) 70%)',
            'radial-gradient(circle at center, hsla(217, 91%, 55%, 0) 0%, hsla(217, 91%, 55%, 0) 100%)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default WaveLoader;
