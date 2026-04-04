# Professional Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing portfolio into a more modern, professional software developer portfolio with stronger hierarchy, proof-based content, and `EBPLS` as a featured LGU-oriented project.

**Architecture:** Keep the app as a single-page React portfolio and improve it in place. Most of the work lives in `src/components/Portfolio.jsx` and `src/index.css`, with `src/App.css` reduced to a minimal app-level reset and `src/App.jsx` left as the simple render entry point.

**Tech Stack:** React 19, Vite, Tailwind CSS 4, Lucide React, ESLint

---

## File Structure

### Existing files to modify

- `src/components/Portfolio.jsx`
  Responsibility: Main portfolio layout, content data, navigation, interactions, and employer-facing copy.
- `src/index.css`
  Responsibility: Global animation tuning, shared visual tokens, section polish, and responsive refinements.
- `src/App.css`
  Responsibility: Remove unused starter CSS and keep only minimal root-level styling.

### Existing files to verify

- `src/App.jsx`
  Responsibility: Continue rendering the `Portfolio` component without additional logic.
- `package.json`
  Responsibility: Provide `build` and `lint` commands for verification.

## Task 1: Refocus the Content Around Professional Software Developer Positioning

**Files:**
- Modify: `src/components/Portfolio.jsx`
- Verify: `src/App.jsx`

- [ ] **Step 1: Replace generic role rotation and inflated achievement content with grounded developer messaging**

Update the hero data inside `src/components/Portfolio.jsx` from:

```jsx
const roles = [
  'Software Developer',
  'Web Developer',
  'Aspiring Developer',
  'Tech Enthusiast',
];

const achievements = [
  { icon: Users, number: '1000+', label: 'Users Served', color: 'text-purple-400' },
];
```

to a more professional, truth-safe direction such as:

```jsx
const roles = [
  'Software Developer',
  'Frontend-Focused Builder',
  'Full-Stack Project Developer',
];

const professionalHighlights = [
  'Fresh graduate focused on building clean, modern web experiences',
  'Hands-on project work across frontend, backend, and mobile',
  'Open to software developer opportunities and collaborative teams',
];
```

- [ ] **Step 2: Rewrite the hero copy so the first screen reads more professionally**

Adjust the hero content in `src/components/Portfolio.jsx` to follow this shape:

```jsx
<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
  Software Developer
</p>
<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
  Eulice Mage
</h1>
<p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
  I build modern web experiences and software projects with a focus on usability,
  clean implementation, and real-world problem solving.
</p>
```

- [ ] **Step 3: Keep `src/App.jsx` simple**

Verify `src/App.jsx` still renders the portfolio component directly:

```jsx
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <>
      <Portfolio />
    </>
  );
}

export default App;
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/App.jsx
git commit -m "refactor: strengthen professional portfolio messaging"
```

Expected: a commit is created with the updated content direction.

## Task 2: Replace Skill Percentages with Proof-Based Technical Sections

**Files:**
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Remove the current percentage-based `skills` structure**

Delete or replace data shaped like:

```jsx
const skills = {
  'Frontend Development': [
    { name: 'HTML5 & CSS3', level: 88 },
    { name: 'React', level: 20 },
  ],
};
```

- [ ] **Step 2: Introduce grouped technical strengths tied to real work**

Add a more credible structure such as:

```jsx
const technicalGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs'],
  },
  {
    title: 'Data',
    items: ['Supabase', 'Firebase', 'MySQL'],
  },
  {
    title: 'Workflow',
    items: ['GitHub', 'Figma', 'Problem Solving', 'Team Collaboration'],
  },
];
```

- [ ] **Step 3: Render the new section as cards or grouped chips instead of progress bars**

Replace the current mapped progress bar UI with a cleaner block like:

```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {technicalGroups.map((group) => (
    <article key={group.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{group.title}</h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-sm bg-slate-800 text-slate-200 border border-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "feat: replace skill percentages with proof-based stack section"
```

Expected: the portfolio presents technologies more credibly and professionally.

## Task 3: Feature EBPLS and Rebalance the Projects Section

**Files:**
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Add `EBPLS` to the projects data as the featured project**

Add a dedicated object in `src/components/Portfolio.jsx` similar to:

```jsx
const featuredProject = {
  title: 'EBPLS',
  description:
    'An LGU-oriented Electronic Business Permit and Licensing System designed to support modern permit workflows with a more structured, user-friendly web experience.',
  tech: ['React', 'Next.js', 'Node/Express', 'Supabase'],
  highlights: [
    'LGU-oriented workflow design',
    'Modern full-stack web architecture',
    'Dashboard and record management experience',
  ],
};
```

- [ ] **Step 2: Keep supporting projects but visually demote them below the featured work**

Use a structure such as:

```jsx
const supportingProjects = [
  {
    title: 'LU BAO Merchandise',
    description: 'Android merchandise management and ordering app with Firebase-backed data and authentication.',
  },
  {
    title: 'Rockies Fitness',
    description: 'Gym management system spanning web admin, Android, and RFID-based attendance.',
  },
  {
    title: 'Floral Haven',
    description: 'Responsive front-end storefront focused on product presentation and browsing flow.',
  },
];
```

- [ ] **Step 3: Render the projects section with a featured block first, then supporting cards**

Shape the JSX like:

```jsx
<div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
  <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Featured Project</p>
  <h3 className="mt-3 text-3xl font-bold text-white">{featuredProject.title}</h3>
  <p className="mt-4 text-slate-300 leading-relaxed">{featuredProject.description}</p>
</div>

<div className="grid lg:grid-cols-3 gap-8">
  {supportingProjects.map((project) => (
    <article key={project.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
      <p className="mt-3 text-slate-400">{project.description}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "feat: feature EBPLS and rebalance project hierarchy"
```

Expected: `EBPLS` stands out as the most meaningful project in the portfolio.

## Task 4: Refresh the Visual System for a More Mature Modern Look

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Portfolio.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Tone down the current neon-heavy styling**

In `src/components/Portfolio.jsx`, replace classes such as:

```jsx
from-cyan-400 via-purple-500 to-pink-600
from-cyan-500 to-purple-600
hover:shadow-cyan-500/50
```

with a more mature direction built around slate, blue, and subtle accent usage, for example:

```jsx
from-sky-400 to-blue-500
border-slate-800
bg-slate-950
text-slate-200
```

- [ ] **Step 2: Simplify the animation system in `src/index.css`**

Keep only the animations that support polish and remove the most distracting effects if they no longer fit the professional direction. For example, reduce dependence on:

```css
.animate-glow
.animate-bounce-smooth
.animate-gradient-shift
```

and keep a smaller set like:

```css
.animate-slide-in-top
.animate-slide-in-bottom
.animate-fade-soft
```

If adding a fade utility, implement it in `src/index.css` like:

```css
@keyframes fadeSoft {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-soft {
  animation: fadeSoft 0.8s ease-out;
}
```

- [ ] **Step 3: Reduce `src/App.css` to a minimal root rule**

Replace the unused Vite starter CSS with:

```css
#root {
  min-height: 100vh;
}
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/index.css src/components/Portfolio.jsx src/App.css
git commit -m "style: refresh portfolio visuals for modern professional look"
```

Expected: the portfolio feels more mature and less template-like.

## Task 5: Improve the Contact Section and Final Hiring CTA

**Files:**
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Rewrite the closing copy for hiring clarity**

Update the contact intro copy to something like:

```jsx
<p className="text-xl text-slate-400 max-w-3xl mx-auto">
  I am open to software developer opportunities where I can contribute, keep learning,
  and build thoughtful digital experiences with a team.
</p>
```

- [ ] **Step 2: Keep real contact channels visible and easy to act on**

Make sure the section clearly presents:

```jsx
<a href="mailto:eulice.mage57@gmail.com">eulice.mage57@gmail.com</a>
<a href="https://github.com/eulicemage" target="_blank" rel="noopener noreferrer">GitHub</a>
<a href="https://www.linkedin.com/in/gonzales-eulice-mage-v-gonzales-93248a361/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
<p>Cavinti, Laguna, Philippines</p>
```

- [ ] **Step 3: Keep the form only if it still feels consistent**

If the current form remains, visually align it with the more professional direction by using calmer colors and simpler emphasis instead of exaggerated glow effects.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx
git commit -m "copy: improve portfolio contact section for hiring conversion"
```

Expected: the closing section feels more professional and recruiter-friendly.

## Task 6: Verify Build, Lint, and UI Readability

**Files:**
- Verify: `src/components/Portfolio.jsx`
- Verify: `src/index.css`
- Verify: `src/App.css`
- Verify: `src/App.jsx`
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

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected:

```text
0 problems
```

- [ ] **Step 3: Perform a manual UI review**

Check the portfolio in the browser against this list:

```text
- Hero reads clearly as a software developer portfolio
- Skill percentages are gone
- EBPLS is clearly featured
- Supporting projects are still visible
- Contact section feels professional and easy to act on
- Mobile layout remains readable and not overcrowded
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css src/App.css
git commit -m "chore: verify professional portfolio refresh"
```

Expected: the refresh is verified with a clean working tree.

## Self-Review

### Spec coverage

- Professional software developer positioning: covered by Tasks 1 and 5
- Modern product-style visual direction: covered by Task 4
- Replace skill bars with proof-based presentation: covered by Task 2
- Feature `EBPLS` with LGU-oriented context and stack: covered by Task 3
- Keep supporting projects: covered by Task 3
- Improve employer-facing CTA and contact section: covered by Task 5
- Preserve responsiveness and accessibility basics through verification: covered by Task 6

### Placeholder scan

- No placeholder text such as `TODO` or `TBD` remains
- Commands and file paths are explicit
- Each implementation area has concrete examples

### Type consistency

- `roles`, `professionalHighlights`, `technicalGroups`, `featuredProject`, and `supportingProjects` are used consistently
- Files referenced in tasks match the actual repo structure
