import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AiChatProps {
  isOpen: boolean;
  onClose: () => void;
  inline?: boolean;
}

const AiChat = ({ isOpen, onClose, inline = false }: AiChatProps) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t('chat.welcome'),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice input yet. Try Chrome or Edge!");
      return;
    }

    const recognition = new SpeechRecognition();
    
    const langMap: Record<string, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      rw: 'rw-RW',
      sw: 'sw-KE'
    };
    
    recognition.lang = langMap[i18n.language] || 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://backend-xs14.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: userMsg.content,
          language: i18n.language
        }),
      });

      const data = await response.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I am currently offline. Please try again.",
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Oops! I had trouble connecting to the server.",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const chatContent = (
    <>
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-md">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('chat.aiAssistant')}</h3>
            <p className="text-xs text-muted-foreground">{t('chat.dermatologyAssistant')}</p>
          </div>
        </div>
        {!inline && (
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors rounded-md">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-md ${msg.role === "assistant" ? "bg-primary" : "bg-secondary"}`}>
              {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-primary-foreground" /> : <User className="w-3.5 h-3.5 text-secondary-foreground" />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed rounded-md ${msg.role === "assistant" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-md">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-accent px-4 py-3 flex items-center gap-1 rounded-md">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i} 
                  className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" 
                  animate={{ opacity: [0.3, 1, 0.3] }} 
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} 
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-border">
        <div className="flex items-center gap-2 bg-secondary rounded-md">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t('chat.placeholder')}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none rounded-l-md"
          />
          <button 
            onClick={startListening} 
            className={`w-10 h-10 flex items-center justify-center transition-colors ${
              isListening 
                ? "text-red-500 bg-red-100 rounded-full animate-pulse" 
                : "text-muted-foreground hover:text-primary"
            }`}
            title="Click to speak"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button 
            onClick={sendMessage} 
            disabled={!input.trim() || isTyping} 
            className="w-10 h-10 flex items-center justify-center text-primary hover:bg-accent transition-colors disabled:opacity-40 rounded-r-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  if (inline) {
    return <div className="flex-1 flex flex-col h-full surface-elevated">{chatContent}</div>;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed right-0 top-0 bottom-0 w-[420px] surface-elevated border-l border-border z-50 flex flex-col shadow-2xl"
        >
          {chatContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiChat;