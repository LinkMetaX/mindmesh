import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Heart, Mic, Volume2, VolumeX, AlertCircle, User, LogOut, Settings, CheckSquare, BarChart3, Bell, Link, Lightbulb } from 'lucide-react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useElevenLabsTTS } from './hooks/useElevenLabsTTS';
import { useAICoach } from './hooks/useAICoach';
import { useAuth } from './hooks/useAuth';
import { useSmartReminders } from './hooks/useSmartReminders';
import { AuthModal } from './components/AuthModal';
import { TaskManager } from './components/TaskManager';
import { MoodTracker } from './components/MoodTracker';
import { AICoachResponse } from './components/AICoachResponse';
import { SmartReminders } from './components/SmartReminders';
import { ReminderNotification } from './components/ReminderNotification';
import { IntegrationsManager } from './components/IntegrationsManager';
import { BrainDump } from './components/BrainDump';
import { ProfileSettings } from './components/ProfileSettings';
import { ContentPages } from './components/ContentPages';
import { signOut } from './lib/supabase';

type ActiveTab = 'focus' | 'tasks' | 'mood' | 'reminders' | 'integrations' | 'braindump' | 'profile';
type ContentPage = 'features' | 'pricing' | 'integrations' | 'help' | 'contact' | 'privacy';

function App() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('focus');
  const [currentPage, setCurrentPage] = useState<ContentPage | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [userTranscript, setUserTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState('');
  
  const { 
    isListening, 
    transcript, 
    error: speechError, 
    isSupported: speechSupported, 
    startListening, 
    stopListening 
  } = useSpeechRecognition();
  
  const { 
    speak, 
    stop: stopSpeaking, 
    isSpeaking, 
    loading: ttsLoading,
    error: ttsError 
  } = useElevenLabsTTS();

  const { getCoachingResponse, loading: aiLoading } = useAICoach();
  const { reminders, dismissReminder, snoozeReminder } = useSmartReminders();

  // Show notification for high priority reminders
  const [activeNotification, setActiveNotification] = useState<any>(null);

  useEffect(() => {
    const highPriorityReminder = reminders.find(r => r.priority === 'high');
    if (highPriorityReminder && !activeNotification) {
      setActiveNotification(highPriorityReminder);
    }
  }, [reminders, activeNotification]);

  // Handle completed speech recognition - prevent duplicate processing
  useEffect(() => {
    console.log('Speech recognition effect triggered:', {
      transcript,
      isListening,
      lastProcessedTranscript,
      transcriptLength: transcript?.length,
      lastProcessedLength: lastProcessedTranscript?.length
    });

    if (transcript && !isListening && transcript !== lastProcessedTranscript) {
      console.log('Processing new transcript:', transcript);
      setUserTranscript(transcript);
      setShowTranscript(true);
      setLastProcessedTranscript(transcript);
      
      // Generate AI response using Gemini
      handleVoiceInput(transcript);
    }
  }, [transcript, isListening, lastProcessedTranscript]);

  const handleVoiceInput = async (input: string) => {
    console.log('handleVoiceInput called with:', input);
    
    // Prevent duplicate processing
    if (aiLoading || input === lastProcessedTranscript) {
      console.log('Skipping voice input processing:', { aiLoading, isDuplicate: input === lastProcessedTranscript });
      return;
    }

    console.log('Getting AI coaching response...');
    const response = await getCoachingResponse({
      input,
      type: 'voice_note',
      context: {
        user_id: user?.id,
        include_historical_data: true,
      }
    });

    if (response) {
      console.log('AI response received:', response);
      setAiResponse(response);
      
      // Speak the response using ElevenLabs with a delay to ensure UI updates first
      const fullResponse = `${response.coaching_response} ${response.encouragement}`;
      setTimeout(() => {
        // Only speak if not already speaking
        if (!isSpeaking && !ttsLoading) {
          console.log('Speaking AI response...');
          speak(fullResponse);
        } else {
          console.log('Skipping TTS - already speaking or loading:', { isSpeaking, ttsLoading });
        }
      }, 500);
    } else {
      console.log('No AI response received');
    }
  };

  const handleMicClick = () => {
    console.log('Mic button clicked');
    console.log('Current state:', { isListening, isSpeaking, ttsLoading, speechSupported });
    
    if (isListening) {
      console.log('Stopping listening...');
      stopListening();
    } else {
      if (isSpeaking) {
        console.log('Stopping current speech...');
        stopSpeaking();
      }
      console.log('Starting listening...');
      startListening();
      setShowTranscript(false);
      setAiResponse(null);
      setLastProcessedTranscript(''); // Reset to allow new processing
    }
  };

  const handleQuickAction = async (action: string) => {
    console.log('Quick action triggered:', action);
    
    // Prevent duplicate calls
    if (aiLoading || ttsLoading || isSpeaking) {
      console.log('Skipping quick action - system busy:', { aiLoading, ttsLoading, isSpeaking });
      return;
    }

    const actionTexts = {
      overwhelmed: "I'm feeling overwhelmed and need help organizing my thoughts",
      startTask: "I need help starting a task that feels overwhelming",
      procrastinating: "I'm procrastinating and can't seem to get started",
      breakDown: "I have a big to-do list that needs to be broken down into manageable pieces"
    };

    const input = actionTexts[action as keyof typeof actionTexts] || action;
    
    console.log('Getting AI response for quick action...');
    const response = await getCoachingResponse({
      input,
      type: 'voice_note',
      context: {
        user_id: user?.id,
        include_historical_data: true,
      }
    });

    if (response) {
      console.log('Quick action AI response received:', response);
      setAiResponse(response);
      setUserTranscript('');
      setShowTranscript(false);
      
      // Speak the response with delay and duplicate check
      const fullResponse = `${response.coaching_response} ${response.encouragement}`;
      setTimeout(() => {
        if (!isSpeaking && !ttsLoading) {
          console.log('Speaking quick action response...');
          speak(fullResponse);
        }
      }, 200);
    }
  };

  const handleSpeakResponse = () => {
    if (!aiResponse) return;
    
    console.log('Manual speak response triggered');
    
    if (isSpeaking || ttsLoading) {
      console.log('Stopping current speech...');
      stopSpeaking();
    } else {
      const fullResponse = `${aiResponse.coaching_response} ${aiResponse.encouragement}`;
      console.log('Speaking response manually...');
      speak(fullResponse);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleNotificationDismiss = () => {
    if (activeNotification) {
      dismissReminder(activeNotification.id);
      setActiveNotification(null);
    }
  };

  const handleNotificationSnooze = () => {
    if (activeNotification) {
      snoozeReminder(activeNotification.id, 30);
      setActiveNotification(null);
    }
  };

  const handlePageNavigation = (page: ContentPage) => {
    setCurrentPage(page);
    setActiveTab('focus'); // Reset tab when viewing content pages
  };

  const handleBackToApp = () => {
    setCurrentPage(null);
  };

  // Debug logging for errors
  useEffect(() => {
    if (speechError) {
      console.error('Speech recognition error in App:', speechError);
    }
  }, [speechError]);

  useEffect(() => {
    if (ttsError) {
      console.error('TTS error in App:', ttsError);
    }
  }, [ttsError]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render content pages
  if (currentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
        {/* Header for content pages */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBackToApp}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <Brain className="h-8 w-8 text-indigo-600" />
                  <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    MindMesh
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">AI Copilot for Focus</p>
                </div>
              </button>

              <nav className="hidden md:flex items-center space-x-8">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{user?.email}</span>
                    <button
                      onClick={handleBackToApp}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Back to App
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => openAuthModal('signin')}
                      className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContentPages page={currentPage} />
          </div>
        </main>

        {/* Simple footer for content pages */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2025 MindMesh. Made with <Heart className="inline h-4 w-4 text-red-500" /> for neurodivergent minds.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and App Name */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-indigo-600" />
                <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  MindMesh
                </h1>
                <p className="text-xs text-gray-500 -mt-1">AI Copilot for Focus</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setActiveTab('focus')}
                    className={`transition-colors font-medium ${
                      activeTab === 'focus' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Focus Mode
                  </button>
                  <button
                    onClick={() => setActiveTab('braindump')}
                    className={`transition-colors font-medium ${
                      activeTab === 'braindump' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Brain Dump
                  </button>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className={`transition-colors font-medium ${
                      activeTab === 'tasks' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Tasks
                  </button>
                  <button
                    onClick={() => setActiveTab('mood')}
                    className={`transition-colors font-medium ${
                      activeTab === 'mood' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Mood
                  </button>
                  <button
                    onClick={() => setActiveTab('reminders')}
                    className={`transition-colors font-medium relative ${
                      activeTab === 'reminders' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Reminders
                    {reminders.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {reminders.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('integrations')}
                    className={`transition-colors font-medium ${
                      activeTab === 'integrations' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Integrations
                  </button>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center space-x-1 transition-colors ${
                        activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                      }`}
                      title="Profile & Settings"
                    >
                      <User className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handlePageNavigation('features')}
                    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handlePageNavigation('pricing')}
                    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => handlePageNavigation('integrations')}
                    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Integrations
                  </button>
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Get Started
                  </button>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {isAuthenticated ? (
          /* Authenticated User Dashboard */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-3xl">
              <button
                onClick={() => setActiveTab('focus')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'focus'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Brain className="h-4 w-4" />
                <span>Focus</span>
              </button>
              <button
                onClick={() => setActiveTab('braindump')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'braindump'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Brain Dump</span>
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </button>
              <button
                onClick={() => setActiveTab('mood')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'mood'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Mood</span>
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  activeTab === 'reminders'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bell className="h-4 w-4" />
                <span>Reminders</span>
                {reminders.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {reminders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'integrations'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Link className="h-4 w-4" />
                <span>Integrations</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'focus' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    AI-Powered Focus Mode
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Your AI coach powered by Gemini is ready to help. Speak naturally about what you're working on, 
                    how you're feeling, or what's blocking you.
                  </p>
                </div>

                {/* Debug Information */}
                {(speechError || ttsError) && (
                  <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-800 font-medium">Debug Information</p>
                    </div>
                    {speechError && (
                      <p className="text-red-700 text-sm mb-1">
                        <strong>Speech Error:</strong> {speechError}
                      </p>
                    )}
                    {ttsError && (
                      <p className="text-red-700 text-sm">
                        <strong>TTS Error:</strong> {ttsError}
                      </p>
                    )}
                  </div>
                )}

                {/* Browser Support Warning */}
                {!speechSupported && (
                  <div className="max-w-2xl mx-auto mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <p className="text-amber-800 text-sm">
                        Voice features require a modern browser like Chrome, Safari, or Edge.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center space-y-8">
                  {/* User Transcript Display */}
                  {showTranscript && userTranscript && (
                    <div className="w-full max-w-2xl bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">You</span>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <p className="text-gray-700">
                            "{userTranscript}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  {aiResponse ? (
                    <div className="w-full max-w-2xl">
                      <AICoachResponse response={aiResponse} />
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl bg-indigo-50 p-6 rounded-xl shadow-inner border border-indigo-100">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <p className="text-indigo-800 italic leading-relaxed">
                            Hi! I'm your AI coach powered by Gemini. I'm here to help you focus and break down overwhelming tasks. 
                            Try saying something like "I'm feeling overwhelmed" or "Help me start this project".
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Voice Input Controls */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleMicClick}
                      disabled={!speechSupported || aiLoading || ttsLoading}
                      className={`p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
                        !speechSupported || aiLoading || ttsLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : isListening 
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      } text-white`}
                      title={
                        !speechSupported 
                          ? 'Voice input not supported' 
                          : aiLoading || ttsLoading
                          ? 'AI is processing...'
                          : isListening 
                          ? 'Stop listening' 
                          : 'Start voice input'
                      }
                    >
                      <Mic className="h-8 w-8" />
                    </button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        {speechError 
                          ? `Error: ${speechError}`
                          : aiLoading || ttsLoading
                          ? 'AI is thinking...'
                          : isListening 
                          ? 'Listening... speak now' 
                          : speechSupported 
                          ? 'Tap to speak with your AI coach'
                          : 'Voice input not available'
                        }
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try: "I'm feeling overwhelmed" or "Help me focus"
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button 
                      onClick={() => handleQuickAction('overwhelmed')}
                      disabled={aiLoading || ttsLoading || isSpeaking}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors disabled:opacity-50"
                    >
                      I'm feeling overwhelmed
                    </button>
                    <button 
                      onClick={() => handleQuickAction('startTask')}
                      disabled={aiLoading || ttsLoading || isSpeaking}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors disabled:opacity-50"
                    >
                      Help me start this task
                    </button>
                    <button 
                      onClick={() => handleQuickAction('procrastinating')}
                      disabled={aiLoading || ttsLoading || isSpeaking}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-50"
                    >
                      I'm procrastinating
                    </button>
                    <button 
                      onClick={() => handleQuickAction('breakDown')}
                      disabled={aiLoading || ttsLoading || isSpeaking}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors disabled:opacity-50"
                    >
                      Break down my to-do
                    </button>
                  </div>

                  {/* Speech Recognition Status */}
                  {isListening && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-700 text-sm font-medium">Recording...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'braindump' && <BrainDump />}
            {activeTab === 'tasks' && <TaskManager />}
            {activeTab === 'mood' && <MoodTracker />}
            {activeTab === 'reminders' && <SmartReminders />}
            {activeTab === 'integrations' && <IntegrationsManager />}
            {activeTab === 'profile' && <ProfileSettings />}
          </div>
        ) : (
          /* Public Landing Page */
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-8">
                    <Heart className="h-4 w-4 mr-2" />
                    Powered by Gemini AI & ElevenLabs
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Turn chaos into
                    <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      calm, focus & flow
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    MindMesh is the world's first AI Copilot that adapts to your brain's rhythms. 
                    Get gentle guidance, smart reminders, and contextual support designed specifically 
                    for ADHD, autism, and anxiety.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Start Your Focus Journey
                    </button>
                    <button className="text-indigo-600 px-8 py-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-200 font-semibold text-lg hover:bg-indigo-50">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
              </div>
            </section>

            {/* Features Preview */}
            <section className="py-20 bg-white/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Your AI-powered focus companion
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Experience the future of neurodivergent-friendly productivity with Gemini AI
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Feature 1 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                      <Brain className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Enhanced AI Coaching</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Advanced AI powered by Google's Gemini that learns from your patterns and provides 
                      deeply personalized, contextual guidance with natural voice interaction.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                      <CheckSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Smart Task Management</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Break down overwhelming tasks into manageable sub-tasks, set up recurring tasks, 
                      and organize with drag-and-drop reordering designed for neurodivergent minds.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                      <BarChart3 className="h-6 w-6 text-pink-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Mood Insights & Trends</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Track your mood, energy, and focus levels with beautiful visualizations and 
                      AI-powered insights that reveal patterns and correlations with your productivity.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold">MindMesh</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering neurodivergent minds with AI-powered focus and task management. 
                Built with compassion, designed for real brains.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">X (formerly Twitter)</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button  
                    onClick={() => handlePageNavigation('features')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handlePageNavigation('pricing')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handlePageNavigation('integrations')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handlePageNavigation('help')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li>
                  <button 
                    onClick={() => handlePageNavigation('contact')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handlePageNavigation('privacy')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 MindMesh. Made with <Heart className="inline h-4 w-4 text-red-500" /> for neurodivergent minds.
            </p>
          </div>
        </div>
      </footer>

      {/* Reminder Notification */}
      {activeNotification && (
        <ReminderNotification
          reminder={activeNotification}
          onDismiss={handleNotificationDismiss}
          onSnooze={handleNotificationSnooze}
          autoPlayVoice={true}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}

export default App;