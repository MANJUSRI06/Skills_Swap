import { Link } from 'react-router-dom';

export const SkillBadge = ({ skill, type = 'default' }) => {
  const styles = {
    teach: "bg-white border border-gray-200 text-gray-700 shadow-sm",
    learn: "bg-brand-violet/5 border border-brand-violet/20 text-brand-violet shadow-sm",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${styles[type]}`}>
      {skill}
    </span>
  );
};

export const MatchCard = ({ peer, onSendRequest }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full hover:shadow-2xl transition-shadow group relative overflow-hidden">
      {/* Match Score Badge */}
      {peer.matchScore > 0 && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-105 transition-transform z-10">
          {peer.matchScore}% Match
        </div>
      )}

      <div className="flex items-center gap-4 mb-5">
        {peer.avatarImage ? (
          <img src={peer.avatarImage} alt="Profile" className="w-14 h-14 rounded-2xl object-cover shadow-inner" />
        ) : (
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-inner"
            style={{ backgroundColor: peer.avatarColor || '#1E1B4B' }}
          >
            {peer.name?.charAt(0) || 'U'}
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg text-brand-navy">{peer.name}</h3>
          <p className="text-xs text-gray-500">{peer.department || 'Student'} • {peer.year || 'N/A'}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow z-10">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Can Teach</p>
          <div className="flex flex-wrap gap-2">
            {peer.skillsTeach?.length > 0 ? (
              peer.skillsTeach.map((skill, i) => <SkillBadge key={i} skill={skill} type="teach" />)
            ) : <span className="text-sm text-gray-400 italic">None</span>}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Wants to Learn</p>
          <div className="flex flex-wrap gap-2">
            {peer.skillsLearn?.length > 0 ? (
              peer.skillsLearn.map((skill, i) => <SkillBadge key={i} skill={skill} type="learn" />)
            ) : <span className="text-sm text-gray-400 italic">None</span>}
          </div>
        </div>
      </div>

      <button
        onClick={() => onSendRequest(peer)}
        className="w-full mt-6 py-2.5 bg-brand-navy hover:bg-brand-violet text-white text-sm font-medium rounded-xl transition-colors z-10"
      >
        Send Swap Request
      </button>

      {/* Decorative background for high matches */}
      {peer.matchScore > 50 && (
         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl z-0 pointer-events-none"></div>
      )}
    </div>
  );
};

export const RequestCard = ({ request, type, onAccept, onReject }) => {
  const isIncoming = type === 'incoming';
  const otherUser = isIncoming ? request.sender : request.receiver;

  return (
    <div className="glass-card p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex items-center gap-4 w-full md:w-auto">
        {otherUser.avatarImage ? (
          <img src={otherUser.avatarImage} alt="Profile" className="w-12 h-12 rounded-xl object-cover shadow-inner flex-shrink-0" />
        ) : (
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-inner flex-shrink-0"
            style={{ backgroundColor: otherUser.avatarColor || '#1E1B4B' }}
          >
            {otherUser.name?.charAt(0) || 'U'}
          </div>
        )}
        <div className="flex-grow">
          <h3 className="font-bold text-brand-navy">{otherUser.name}</h3>
          <p className="text-xs text-gray-500">
            {isIncoming ? 'Sent you a request' : 'You sent a request'} • {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex-grow bg-gray-50 p-3 rounded-xl border border-gray-100 w-full md:w-auto text-sm text-gray-700 italic">
        "{request.message || "Hi, I'd love to swap skills with you!"}"
      </div>

      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 flex-shrink-0">
        {request.status === 'pending' && isIncoming && (
          <>
            <button onClick={() => onReject(request._id)} className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
              Decline
            </button>
            <button onClick={() => onAccept(request._id)} className="px-4 py-2 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-navy rounded-lg text-sm font-medium transition-colors">
              Accept Swap
            </button>
          </>
        )}
        
        {request.status === 'pending' && !isIncoming && (
          <span className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg text-sm font-medium">
            Pending...
          </span>
        )}

        {request.status === 'accepted' && (
          <div className="flex gap-2">
            <Link to={`/chat/${request._id}`} className="relative px-4 py-2 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-navy rounded-lg text-sm font-medium transition-colors">
              Chat Now
              {request.unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  {request.unreadCount} New
                </span>
              )}
            </Link>
            <span className="px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm font-medium">
              Accepted
            </span>
          </div>
        )}

        {request.status === 'rejected' && (
          <span className="px-4 py-2 bg-gray-100 text-gray-500 border border-gray-200 rounded-lg text-sm font-medium">
            Declined
          </span>
        )}
      </div>
    </div>
  );
};
