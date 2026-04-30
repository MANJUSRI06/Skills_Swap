import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Send, ArrowLeft, Loader } from 'lucide-react';

const ChatPage = () => {
  const { requestId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${requestId}`);
      setMessages(res.data);
      setError('');
      // Mark as read
      if (res.data.length > 0) {
        const unreadFromOther = res.data.some(m => m.sender._id !== user._id && !m.read);
        if (unreadFromOther) {
          await api.put(`/messages/${requestId}/read`);
        }
      }
    } catch (err) {
      setError('Could not load messages. Make sure you are part of this accepted swap.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Simple polling every 3 seconds
    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId);
  }, [requestId]);

  useEffect(() => {
    // Scroll to bottom whenever messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await api.post(`/messages/${requestId}`, { text: newMessage });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      alert('Failed to send message');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]"><Loader className="animate-spin text-brand-cyan" size={48} /></div>;
  }

  if (error) {
    return <div className="max-w-3xl mx-auto p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/requests" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Learning Space</h1>
          <p className="text-sm text-gray-500">Share resources, links, and arrange meeting times.</p>
        </div>
      </div>

      <div className="glass-card flex-grow flex flex-col overflow-hidden shadow-xl border border-gray-200 bg-white">
        {/* Messages Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-gray-50/50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-gray-400">
              <p>No messages yet. Say hi to your learning partner!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => {
                const isMe = msg.sender._id === user._id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[75%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {msg.sender.avatarImage ? (
                          <img src={msg.sender.avatarImage} alt="avatar" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                        ) : (
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                            style={{ backgroundColor: msg.sender.avatarColor || '#1E1B4B' }}
                          >
                            {msg.sender.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      {/* Bubble */}
                      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-xs text-gray-400 mb-1 px-1">{msg.sender.name.split(' ')[0]}</span>
                        <div className={`px-4 py-3 rounded-2xl ${
                          isMe 
                            ? 'bg-brand-navy text-white rounded-tr-none' 
                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                        }`}>
                          <p className="whitespace-pre-wrap break-words text-sm">{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message or paste a link..."
              className="flex-grow px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-gray-50"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-navy rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
