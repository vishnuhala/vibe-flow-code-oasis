
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PomodoroTimerProps {
  user: any;
  onUpdateUser: (userData: any) => void;
}

const PomodoroTimer = ({ user, onUpdateUser }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [sessions, setSessions] = useState(0);

  const modes = {
    work: { duration: 25 * 60, label: 'Focus Time', emoji: '🍅', color: 'text-red-400' },
    break: { duration: 5 * 60, label: 'Short Break', emoji: '☕', color: 'text-green-400' },
    longBreak: { duration: 15 * 60, label: 'Long Break', emoji: '🌴', color: 'text-blue-400' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      
      if (mode === 'work') {
        setSessions(prev => prev + 1);
        const newSessions = sessions + 1;
        
        // Update user stats
        const updatedUser = {
          ...user,
          pomodoroStats: {
            ...user.pomodoroStats,
            sessionsCompleted: user.pomodoroStats.sessionsCompleted + 1,
            totalFocusTime: user.pomodoroStats.totalFocusTime + 25
          }
        };
        onUpdateUser(updatedUser);
        
        // Determine next mode
        if (newSessions % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(modes.longBreak.duration);
        } else {
          setMode('break');
          setTimeLeft(modes.break.duration);
        }
      } else {
        setMode('work');
        setTimeLeft(modes.work.duration);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessions, user, onUpdateUser]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].duration);
  };

  const switchMode = (newMode: 'work' | 'break' | 'longBreak') => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">🍅 Focus Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode Selector */}
        <Select value={mode} onValueChange={(value) => switchMode(value as any)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="work">🍅 Focus (25min)</SelectItem>
            <SelectItem value="break">☕ Break (5min)</SelectItem>
            <SelectItem value="longBreak">🌴 Long Break (15min)</SelectItem>
          </SelectContent>
        </Select>

        {/* Timer Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${modes[mode].color} mb-2`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-white/70 text-sm mb-4">
            {modes[mode].emoji} {modes[mode].label}
          </div>
          
          <Progress 
            value={progress} 
            className="h-2 mb-4"
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={toggleTimer}
            className={`flex-1 ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? '⏸️ Pause' : '▶️ Start'}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            🔄
          </Button>
        </div>

        {/* Session Counter */}
        <div className="text-center pt-2 border-t border-white/20">
          <div className="text-white/90 text-sm">
            Sessions Today: <span className="font-bold text-purple-300">{sessions}</span>
          </div>
          <div className="text-white/70 text-xs">
            Total: {user.pomodoroStats.sessionsCompleted} sessions
          </div>
        </div>

        {/* Status Indicator */}
        {isRunning && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              Focus Mode Active
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
