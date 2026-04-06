import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
}

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (onLanguageChange) {
      onLanguageChange(lng);
    }
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'ksw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors border border-transparent hover:border-border/40"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors
                ${i18n.language === lang.code
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }
              `}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
