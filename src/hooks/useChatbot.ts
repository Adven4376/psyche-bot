import { useState, useCallback } from 'react';
import { ChatMessage, PsychologicalQuestion } from '@/types/chat';
import { generateResponse } from '@/utils/chatResponses';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<PsychologicalQuestion | null>(null);
  const [assessmentStage, setAssessmentStage] = useState<'welcome' | 'assessment' | 'analysis' | 'complete'>('welcome');

  const addMessage = useCallback((message: string, isUser: boolean, sentiment?: 'positive' | 'negative' | 'neutral') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser,
      timestamp: new Date(),
      sentiment
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (userMessage: string) => {
    // Add user message
    addMessage(userMessage, true);
    
    setIsLoading(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Generate bot response
    const response = generateResponse(userMessage, messages, assessmentStage);
    
    // Update assessment stage if needed
    if (response.nextStage) {
      setAssessmentStage(response.nextStage);
    }
    
    // Add bot response
    addMessage(response.message, false, response.sentiment);
    
    setIsLoading(false);
  }, [messages, assessmentStage, addMessage]);

  const startAssessment = useCallback(() => {
    setAssessmentStage('assessment');
    const welcomeMessage = "Hello! I'm Psyche Bot, your AI psychological companion. I'm here to provide a supportive space for you to explore your mental health. Let's start with a simple question: How are you feeling today, and what brought you here?";
    addMessage(welcomeMessage, false);
  }, [addMessage]);

  // Initialize with welcome message on first load
  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      startAssessment();
    }
  }, [messages.length, startAssessment]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAssessmentStage('welcome');
    setCurrentQuestion(null);
  }, []);

  return {
    messages,
    isLoading,
    assessmentStage,
    sendMessage,
    startAssessment,
    initializeChat,
    clearChat
  };
};