import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TaskBreakdownRequest {
  input: string;
  type: 'task' | 'brain_dump' | 'voice_note';
  context?: {
    existing_tasks?: string[];
    mood_score?: number;
    energy_level?: number;
  };
}

interface TaskBreakdownResponse {
  coaching_response: string;
  subtasks?: string[];
  priority_suggestion?: 'low' | 'medium' | 'high';
  estimated_time?: string;
  encouragement: string;
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  // Updated to use the correct Gemini API endpoint
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Gemini API error: ${response.status} ${response.statusText}`, errorText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    console.error('Unexpected Gemini API response structure:', data);
    throw new Error('Invalid response from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
}

function createCoachingPrompt(request: TaskBreakdownRequest): string {
  const { input, type, context } = request;
  
  let basePrompt = `You are a gentle, encouraging AI coach specifically designed for neurodivergent minds (ADHD, autism, anxiety). Your role is to help break down tasks and provide supportive guidance.

User Input Type: ${type}
User Input: "${input}"`;

  if (context?.mood_score) {
    basePrompt += `\nCurrent Mood Score: ${context.mood_score}/10`;
  }
  if (context?.energy_level) {
    basePrompt += `\nCurrent Energy Level: ${context.energy_level}/10`;
  }
  if (context?.existing_tasks?.length) {
    basePrompt += `\nExisting Tasks: ${context.existing_tasks.join(', ')}`;
  }

  basePrompt += `

Please respond with a JSON object containing:
{
  "coaching_response": "A warm, encouraging response that acknowledges their input and provides gentle guidance (2-3 sentences)",
  "subtasks": ["array", "of", "specific", "actionable", "subtasks", "if", "applicable"],
  "priority_suggestion": "low|medium|high based on urgency and user's current state",
  "estimated_time": "realistic time estimate like '15-30 minutes' or 'Quick 5-minute task'",
  "encouragement": "A specific, personalized encouragement that validates their neurodivergent experience"
}

Guidelines:
- Use warm, non-judgmental language
- Break complex tasks into tiny, manageable steps
- Consider executive function challenges
- Acknowledge that their brain works differently, not wrong
- Suggest realistic timeframes
- Be specific and actionable
- Validate their feelings and experiences
- Use "you" language to make it personal

Examples of good coaching language:
- "Your brain is working perfectly - it just needs the right support"
- "Let's make this feel less overwhelming by breaking it down"
- "Starting is often the hardest part, and you're already taking that step"
- "This is completely manageable when we take it one piece at a time"

Respond ONLY with valid JSON, no additional text.`;

  return basePrompt;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { input, type, context }: TaskBreakdownRequest = await req.json()

    if (!input || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: input and type' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create the coaching prompt
    const prompt = createCoachingPrompt({ input, type, context });

    // Call Gemini API
    const geminiResponse = await callGeminiAPI(prompt);

    // Parse the JSON response from Gemini
    let parsedResponse: TaskBreakdownResponse;
    try {
      // Clean up the response in case Gemini adds extra formatting
      const cleanedResponse = geminiResponse.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Raw response:', geminiResponse);
      
      // Fallback response if JSON parsing fails
      parsedResponse = {
        coaching_response: "I hear you, and I'm here to help you work through this. Let's take it one step at a time.",
        encouragement: "Your neurodivergent mind is not something to fix - it's something to understand and work with.",
        priority_suggestion: "medium" as const,
        estimated_time: "Take your time"
      };
    }

    return new Response(
      JSON.stringify(parsedResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in ai-coach function:', error);
    
    // Return a gentle fallback response
    const fallbackResponse: TaskBreakdownResponse = {
      coaching_response: "I'm here to support you, even though I'm having a small technical hiccup right now. Your task is important and manageable.",
      encouragement: "You're taking a positive step by reaching out for support. That's something to be proud of.",
      priority_suggestion: "medium" as const,
      estimated_time: "Take it at your own pace"
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        status: 200, // Return 200 to avoid breaking the UI
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})