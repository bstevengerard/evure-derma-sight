import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import dermaImg from '/derma.png';

const LoadingModal = () => {
  const [phase, setPhase] = useState<'logo' | 'skeleton'>('logo');
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing AI models...');
  const [dots, setDots] = useState('');

  const loadingMessages = [
    'Loading E-vuze Dermasight',
    'Calibrating skin analysis engine',
    'Loading dermatology database',
    'Preparing AI models',
    'Optimizing for accuracy',
    'Almost there...'
  ];

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);

    // Rotate loading messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 800);

    // Animated dots effect
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const timer = setTimeout(() => {
      setPhase('skeleton');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background flex items-center justify-center p-8"
      >
        {phase === 'logo' ? (
          <motion.div
            key="logo"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center max-w-md w-full"
          >
            {/* Logo Container */}
            <div className="relative mb-8">
              {/* Simple rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-primary/20"
              />
              
              {/* Logo Image */}
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src={dermaImg}
                  alt="E-vuze Dermasight"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-2xl shadow-lg border border-border"
                />
              </motion.div>
            </div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                E-vuze Dermasight
              </h1>
              <p className="text-sm text-muted-foreground mt-1">AI-Powered Dermatology</p>
            </motion.div>

            {/* Loading Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full space-y-6"
            >
              {/* Loading Message */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {loadingText}{dots}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Initializing</span>
                  <span className="font-mono">{Math.min(Math.floor(progress), 100)}%</span>
                  <span>Ready</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingModal;