import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Plus, X, Save } from 'lucide-react';
import { SkillBadge } from '../components/UI';

const MySkillsPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [newTeach, setNewTeach] = useState('');
  const [newLearn, setNewLearn] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setTeachSkills(user.skillsTeach || []);
      setLearnSkills(user.skillsLearn || []);
    }
  }, [user]);

  const addSkill = (type) => {
    if (type === 'teach' && newTeach.trim() && !teachSkills.includes(newTeach.trim())) {
      setTeachSkills([...teachSkills, newTeach.trim()]);
      setNewTeach('');
    } else if (type === 'learn' && newLearn.trim() && !learnSkills.includes(newLearn.trim())) {
      setLearnSkills([...learnSkills, newLearn.trim()]);
      setNewLearn('');
    }
  };

  const removeSkill = (type, index) => {
    if (type === 'teach') {
      setTeachSkills(teachSkills.filter((_, i) => i !== index));
    } else {
      setLearnSkills(learnSkills.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await api.put('/users/skills', {
        skillsTeach: teachSkills,
        skillsLearn: learnSkills
      });
      setUser(res.data);
      setMessage('Skills updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save skills.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">My Skills Inventory</h1>
          <p className="text-gray-600 mt-2">Add skills to get matched with the right peers.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-navy hover:bg-brand-violet text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-navy/20 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl text-sm font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Teach Column */}
        <div className="glass-card p-8 border-t-4 border-t-gray-400">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-brand-navy">I Can Teach</h2>
            <p className="text-sm text-gray-500 mt-1">Skills you are confident sharing with others.</p>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTeach}
              onChange={(e) => setNewTeach(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill('teach')}
              placeholder="e.g. Graphic Design"
              className="flex-grow px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none bg-white/50"
            />
            <button
              onClick={() => addSkill('teach')}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors border border-gray-200 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {teachSkills.length === 0 ? (
              <p className="text-sm text-gray-400 italic w-full text-center py-4">No skills added yet.</p>
            ) : (
              teachSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-white border border-gray-200 pl-3 pr-1 py-1.5 rounded-lg text-sm text-gray-700 shadow-sm">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill('teach', index)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Learn Column */}
        <div className="glass-card p-8 border-t-4 border-t-brand-violet">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-brand-navy">I Want to Learn</h2>
            <p className="text-sm text-gray-500 mt-1">Skills you are actively looking to acquire.</p>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newLearn}
              onChange={(e) => setNewLearn(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill('learn')}
              placeholder="e.g. Public Speaking"
              className="flex-grow px-4 py-2.5 border border-brand-violet/20 rounded-xl focus:ring-2 focus:ring-brand-violet focus:border-transparent outline-none bg-brand-violet/5"
            />
            <button
              onClick={() => addSkill('learn')}
              className="p-2.5 bg-brand-violet/10 hover:bg-brand-violet/20 text-brand-violet rounded-xl transition-colors border border-brand-violet/20 flex-shrink-0"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {learnSkills.length === 0 ? (
              <p className="text-sm text-gray-400 italic w-full text-center py-4">No skills added yet.</p>
            ) : (
              learnSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-brand-violet/5 border border-brand-violet/20 pl-3 pr-1 py-1.5 rounded-lg text-sm text-brand-violet shadow-sm">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill('learn', index)} className="p-1 hover:bg-brand-violet/10 rounded text-brand-violet hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkillsPage;
