# Futuristic Portfolio Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current professional portfolio into a futuristic glass-style experience with tasteful 3D motion and interactivity while preserving strong software developer positioning and readable content.

**Architecture:** Build on top of the current single-page portfolio structure rather than replacing it again. Most of the work stays in `src/components/Portfolio.jsx` for layered composition and pointer interaction, and in `src/index.css` for glass surfaces, depth, glow, and reduced-motion-safe transforms, while `src/App.css` remains minimal.

**Tech Stack:** React 19, Vite, Tailwind CSS 4, Lucide React, ESLint

---

## File Structure

### Existing files to modify

- `src/components/Portfolio.jsx`
  Responsibility: Add the futuristic hero composition, interactive card behavior, layered project presentation, and cohesive glass treatment across sections.
- `src/index.css`
  Responsibility: Define glass surfaces, 3D motion utilities, pointer-reactive visual styling, glow effects, and reduced-motion fallbacks.
- `src/App.css`
  Responsibility: Keep app-level styling minimal unless one small supporting rule is needed.

### Existing files to verify

- `src/App.jsx`
  Responsibility: Continue rendering the portfolio without extra logic.
- `package.json`
  Responsibility: Provide `build` and `lint` verification commands.

## Task 1: Rebuild the Hero Into a Futuristic Glass Showcase

**Files:**
- Modify: `src/components/Portfolio.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add pointer-state to the portfolio component for subtle interactive motion**

Near the top of `Portfolio.jsx`, add state shaped like:

```jsx
const [pointer, setPointer] = useState({ x: 0, y: 0 });
const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0 });
```

Then add handlers such as:

```jsx
const handleHeroMove = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const relativeX = (event.clientX - bounds.left) / bounds.width;
  const relativeY = (event.clientY - bounds.top) / bounds.height;

  setPointer({ x: relativeX, y: relativeY });
  setHeroTilt({
    rotateX: (0.5 - relativeY) * 8,
    rotateY: (relativeX - 0.5) * 10,
  });
};

const resetHeroTilt = () => {
  setHeroTilt({ rotateX: 0, rotateY: 0 });
};
```

- [ ] **Step 2: Replace the flat hero side panel with layered glass cards**

Reshape the hero JSX from a standard two-column layout into a layered composition like:

```jsx
<div
  className="portfolio-hero-stage"
  onMouseMove={handleHeroMove}
  onMouseLeave={resetHeroTilt}
>
  <div
    className="portfolio-hero-panel"
    style={{
      transform: `perspective(1400px) rotateX(${heroTilt.rotateX}deg) rotateY(${heroTilt.rotateY}deg)`,
    }}
  >
    {/* headline and CTA content */}
  </div>

  <div className="portfolio-float-card portfolio-float-card-top">
    {/* software developer / status card */}
  </div>

  <div className="portfolio-float-card portfolio-float-card-bottom">
    {/* stack or proof card */}
  </div>
</div>
```

- [ ] **Step 3: Keep text hierarchy clean while adding dimensional decoration**

Retain readable content in the hero:

```jsx
<p className="portfolio-eyebrow">Software Developer Portfolio</p>
<h1 className="portfolio-display">
  Building practical web applications with futuristic product-level polish.
</h1>
<p className="portfolio-lead">
  Fresh graduate focused on modern interfaces, dependable workflows, and software that feels clean to use.
</p>
```

Do not reduce text clarity just to add effects.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css
git commit -m "feat: add futuristic glass hero composition"
```

Expected: the hero has layered glass depth, subtle pointer reactivity, and stronger visual impact.

## Task 2: Add a Cohesive Glass and 3D Visual System

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Introduce reusable glass surface classes in `src/index.css`**

Add classes similar to:

```css
.portfolio-glass {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-shadow:
    0 24px 60px rgba(15, 23, 42, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18px);
}

.portfolio-glass-dark {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.48));
  border: 1px solid rgba(148, 163, 184, 0.22);
}
```

- [ ] **Step 2: Add motion-safe 3D utility classes**

Add utilities such as:

```css
.portfolio-tilt {
  transform-style: preserve-3d;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.portfolio-tilt:hover {
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.18);
}

.portfolio-glow-ring::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.35), rgba(168, 85, 247, 0.22), rgba(255, 255, 255, 0));
  opacity: 0.7;
  pointer-events: none;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

- [ ] **Step 3: Apply the new glass classes to key sections**

In `Portfolio.jsx`, replace flatter wrappers such as:

```jsx
className="rounded-[2rem] border border-white/80 bg-white/82 ..."
```

with combinations like:

```jsx
className="portfolio-glass portfolio-tilt relative rounded-[2rem] ..."
className="portfolio-glass-dark portfolio-tilt relative rounded-[2rem] ..."
```

Apply this selectively to:

- hero panels
- about summary cards
- technical focus cards
- project cards
- contact cards

- [ ] **Step 4: Commit**

Run:

```bash
git add src/index.css src/components/Portfolio.jsx
git commit -m "style: add futuristic glass visual system"
```

Expected: the page has a consistent glass-style surface language with tasteful depth.

## Task 3: Upgrade Technical Focus and Project Cards With Interactive Depth

**Files:**
- Modify: `src/components/Portfolio.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Convert technical-focus cards into elevated interactive modules**

Update the technical focus cards from plain static blocks to cards with richer structure:

```jsx
<article className="portfolio-glass portfolio-tilt portfolio-glow-ring relative rounded-[1.75rem] p-6">
  <div className="portfolio-icon-shell">{/* icon */}</div>
  <h3 className="mt-5 text-xl font-semibold text-slate-950">{section.title}</h3>
  <ul className="mt-5 space-y-4">{/* points */}</ul>
</article>
```

- [ ] **Step 2: Make the `EBPLS` feature panel feel like a futuristic case-study surface**

Refine the featured project wrapper to use:

```jsx
<article className="portfolio-glass-dark relative overflow-hidden rounded-[2rem] p-8 text-white">
  <div className="portfolio-orb portfolio-orb-a" />
  <div className="portfolio-orb portfolio-orb-b" />
  {/* featured project content */}
</article>
```

Keep these content requirements intact:

```jsx
projects[0].title === 'EBPLS'
projects[0].tech includes 'React', 'Next.js', 'Node.js', 'Express', 'Supabase'
```

- [ ] **Step 3: Give supporting project cards lighter 3D interaction without stealing focus**

Use a more restrained variant for supporting cards:

```jsx
className="portfolio-glass portfolio-tilt rounded-[1.75rem] ..."
```

Avoid applying the heaviest glow or the strongest perspective treatment to these cards.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css
git commit -m "feat: add interactive depth to stack and project cards"
```

Expected: cards feel more interactive and premium while `EBPLS` remains dominant.

## Task 4: Create a Futuristic Contact Finish Without Losing Hiring Clarity

**Files:**
- Modify: `src/components/Portfolio.jsx`
- Modify: `src/index.css`
- Verify: `src/App.css`

- [ ] **Step 1: Turn the contact section into a cohesive glass closing panel**

Refine the contact wrapper to use the same premium surface language:

```jsx
<section id="contact" className="...">
  <div className="portfolio-glass-dark relative overflow-hidden rounded-[2rem] p-8 text-white">
    {/* closing copy and contact cards */}
  </div>
</section>
```

- [ ] **Step 2: Improve contact-card hover feedback**

Update contact cards to include stronger but tasteful interaction:

```jsx
className="portfolio-contact-card portfolio-tilt rounded-[1.5rem] ..."
```

Back it with CSS such as:

```css
.portfolio-contact-card {
  transition: transform 220ms ease, border-color 220ms ease, background-color 220ms ease;
}

.portfolio-contact-card:hover {
  transform: translateY(-4px);
}
```

- [ ] **Step 3: Keep `src/App.css` minimal**

Verify `src/App.css` remains as small as:

```css
#root {
  min-height: 100vh;
}
```

Only add to it if absolutely necessary for app-level layout.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css src/App.css
git commit -m "style: finish futuristic interactive contact experience"
```

Expected: the close of the portfolio feels premium and cohesive without weakening the CTA.

## Task 5: Tune Motion, Mobile Behavior, and Reduced-Motion Fallbacks

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Add reduced-motion-safe fallbacks for all new transforms**

In `src/index.css`, ensure the existing media query disables heavy new effects:

```css
@media (prefers-reduced-motion: reduce) {
  .portfolio-tilt,
  .portfolio-hero-panel,
  .portfolio-float-card {
    transform: none !important;
  }
}
```

- [ ] **Step 2: Flatten heavy 3D effects on mobile**

Add mobile-targeted tuning such as:

```css
@media (max-width: 767px) {
  .portfolio-hero-stage {
    perspective: none;
  }

  .portfolio-float-card,
  .portfolio-tilt {
    transform: none !important;
  }
}
```

- [ ] **Step 3: Keep hover-dependent interactions non-blocking on touch devices**

Do not rely on hover as the only way to communicate important content. Ensure all content remains visible without interaction.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/index.css src/components/Portfolio.jsx
git commit -m "fix: tune futuristic motion for mobile and reduced motion"
```

Expected: the futuristic design still feels strong on desktop while staying usable on mobile and reduced-motion settings.

## Task 6: Verify Build, Lint, and Visual Safety

**Files:**
- Verify: `src/components/Portfolio.jsx`
- Verify: `src/index.css`
- Verify: `src/App.css`
- Verify: `src/App.jsx`
- Verify: `package.json`

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected:

```text
0 problems
```

- [ ] **Step 2: Run the production build**

Run:

```bash
cmd /c npm run build
```

Expected:

```text
vite v7.x building client environment for production...
? built in ...
```

If the sandbox blocks `esbuild` child-process spawning again, rerun the same command outside the sandbox.

- [ ] **Step 3: Manual visual review checklist**

Confirm:

```text
- Hero feels futuristic and more premium than the current professional version
- Headline and CTA remain readable
- Glass effects do not reduce contrast too far
- EBPLS still stands out as the main proof point
- Supporting cards feel interactive but secondary
- Mobile layout remains readable without awkward transforms
- Reduced-motion experience remains usable
```

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/Portfolio.jsx src/index.css src/App.css
git commit -m "chore: verify futuristic portfolio upgrade"
```

Expected: the futuristic upgrade is verified and ready for handoff.

## Self-Review

### Spec coverage

- Futuristic glass styling: covered by Tasks 1 and 2
- 3D and pointer-reactive interactions: covered by Tasks 1, 2, and 5
- `EBPLS` remains flagship with explicit stack: covered by Task 3
- Supporting projects remain secondary: covered by Task 3
- Cohesive futuristic contact finish: covered by Task 4
- Readability, professionalism, mobile usability, and reduced motion: covered by Tasks 5 and 6

### Placeholder scan

- No placeholders such as `TODO`, `TBD`, or “implement later” remain
- Commands and file paths are explicit
- Each visual area has concrete implementation guidance

### Type consistency

- `pointer`, `heroTilt`, `portfolio-glass`, `portfolio-glass-dark`, `portfolio-tilt`, and related classes are used consistently
- File paths match the actual repo structure
