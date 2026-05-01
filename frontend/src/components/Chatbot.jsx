import { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const QUICK_PROMPTS = [
  "Find React mentors",
  "Suggest skills for placements",
  "How does SkillSwap work?",
  "Improve my profile"
];

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm SkillSwap AI. How can I help you with your learning journey today?", isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text, isAi: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/chatbot/ask', { message: text });
      setMessages(prev => [...prev, { text: res.data.reply, isAi: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I couldn't connect to my AI brain. Please try again later.", 
        isAi: true, 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  // Only show for logged in users
  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-brand-violet to-brand-cyan p-4 rounded-full shadow-2xl hover:scale-105 transition-transform animate-bounce-slow flex items-center justify-center text-white"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col glass-card shadow-2xl overflow-hidden animate-fade-in-up border border-brand-cyan/20">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-violet to-brand-cyan p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-bold">SkillSwap AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.isAi ? 'bg-gradient-to-r from-brand-violet to-brand-cyan text-white' : 'bg-brand-coral text-white'}`}>
                  {msg.isAi ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  msg.isAi 
                    ? msg.isError 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-white text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
                    : 'bg-brand-navy text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 flex-row">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan text-white flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 overflow-x-auto whitespace-nowrap hide-scrollbar shrink-0">
            <div className="flex gap-2">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan text-xs rounded-full transition-colors border border-brand-cyan/20 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan text-sm border border-transparent dark:border-gray-700"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
                className="bg-brand-navy dark:bg-brand-violet hover:bg-brand-violet dark:hover:bg-brand-cyan text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
