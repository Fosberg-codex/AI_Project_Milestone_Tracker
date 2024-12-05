import React, { useState, useEffect } from 'react';
import { aitracker_backend } from 'declarations/aitracker_backend';
import './App.css';

function App() {
  // State to manage milestones and form inputs
  const [milestones, setMilestones] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  // Fetch milestones on component mount
  useEffect(() => {
    fetchMilestones();
  }, []);

  // Fetch all milestones
  const fetchMilestones = async () => {
    try {
      if (!aitracker_backend) {
        console.error('Backend interface not available');
        return;
      }
      const fetchedMilestones = await aitracker_backend.getAllMilestones();
      setMilestones(fetchedMilestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  // Create a new milestone
  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    try {
      if (!aitracker_backend) {
        console.error('Backend interface not available');
        return;
      }
      const completionTimestamp = new Date(completionDate).getTime();
      await aitracker_backend.createMilestone(
        title,
        description,
        completionTimestamp
      );

      // Reset form and refresh milestones
      setTitle('');
      setDescription('');
      setCompletionDate('');
      fetchMilestones();
    } catch (error) {
      console.error('Error creating milestone:', error);
    }
  };

  // Update milestone status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      if (!aitracker_backend) {
        console.error('Backend interface not available');
        return;
      }
      await aitracker_backend.updateMilestoneStatus(id, { [newStatus.substring(1)]: null });
      fetchMilestones();
    } catch (error) {
      console.error('Error updating milestone status:', error);
    }
  };

  // Delete a milestone
  const handleDeleteMilestone = async (id) => {
    try {
      if (!aitracker_backend) {
        console.error('Backend interface not available');
        return;
      }
      await aitracker_backend.deleteMilestone(id);
      fetchMilestones();
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'NotStarted':
        return 'bg-gray-200';
      case 'InProgress':
        return 'bg-blue-200';
      case 'Completed':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  // Render all milestones
  const renderMilestones = () => {
    return milestones.map(milestone => {
      const status = Object.keys(milestone.status)[0];
      return (
        <div key={milestone.id} className={`p-6 rounded-lg shadow-md mb-4 ${getStatusColor(status)} transition-all duration-300 hover:shadow-lg`}>
          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
          <p className="text-gray-700 mb-3">{milestone.description}</p>
          <p className="text-sm text-gray-600 mb-2">Status: {status}</p>
          <p className="text-sm text-gray-600 mb-4">
            Completion Date: {new Date(Number(milestone.completionDate)).toLocaleDateString()}
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleStatusUpdate(milestone.id, '#NotStarted')}
              className="px-3 py-1 text-sm rounded bg-green-700 text-white hover:bg-gray-600 transition-colors"
            >
              Not Started
            </button>
            <button 
              onClick={() => handleStatusUpdate(milestone.id, '#InProgress')}
              className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-blue-600 transition-colors"
            >
              In Progress
            </button>
            <button 
              onClick={() => handleStatusUpdate(milestone.id, '#Completed')}
              className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Complete
            </button>
            <button 
              onClick={() => handleDeleteMilestone(milestone.id)}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          AI Project Milestone <span className='text-purple-600'>Tracker </span>
        </h1>
        
        {/* Milestone Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Milestone</h2>
          <form onSubmit={handleCreateMilestone} className="space-y-4">
            <div className='my-1'>Title</div>
            <div>
              <input 
                type="text" 
                placeholder="Milestone Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:bg-purple-500"
              />
            </div>
            <div className='my-1'>Description</div>
            <div>
              <textarea 
                placeholder="Milestone Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:bg-purple-500 h-32"
              />
            </div>
            <div className='my-1'>Set Completion Date</div>
            <div>
              <input 
                type="date" 
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:bg-purple-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:bg-purple-500 focus:ring-offset-2"
            >
              Create Milestone
            </button>
          </form>
        </div>

        {/* All Milestones */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">All Milestones</h2>
          <div className="space-y-4">
            {renderMilestones()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;