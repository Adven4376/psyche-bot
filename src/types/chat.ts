export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface PsychologicalQuestion {
  id: string;
  question: string;
  category: 'anxiety' | 'depression' | 'stress' | 'general';
  followUp?: string[];
}

export interface AssessmentResult {
  category: string;
  score: number;
  interpretation: string;
  recommendations: string[];
}