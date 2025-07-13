import { ChatMessage } from '@/types/chat';

export interface BotResponse {
  message: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  nextStage?: 'welcome' | 'assessment' | 'analysis' | 'complete';
}

// Simulated sentiment analysis
export const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'love', 'enjoy', 'excited', 'optimistic', 'confident', 'grateful', 'peaceful', 'calm'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'angry', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed', 'hopeless', 'frustrated', 'lonely', 'afraid'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// Psychological assessment questions database
const assessmentQuestions = [
  {
    keywords: ['anxious', 'anxiety', 'worried', 'nervous', 'panic'],
    responses: [
      "I understand you're experiencing anxiety. This is very common and you're not alone. Can you tell me more about when these feelings typically occur?",
      "Anxiety can be overwhelming. Let's explore what might be triggering these feelings. Have you noticed any specific situations that make you feel more anxious?",
      "Thank you for sharing about your anxiety. It takes courage to acknowledge these feelings. What coping strategies have you tried in the past?"
    ]
  },
  {
    keywords: ['depressed', 'depression', 'sad', 'hopeless', 'empty'],
    responses: [
      "I hear that you're going through a difficult time. Depression affects many people, and reaching out is a positive step. How long have you been feeling this way?",
      "Your feelings are valid, and I'm glad you're here to talk about them. Can you describe what depression feels like for you on a typical day?",
      "Depression can make everything feel overwhelming. Have you been able to maintain your daily routines, or has this been challenging?"
    ]
  },
  {
    keywords: ['stressed', 'stress', 'overwhelmed', 'pressure', 'burden'],
    responses: [
      "Stress is a natural response, but when it becomes overwhelming, it's important to address it. What are the main sources of stress in your life right now?",
      "I can sense you're feeling overwhelmed. Let's break this down - what aspects of your life feel most stressful at the moment?",
      "Stress can affect us physically and mentally. How has this stress been impacting your sleep, appetite, or daily activities?"
    ]
  }
];

// Generate contextual responses
export const generateResponse = (
  userMessage: string, 
  previousMessages: ChatMessage[], 
  assessmentStage: string
): BotResponse => {
  const sentiment = analyzeSentiment(userMessage);
  const lowerMessage = userMessage.toLowerCase();
  
  // Emergency keywords check
  const emergencyKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die'];
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: "I'm very concerned about what you've shared. Your life has value, and there are people who want to help. Please reach out to a crisis helpline immediately:\n\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Or go to your nearest emergency room\n\nI'm here to support you, but please get professional help right away.",
      sentiment: 'negative'
    };
  }
  
  // Find matching assessment category
  const matchedCategory = assessmentQuestions.find(category =>
    category.keywords.some(keyword => lowerMessage.includes(keyword))
  );
  
  if (matchedCategory) {
    const randomResponse = matchedCategory.responses[Math.floor(Math.random() * matchedCategory.responses.length)];
    return {
      message: randomResponse,
      sentiment: 'neutral'
    };
  }
  
  // General supportive responses based on sentiment
  if (sentiment === 'positive') {
    const positiveResponses = [
      "It's wonderful to hear positivity in your message! Maintaining good mental health is just as important as addressing challenges. What activities or thoughts contribute most to your wellbeing?",
      "I'm glad you're feeling good! Sometimes it's helpful to reflect on what's working well in our lives. What would you say are your strongest coping mechanisms?",
      "Your positive energy comes through clearly. Even when we're feeling good, it's valuable to build emotional resilience. What does self-care look like for you?"
    ];
    return {
      message: positiveResponses[Math.floor(Math.random() * positiveResponses.length)],
      sentiment: 'positive'
    };
  }
  
  if (sentiment === 'negative') {
    const supportiveResponses = [
      "I can sense you're going through something difficult. Your feelings are valid, and it's okay to not be okay. Would you like to share more about what's been challenging for you?",
      "Thank you for trusting me with your feelings. It takes strength to reach out when you're struggling. Can you help me understand what's been weighing on your mind?",
      "I hear that you're in a tough place right now. Remember that difficult emotions are temporary, and there are ways to work through them. What would feel most helpful to talk about?"
    ];
    return {
      message: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
      sentiment: 'neutral'
    };
  }
  
  // Neutral responses for general conversation
  const neutralResponses = [
    "Thank you for sharing that with me. I'm here to listen and provide support. Is there a particular aspect of your mental health or wellbeing you'd like to explore together?",
    "I appreciate you taking the time to talk with me. Everyone's mental health journey is unique. What would be most helpful for you to discuss today?",
    "It sounds like you have a lot on your mind. Sometimes just talking things through can provide clarity. What feels most important to address right now?",
    "I'm here to provide a safe space for you to explore your thoughts and feelings. What aspects of your mental health would you like to focus on?"
  ];
  
  return {
    message: neutralResponses[Math.floor(Math.random() * neutralResponses.length)],
    sentiment: 'neutral'
  };
};