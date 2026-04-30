import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Target, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-violet/10 via-brand-offwhite to-brand-coral/5 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan font-medium text-sm mb-8 border border-brand-cyan/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            The Student Skill Exchange Network
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-navy mb-6">
            Trade Skills. <br className="hidden md:block" />
            <span className="gradient-text">Build Confidence.</span> <br className="hidden md:block" />
            Grow Together.
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Why pay for expensive courses? Exchange what you know for what you want to learn. Connect with peers, share knowledge, and level up together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-brand-navy hover:bg-brand-violet shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Find Your First Skill Partner
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 border-2 border-brand-navy text-lg font-medium rounded-xl text-brand-navy hover:bg-gray-50 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy">How SkillSwap Works</h2>
            <p className="mt-4 text-lg text-gray-600">A simple, effective way to learn from your peers.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Target className="text-brand-coral" size={32} />, title: 'Add Skills', desc: 'List what you can teach and what you want to learn.' },
              { icon: <Users className="text-brand-cyan" size={32} />, title: 'Find Match', desc: 'Our Smart Match Score finds the perfect peer for you.' },
              { icon: <Zap className="text-brand-violet" size={32} />, title: 'Send Request', desc: 'Connect and propose a skill swap arrangement.' },
              { icon: <Star className="text-yellow-500" size={32} />, title: 'Learn Together', desc: 'Exchange knowledge, grow, and build your network.' },
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 glass-card border-none bg-gray-50 hover:bg-white hover:shadow-xl transition-all text-center group">
                <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Smart matching that makes sense.</h2>
              <p className="text-lg text-gray-300 mb-8">
                Our algorithm doesn't just show you random students. We calculate a Smart Match Score based on complimentary skills and availability, so you know exactly who is the best fit.
              </p>
              <ul className="space-y-4">
                {[
                  'See exactly who wants what you know',
                  'Find peers who know what you want',
                  'Match based on shared availability',
                  'Build real connections on campus'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="text-brand-cyan" size={24} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-coral to-brand-violet rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <div className="glass-card bg-white/10 border-white/20 p-8 rounded-3xl relative backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-blue-500"></div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Alex Chen</h4>
                    <p className="text-brand-cyan">Computer Science • Year 3</p>
                  </div>
                  <div className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
                    90% Match
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Can teach:</p>
                    <div className="flex gap-2">
                      <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">React.js</span>
                      <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Python</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Wants to learn:</p>
                    <div className="flex gap-2">
                      <span className="bg-brand-coral/20 text-brand-coral px-3 py-1 rounded-lg text-sm border border-brand-coral/30">UI/UX Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <h2 className="text-4xl font-bold text-brand-navy mb-6">Ready to swap skills?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of students already learning and growing together.
        </p>
        <Link
          to="/signup"
          className="inline-flex justify-center items-center gap-2 px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-brand-violet to-brand-coral hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Get Started for Free
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
