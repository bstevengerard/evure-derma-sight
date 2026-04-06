import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {selectedImage ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full aspect-[4/3] bg-secondary overflow-hidden group"
          >
            <img
              src={selectedImage}
              alt="Selected skin image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200" />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 w-8 h-8 bg-foreground/80 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.label
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            htmlFor="skin-image-upload"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              w-full aspect-[4/3] border-2 border-dashed cursor-pointer
              flex flex-col items-center justify-center gap-4 transition-all duration-200
              ${isDragging
                ? "border-primary bg-accent"
                : "border-border hover:border-muted-foreground bg-secondary/50"
              }
            `}
          >
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
              className="w-14 h-14 bg-accent flex items-center justify-center"
            >
              {isDragging ? (
                <ImageIcon className="w-6 h-6 text-primary" />
              ) : (
                <Upload className="w-6 h-6 text-muted-foreground" />
              )}
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {isDragging ? t('analyze.dropImage') : t('analyze.upload')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t('analyze.uploadHint')}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('analyze.uploadFormat')}
              </p>
            </div>
            <input
              id="skin-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
