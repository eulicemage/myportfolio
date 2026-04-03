# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current single-page portfolio into a creative, interactive, employer-facing software developer portfolio with `EBPLS` as the flagship LGU-oriented case study.

**Architecture:** Keep the app as a single-page React/Vite experience, but replace the current template-like content model with a more curated content structure and a stronger visual system. Consolidate the redesign primarily inside `src/components/Portfolio.jsx` and `src/index.css`, while trimming unused starter CSS in `src/App.css` and preserving existing app wiring in `src/App.jsx`.

**Tech Stack:** React 19, Vite, Tailwind CSS 4, Lucide React, ESLint

---

## File Structure

### Existing files to modify

- `src/components/Portfolio.jsx`
  Responsibility: Main page structure, content data, interactions, animations, navigation, and employer-facing copy.
- `src/index.css`
  Responsibility: Global theme variables, custom animations, reusable visual utility classes, motion/accessibility refinements.
- `src/App.css`
  Responsibility: Remove or neutralize unused Vite starter styles that could conflict with the redesign.

### Existing files to verify

- `src/App.jsx`
  Responsibility: Keep the app entry simple and confirm it still renders `Portfolio`.
- `package.json`
  Responsibility: Use existing `build` and `lint` scripts for verification.

### Optional asset usage

- `images/*`
  Responsibility: Existing screenshots for project cards and case-study visuals if they still fit the redesign.

## Task 1: Restructure Portfolio Content Model

**Files:**
- Modify: `src/components/Portfolio.jsx`
- Verify: `src/App.jsx`

- [ ] **Step 1: Replace the current project and skills data shape with a proof-driven content model**

Update `src/components/Portfolio.jsx` so the page is driven by clearer content groups instead of percentage bars and generic cards. Add sections for hero proof stats, capability groups, `EBPLS` flagship data, and supporting projects.

```jsx
const proofPoints = [
  { label: 'Projects Shipped', value: '04' },
  { label: 'Core Stack', value: 'React • Node • Supabase' },
  { label: 'Flagship Build', value: 'LGU-oriented EBPLS' },
];

const capabilityGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'Authentication flows'],
  },
  {
    title: 'Data',
    items: ['Supabase', 'Firebase', 'MySQL'],
  },
  {
    title: 'Workflow',
    items: ['GitHub', 'Figma', 'Project handoff', 'UI implementation'],
  },
];

const featuredProject = {
  title: 'EBPLS',
  eyebrow: 'Flagship Project',
  subtitle: 'Electronic Business Permit and Licensing System for LGU-oriented workflows',
  description:
    'A full-stack platform designed to support business permit and licensing processes with a modern web experience for real local government workflows.',
  stack: ['React', 'Next.js', 'Node/Express', 'Supabase'],
  highlights: [
    'LGU-oriented permit workflow',
    'Full-stack architecture',
    'Dashboard and records experience',
    'Modern web application structure',
  ],
};
```

- [ ] **Step 2: Remove self-rated skill percentages and achievement claims that are hard to verify**

Delete or replace structures like:

```jsx
const skills = {
  'Frontend Development': [
    { name: 'React', level: 20 },
  ],
};

const achievements = [
  { icon: Users, number: '1000+', label: 'Users Served' },
];
```

Replace them with copy-driven, truth-safe data such as:

```jsx
const hiringSignals = [
  'Software developer focused on modern web experiences',
  'Fresh graduate with hands-on full-stack project work',
  'Comfortable building interfaces, APIs, and database-backed systems',
];
```

- [ ] **Step 3: Keep `src/App.jsx` untouched unless the import path changes**

Verify the file still looks like:

```jsx
import Portfolio from "./components/Portfolio";

function App() {
  return <Portfolio />;
}

export default App;
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/App.jsx
git commit -m "refactor: reshape portfolio content for employer storytelling"
```

Expected: a commit is created with the updated content model.

## Task 2: Rebuild the Page Layout Around a Creative Product Showcase

**Files:**
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Rework the section order to match the approved design**

Rebuild the JSX section order to:

```jsx
<section id="home">{/* immersive hero */}</section>
<section id="proof">{/* compact credibility strip */}</section>
<section id="about">{/* employer-facing value proposition */}</section>
<section id="stack">{/* capability groups */}</section>
<section id="projects">{/* EBPLS + supporting projects */}</section>
<section id="contact">{/* conversion-focused close */}</section>
```

Update the nav config accordingly:

```jsx
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
```

- [ ] **Step 2: Replace the current hero copy with stronger software developer positioning**

Use content in this shape:

```jsx
<p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
  Software Developer
</p>
<h1 className="max-w-5xl text-5xl font-black uppercase leading-none md:text-7xl xl:text-8xl">
  Building interactive web experiences with real-world purpose.
</h1>
<p className="max-w-2xl text-base text-stone-300 md:text-lg">
  Fresh graduate focused on crafting modern interfaces, full-stack systems,
  and thoughtful user experiences that feel polished, useful, and ready for real teams.
</p>
```

- [ ] **Step 3: Add a compact proof strip below the hero**

Add a mapped block like:

```jsx
<div className="grid gap-4 md:grid-cols-3">
  {proofPoints.map((item) => (
    <article key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-2xl font-bold text-white">{item.value}</p>
      <p className="mt-2 text-sm text-stone-300">{item.label}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Convert the projects area into a flagship case study plus supporting cards**

Use a two-tier structure:

```jsx
<article className="rounded-[2rem] border border-amber-200/20 bg-[#16120f] p-8">
  <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
    {featuredProject.eyebrow}
  </p>
  <h3 className="mt-4 text-3xl font-bold text-white">{featuredProject.title}</h3>
  <p className="mt-3 text-lg text-stone-300">{featuredProject.subtitle}</p>
  <p className="mt-6 text-stone-400">{featuredProject.description}</p>
</article>

<div className="grid gap-6 lg:grid-cols-3">
  {supportingProjects.map((project) => (
    <article key={project.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
      <p className="mt-3 text-sm text-stone-300">{project.description}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 5: Commit**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "feat: redesign portfolio layout into product showcase"
```

Expected: the page structure matches the approved section flow.

## Task 3: Apply a Distinct Visual System and Motion Language

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Portfolio.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Replace the current blue-purple default aesthetic with a more original theme**

Add global theme tokens in `src/index.css`:

```css
:root {
  --bg: #0b0908;
  --bg-soft: #15110f;
  --panel: rgba(255, 255, 255, 0.06);
  --panel-strong: rgba(255, 248, 240, 0.1);
  --text: #f5efe7;
  --muted: #c7b8a5;
  --line: rgba(255, 245, 235, 0.12);
  --accent: #f59e0b;
  --accent-2: #ef4444;
  --accent-3: #f97316;
}
```

Use them to support warm, cinematic gradients and glassy surfaces rather than the current cyan-purple look.

- [ ] **Step 2: Add a small set of purposeful animations instead of many repeated motion classes**

Create reusable animations in `src/index.css` such as:

```css
@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes driftGlow {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, -12px, 0) scale(1.04);
  }
}

.animate-rise-in {
  animation: riseIn 700ms ease-out both;
}
```

Also add a reduced-motion fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Remove unused starter CSS from `src/App.css`**

Replace its content with a minimal root reset:

```css
#root {
  min-height: 100vh;
}
```

- [ ] **Step 4: Update JSX class usage to match the new visual system**

Swap template-like classes such as:

```jsx
className="bg-slate-950 text-slate-100"
className="from-cyan-500 to-purple-600"
```

for a warmer direction using explicit values or CSS variables, for example:

```jsx
className="min-h-screen bg-[#0b0908] text-[var(--text)]"
className="bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(239,68,68,0.12),_transparent_28%),#0b0908]"
```

- [ ] **Step 5: Commit**

Run:

```bash
git add src/index.css src/components/Portfolio.jsx src/App.css
git commit -m "style: apply premium visual system to portfolio"
```

Expected: the site looks visually distinct and less template-driven.

## Task 4: Tighten Employer-Facing Copy and Contact Conversion

**Files:**
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Rewrite the about and contact copy for hiring clarity**

Use concise copy blocks like:

```jsx
const aboutParagraph =
  'I am a software developer and fresh graduate who enjoys turning ideas into polished web experiences. I like building interfaces that feel intuitive, connecting them to real backend workflows, and learning fast in the process.';

const closingParagraph =
  'If you are looking for a developer who can contribute with energy, curiosity, and hands-on project experience, I would love to talk about junior software roles, frontend work, or full-stack opportunities.';
```

- [ ] **Step 2: Make direct contact options the primary CTA**

Prefer direct actions in the contact area:

```jsx
<a href="mailto:eulice.mage57@gmail.com" className="inline-flex rounded-full px-6 py-3">
  Email Me
</a>
<a
  href="https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex rounded-full px-6 py-3"
>
  Connect on LinkedIn
</a>
```

Keep the form only if it still feels polished and consistent with the redesign.

- [ ] **Step 3: Remove or soften claims that sound inflated for a fresh graduate**

Review and replace lines similar to:

```jsx
'Ready to contribute from day one.'
'99.9% Uptime Record'
'1000+ Users Served'
```

with more grounded alternatives like:

```jsx
'Fresh graduate ready to contribute to real software teams.'
'Built through hands-on academic and portfolio projects.'
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "copy: improve hiring message and contact conversion"
```

Expected: the page feels more credible and employer-friendly.

## Task 5: Verify Responsiveness, Build, and Lint

**Files:**
- Verify: `src/components/Portfolio.jsx`
- Verify: `src/index.css`
- Verify: `src/App.css`
- Verify: `package.json`

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected:

```text
vite v7.x building for production...
✓ built in ...
```

- [ ] **Step 2: Run lint and fix any new issues**

Run:

```bash
npm run lint
```

Expected:

```text
0 problems
```

If lint reports issues in `src/components/Portfolio.jsx` or CSS-related imports, resolve them before proceeding.

- [ ] **Step 3: Manual UI review checklist**

Confirm the redesign in the browser covers:

```text
- Hero looks premium on desktop and mobile
- Navigation still scrolls to the right sections
- EBPLS is clearly the flagship project
- Supporting projects feel secondary but polished
- Contact actions are obvious
- No section feels overcrowded on small screens
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css src/App.css
git commit -m "chore: verify portfolio redesign"
```

Expected: final verification commit with a clean working tree.

## Self-Review

### Spec coverage

- Creative product-style direction: covered by Tasks 2 and 3
- Software developer positioning: covered by Tasks 2 and 4
- Fresh graduate credibility: covered by Tasks 1 and 4
- `EBPLS` as flagship LGU-oriented project: covered by Tasks 1 and 2
- Replacing self-rated skills with proof-driven capability sections: covered by Task 1
- Stronger CTA and employer conversion: covered by Task 4
- Build and lint verification: covered by Task 5

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” placeholders remain
- Commands and concrete code examples are included for each coding task
- File paths are explicit

### Type consistency

- The plan consistently uses `proofPoints`, `capabilityGroups`, `featuredProject`, and `supportingProjects`
- Section IDs align with the proposed nav structure: `home`, `about`, `stack`, `projects`, `contact`
