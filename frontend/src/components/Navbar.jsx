import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Menu, X, Compass, User, Inbox, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    let intervalId;
    if (user) {
      const fetchUnreadCount = async () => {
        try {
          const res = await api.get('/messages/unread-count');
          setUnreadCount(res.data.count);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUnreadCount();
      intervalId = setInterval(fetchUnreadCount, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user ? [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Discover', path: '/discover', icon: <Compass size={18} /> },
    { name: 'Requests', path: '/requests', icon: <Inbox size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
  ] : [];

  return (
    <nav className="fixed w-full z-50 glass-card rounded-none border-t-0 border-x-0 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-brand-violet to-brand-coral p-2 rounded-xl">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">SkillSwap <span className="gradient-text">AI</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === link.path 
                        ? 'text-brand-coral border-b-2 border-brand-coral' 
                        : 'text-gray-600 hover:text-brand-violet dark:text-gray-300 dark:hover:text-brand-cyan'
                    }`}
                  >
                    <div className="relative">
                      {link.icon}
                      {link.name === 'Requests' && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-2 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors text-sm font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-brand-violet dark:text-gray-300 dark:hover:text-brand-cyan font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="bg-brand-navy hover:bg-brand-violet text-white px-5 py-2 rounded-full font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-navy dark:text-gray-300 dark:hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card rounded-none border-0 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-brand-coral hover:bg-gray-50 dark:text-gray-300 dark:hover:text-brand-cyan dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-3 py-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-brand-navy dark:text-gray-200 font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-white bg-brand-navy font-medium py-2 rounded-lg hover:bg-brand-violet"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
