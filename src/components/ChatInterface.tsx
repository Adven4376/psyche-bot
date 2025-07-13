import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useChatbot } from '@/hooks/useChatbot';
import { Button } from '@/components/ui/button';
import { RotateCcw, Brain } from 'lucide-react';

export const ChatInterface = () => {
  const { messages, isLoading, sendMessage, clearChat, initializeChat } = useChatbot();

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Psyche Bot</h1>
            <p className="text-xs text-muted-foreground">AI Psychological Companion</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearChat}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          New Session
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Welcome to Psyche Bot</h3>
                  <p className="text-muted-foreground max-w-md">
                    I'm here to provide psychological support and help you explore your mental health. 
                    Feel free to share what's on your mind.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={sendMessage} 
        isLoading={isLoading}
      />
    </div>
  );
};