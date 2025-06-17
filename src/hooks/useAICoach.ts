import { useState } from 'react';

interface AICoachRequest {
  input: string;
  type: 'task' | 'brain_dump' | 'voice_note';
  context?: {
    existing_tasks?: string[];
    mood_score?: number;
    energy_level?: number;
  };
}

interface AICoachResponse {
  coaching_response: string;
  subtasks?: string[];
  priority_suggestion?: 'low' | 'medium' | 'high';
  estimated_time?: string;
  encouragement: string;
}

export const useAICoach = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCoachingResponse = async (request: AICoachRequest): Promise<AICoachResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-coach`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get AI coaching response');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('AI Coach error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getCoachingResponse,
    loading,
    error,
  };
};