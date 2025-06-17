import React, { useState, useEffect } from 'react';
import { Heart, Battery, Focus, Plus, TrendingUp } from 'lucide-react';
import { MoodEntry, createMoodEntry, getMoodEntries } from '../lib/supabase';

export const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood_score: 5,
    energy_level: 5,
    focus_level: 5,
    notes: '',
  });

  useEffect(() => {
    loadMoodEntries();
  }, []);

  const loadMoodEntries = async () => {
    try {
      const { data, error } = await getMoodEntries(7); // Last 7 entries
      if (error) throw error;
      setMoodEntries(data || []);
    } catch (error) {
      console.error('Error loading mood entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await createMoodEntry(newEntry);
      if (error) throw error;
      if (data) {
        setMoodEntries([data, ...moodEntries]);
        setNewEntry({ mood_score: 5, energy_level: 5, focus_level: 5, notes: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error creating mood entry:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-red-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBackground = (score: number) => {
    if (score <= 3) return 'bg-red-100';
    if (score <= 6) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  const ScoreSlider: React.FC<{
    label: string;
    icon: React.ReactNode;
    value: number;
    onChange: (value: number) => void;
  }> = ({ label, icon, value, onChange }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className={`text-lg font-bold ${getScoreColor(value)}`}>{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Mood Tracker</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Log Mood</span>
        </button>
      </div>

      {/* Add Mood Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <form onSubmit={handleCreateEntry} className="space-y-6">
            <div className="grid gap-6">
              <ScoreSlider
                label="Mood"
                icon={<Heart className="h-5 w-5 text-pink-600" />}
                value={newEntry.mood_score}
                onChange={(value) => setNewEntry({ ...newEntry, mood_score: value })}
              />
              
              <ScoreSlider
                label="Energy Level"
                icon={<Battery className="h-5 w-5 text-green-600" />}
                value={newEntry.energy_level}
                onChange={(value) => setNewEntry({ ...newEntry, energy_level: value })}
              />
              
              <ScoreSlider
                label="Focus Level"
                icon={<Focus className="h-5 w-5 text-blue-600" />}
                value={newEntry.focus_level}
                onChange={(value) => setNewEntry({ ...newEntry, focus_level: value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="How are you feeling? What's affecting your mood today?"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Entries */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Recent Entries</span>
        </h4>
        
        {moodEntries.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No mood entries yet</h4>
            <p className="text-gray-600">Start tracking your mood to see patterns and insights!</p>
          </div>
        ) : (
          moodEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString()} at{' '}
                  {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Heart className="h-4 w-4 text-pink-600" />
                    <span className="text-xs text-gray-600">Mood</span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getScoreBackground(entry.mood_score)}`}>
                    <span className={`text-sm font-bold ${getScoreColor(entry.mood_score)}`}>
                      {entry.mood_score}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Battery className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-gray-600">Energy</span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getScoreBackground(entry.energy_level)}`}>
                    <span className={`text-sm font-bold ${getScoreColor(entry.energy_level)}`}>
                      {entry.energy_level}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Focus className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-600">Focus</span>
                  </div>
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getScoreBackground(entry.focus_level)}`}>
                    <span className={`text-sm font-bold ${getScoreColor(entry.focus_level)}`}>
                      {entry.focus_level}
                    </span>
                  </div>
                </div>
              </div>
              
              {entry.notes && (
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                  {entry.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};