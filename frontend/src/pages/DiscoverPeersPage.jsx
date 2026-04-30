import { useState, useEffect } from 'react';
import api from '../api/axios';
import { MatchCard } from '../components/UI';
import { Search, Compass } from 'lucide-react';

const DiscoverPeersPage = () => {
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sendingRequestTo, setSendingRequestTo] = useState(null);
  const [requestMessage, setRequestMessage] = useState("Hi, I saw your profile and I think we'd be a great match for a skill swap!");
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const res = await api.get('/users/discover');
        setPeers(res.data);
      } catch (error) {
        console.error("Failed to fetch peers");
      } finally {
        setLoading(false);
      }
    };
    fetchPeers();
  }, []);

  const handleSendRequest = async (peerId, matchScore) => {
    try {
      await api.post('/requests/send', {
        receiverId: peerId,
        message: requestMessage,
        matchScore
      });
      setNotification('Request sent successfully!');
      setSendingRequestTo(null);
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    }
  };

  const filteredPeers = peers.filter(peer => 
    peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.skillsTeach.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy flex items-center gap-3">
            <Compass className="text-brand-cyan" size={32} />
            Discover Peers
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">Find students who want to learn what you know, and know what you want to learn. Sorted by Smart Match Score.</p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white shadow-sm"
            placeholder="Search skills or names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {notification && (
        <div className="mb-8 p-4 bg-green-50 text-green-600 border border-green-100 rounded-xl font-medium text-center shadow-sm">
          {notification}
        </div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="glass-card p-6 h-64 animate-pulse flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
                <div className="flex-col gap-2 flex">
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="w-full h-8 bg-gray-200 rounded mt-4"></div>
              <div className="w-full h-8 bg-gray-200 rounded mt-2"></div>
            </div>
          ))}
        </div>
      ) : filteredPeers.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No peers found</h3>
          <p className="text-gray-500">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPeers.map(peer => (
            <MatchCard 
              key={peer._id} 
              peer={peer} 
              onSendRequest={(p) => setSendingRequestTo(p)} 
            />
          ))}
        </div>
      )}

      {/* Request Modal */}
      {sendingRequestTo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-bold text-brand-navy mb-4">Send Swap Request to {sendingRequestTo.name}</h3>
            {sendingRequestTo.matchScore > 0 && (
              <div className="mb-4 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-100 font-medium">
                You have a {sendingRequestTo.matchScore}% Match Score!
              </div>
            )}
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none mb-6 resize-none"
              rows="4"
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Add a personalized message..."
            ></textarea>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSendingRequestTo(null)}
                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSendRequest(sendingRequestTo._id, sendingRequestTo.matchScore)}
                className="px-5 py-2.5 bg-brand-navy hover:bg-brand-violet text-white rounded-xl font-medium transition-colors shadow-lg"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPeersPage;
