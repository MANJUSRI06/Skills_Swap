import { useState, useEffect } from 'react';
import api from '../api/axios';
import { RequestCard } from '../components/UI';
import { Inbox, Send } from 'lucide-react';

const SwapRequestsPage = () => {
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' or 'outgoing'

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      // Sort by date newest first
      const sortDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
      setRequests({
        incoming: res.data.incoming.sort(sortDesc),
        outgoing: res.data.outgoing.sort(sortDesc),
      });
    } catch (error) {
      console.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/requests/${id}/${status}`);
      fetchRequests(); // Refresh list
    } catch (error) {
      alert("Failed to update request");
    }
  };

  const displayRequests = activeTab === 'incoming' ? requests.incoming : requests.outgoing;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brand-navy">Swap Requests</h1>
        <p className="text-gray-600 mt-2">Manage your incoming and outgoing skill swap proposals.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'incoming' 
              ? 'bg-brand-navy text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Inbox size={18} />
          Incoming
          {requests.incoming.filter(r => r.status === 'pending').length > 0 && (
            <span className="ml-2 bg-brand-coral text-white text-xs px-2 py-0.5 rounded-full">
              {requests.incoming.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('outgoing')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'outgoing' 
              ? 'bg-brand-navy text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Send size={18} />
          Outgoing
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(n => (
            <div key={n} className="h-24 bg-white/50 animate-pulse rounded-2xl border border-white/20"></div>
          ))}
        </div>
      ) : displayRequests.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${activeTab === 'incoming' ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-brand-violet/10 text-brand-violet'}`}>
            {activeTab === 'incoming' ? <Inbox size={32} /> : <Send size={32} />}
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No {activeTab} requests</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {activeTab === 'incoming' 
              ? "You don't have any incoming requests yet. Make sure your profile has skills you can teach!" 
              : "You haven't sent any requests yet. Discover peers and send a request to start swapping."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayRequests.map(request => (
            <RequestCard 
              key={request._id} 
              request={request} 
              type={activeTab}
              onAccept={(id) => handleStatusUpdate(id, 'accept')}
              onReject={(id) => handleStatusUpdate(id, 'reject')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapRequestsPage;
