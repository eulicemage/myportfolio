import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  TerminalSquare,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'proof', label: 'Proof' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const heroRoles = [
  'Fresh Graduate Software Developer',
  'Frontend-leaning Full-Stack Builder',
  'Interface-Driven Problem Solver',
];

const proofCards = [
  {
    icon: Layers3,
    title: 'Flagship public-sector build',
    body:
      'EBPLS anchors the portfolio: an LGU-oriented platform shaped around real workflows, role-based experiences, and clear handoff between applicant and staff views.',
  },
  {
    icon: TerminalSquare,
    title: 'Modern web stack in practice',
    body:
      'Hands-on work with React, Next.js, Node/Express, and Supabase, paired with earlier projects in Laravel, Firebase, Android, and responsive front-end builds.',
  },
  {
    icon: Briefcase,
    title: 'Early-career, team-ready mindset',
    body:
      'Positioning is intentionally honest: a fresh graduate who ships, documents thinking, and is ready to grow inside a product or engineering team.',
  },
];

const capabilityGroups = [
  {
    title: 'Frontend and product UI',
    items: ['React', 'Next.js', 'Responsive layouts', 'UI states', 'Accessible interaction basics'],
  },
  {
    title: 'Backend and data',
    items: ['Node/Express', 'Supabase', 'REST APIs', 'Authentication flows', 'Database-backed features'],
  },
  {
    title: 'Workflow and delivery',
    items: ['Git/GitHub', 'Component thinking', 'Cross-device testing', 'Debugging', 'Collaborative iteration'],
  },
];

const projectHighlights = [
  {
    label: 'LGU-focused workflow',
    value: 'Permits and licensing flow designed for clearer applicant and staff journeys.',
  },
  {
    label: 'Full-stack architecture',
    value: 'React and Next.js on the client side, Node/Express services, and Supabase for data and platform support.',
  },
  {
    label: 'Proof over promises',
    value: 'Showcases how I approach real interfaces, structured data, and implementation detail as an entry-level developer.',
  },
];

const supportingProjects = [
  {
    title: 'Rockies Fitness',
    description:
      'A gym management system spanning web admin, Android member flows, and RFID-based attendance tracking.',
    stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'Android Studio', 'Firebase'],
    live: 'https://www.rockiesfitnessph.com/landing',
    github: 'https://github.com/jimdmnc/FitTrack',
  },
  {
    title: 'LU BAO Merchandise',
    description:
      'An Android merchandise ordering app with Firebase-backed authentication and synchronized product data.',
    stack: ['Java', 'Android Studio', 'Firebase', 'Cloud Firestore', 'XML'],
    live: 'https://play.google.com/store/apps/details?id=com.gonzales.baomerchandise&hl=en',
    github: 'https://github.com/eulicemage/LU-BAO-Merchandise',
  },
  {
    title: 'Floral Haven',
    description:
      'A polished front-end storefront concept built with HTML, CSS, and JavaScript, focused on presentation and browsing flow.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://flowers-shop-project.netlify.app/',
    github: 'https://github.com/eulicemage/floral-haven',
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const typingTimeoutRef = useRef(null);
  const roleIndexRef = useRef(0);
  const characterIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return undefined;
    }

    const sections = navItems.map((item) => item.id);

    const handleScroll = () => {
      setScrollY(window.scrollY);

      const currentSection = sections.find((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= 180 && rect.bottom >= 180;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((current) => ({
              ...current,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const runTyping = () => {
      const currentRole = heroRoles[roleIndexRef.current];

      const tick = () => {
        if (!isMounted) {
          return;
        }

        if (!isDeletingRef.current) {
          characterIndexRef.current += 1;
          const nextText = currentRole.slice(0, characterIndexRef.current);
          setTypedText(nextText);

          if (characterIndexRef.current === currentRole.length) {
            typingTimeoutRef.current = setTimeout(() => {
              isDeletingRef.current = true;
              tick();
            }, 1400);
            return;
          }

          typingTimeoutRef.current = setTimeout(tick, 70);
          return;
        }

        characterIndexRef.current -= 1;
        const nextText = currentRole.slice(0, Math.max(characterIndexRef.current, 0));
        setTypedText(nextText);

        if (characterIndexRef.current <= 0) {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % heroRoles.length;
          typingTimeoutRef.current = setTimeout(tick, 240);
          return;
        }

        typingTimeoutRef.current = setTimeout(tick, 40);
      };

      tick();
    };

    runTyping();

    return () => {
      isMounted = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((current) => !current);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    if (typeof document === 'undefined') {
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const revealClass = (sectionId) =>
    isVisible[sectionId]
      ? 'portfolio-reveal portfolio-reveal-visible'
      : 'portfolio-reveal';

  return (
    <div className="portfolio-shell">
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{
          background: `radial-gradient(circle 28rem at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 146, 92, 0.16), transparent 60%)`,
        }}
      />

      <div className="portfolio-grid pointer-events-none fixed inset-0 z-0 opacity-40" />

      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrollY > 24 ? 'border-b border-white/10 bg-[rgba(16,11,10,0.8)] backdrop-blur-xl' : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left"
            aria-label="Go to home section"
          >
            <span className="portfolio-mark">
              <Sparkles size={18} />
            </span>
            <span>
              <span className="block text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Eulice Mage
              </span>
              <span className="block text-sm text-[var(--color-ivory)]">Developer Portfolio</span>
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`portfolio-nav-link ${activeSection === item.id ? 'portfolio-nav-link-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:eulice.mage57@gmail.com"
              className="portfolio-cta-inline"
            >
              Email for opportunities
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--color-ivory)] lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[rgba(18,12,11,0.96)] px-5 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-2xl border border-white/8 px-4 py-3 text-left text-[var(--color-sand)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-ivory)]"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="mailto:eulice.mage57@gmail.com"
                className="portfolio-button-primary mt-2 text-center"
              >
                Email for opportunities
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <section id="home" className="min-h-screen px-5 pb-16 pt-28 sm:px-6 sm:pt-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="portfolio-reveal portfolio-reveal-visible">
              <div className="portfolio-eyebrow">Creative software developer portfolio</div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-[var(--color-ivory)] sm:text-6xl lg:text-7xl">
                Fresh-grad energy, thoughtful interfaces, and full-stack work grounded in real projects.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-sand)] sm:text-xl">
                I build polished, practical web experiences and I care about how software feels to use. Right now,
                I am focused on turning academic and project experience into strong early-career engineering impact.
              </p>

              <div className="mt-8 min-h-[2.5rem] text-base uppercase tracking-[0.24em] text-[var(--color-amber-soft)] sm:text-lg">
                {typedText}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="portfolio-button-primary"
                >
                  View flagship project
                  <ArrowRight size={18} />
                </button>
                <a
                  href="mailto:eulice.mage57@gmail.com?subject=Opportunity%20for%20Eulice%20Mage"
                  className="portfolio-button-secondary"
                >
                  Contact me about a role
                </a>
              </div>
            </div>

            <aside className="portfolio-reveal portfolio-reveal-visible">
              <div className="portfolio-panel portfolio-hero-card">
                <div className="portfolio-orbit" aria-hidden="true" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 text-[var(--color-amber-soft)]">
                    <GraduationCap size={20} />
                    <span className="text-sm uppercase tracking-[0.26em]">Entry-level, production-minded</span>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-[var(--color-muted)]">Best fit</p>
                    <p className="mt-3 text-2xl font-medium text-[var(--color-ivory)]">
                      Junior software developer roles where product polish and implementation discipline both matter.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="portfolio-stat">
                      <span className="portfolio-stat-label">Primary focus</span>
                      <span className="portfolio-stat-value">Web interfaces</span>
                    </div>
                    <div className="portfolio-stat">
                      <span className="portfolio-stat-label">Current stack</span>
                      <span className="portfolio-stat-value">React to Supabase</span>
                    </div>
                    <div className="portfolio-stat">
                      <span className="portfolio-stat-label">Location</span>
                      <span className="portfolio-stat-value">Laguna, Philippines</span>
                    </div>
                    <div className="portfolio-stat">
                      <span className="portfolio-stat-label">Working style</span>
                      <span className="portfolio-stat-value">Collaborative and curious</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className={`px-5 py-20 sm:px-6 ${revealClass('about')}`}>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="portfolio-section-heading">
              <span className="portfolio-eyebrow">About</span>
              <h2 className="mt-5 text-4xl font-semibold text-[var(--color-ivory)] sm:text-5xl">
                A more honest portfolio for where I am right now.
              </h2>
            </div>

            <div className="grid gap-6">
              <div className="portfolio-panel">
                <p className="text-lg leading-8 text-[var(--color-sand)]">
                  I am a fresh graduate in Information Technology with a strong interest in building software that
                  feels clear, useful, and reliable. My work so far spans front-end presentation, full-stack web
                  development, Android projects, and data-backed product flows.
                </p>
                <p className="mt-5 text-lg leading-8 text-[var(--color-sand)]">
                  Instead of self-scored percentages, this portfolio highlights concrete work. The goal is simple:
                  show how I think, what I have already built, and why I am ready to contribute as a junior
                  developer on a real team.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="portfolio-panel">
                  <p className="portfolio-mini-label">Education</p>
                  <p className="mt-3 text-xl font-medium text-[var(--color-ivory)]">BS in Information Technology</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    System Development specialization and project-driven learning.
                  </p>
                </div>
                <div className="portfolio-panel">
                  <p className="portfolio-mini-label">Current direction</p>
                  <p className="mt-3 text-xl font-medium text-[var(--color-ivory)]">Interactive web products</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Especially projects where UI clarity and implementation detail both matter.
                  </p>
                </div>
                <div className="portfolio-panel">
                  <p className="portfolio-mini-label">What I bring</p>
                  <p className="mt-3 text-xl font-medium text-[var(--color-ivory)]">Strong foundation, ready to grow</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Comfortable learning quickly, asking good questions, and improving through feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className={`px-5 py-20 sm:px-6 ${revealClass('proof')}`}>
          <div className="mx-auto max-w-7xl">
            <div className="portfolio-section-heading max-w-3xl">
              <span className="portfolio-eyebrow">Proof of practice</span>
              <h2 className="mt-5 text-4xl font-semibold text-[var(--color-ivory)] sm:text-5xl">
                Evidence-driven sections instead of inflated claims.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--color-sand)]">
                These are the strongest signals I want an employer to see first: what I have built, which tools I am
                already using, and how that work maps to an entry-level software role.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {proofCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="portfolio-panel">
                    <div className="portfolio-icon-badge">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-2xl font-medium text-[var(--color-ivory)]">{card.title}</h3>
                    <p className="mt-4 leading-7 text-[var(--color-sand)]">{card.body}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="portfolio-panel">
                <p className="portfolio-mini-label">How I can contribute</p>
                <div className="mt-6 space-y-6">
                  {capabilityGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-lg font-medium text-[var(--color-ivory)]">{group.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="portfolio-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="portfolio-panel">
                <p className="portfolio-mini-label">What this portfolio now emphasizes</p>
                <div className="mt-6 space-y-5">
                  {projectHighlights.map((item) => (
                    <div key={item.label} className="portfolio-proof-row">
                      <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-amber-soft)]">{item.label}</p>
                      <p className="mt-2 text-base leading-7 text-[var(--color-sand)]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className={`px-5 py-20 sm:px-6 ${revealClass('projects')}`}>
          <div className="mx-auto max-w-7xl">
            <div className="portfolio-section-heading max-w-3xl">
              <span className="portfolio-eyebrow">Projects</span>
              <h2 className="mt-5 text-4xl font-semibold text-[var(--color-ivory)] sm:text-5xl">
                EBPLS leads the story. Everything else supports it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[var(--color-sand)]">
                The flagship project is positioned as the clearest sign of where I am heading as a developer. Supporting
                work stays visible, but secondary.
              </p>
            </div>

            <article className="portfolio-feature-card mt-12">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div>
                  <div className="portfolio-feature-badge">Flagship project</div>
                  <h3 className="mt-6 text-4xl font-semibold text-[var(--color-ivory)]">EBPLS</h3>
                  <p className="mt-5 text-xl leading-8 text-[var(--color-sand)]">
                    A business permitting and licensing platform oriented toward LGU workflows, designed to make
                    application steps, staff review, and document-heavy interactions feel more approachable.
                  </p>
                  <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
                    This is the strongest representation of my current direction: product-minded front-end work,
                    structured back-end thinking, and a stack that reflects how modern web applications are built.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node/Express', 'Supabase', 'Role-based flows', 'Responsive UI'].map((item) => (
                      <span key={item} className="portfolio-chip portfolio-chip-strong">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {projectHighlights.map((item) => (
                    <div key={item.label} className="portfolio-panel portfolio-panel-soft">
                      <p className="portfolio-mini-label">{item.label}</p>
                      <p className="mt-3 text-base leading-7 text-[var(--color-sand)]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {supportingProjects.map((project) => (
                <article key={project.title} className="portfolio-panel portfolio-project-card">
                  <p className="portfolio-mini-label">Supporting project</p>
                  <h3 className="mt-4 text-2xl font-medium text-[var(--color-ivory)]">{project.title}</h3>
                  <p className="mt-4 leading-7 text-[var(--color-sand)]">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="portfolio-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link-button"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link-button portfolio-link-button-muted"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={`px-5 pb-24 pt-20 sm:px-6 ${revealClass('contact')}`}>
          <div className="mx-auto max-w-7xl">
            <div className="portfolio-contact-wrap">
              <div>
                <span className="portfolio-eyebrow">Contact</span>
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold text-[var(--color-ivory)] sm:text-5xl">
                  If you are hiring a junior developer, I would love to hear about the role.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-sand)]">
                  The fastest route is email. LinkedIn and GitHub are here as well if you want a quick background
                  check before reaching out.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="portfolio-panel">
                  <div className="space-y-5">
                    <a href="mailto:eulice.mage57@gmail.com" className="portfolio-contact-row">
                      <span className="portfolio-icon-badge">
                        <Mail size={18} />
                      </span>
                      <span>
                        <span className="portfolio-mini-label">Email</span>
                        <span className="mt-2 block text-xl font-medium text-[var(--color-ivory)]">
                          eulice.mage57@gmail.com
                        </span>
                      </span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-contact-row"
                    >
                      <span className="portfolio-icon-badge">
                        <Linkedin size={18} />
                      </span>
                      <span>
                        <span className="portfolio-mini-label">LinkedIn</span>
                        <span className="mt-2 block text-xl font-medium text-[var(--color-ivory)]">
                          View professional profile
                        </span>
                      </span>
                    </a>

                    <a
                      href="https://github.com/eulicemage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-contact-row"
                    >
                      <span className="portfolio-icon-badge">
                        <Github size={18} />
                      </span>
                      <span>
                        <span className="portfolio-mini-label">GitHub</span>
                        <span className="mt-2 block text-xl font-medium text-[var(--color-ivory)]">
                          Review public project work
                        </span>
                      </span>
                    </a>
                  </div>
                </div>

                <div className="portfolio-panel">
                  <p className="portfolio-mini-label">Quick context</p>
                  <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-1 text-[var(--color-amber-soft)]" />
                      <p className="leading-7 text-[var(--color-sand)]">Based in Cavinti, Laguna, Philippines.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap size={18} className="mt-1 text-[var(--color-amber-soft)]" />
                      <p className="leading-7 text-[var(--color-sand)]">
                        Fresh graduate looking for junior software, web, or front-end leaning opportunities.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles size={18} className="mt-1 text-[var(--color-amber-soft)]" />
                      <p className="leading-7 text-[var(--color-sand)]">
                        Most interested in teams that value craft, feedback, and steady growth.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href="mailto:eulice.mage57@gmail.com?subject=Interview%20Inquiry%20for%20Eulice%20Mage"
                      className="portfolio-button-primary justify-center"
                    >
                      Send an interview inquiry
                    </a>
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="portfolio-button-secondary justify-center"
                    >
                      Revisit project work
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
