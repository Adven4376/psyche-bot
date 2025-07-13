import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatInterface />;
  }

  return <WelcomeScreen onStartChat={() => setShowChat(true)} />;
};

export default Index;
