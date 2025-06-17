import React from 'react';
import { 
  Brain, 
  CheckSquare, 
  BarChart3, 
  Zap, 
  Shield, 
  Heart, 
  Users, 
  Star,
  Check,
  ArrowRight,
  Mail,
  MessageCircle,
  FileText,
  Lock,
  Eye,
  Database,
  Trash2,
  Download
} from 'lucide-react';

interface ContentPageProps {
  page: 'features' | 'pricing' | 'integrations' | 'help' | 'contact' | 'privacy';
}

export const ContentPages: React.FC<ContentPageProps> = ({ page }) => {
  if (page === 'features') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Features Built for Neurodivergent Minds
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MindMesh combines cutting-edge AI with neurodivergent-friendly design to create 
            the most supportive productivity platform available.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-16">
          {/* AI Coaching */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Enhanced AI Coaching</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our AI coach powered by Google's Gemini learns from your patterns and provides 
                deeply personalized guidance. It understands your neurodivergent needs and adapts 
                its responses based on your historical data, mood patterns, and productivity cycles.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Contextual responses based on your history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Voice interaction with ElevenLabs TTS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Gentle, encouraging communication style</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">AI Coach</span>
                </div>
                <p className="text-sm text-gray-700">
                  "Based on your patterns, you're most productive around 10 AM. 
                  Let's break this task into 3 smaller pieces that match your energy levels."
                </p>
              </div>
            </div>
          </div>

          {/* Task Management */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Complete project proposal</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-1">
                    <div className="text-xs text-gray-600">• Research competitors</div>
                    <div className="text-xs text-gray-600">• Draft outline</div>
                    <div className="text-xs text-gray-600">• Write first section</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily standup meeting</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Recurring</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center space-x-3 mb-4">
                <CheckSquare className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Smart Task Management</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Break down overwhelming tasks into manageable sub-tasks, set up recurring tasks, 
                and organize with intuitive drag-and-drop reordering. Perfect for executive function challenges.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Hierarchical sub-tasks and nested organization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Recurring tasks with flexible patterns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Drag-and-drop reordering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Tags and priority management</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mood Tracking */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Mood Insights & Trends</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Track your mood, energy, and focus levels with beautiful visualizations. 
                Our AI analyzes patterns and provides insights about correlations with your productivity.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Visual trend charts and analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Correlation analysis with productivity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Weekly and monthly averages</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-medium mb-3">Your Patterns</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Most productive hours:</span>
                    <span className="font-medium">9-11 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best mood days:</span>
                    <span className="font-medium">Tue, Thu</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy correlation:</span>
                    <span className="font-medium text-green-600">+0.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brain Dump */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Brain Dump</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  "I'm feeling overwhelmed with the project deadline approaching and I have so many tasks..."
                </p>
                <div className="text-xs text-gray-500">
                  ✨ AI processed: Categorized as "action" • Priority: high • 3 suggested steps
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Offline-First Brain Dump</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Capture thoughts anytime, anywhere - even offline. Our AI organizes your brain dumps 
                into actionable tasks, notes, and reflections when you're back online.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Works offline with local storage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Voice and text input</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>AI categorization and organization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Automatic sync when online</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'pricing') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your neurodivergent productivity journey. 
            All plans include our core AI coaching features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Basic AI coaching</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Up to 50 tasks</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Mood tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Brain dump (10/month)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Basic insights</span>
              </li>
            </ul>
            
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-indigo-600 text-white rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-2">$12</div>
              <p className="text-indigo-200">per month</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Advanced AI coaching with history</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Unlimited tasks & sub-tasks</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Recurring tasks</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Unlimited brain dumps</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Advanced mood insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Smart reminders</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-400" />
                <span>Voice features (ElevenLabs)</span>
              </li>
            </ul>
            
            <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Pro Trial
            </button>
          </div>

          {/* Team Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Team</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$25</div>
              <p className="text-gray-600">per month, up to 5 users</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Team collaboration</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Shared workspaces</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Team insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Advanced integrations</span>
              </li>
            </ul>
            
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Start Team Trial
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-gray-600 text-sm">Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Yes! Pro and Team plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What about data privacy?</h4>
              <p className="text-gray-600 text-sm">Your data is encrypted and secure. We never share personal information and you can export or delete your data anytime.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer student discounts?</h4>
              <p className="text-gray-600 text-sm">Yes! Students get 50% off Pro plans. Contact us with your student email for verification.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'integrations') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect MindMesh with your favorite tools to create a unified productivity ecosystem 
            that works with your existing workflow.
          </p>
        </div>

        {/* Current Integrations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Now</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Google Calendar</h3>
                  <p className="text-gray-600">Sync calendar events as tasks</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Import calendar events as tasks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Update event status when tasks complete</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Bidirectional sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Customizable sync rules</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l.537-.039c.679-.05 1.026-.05 1.026-.05s.347 0 1.026.05l.537.039c1.402.094 1.682.14 2.428-.466.746-.606.746-1.026.746-1.026s0-.42-.746-1.026c-.746-.606-1.026-.56-2.428-.466l-.537.039c-.679.05-1.026.05-1.026.05s-.347 0-1.026-.05l-.537-.039c-1.402-.094-1.682-.14-2.428.466-.746.606-.746 1.026-.746 1.026s0 .42.746 1.026z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Notion</h3>
                  <p className="text-gray-600">Connect with Notion databases</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Import tasks from Notion databases</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Sync task completion status</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Automatic database detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Flexible filtering options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Todoist', description: 'Sync with your Todoist projects', color: 'bg-red-100 text-red-600' },
              { name: 'Slack', description: 'Get reminders in Slack channels', color: 'bg-purple-100 text-purple-600' },
              { name: 'Trello', description: 'Convert cards to MindMesh tasks', color: 'bg-blue-100 text-blue-600' },
              { name: 'Apple Health', description: 'Correlate mood with health data', color: 'bg-green-100 text-green-600' },
              { name: 'Zapier', description: 'Connect with 5000+ apps', color: 'bg-orange-100 text-orange-600' },
              { name: 'GitHub', description: 'Track coding tasks and commits', color: 'bg-gray-100 text-gray-600' },
            ].map((integration) => (
              <div key={integration.name} className="bg-white border border-gray-200 rounded-xl p-6 opacity-75">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <div className="w-4 h-4 bg-current rounded"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{integration.description}</p>
                <div className="mt-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Features */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Integration Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bidirectional Sync</h3>
              <p className="text-sm text-gray-600">
                Changes flow both ways - update in MindMesh or your connected app and see changes everywhere.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">
                All integrations use secure OAuth flows and encrypted connections to protect your data.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Filtering</h3>
              <p className="text-sm text-gray-600">
                Configure exactly what data syncs with customizable rules and filters.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'help') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about using MindMesh effectively. 
            Find answers, learn features, and get the most out of your neurodivergent productivity journey.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <strong>Create your account</strong> - Sign up with your email and complete your profile
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <strong>Log your first mood entry</strong> - This helps our AI understand your patterns
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <strong>Try the AI coach</strong> - Use voice or text to tell it about your challenges
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <strong>Create your first task</strong> - Start with something small and manageable
                  </div>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pro Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Use the brain dump feature when feeling overwhelmed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Log mood entries consistently for better AI insights</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Break large tasks into smaller sub-tasks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Use voice features for a more natural interaction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Guides */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Guides</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Coach</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Learn how to get the most out of your AI coaching sessions and voice interactions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• How to phrase requests for better responses</li>
                <li>• Using voice features effectively</li>
                <li>• Understanding AI suggestions</li>
                <li>• Building coaching history</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckSquare className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Master the art of breaking down overwhelming tasks into manageable pieces.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Creating and organizing sub-tasks</li>
                <li>• Setting up recurring tasks</li>
                <li>• Using tags and priorities</li>
                <li>• Drag-and-drop reordering</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Mood Tracking</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Understand your patterns and correlations between mood and productivity.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• How to log mood entries effectively</li>
                <li>• Reading trend visualizations</li>
                <li>• Understanding AI insights</li>
                <li>• Using mood data for planning</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Brain Dump</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Capture thoughts anytime and let AI organize them into actionable items.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Using offline brain dump features</li>
                <li>• Voice vs text input</li>
                <li>• Understanding AI categorization</li>
                <li>• Converting dumps to tasks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How does the AI coach work?</h3>
              <p className="text-gray-600 text-sm">
                Our AI coach uses Google's Gemini model to understand your input and provide personalized guidance. 
                It learns from your historical data, mood patterns, and task completion rates to offer increasingly 
                relevant suggestions. The more you use it, the better it becomes at helping you.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use MindMesh offline?</h3>
              <p className="text-gray-600 text-sm">
                Yes! The brain dump feature works completely offline. Your thoughts are saved locally and 
                automatically synced when you're back online. Other features require an internet connection 
                for AI processing and real-time sync.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure and private?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely. All your data is encrypted in transit and at rest. We never share your personal 
                information with third parties. You can export or delete your data at any time from your 
                profile settings.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do integrations work?</h3>
              <p className="text-gray-600 text-sm">
                Integrations use secure OAuth connections to sync data between MindMesh and your other tools. 
                You can configure exactly what data syncs and in which direction. All integrations respect 
                your privacy and security settings.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What makes MindMesh neurodivergent-friendly?</h3>
              <p className="text-gray-600 text-sm">
                MindMesh is designed specifically for ADHD, autism, and anxiety. Features like task breakdown, 
                gentle AI coaching, flexible organization, and pattern recognition help work with your brain 
                rather than against it. The interface reduces cognitive load and supports executive function challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-indigo-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6 opacity-90">
            Our support team is here to help you succeed with MindMesh. 
            We understand neurodivergent needs and respond with empathy and expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Contact Support
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'contact') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you succeed with MindMesh. Whether you have questions, 
            feedback, or need support, we'd love to hear from you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get help with technical issues, billing questions, or general inquiries.
            </p>
            <a 
              href="mailto:support@mindmesh.app" 
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              support@mindmesh.app
            </a>
            <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">
              Chat with our support team in real-time for immediate assistance.
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Start Chat
            </button>
            <p className="text-xs text-gray-500 mt-2">Available 9 AM - 6 PM EST</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-sm mb-4">
              Join our community of neurodivergent users sharing tips and experiences.
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium">
              Join Discord
            </button>
            <p className="text-xs text-gray-500 mt-2">Active community support</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>General Question</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Partnership Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Office Info */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                MindMesh was created by neurodivergent individuals for neurodivergent individuals. 
                We understand the unique challenges of ADHD, autism, and anxiety because we live them too.
              </p>
              <p className="text-gray-600">
                Our goal is to create technology that works with your brain, not against it. 
                Every feature is designed with empathy, understanding, and real-world neurodivergent experiences in mind.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Support:</span>
                  <span className="font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Live Chat:</span>
                  <span className="font-medium">Immediate (business hours)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bug Reports:</span>
                  <span className="font-medium">Within 12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Feature Requests:</span>
                  <span className="font-medium">Within 48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and data security are fundamental to everything we do at MindMesh. 
            This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 17, 2025</p>
        </div>

        {/* Quick Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy at a Glance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Encrypted & Secure</h3>
              <p className="text-sm text-gray-600">
                All your data is encrypted in transit and at rest using industry-standard security.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Data Selling</h3>
              <p className="text-sm text-gray-600">
                We never sell your personal data to third parties. Your information stays private.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Data, Your Control</h3>
              <p className="text-sm text-gray-600">
                Export or delete your data anytime. You have complete control over your information.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
                <p className="text-gray-600 text-sm">
                  When you create an account, we collect your email address and name. 
                  This information is used to provide you with access to MindMesh and communicate important updates.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
                <p className="text-gray-600 text-sm">
                  We collect information about how you use MindMesh, including tasks created, mood entries, 
                  and AI coaching interactions. This data helps us provide personalized experiences and improve our services.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Voice Data</h3>
                <p className="text-gray-600 text-sm">
                  When you use voice features, audio is processed by our AI systems and immediately converted to text. 
                  Audio recordings are not stored permanently.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Provide personalized AI coaching based on your patterns and history</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Generate insights and recommendations to improve your productivity</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Sync data with your connected integrations (Google Calendar, Notion, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Send you important notifications and reminders</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Improve our services through anonymized usage analytics</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Provide customer support and respond to your inquiries</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Security</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                <p className="text-gray-600 text-sm">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. 
                  Your sensitive information is protected with industry-leading security standards.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Access Controls</h3>
                <p className="text-gray-600 text-sm">
                  Access to your data is strictly limited to authorized personnel who need it to provide services. 
                  All access is logged and monitored.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Infrastructure</h3>
                <p className="text-gray-600 text-sm">
                  MindMesh is hosted on secure cloud infrastructure with regular security audits, 
                  automated backups, and 99.9% uptime guarantees.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Processing</h3>
                <p className="text-gray-600 text-sm">
                  We use Google's Gemini AI and ElevenLabs for text-to-speech processing. 
                  These services process your data according to their privacy policies and our data processing agreements.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Integrations</h3>
                <p className="text-gray-600 text-sm">
                  When you connect integrations like Google Calendar or Notion, we only access the data you explicitly authorize. 
                  You can revoke these permissions at any time.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">
                  We use privacy-focused analytics to understand how MindMesh is used and improve our services. 
                  This data is anonymized and cannot be traced back to individual users.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Data Export</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  You can export all your data in a machine-readable format at any time from your profile settings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Data Deletion</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  You can delete your account and all associated data permanently. This action cannot be undone.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Data Correction</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  You can update or correct your personal information at any time through your profile settings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Data Access</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  You can view all the data we have about you and understand how it's being used.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            
            <p className="text-gray-600 text-sm mb-4">
              If you have any questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us:
            </p>
            
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@mindmesh.app</p>
              <p><strong>Address:</strong> MindMesh Privacy Team, 123 Innovation Drive, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-semibold text-indigo-900 mb-2">Policy Updates</h3>
          <p className="text-indigo-800 text-sm">
            We may update this privacy policy from time to time. When we do, we'll notify you via email 
            and update the "Last updated" date at the top of this page. Continued use of MindMesh after 
            changes constitutes acceptance of the updated policy.
          </p>
        </div>
      </div>
    );
  }

  return null;
};