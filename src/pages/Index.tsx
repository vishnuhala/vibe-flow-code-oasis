
import React, { useState, useEffect } from 'react';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import CodeEditor from '@/components/CodeEditor';

type AppState = 'auth' | 'dashboard' | 'editor';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('auth');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        setAppState('dashboard');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setAppState('auth');
  };

  const handleStartCoding = () => {
    setAppState('editor');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const handleUpdateUser = (updatedUser: any) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users array as well
    const users = JSON.parse(localStorage.getItem('vibeCodeUsers') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('vibeCodeUsers', JSON.stringify(updatedUsers));
  };

  if (appState === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (appState === 'dashboard') {
    return (
      <Dashboard 
        user={currentUser}
        onStartCoding={handleStartCoding}
        onLogout={handleLogout}
      />
    );
  }

  if (appState === 'editor') {
    return (
      <CodeEditor 
        user={currentUser}
        onBack={handleBackToDashboard}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  return null;
};

export default Index;
