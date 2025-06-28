
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson"
    },
    {
      text: "The only way to learn a new programming language is by writing programs in it.",
      author: "Dennis Ritchie"
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    },
    {
      text: "Clean code always looks like it was written by someone who cares.",
      author: "Robert C. Martin"
    },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine"
    },
    {
      text: "The best error message is the one that never shows up.",
      author: "Thomas Fuchs"
    },
    {
      text: "Code never lies, comments sometimes do.",
      author: "Ron Jeffries"
    },
    {
      text: "Make it work, make it right, make it fast.",
      author: "Kent Beck"
    }
  ];

  // Set initial quote based on the day
  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentQuote(dayOfYear % quotes.length);
  }, []);

  const getNewQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuote);
    setCurrentQuote(newIndex);
  };

  const quote = quotes[currentQuote];

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">✨ Daily Inspiration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-3">
          <div className="text-white/90 italic text-sm leading-relaxed">
            "{quote.text}"
          </div>
          <div className="text-white/70 text-xs">
            — {quote.author}
          </div>
        </div>
        
        <Button
          onClick={getNewQuote}
          variant="outline"
          size="sm"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
        >
          🔄 New Quote
        </Button>
        
        <div className="text-center pt-2 border-t border-white/20">
          <div className="text-white/60 text-xs">
            Quote of the day • Stay motivated! 🌟
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
