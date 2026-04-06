import { useState, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw, Globe, User, MessageSquare } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageUpload from "@/components/ImageUpload";
import WaveLoader from "@/components/WaveLoader";
import AnalysisResults from "@/components/AnalysisResults";
import AiChat from "@/components/AiChat";

interface BackendData {
  disease: string;
  probability: number;
  time: number;
  overview: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  language: string;
  user_type: string;
}

type AnalysisState = "idle" | "loading" | "done" | "error";

const AnalyzePage = () => {
  const { language, userType } = useOutletContext() as { language: string; userType: string };
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [progress, setProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<BackendData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setSelectedFile(file);
    setAnalysisState("idle");
    setProgress(0);
    setAnalysisData(null);
    setApiError(null);
  }, []);

  const handleClear = useCallback(() => {
    if (selectedImage) URL.revokeObjectURL(selectedImage);
    setSelectedImage(null);
    setSelectedFile(null);
    setAnalysisState("idle");
    setProgress(0);
    setAnalysisData(null);
    setApiError(null);
  }, [selectedImage]);

  const startAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setAnalysisState("loading");
    setProgress(0);
    setApiError(null);

    const formData = new FormData();
    formData.append('im', selectedFile);
    formData.append('lang', language);
    formData.append('user_type', userType);

    try {
      const response = await fetch('https://evure-dermasight.onrender.com/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API error: ${response.status}`);
      }

      const data: BackendData = await response.json();
      setAnalysisData(data);
      setAnalysisState("done");
    } catch (error) {
      console.error('Analysis error:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to analyze image');
      setAnalysisState("error");
    }
  }, [selectedFile, language, userType]);

  // Simulate progress during loading
  useEffect(() => {
    if (analysisState !== "loading" && analysisState !== "done") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (analysisState === "done") {
          if (prev >= 100) return 100;
          return prev + 2;
        }
        if (prev >= 95) return 95;
        return prev + Math.random() * 5 + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [analysisState]);

  // Set progress to 100% when done
  useEffect(() => {
    if (analysisState === "done") {
      setProgress(100);
    }
  }, [analysisState]);

  return (
    <div className="relative h-full">
      <div className="flex h-full">
        {/* Left Panel - Upload / Image */}
        <div className="w-[45%] border-r border-border flex flex-col h-full">
          {/* Fixed Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-base font-semibold text-foreground">{t('analyze.title')}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{t('analyze.subtitle')}</p>
            </div>
            {analysisState === "done" && (
              <button 
                onClick={handleClear} 
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-secondary hover:bg-accent transition-colors rounded-md"
              >
                <RotateCcw className="w-3 h-3" />
                {t('analyze.newScan')}
              </button>
            )}
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center p-8 min-h-full">
              <AnimatePresence mode="wait">
                {analysisState === "loading" ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                    <WaveLoader imageSrc={selectedImage ?? undefined} progress={Math.min(Math.round(progress), 100)} />
                  </motion.div>
                ) : (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md">
                    <ImageUpload onImageSelect={handleImageSelect} selectedImage={selectedImage} onClear={handleClear} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {selectedImage && analysisState === "idle" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 w-full max-w-md space-y-4">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{t(`language.${language}`)}</span>
                    </div>
                    <div className="w-px h-3 bg-border" />
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{userType === 'doctor' ? t('userType.doctor') : t('userType.patient')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={startAnalysis} 
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors rounded-md"
                  >
                    <Zap className="w-4 h-4" />
                    {t('analyze.analyzeBtn')}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 flex flex-col h-full">
          {/* Fixed Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-base font-semibold text-foreground">{t('results.diagnosticReport')}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {analysisState === "done" ? t('analyze.analysisComplete') : analysisState === "error" ? t('errors.analysisFailed') : t('analyze.awaitingAnalysis')}
              </p>
            </div>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md"
            >
              <MessageSquare className="w-3 h-3" />
              {t('chat.title')}
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {analysisState === "done" && analysisData ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AnalysisResults data={analysisData} imageUrl={selectedImage!} />
                </motion.div>
              ) : analysisState === "error" ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-24 h-24 bg-destructive/10 flex items-center justify-center mb-6 rounded-lg">
                    <Zap className="w-10 h-10 text-destructive/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('errors.analysisFailed')}</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-6">{apiError}</p>
                  <button 
                    onClick={handleClear} 
                    className="px-6 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-medium rounded-md"
                  >
                    {t('errors.tryAgain')}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ duration: 0.3 }} 
                  className="h-full flex flex-col items-center justify-center text-center px-8"
                >
                  <div className="w-24 h-24 bg-primary/10 flex items-center justify-center mb-6 rounded-lg">
                    <ImageIcon className="w-10 h-10 text-primary/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('analyze.noAnalysis')}</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-6">{t('analyze.noAnalysisDesc')}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{t('analyze.aiPowered')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{t('analyze.instantResults')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{t('analyze.secure')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      <AiChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default AnalyzePage;