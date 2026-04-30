import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Compass, BookOpen, Inbox, ArrowRight, MessageSquare } from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ requests: 0, peers: 0 });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [reqRes, peerRes, unreadRes] = await Promise.all([
          api.get('/requests'),
          api.get('/users/discover'),
          api.get('/messages/unread-count').catch(() => ({ data: { count: 0 } }))
        ]);
        
        const pending = reqRes.data.incoming.filter(r => r.status === 'pending').length;
        
        setStats({ requests: pending, peers: peerRes.data.length });
        setUnreadCount(unreadRes.data.count);
      } catch (error) {
        console.error("Failed to fetch dashboard data");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brand-navy">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-600 mt-2">Here's what's happening in your learning circle.</p>
      </div>

      {unreadCount > 0 && (
        <div className="mb-8 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500 text-white rounded-xl">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-bold text-red-800">You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}!</h3>
              <p className="text-sm text-red-600">Someone from your accepted swaps replied to you.</p>
            </div>
          </div>
          <Link to="/requests" className="px-4 py-2 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors border border-red-200">
            View Chat
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Quick Stat 1 */}
        <div className="glass-card p-6 border-l-4 border-l-brand-cyan">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">New Peers to Discover</p>
              <h3 className="text-3xl font-bold text-brand-navy mt-1">{stats.peers}</h3>
            </div>
            <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan">
              <Compass size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/discover" className="text-sm text-brand-cyan font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Find a match <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick Stat 2 */}
        <div className="glass-card p-6 border-l-4 border-l-brand-coral">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Requests</p>
              <h3 className="text-3xl font-bold text-brand-navy mt-1">{stats.requests}</h3>
            </div>
            <div className="p-3 bg-brand-coral/10 rounded-xl text-brand-coral">
              <Inbox size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/requests" className="text-sm text-brand-coral font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View requests <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick Stat 3 */}
        <div className="glass-card p-6 border-l-4 border-l-brand-violet">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Skills I Want to Learn</p>
              <h3 className="text-3xl font-bold text-brand-navy mt-1">{user?.skillsLearn?.length || 0}</h3>
            </div>
            <div className="p-3 bg-brand-violet/10 rounded-xl text-brand-violet">
              <BookOpen size={24} />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/skills" className="text-sm text-brand-violet font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Update skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Next Steps */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Next Steps</h2>
          <div className="space-y-4">
            {(!user?.skillsTeach?.length || !user?.skillsLearn?.length) ? (
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-4 items-start">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mt-1">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-orange-800">Add your skills</h4>
                  <p className="text-sm text-orange-600 mt-1 mb-3">You haven't added skills to teach or learn yet. Add them to get matched.</p>
                  <Link to="/skills" className="text-sm font-medium bg-orange-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-orange-700 transition-colors">
                    Go to My Skills
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex gap-4 items-start">
                <div className="bg-green-100 p-2 rounded-lg text-green-600 mt-1">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-green-800">Your profile is ready!</h4>
                  <p className="text-sm text-green-600 mt-1 mb-3">You are one skill away from your next match. Check out who is available.</p>
                  <Link to="/discover" className="text-sm font-medium bg-green-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-green-700 transition-colors">
                    Discover Peers
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Snapshot */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Profile Snapshot</h2>
          <div className="flex items-center gap-4 mb-6">
            {user?.avatarImage ? (
              <img src={user.avatarImage} alt="Profile" className="w-16 h-16 rounded-2xl object-cover shadow-inner" />
            ) : (
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-inner"
                style={{ backgroundColor: user?.avatarColor || '#1E1B4B' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-brand-navy">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.department || 'Add department in profile'}</p>
            </div>
            <Link to="/profile" className="ml-auto text-sm text-brand-coral hover:underline">Edit</Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Can Teach</p>
              <div className="flex flex-wrap gap-2">
                {user?.skillsTeach?.length > 0 ? (
                  user.skillsTeach.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">None added</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Wants to Learn</p>
              <div className="flex flex-wrap gap-2">
                {user?.skillsLearn?.length > 0 ? (
                  user.skillsLearn.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-violet/5 border border-brand-violet/20 rounded-lg text-xs font-medium text-brand-violet shadow-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">None added</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
