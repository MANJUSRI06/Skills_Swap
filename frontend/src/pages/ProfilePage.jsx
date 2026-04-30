import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { User, Book, Calendar, Clock, Save, Camera } from 'lucide-react';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    year: '',
    bio: '',
    availability: '',
    avatarImage: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
        year: user.year || '',
        bio: user.bio || '',
        availability: user.availability || '',
        avatarImage: user.avatarImage || '',
      });
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage('Image must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await api.put('/users/profile', formData);
      setUser(res.data);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brand-navy">Edit Profile</h1>
        <p className="text-gray-600 mt-2">Update your information so peers can know more about you.</p>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {message}
        </div>
      )}

      <div className="glass-card p-8">
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
          <label className="relative group cursor-pointer block">
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            {formData.avatarImage || user?.avatarImage ? (
              <img src={formData.avatarImage || user?.avatarImage} alt="Profile" className="w-24 h-24 rounded-3xl object-cover shadow-lg" />
            ) : (
              <div 
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-lg"
                style={{ backgroundColor: user?.avatarColor || '#1E1B4B' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </label>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department / Major</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50"
                  placeholder="e.g. Computer Science"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50 appearance-none"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={18} className="text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50 appearance-none"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                >
                  <option value="">Select Availability</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">Boosts match score if peers have same availability.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
            <textarea
              className="block w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50 resize-none"
              rows="4"
              placeholder="Tell peers a bit about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-brand-navy hover:bg-brand-violet text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-navy/20 disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
