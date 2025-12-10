// src/components/Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Terminal,
  Send,
  MapPin,
  Phone,
  Linkedin,
} from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const roles = [
    'Software Developer',
    'Web Developer',
    'Aspiring Developer',
    'Tech Enthusiast',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // refs for typing animation and lifecycle
  const typingTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  // Mouse follow effect (SSR-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation (pure JS)
  useEffect(() => {
    isMountedRef.current = true;

    const startTyping = () => {
      const role = roles[currentRoleIndex];

      const tick = () => {
        if (!isMountedRef.current) return;

        if (!isDeletingRef.current) {
          charIndexRef.current += 1;
          if (charIndexRef.current <= role.length) {
            setTypedText(role.substring(0, charIndexRef.current));
            typingTimeoutRef.current = setTimeout(tick, 100);
            return;
          }
          // pause then delete
          typingTimeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            typingTimeoutRef.current = setTimeout(tick, 80);
          }, 1400);
        } else {
          charIndexRef.current -= 1;
          if (charIndexRef.current >= 0) {
            setTypedText(role.substring(0, charIndexRef.current));
            typingTimeoutRef.current = setTimeout(tick, 50);
            return;
          }
          // finished deleting -> next role
          isDeletingRef.current = false;
          charIndexRef.current = 0;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      };

      // reset and start
      charIndexRef.current = 0;
      isDeletingRef.current = false;
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(tick, 500);
    };

    startTyping();

    return () => {
      isMountedRef.current = false;
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoleIndex]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll handling + Intersection Observer (SSR-safe)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    if (typeof document === 'undefined') return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: 'EventSync - Event Management Platform',
      description:
        'Full-featured event management SaaS with ticket sales, real-time analytics, QR check-in, and attendee management. Demonstrates expertise in building scalable, production-ready applications with modern tech stack.',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Chart.js', 'RESTful API'],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop',
      results: ['500+ Events', '₱2M+ Tracked', 'Zero Downtime'],
      live: 'https://github.com/eulicemage',
      github: 'https://github.com/eulicemage',
      color: 'from-purple-500 to-pink-600',
      highlights: ['Real-time Data Processing', 'Scalable Architecture', 'User Authentication']
    },
    {
      title: 'E-Commerce Web Application',
      description:
        'Modern full-stack e-commerce platform with React frontend and Laravel backend. Features secure payment processing, inventory management, and responsive design. Showcases ability to build complete end-to-end solutions.',
      tech: ['React', 'Laravel', 'MySQL', 'Stripe API', 'Tailwind CSS', 'Redux'],
      image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=1200&q=80&auto=format&fit=crop',
      results: ['100+ Orders', 'Mobile Ready', 'Secure Payments'],
      live: 'https://github.com/eulicemage',
      github: 'https://github.com/eulicemage',
      color: 'from-orange-500 to-red-600',
      highlights: ['Payment Integration', 'State Management', 'Responsive UI']
    },
    {
      title: 'Parent-Teacher Communication Portal',
      description:
        'Enterprise scheduling and communication platform connecting educators with parents. Built with PHP and MySQL, featuring real-time notifications, role-based access control, and comprehensive analytics dashboard.',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'AJAX'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop',
      results: ['200+ Users', '95% Time Saved', 'High Uptime'],
      live: 'https://github.com/eulicemage',
      github: 'https://github.com/eulicemage',
      color: 'from-cyan-500 to-blue-600',
      highlights: ['Real-time Notifications', 'Role-Based Access', 'Analytics Dashboard']
    },
  ];

  const skills = {
    'Frontend Development': [
      { name: 'React & Hooks', level: 92 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Responsive Design', level: 94 },
    ],
    'Backend Development': [
      { name: 'PHP (Laravel/CodeIgniter)', level: 90 },
      { name: 'MySQL & Database Design', level: 87 },
      { name: 'RESTful APIs', level: 88 },
      { name: 'Authentication & Security', level: 85 },
      { name: 'Server Management', level: 80 },
    ],
    'Tools & Technologies': [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Figma & UI Design', level: 82 },
      { name: 'Vite & Build Tools', level: 85 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Team Collaboration', level: 88 },
    ],
  };

  const achievements = [
    { icon: Code2, number: '20+', label: 'Projects Built', color: 'text-cyan-400' },
    { icon: Users, number: '1000+', label: 'Users Served', color: 'text-purple-400' },
    { icon: Zap, number: '99.9%', label: 'Uptime Record', color: 'text-green-400' },
    { icon: TrendingUp, number: '3+', label: 'Years Experience', color: 'text-orange-400' },
  ];

  // prevent full-page reload on form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // placeholder action
    alert('Form submission handled (placeholder).');
  };

  return (
    <>
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans overflow-x-hidden relative">
        {/* Subtle moving gradient orb */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.10), transparent 80%)`,
          }}
        />

        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-slate-950">
                    <Terminal size={22} />
                  </div>
                </div>
                <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Eulice Mage
                </span>
              </div>

              <div className="hidden lg:flex items-center space-x-10">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 relative group ${activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transform origin-left transition-transform duration-300 ${activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                >
                  Let's Talk
                </button>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-slate-100">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="lg:hidden mt-6 pb-6 border-t border-slate-800/50 pt-6">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-4 px-2 text-lg text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button className="mt-4 w-full px-7 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold">
                  Hire Me
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
          <div className="max-w-5xl mx-auto text-center z-10">
            <div className="mb-8 inline-block animate-slide-in-top">
              <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                Eulice Mage
              </div>
            </div>
            
            <div className="h-20 md:h-24 mb-8 animate-slide-in-top" style={{ animationDelay: '0.2s' }}>
              <p className="text-2xl md:text-4xl text-slate-300 font-semibold">
                I'm a <span className="text-cyan-400 animate-pulse-glow">{typedText}</span>
                <span className={`ml-2 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
              </p>
            </div>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-in-top" style={{ animationDelay: '0.4s' }}>
              Full-stack developer crafting high-performance web applications. Proven track record building scalable systems that serve thousands of users. Ready to bring technical expertise and problem-solving skills to your team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-top" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 animate-glow"
              >
                Explore My Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 rounded-full border-2 border-cyan-500 text-cyan-400 font-bold text-lg hover:bg-cyan-500/10 transition-all duration-300 hover:animate-glow"
              >
                Let's Work Together
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.label} className="text-center group animate-slide-in-bottom" style={{ animationDelay: `${0.8 + idx * 0.1}s` }}>
                    <Icon size={40} className={`${achievement.color} mx-auto mb-3 group-hover:scale-110 transition-transform animate-float`} />
                    <p className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{achievement.number}</p>
                    <p className="text-sm text-slate-400">{achievement.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-32 px-6 relative ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-1000 delay-100`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center">
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <p className="text-lg text-slate-300 leading-relaxed hover:text-slate-100 transition-colors">
                  I'm a full-stack developer with a proven track record of building production-ready applications that solve real business problems. My expertise spans modern frontend frameworks and robust backend systems.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed hover:text-slate-100 transition-colors">
                  I write clean, maintainable code and follow industry best practices. I'm experienced in building scalable architectures, implementing secure authentication, and optimizing performance. I thrive in collaborative environments and communicate effectively with both technical and non-technical stakeholders.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed hover:text-slate-100 transition-colors">
                  I'm passionate about continuous learning and staying current with emerging technologies. I'm looking for opportunities to contribute to impactful projects where I can grow professionally while delivering exceptional value.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 animate-slide-in-right hover:scale-105">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">🎓 Education</h3>
                  <p className="text-slate-300">Bachelor of Science in IT</p>
                  <p className="text-sm text-slate-400">Strong foundation in CS principles</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-xl font-bold text-purple-400 mb-3">💼 Track Record</h3>
                  <p className="text-slate-300">20+ Production Projects</p>
                  <p className="text-sm text-slate-400">1000+ Active Users</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-xl font-bold text-green-400 mb-3">🎯 Expertise</h3>
                  <p className="text-slate-300">Full-Stack Development</p>
                  <p className="text-sm text-slate-400">Scalable & Secure Systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-32 px-6 relative ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-1000 delay-100`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Skills</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                A comprehensive toolkit built through years of hands-on experience and continuous learning.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], idx) => (
                <div
                  key={category}
                  className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] animate-slide-in-bottom hover:shadow-lg hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <h3 className="text-2xl font-bold mb-8 text-cyan-400">{category}</h3>
                  <div className="space-y-6">
                    {skillList.map((skill, skillIdx) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">{skill.name}</span>
                          <span className="text-cyan-400 font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-1000 animate-shimmer"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-32 px-6 relative overflow-hidden ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-1000 delay-100`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Showcase of production-ready applications built with modern technologies. Each project demonstrates technical depth, problem-solving ability, and commitment to quality.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 animate-slide-in-bottom"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-semibold`}>Featured</div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIdx) => (
                        <span key={tech} className="px-3 py-1.5 text-xs rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 animate-slide-in-top" style={{ animationDelay: `${techIdx * 0.05}s` }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.results && (
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {project.results.map((result) => (
                          <div key={result} className="text-center">
                            <CheckCircle2 size={20} className="text-green-400 mx-auto mb-1" />
                            <p className="text-xs text-slate-400">{result}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.highlights && (
                      <div className="mb-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <p className="text-xs font-semibold text-cyan-400 mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((highlight) => (
                            <span key={highlight} className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-cyan-500 hover:bg-slate-800/50 transition-all duration-300"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-32 px-6 relative ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-1000 delay-200`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Work Together</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                I'm actively looking for opportunities to contribute to impactful projects. Let's connect and discuss how I can add value to your team.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="animate-slide-in-left">
                <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300 animate-slide-in-left">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 animate-glow">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400">Email</p>
                      <a href="mailto:eulice.mage57@gmail.com" className="text-xl font-semibold hover:text-cyan-400 transition-colors">
                        eulice.mage57@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 animate-glow">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400">Phone</p>
                      <p className="text-xl font-semibold">+63 9** *** ****</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 animate-glow">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400">Location</p>
                      <p className="text-xl font-semibold">Santa Cruz, Laguna, Philippines</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a href="https://github.com/eulicemage" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 animate-bounce-smooth">
                    <Github size={28} />
                  </a>
                  <a href="https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 animate-bounce-smooth" style={{ animationDelay: '0.2s' }}>
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>

              <form className="space-y-6 animate-slide-in-right" onSubmit={handleFormSubmit}>
                <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20 hover:border-slate-600"
                  />
                </div>
                <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20 hover:border-slate-600"
                  />
                </div>
                <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/20 hover:border-slate-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-slide-in-right animate-glow" style={{ animationDelay: '0.4s' }}
                >
                  <span>Send Message</span>
                  <Send size={22} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-400">© 2025 Eulice Mage. Crafted with <span className="text-red-500">❤</span> and lots of coffee.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
