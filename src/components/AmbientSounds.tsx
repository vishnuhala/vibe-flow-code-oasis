
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AmbientSoundsProps {
  user: any;
  onUpdateUser: (userData: any) => void;
}

const AmbientSounds = ({ user, onUpdateUser }: AmbientSoundsProps) => {
  const [currentSound, setCurrentSound] = useState(user.preferences.ambientSound || 'rain');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(user.preferences.soundVolume || 0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = {
    rain: { name: '🌧️ Rain', emoji: '🌧️' },
    ocean: { name: '🌊 Ocean Waves', emoji: '🌊' },
    forest: { name: '🌲 Forest', emoji: '🌲' },
    fire: { name: '🔥 Fireplace', emoji: '🔥' },
    cafe: { name: '☕ Coffee Shop', emoji: '☕' },
    wind: { name: '💨 Wind', emoji: '💨' },
    birds: { name: '🐦 Birds', emoji: '🐦' },
    night: { name: '🌙 Night Crickets', emoji: '🌙' }
  };

  // Simulate audio creation and management
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
    
    // In a real app, this would control actual audio
    console.log(`${isPlaying ? 'Stopping' : 'Playing'} ${sounds[currentSound as keyof typeof sounds].name}`);
  };

  const changeSound = (soundKey: string) => {
    setCurrentSound(soundKey);
    setIsPlaying(false);
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ambientSound: soundKey,
        soundVolume: volume
      }
    };
    onUpdateUser(updatedUser);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        soundVolume: vol
      }
    };
    onUpdateUser(updatedUser);
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">🎵 Ambient Sounds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Sound & Controls */}
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{sounds[currentSound as keyof typeof sounds].emoji}</span>
            <span className="text-white text-sm">
              {sounds[currentSound as keyof typeof sounds].name}
            </span>
          </div>
          <Button
            onClick={toggleSound}
            size="sm"
            className={`${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex justify-between text-white/90 text-sm">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Sound Selection Grid */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(sounds).map(([key, sound]) => (
            <Button
              key={key}
              onClick={() => changeSound(key)}
              variant={currentSound === key ? "default" : "outline"}
              size="sm"
              className={`${
                currentSound === key
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              } text-xs`}
            >
              <span className="mr-1">{sound.emoji}</span>
              {sound.name.split(' ')[1] || sound.name.split(' ')[0]}
            </Button>
          ))}
        </div>

        {isPlaying && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Now Playing
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmbientSounds;
