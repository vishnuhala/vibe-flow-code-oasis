
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DashboardProps {
  user: any;
  onStartCoding: () => void;
  onLogout: () => void;
}

const Dashboard = ({ user, onStartCoding, onLogout }: DashboardProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {getGreeting()}, {user.name}! 🌟
            </h1>
            <p className="text-white/70">Ready for a productive coding session?</p>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                🔥 Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-300 mb-2">
                {user.currentStreak} days
              </div>
              <p className="text-white/70 text-sm">Keep the momentum going!</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                ⏱️ Total Code Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {formatTime(user.totalCodeTime)}
              </div>
              <p className="text-white/70 text-sm">Time spent in the zone</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                🍅 Pomodoro Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-300 mb-2">
                {user.pomodoroStats.sessionsCompleted}
              </div>
              <p className="text-white/70 text-sm">Focus sessions completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Code Sessions</CardTitle>
              <CardDescription className="text-white/70">
                Your latest coding activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.savedCode && user.savedCode.length > 0 ? (
                <div className="space-y-3">
                  {user.savedCode.slice(0, 3).map((code: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{code.title || 'Untitled'}</div>
                        <div className="text-white/60 text-sm">{code.language}</div>
                      </div>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {new Date(code.lastModified).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  <p>No coding sessions yet</p>
                  <p className="text-sm">Start coding to see your history here!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-white/70">
                Jump right into your coding flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={onStartCoding}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-6"
                size="lg"
              >
                🚀 Start Coding Session
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  📝 Quick Note
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  ⚙️ Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Progress */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Today's Progress</CardTitle>
            <CardDescription className="text-white/70">
              Track your daily coding journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-white mb-2">
                  <span>Daily Goal Progress</span>
                  <span>2/8 hours</span>
                </div>
                <Progress value={25} className="h-2 bg-white/20" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">2h</div>
                  <div className="text-white/70 text-sm">Code Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">3</div>
                  <div className="text-white/70 text-sm">Focus Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">150</div>
                  <div className="text-white/70 text-sm">Lines Written</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">5</div>
                  <div className="text-white/70 text-sm">Breaks Taken</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
