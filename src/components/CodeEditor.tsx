
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AmbientSounds from './AmbientSounds';
import PomodoroTimer from './PomodoroTimer';
import MotivationalQuote from './MotivationalQuote';

interface CodeEditorProps {
  user: any;
  onBack: () => void;
  onUpdateUser: (userData: any) => void;
}

const CodeEditor = ({ user, onBack, onUpdateUser }: CodeEditorProps) => {
  const [code, setCode] = useState('// Welcome to your coding sanctuary\n// Start writing your beautiful code here...\n\n');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState(user.preferences.theme || 'cosmic');
  const [title, setTitle] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sessionStartTime] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const themes = {
    cosmic: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    forest: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
    sunset: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
    ocean: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
    lavender: 'bg-gradient-to-br from-purple-800 via-violet-900 to-indigo-900'
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (code.trim() && title.trim()) {
        const savedCode = {
          id: Date.now().toString(),
          title,
          code,
          language,
          lastModified: new Date().toISOString()
        };

        const updatedUser = {
          ...user,
          savedCode: [savedCode, ...(user.savedCode || []).filter((c: any) => c.title !== title)]
        };

        onUpdateUser(updatedUser);
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [code, title, language]);

  const handleSave = () => {
    if (!title.trim()) {
      setTitle(`Code Session ${new Date().toLocaleDateString()}`);
    }
    
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 60000);
    const updatedUser = {
      ...user,
      totalCodeTime: user.totalCodeTime + sessionTime,
      codingSessions: user.codingSessions + 1,
      preferences: { ...user.preferences, theme }
    };

    onUpdateUser(updatedUser);
  };

  const getLanguageClass = (lang: string) => {
    switch (lang) {
      case 'javascript': return 'text-yellow-300';
      case 'python': return 'text-blue-300';
      case 'java': return 'text-red-300';
      case 'cpp': return 'text-purple-300';
      case 'html': return 'text-orange-300';
      case 'css': return 'text-pink-300';
      default: return 'text-green-300';
    }
  };

  return (
    <div className={`min-h-screen ${themes[theme as keyof typeof themes]} transition-all duration-1000`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M30 30c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Code Editor</h1>
              <p className="text-white/70">Your peaceful coding environment</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`${getLanguageClass(language)} bg-white/10 border-white/20`}>
              {language}
            </Badge>
            <Button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar Controls */}
          {!isFullscreen && (
            <div className="xl:col-span-1 space-y-6">
              {/* Theme Selector */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Visual Theme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="cosmic">🌌 Cosmic</SelectItem>
                      <SelectItem value="forest">🌲 Forest</SelectItem>
                      <SelectItem value="sunset">🌅 Sunset</SelectItem>
                      <SelectItem value="ocean">🌊 Ocean</SelectItem>
                      <SelectItem value="lavender">💜 Lavender</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <label className="text-white/90 text-sm">Code Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Ambient Sounds */}
              <AmbientSounds user={user} onUpdateUser={onUpdateUser} />

              {/* Pomodoro Timer */}
              <PomodoroTimer user={user} onUpdateUser={onUpdateUser} />

              {/* Motivational Quote */}
              <MotivationalQuote />
            </div>
          )}

          {/* Code Editor */}
          <div className={isFullscreen ? 'col-span-1' : 'xl:col-span-3'}>
            <Card className="backdrop-blur-lg bg-white/5 border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Enter file name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                  />
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[70vh]">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-black/30 border-0 rounded-lg p-4 text-white font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder:text-white/30"
                  placeholder="Start coding your masterpiece..."
                  spellCheck={false}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
