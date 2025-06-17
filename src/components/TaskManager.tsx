import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle, Trash2, Edit3, Brain } from 'lucide-react';
import { Task, createTask, getTasks, updateTask, deleteTask } from '../lib/supabase';
import { useAICoach } from '../hooks/useAICoach';
import { AICoachResponse } from './AICoachResponse';

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    due_date: '',
  });

  const { getCoachingResponse, loading: aiLoading } = useAICoach();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data, error } = await getTasks();
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get AI coaching response first
    const coachingResponse = await getCoachingResponse({
      input: `${newTask.title}. ${newTask.description}`,
      type: 'task',
      context: {
        existing_tasks: tasks.map(t => t.title),
      }
    });

    if (coachingResponse) {
      setAiResponse(coachingResponse);
    }

    try {
      const taskData = {
        ...newTask,
        priority: coachingResponse?.priority_suggestion || newTask.priority,
      };

      const { data, error } = await createTask(taskData);
      if (error) throw error;
      if (data) {
        setTasks([data, ...tasks]);
        setNewTask({ title: '', description: '', priority: 'medium', due_date: '' });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleSubtaskAdd = async (subtaskTitle: string) => {
    try {
      const { data, error } = await createTask({
        title: subtaskTitle,
        description: 'Generated from AI coaching',
        priority: 'medium',
        due_date: '',
      });
      if (error) throw error;
      if (data) {
        setTasks([data, ...tasks]);
      }
    } catch (error) {
      console.error('Error creating subtask:', error);
    }
  };

  const handleUpdateTaskStatus = async (id: string, status: Task['status']) => {
    try {
      const updates: Partial<Task> = { status };
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
      
      const { data, error } = await updateTask(id, updates);
      if (error) throw error;
      if (data) {
        setTasks(tasks.map(task => task.id === id ? data : task));
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await deleteTask(id);
      if (error) throw error;
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleBrainDump = async (input: string) => {
    const coachingResponse = await getCoachingResponse({
      input,
      type: 'brain_dump',
      context: {
        existing_tasks: tasks.map(t => t.title),
      }
    });

    if (coachingResponse) {
      setAiResponse(coachingResponse);
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

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
        <h3 className="text-2xl font-bold text-gray-900">Your Tasks</h3>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Brain Dump Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-purple-600" />
          <h4 className="text-lg font-semibold text-purple-900">Brain Dump</h4>
        </div>
        <p className="text-purple-700 mb-4 text-sm">
          Feeling overwhelmed? Just dump all your thoughts here and let AI help you organize them into manageable tasks.
        </p>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Tell me everything on your mind..."
            className="flex-grow px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                handleBrainDump(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('input[placeholder*="Tell me everything"]') as HTMLInputElement;
              if (input?.value.trim()) {
                handleBrainDump(input.value);
                input.value = '';
              }
            }}
            disabled={aiLoading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {aiLoading ? 'Processing...' : 'Get Help'}
          </button>
        </div>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <AICoachResponse 
          response={aiResponse} 
          onSubtaskAdd={handleSubtaskAdd}
        />
      )}

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="What do you need to do?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add more details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date (optional)
                </label>
                <input
                  type="datetime-local"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={aiLoading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {aiLoading ? 'Getting AI Help...' : 'Create Task'}
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

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
            <p className="text-gray-600">Create your first task or try the brain dump feature!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-grow">
                  <button
                    onClick={() => handleUpdateTaskStatus(
                      task.id,
                      task.status === 'completed' ? 'pending' : 'completed'
                    )}
                    className="mt-1"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  
                  <div className="flex-grow">
                    <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      
                      {task.due_date && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                      
                      <span className="text-xs text-gray-500">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {task.status !== 'completed' && (
                    <button
                      onClick={() => handleUpdateTaskStatus(
                        task.id,
                        task.status === 'in_progress' ? 'pending' : 'in_progress'
                      )}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title={task.status === 'in_progress' ? 'Mark as pending' : 'Start working'}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};