import AiChat from "@/components/AiChat";

interface ChatPageProps {
  onCloseChat: () => void;
}

const ChatPage = ({ onCloseChat }: ChatPageProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <AiChat isOpen={true} onClose={onCloseChat} inline />
    </div>
  );
};

export default ChatPage;
