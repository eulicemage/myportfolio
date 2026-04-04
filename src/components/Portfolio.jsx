import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ArrowRight, Briefcase, CheckCircle2, Code2, ExternalLink,
  Github, Layers3, Linkedin, Mail, MapPin, Menu, Server, X,
  Sparkles, Terminal, Globe, Database,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const heroSignals = [
  { label: 'Degree', value: 'BS Information Technology' },
  { label: 'Focus', value: 'Web Apps & Workflow Systems' },
  { label: 'Status', value: 'Open to Opportunities', highlight: true },
];

const proofSections = [
  {
    title: 'Frontend Delivery',
    icon: Layers3,
    accent: '#38bdf8',
    emoji: '🎨',
    points: [
      'Builds responsive interfaces with React, Next.js, Tailwind CSS, and modern JavaScript.',
      'Translates requirements into clear layouts, reusable UI sections, and practical user flows.',
      'Prioritizes readable structure, accessibility basics, and mobile-ready presentation.',
    ],
  },
  {
    title: 'Backend & Data',
    icon: Server,
    accent: '#a78bfa',
    emoji: '⚙️',
    points: [
      'Works with Node.js, Express, Supabase, Firebase, MySQL, and REST-style APIs.',
      'Implements authentication, CRUD workflows, and data-backed dashboards.',
      'Comfortable connecting frontend features to database-driven business logic.',
    ],
  },
  {
    title: 'Project Execution',
    icon: Briefcase,
    accent: '#34d399',
    emoji: '🚀',
    points: [
      'Builds from real projects that required shipping usable software, not demo-only concepts.',
      'Documents features through project summaries, live links, and public repositories.',
      'Coachable, reliable, and ready to contribute on a structured team.',
    ],
  },
];

const technicalGroups = [
  {
    title: 'Frontend', icon: Globe, color: '#38bdf8',
    items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'HTML5 & CSS3', 'Responsive UI'],
  },
  {
    title: 'Backend', icon: Terminal, color: '#a78bfa',
    items: ['Node.js', 'Express', 'Laravel', 'REST APIs', 'PHP'],
  },
  {
    title: 'Data & Cloud', icon: Database, color: '#34d399',
    items: ['Supabase', 'Firebase', 'MySQL', 'Cloud Firestore'],
  },
  {
    title: 'Mobile & Tools', icon: Code2, color: '#fb923c',
    items: ['Android Studio', 'Java', 'Git & GitHub', 'Figma', 'RFID Integration'],
  },
];

const projects = [
  {
    title: 'EBPLS',
    type: 'Featured Project',
    badge: 'LGU Workflow Platform',
    description: 'A local government–oriented Electronic Business Permit and Licensing System designed to support permit application workflows, staff review, and status tracking. This reflects the kind of practical software I want to keep building: systems that improve public-facing processes and internal operations.',
    details: [
      'Built with React and Next.js on the frontend for structured, maintainable UI flows.',
      'Used Node.js and Express for API-driven backend logic and workflow handling.',
      'Integrated Supabase for managed data storage, authentication, and real-time foundations.',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Express', 'Supabase'],
    live: null, github: null,
  },
  {
    title: 'LU BAO Merchandise',
    type: 'Supporting',
    description: 'Android merchandise management and ordering app with Firebase-backed authentication and cloud data synchronization.',
    details: ['Inventory and ordering workflows in a mobile-first setting.', 'Java, XML layouts, Firebase Auth, and Cloud Firestore.'],
    tech: ['Android Studio', 'Java', 'Firebase', 'Cloud Firestore', 'XML'],
    live: 'https://play.google.com/store/apps/details?id=com.gonzales.baomerchandise&hl=en',
    github: 'https://github.com/eulicemage/LU-BAO-Merchandise',
  },
  {
    title: 'Rockies Fitness',
    type: 'Supporting',
    description: 'Gym operations platform combining a web dashboard, mobile app, and RFID-based attendance monitoring.',
    details: ['Connected admin and member workflows across web and mobile.', 'Laravel, MySQL, Android Studio, Firebase, and hardware attendance tracking.'],
    tech: ['Laravel', 'MySQL', 'Android Studio', 'Java', 'Firebase', 'RFID'],
    live: 'https://www.rockiesfitnessph.com/landing',
    github: 'https://github.com/jimdmnc/FitTrack',
  },
  {
    title: 'Floral Haven',
    type: 'Supporting',
    description: 'Responsive storefront built with core frontend technologies and emphasis on clean browsing experience.',
    details: ['Pure HTML, CSS, and JavaScript implementation.', 'Responsive layout, client-side interactivity, and visual polish.'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://flowers-shop-project.netlify.app/',
    github: 'https://github.com/eulicemage/floral-haven',
  },
];

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function ParticleCanvas({ mouseRef }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const ptsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initPts();
    };

    const initPts = () => {
      const n = Math.floor((W * H) / 18000);
      ptsRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.3,
        hue: Math.random() < 0.5 ? 190 : 270,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const pts = ptsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,0.5)`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2},70%,70%,${(1 - d / 110) * 0.15})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }

        // mouse repel
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          const f = ((120 - d) / 120) * 0.4;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 0.6) { p.vx = (p.vx / sp) * 0.6; p.vy = (p.vy / sp) * 0.6; }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function CustomCursor({ mouseRef }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const loop = () => {
      const { x, y } = mouseRef.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.18;
      ringPos.current.y += (y - ringPos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = `${x - 6}px`;
        dotRef.current.style.top = `${y - 6}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 18}px`;
        ringRef.current.style.top = `${ringPos.current.y - 18}px`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseRef]);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 12, height: 12,
        background: '#6ee7f7', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        mixBlendMode: 'screen', transition: 'transform 0.1s, background 0.3s',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 36, height: 36,
        border: '1.5px solid rgba(110,231,247,0.5)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
        mixBlendMode: 'screen',
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setProgress(p * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 2,
      width: `${progress}%`, zIndex: 200,
      background: 'linear-gradient(90deg,#6ee7f7,#a78bfa,#f472b6)',
      transition: 'width 0.1s',
    }} />
  );
}

/* ─────────────────────────────────────────────
   TILT CARD
───────────────────────────────────────────── */
function TiltCard({ children, style, className, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateY(-4px) scale(1.02)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease, box-shadow 0.4s ease', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  /* Global mouse tracker */
  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const updateActive = () => {
      const offset = window.innerHeight * 0.3;
      let current = 'home';
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= offset && r.bottom >= offset) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  /* Reduced motion + mobile detection */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mob = window.matchMedia('(max-width: 767px)');
    const update = () => { setReduceMotion(mq.matches); setIsMobile(mob.matches); };
    update();
    mq.addEventListener('change', update);
    mob.addEventListener('change', update);
    return () => { mq.removeEventListener('change', update); mob.removeEventListener('change', update); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const heroTilt = (reduceMotion || isMobile) ? {} : {
    transform: `perspective(1400px) rotateX(${-heroPointer.y * 6}deg) rotateY(${heroPointer.x * 9}deg) translateZ(0)`,
  };
  const layer = (depth) => (reduceMotion || isMobile) ? {} : {
    transform: `translate3d(${heroPointer.x * depth}px,${heroPointer.y * depth}px,${depth * 1.5}px)`,
  };

  /* ── STYLES ── */
  const S = {
    shell: {
      minHeight: '100vh', background: '#030712', color: '#f1f5f9',
      fontFamily: "'Space Grotesk', 'DM Sans', system-ui, sans-serif",
      cursor: isMobile ? 'auto' : 'none',
    },
    // NAV
    nav: {
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.9rem 2.5rem',
      background: 'rgba(3,7,18,0.65)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    },
    logo: {
      fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 800,
      background: 'linear-gradient(135deg,#6ee7f7,#a78bfa)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em', cursor: isMobile ? 'pointer' : 'none',
      border: 'none', backgroundColor: 'transparent',
    },
  };

  return (
    <div style={S.shell}>
      {/* ── GLOBAL EFFECTS ── */}
      <ScrollProgress />
      {!isMobile && <CustomCursor mouseRef={mouseRef} />}
      <ParticleCanvas mouseRef={mouseRef} />

      {/* ── AMBIENT ORBS ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -200, top: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(#a78bfa,transparent 70%)', opacity: 0.12, filter: 'blur(80px)', animation: 'drift1 12s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: -100, bottom: 0, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(#6ee7f7,transparent 70%)', opacity: 0.1, filter: 'blur(80px)', animation: 'drift2 15s ease-in-out infinite' }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        body::-webkit-scrollbar { width: 3px; }
        body::-webkit-scrollbar-track { background: transparent; }
        body::-webkit-scrollbar-thumb { background: linear-gradient(#6ee7f7,#a78bfa); border-radius: 2px; }
        .portfolio-nav-link { position:relative; font-size:0.8rem; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; transition:color 0.2s; }
        .portfolio-nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:#6ee7f7; transition:width 0.3s; }
        .portfolio-nav-link:hover::after { width:100%; }
        .portfolio-nav-link:hover { color:#fff !important; }
        .pcard-hover { transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s; }
        .pcard-hover:hover { transform: translateY(-6px); box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .sup-link-btn { transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .sup-link-btn:hover { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.18) !important; color: #fff !important; }
        .citem-row { transition: background 0.2s, border-color 0.2s; }
        .citem-row:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.12) !important; }
        .btn-primary-glow { transition: transform 0.2s, box-shadow 0.2s; }
        .btn-primary-glow:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 40px rgba(99,102,241,0.55) !important; }
        .btn-ghost-hover { transition: background 0.2s, border-color 0.2s; }
        .btn-ghost-hover:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.2) !important; }
        .nav-cta-btn { transition: transform 0.2s, box-shadow 0.2s; }
        .nav-cta-btn:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(110,231,247,0.45) !important; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={S.nav}>
        <button onClick={() => scrollTo('home')} style={S.logo} aria-label="Home">EM</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hidden lg:flex">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="portfolio-nav-link"
              style={{
                color: activeSection === item.id ? '#fff' : '#64748b',
                background: 'none', border: 'none', cursor: isMobile ? 'pointer' : 'none', padding: 0,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="nav-cta-btn"
            style={{
              padding: '0.5rem 1.4rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600,
              background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: '#fff',
              border: 'none', cursor: isMobile ? 'pointer' : 'none',
              boxShadow: '0 0 20px rgba(99,102,241,0.35)',
            }}
          >
            Hire Me
          </button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(v => !v)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '0.4rem', color: '#cbd5e1', cursor: 'pointer' }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div style={{ background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 57, zIndex: 99 }}>
          {navigationItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              style={{ display: 'block', width: '100%', padding: '0.85rem 1.5rem', textAlign: 'left', background: 'none', border: 'none', color: '#e2e8f0', fontSize: '0.9rem', cursor: 'pointer' }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main style={{ position: 'relative', zIndex: 10 }}>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? '5rem 1.5rem 3rem' : '6rem 3rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 900, position: 'relative', zIndex: 2, width: '100%' }}>

            {/* Badge */}
            <div
              onMouseMove={(e) => {
                if (!reduceMotion && !isMobile) {
                  const b = e.currentTarget.closest('section').getBoundingClientRect();
                  setHeroPointer({
                    x: +((e.clientX - b.left) / b.width - 0.5).toFixed(3),
                    y: +((e.clientY - b.top) / b.height - 0.5).toFixed(3),
                  });
                }
              }}
              onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}
              style={{ display: 'contents' }}
            />
            <div style={{ ...layer(8), display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 100, border: '1px solid rgba(110,231,247,0.25)', background: 'rgba(110,231,247,0.06)', marginBottom: '1.75rem', animation: 'fadeUp 0.8s ease both' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ee7f7', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6ee7f7' }}>Software Developer Portfolio</span>
            </div>

            {/* Headline */}
            <div style={layer(10)}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? '3rem' : 'clamp(3.5rem,8vw,7rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff', animation: 'fadeUp 0.8s 0.1s ease both', marginBottom: '1.4rem' }}>
                Hi, I'm{' '}
                <span style={{ background: 'linear-gradient(135deg,#6ee7f7 0%,#a78bfa 50%,#f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Eulice Mage
                </span>
                .
              </h1>
            </div>

            <div style={layer(6)}>
              <p style={{ maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.8, color: '#94a3b8', animation: 'fadeUp 0.8s 0.2s ease both', marginBottom: '2.2rem' }}>
                An IT graduate focused on building practical, modern software across frontend and backend systems. I translate requirements into clean interfaces and dependable workflows.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ ...layer(7), display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.3s ease both', marginBottom: '2.5rem' }}>
              <button
                onClick={() => scrollTo('projects')}
                className="btn-primary-glow"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 100, background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: isMobile ? 'pointer' : 'none', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}
              >
                View Projects <ArrowRight size={15} />
              </button>
              <a
                href="mailto:eulice.mage57@gmail.com"
                className="btn-ghost-hover"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', cursor: isMobile ? 'pointer' : 'none', background: 'transparent' }}
              >
                Email Me <Mail size={15} />
              </a>
            </div>

            {/* Signal cards */}
            <div style={{ ...layer(5), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '0.85rem', animation: 'fadeUp 0.8s 0.4s ease both' }}>
              {heroSignals.map((s) => (
                <TiltCard key={s.label}
                  style={{ padding: '1.1rem 1.3rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569' }}>{s.label}</p>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.88rem', fontWeight: 600, color: s.highlight ? '#34d399' : '#e2e8f0' }}>
                    {s.highlight && <span style={{ marginRight: '0.3rem' }}>●</span>}{s.value}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: isMobile ? '4rem 1.5rem' : '5rem 3rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '2rem' : '2.5rem 3rem', background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(12px)' }}>
                <div style={{ position: 'absolute', inset: '0 0 auto', height: 1, background: 'linear-gradient(90deg,transparent,#a78bfa 40%,#6ee7f7 60%,transparent)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 0.7fr', gap: '2.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '1rem' }}>About Me</p>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.2rem' }}>
                      Building real software with a clear technical foundation.
                    </h2>
                    <p style={{ fontSize: '0.97rem', lineHeight: 1.85, color: '#94a3b8', marginBottom: '1rem' }}>
                      My portfolio is built around proof: the software systems I've built, the stack I used, and the kind of team contribution I'm ready to grow into. I'm a fresh graduate with a solid foundation in web and mobile development.
                    </p>
                    <p style={{ fontSize: '0.97rem', lineHeight: 1.85, color: '#94a3b8' }}>
                      I'm eager to join a team where I can contribute from day one, keep learning quickly, and eventually help drive meaningful product decisions.
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: '0.75rem', alignSelf: 'center' }}>
                    {[
                      { label: 'Degree', val: 'BS Information Technology', sub: 'System Development track' },
                      { label: 'Work Style', val: 'Calm & coachable', sub: 'Ready for structured feedback' },
                      { label: 'Interests', val: 'LGU & service portals', sub: 'Data-backed internal tools' },
                    ].map((item) => (
                      <TiltCard key={item.label} style={{ padding: '1rem 1.2rem', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                        <p style={{ fontSize: '0.68rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</p>
                        <p style={{ marginTop: '0.35rem', fontSize: '0.88rem', fontWeight: 700, color: '#e2e8f0' }}>{item.val}</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>{item.sub}</p>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── STACK ── */}
        <section id="stack" style={{ padding: isMobile ? '4rem 1.5rem' : '5rem 3rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '0.75rem' }}>Technical Focus</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 600, marginBottom: '0.75rem' }}>
                A proof-based view of my stack and capabilities.
              </h2>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: '#64748b', maxWidth: 500, marginBottom: '2.5rem' }}>
                Every technology here is grounded in real project work — not certifications or theoretical exposure.
              </p>

              {/* Proof cards */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {proofSections.map((sec) => (
                  <TiltCard key={sec.title}
                    as="article"
                    className="pcard-hover"
                    style={{ padding: '1.8rem', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15,23,42,0.5)', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1.2rem', background: `${sec.accent}18`, border: `1px solid ${sec.accent}30` }}>
                      {sec.emoji}
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.8rem' }}>{sec.title}</h3>
                    {sec.points.map((pt) => (
                      <div key={pt} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.7rem' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: sec.accent, marginTop: '0.6rem', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#64748b' }}>{pt}</p>
                      </div>
                    ))}
                  </TiltCard>
                ))}
              </div>

              {/* Tech chips */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '1rem' }}>
                {technicalGroups.map((grp) => {
                  const Icon = grp.icon;
                  return (
                    <TiltCard key={grp.title} style={{ padding: '1.3rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                        <Icon size={16} style={{ color: grp.color }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{grp.title}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {grp.items.map((it) => (
                          <span key={it} style={{ padding: '0.28rem 0.7rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 500, background: `${grp.color}12`, color: grp.color, border: `1px solid ${grp.color}25` }}>{it}</span>
                        ))}
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: isMobile ? '4rem 1.5rem' : '5rem 3rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#34d399', marginBottom: '0.75rem' }}>Projects</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 700, marginBottom: '0.75rem' }}>
                Selected work — EBPLS as the centerpiece.
              </h2>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: '#64748b', maxWidth: 560, marginBottom: '2.5rem' }}>
                EBPLS leads because it best represents modern full-stack experience in a real-world LGU context.
              </p>

              {/* Featured */}
              <TiltCard
                as="article"
                style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, border: '1px solid rgba(99,102,241,0.25)', padding: isMobile ? '2rem' : '2.5rem 3rem', background: 'rgba(15,23,42,0.8)', marginBottom: '1.5rem' }}
              >
                <div style={{ position: 'absolute', inset: '0 0 auto', height: 1, background: 'linear-gradient(90deg,transparent,#6366f1 40%,#6ee7f7 60%,transparent)' }} />
                <div style={{ position: 'absolute', right: -80, top: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.9rem', borderRadius: 100, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)', marginBottom: '0.8rem' }}>
                        <Sparkles size={11} /> Featured Project
                      </span>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>EBPLS</h3>
                    </div>
                    <span style={{ padding: '0.4rem 1rem', borderRadius: 100, border: '1px solid rgba(56,189,248,0.3)', background: 'rgba(56,189,248,0.06)', fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8' }}>LGU Workflow Platform</span>
                  </div>
                  <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: '#94a3b8', maxWidth: 700, marginBottom: '2rem' }}>{projects[0].description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', borderRadius: 18, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: '1rem' }}>What it demonstrates</p>
                      {projects[0].details.map((d) => (
                        <div key={d} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
                          <CheckCircle2 size={16} style={{ color: '#a78bfa', marginTop: 3, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.83rem', lineHeight: 1.7, color: '#94a3b8' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '1.5rem', borderRadius: 18, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                      <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '1rem' }}>Core stack</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {projects[0].tech.map((t) => (
                          <span key={t} style={{ padding: '0.3rem 0.8rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{t}</span>
                        ))}
                      </div>
                      <p style={{ marginTop: '1rem', fontSize: '0.82rem', lineHeight: 1.7, color: '#64748b' }}>Modern web development across UI, API, and managed backend for a public-sector workflow.</p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Supporting */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem' }}>
                {projects.slice(1).map((p) => (
                  <TiltCard key={p.title} as="article"
                    className="pcard-hover"
                    style={{ display: 'flex', flexDirection: 'column', padding: '1.8rem', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15,23,42,0.5)' }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569' }}>{p.type}</span>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '0.5rem 0 0.6rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#64748b', flex: 1, marginBottom: '0.8rem' }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {p.tech.map((t) => (
                        <span key={t} style={{ padding: '0.22rem 0.6rem', borderRadius: 100, fontSize: '0.68rem', fontWeight: 500, background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          className="sup-link-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textDecoration: 'none', background: 'transparent', cursor: isMobile ? 'pointer' : 'none' }}>
                          Live <ExternalLink size={11} />
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer"
                          className="sup-link-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textDecoration: 'none', background: 'transparent', cursor: isMobile ? 'pointer' : 'none' }}>
                          Code <Github size={11} />
                        </a>
                      )}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: isMobile ? '4rem 1.5rem' : '5rem 3rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#38bdf8', marginBottom: '0.75rem' }}>Contact</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 600, marginBottom: '2.5rem' }}>
                Open to junior developer roles and meaningful project work.
              </h2>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, border: '1px solid rgba(56,189,248,0.2)', padding: isMobile ? '2rem' : '3rem 3.5rem', background: 'rgba(15,23,42,0.8)' }}>
                <div style={{ position: 'absolute', inset: '0 0 auto', height: 1, background: 'linear-gradient(90deg,transparent,#38bdf8 40%,#a78bfa 60%,transparent)' }} />
                <div style={{ position: 'absolute', left: -80, top: -80, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }}>
                  <div>
                    <p style={{ fontSize: '0.97rem', lineHeight: 1.85, color: '#94a3b8', marginBottom: '2rem' }}>
                      If you're hiring a developer who is ready to learn quickly, contribute from day one, and build dependable product features — I'd be glad to connect. Let's build something together.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <a href="mailto:eulice.mage57@gmail.com"
                        className="btn-primary-glow"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 100, background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: '#fff', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', cursor: isMobile ? 'pointer' : 'none', boxShadow: '0 0 20px rgba(99,102,241,0.35)' }}>
                        Start a Conversation <Mail size={15} />
                      </a>
                      <a href="https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/" target="_blank" rel="noopener noreferrer"
                        className="btn-ghost-hover"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', cursor: isMobile ? 'pointer' : 'none', background: 'transparent' }}>
                        <Linkedin size={15} /> LinkedIn
                      </a>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[
                      { href: 'mailto:eulice.mage57@gmail.com', Icon: Mail, label: 'Email', value: 'eulice.mage57@gmail.com' },
                      { href: 'https://github.com/eulicemage', Icon: Github, label: 'GitHub', value: 'github.com/eulicemage', ext: true },
                      { href: 'https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/', Icon: Linkedin, label: 'LinkedIn', value: 'Professional profile & contact', ext: true },
                      { href: null, Icon: MapPin, label: 'Location', value: 'Cavinti, Laguna, Philippines' },
                    ].map(({ href, Icon, label, value, ext }) => {
                      const props = href ? { href, ...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {};
                      const Tag = href ? 'a' : 'div';
                      return (
                        <Tag key={label} {...props}
                          className="citem-row"
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', cursor: href ? (isMobile ? 'pointer' : 'none') : 'default' }}>
                          <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                            <Icon size={17} style={{ color: '#38bdf8' }} />
                          </span>
                          <span>
                            <span style={{ display: 'block', fontSize: '0.68rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                            <span style={{ display: 'block', marginTop: '0.1rem', fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0' }}>{value}</span>
                          </span>
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#334155', position: 'relative', zIndex: 10 }}>
          <p>© 2025 Eulice Mage · Built with React, Next.js & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
}