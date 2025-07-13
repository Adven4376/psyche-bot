import { Brain, Shield, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/psyche-bot-hero.jpg";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export const WelcomeScreen = ({ onStartChat }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 opacity-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
        {/* Header */}
        <div className="space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Psyche Bot
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your AI-powered psychological companion for mental health support and self-assessment
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 my-8">
          <Card className="p-4 text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Confidential</h3>
            <p className="text-xs text-muted-foreground">Private and secure conversations</p>
          </Card>
          <Card className="p-4 text-center">
            <Heart className="w-6 h-6 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Empathetic</h3>
            <p className="text-xs text-muted-foreground">Understanding and supportive responses</p>
          </Card>
          <Card className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-sm">24/7 Available</h3>
            <p className="text-xs text-muted-foreground">Always here when you need support</p>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="p-4 bg-muted/50 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important:</strong> This chatbot provides psychological insights and support but is not a replacement for professional mental health care. 
            If you're experiencing a crisis, please contact emergency services or a mental health professional immediately.
          </p>
        </Card>

        {/* CTA */}
        <div className="space-y-4">
          <Button onClick={onStartChat} size="lg" className="px-8">
            Start Your Assessment
          </Button>
          <p className="text-sm text-muted-foreground">
            Free • Anonymous • Scientifically-backed assessment
          </p>
        </div>
      </div>
    </div>
  );
};