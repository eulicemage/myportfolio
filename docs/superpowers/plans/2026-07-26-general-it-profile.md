# General IT Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present the portfolio owner as a general IT professional with both software and hardware support experience.

**Architecture:** Keep the current single-component portfolio structure. Update the shared hero signals and the existing Hero, About, and Contact content in `Portfolio.jsx`; no data model, route, or styling changes are required.

**Tech Stack:** React 19, Vite, lucide-react, ESLint.

---

### Task 1: Generalize Portfolio Positioning

**Files:**
- Modify: `src/components/Portfolio.jsx:19-23`
- Modify: `src/components/Portfolio.jsx:552-555`
- Modify: `src/components/Portfolio.jsx:600-620`
- Modify: `src/components/Portfolio.jsx:782-793`
- Test: production Vite build

- [ ] **Step 1: Update the hero signal and introductory copy**

Replace the focus signal and hero paragraph with general IT wording:

```jsx
{ label: 'Focus', value: 'Software, Hardware & IT Support' },

An IT professional with hands-on experience in software development, hardware support, and on-call technical troubleshooting. I help customers resolve practical software and device issues while building dependable digital solutions.
```

- [ ] **Step 2: Add freelance IT Technician experience in About**

Replace the About heading and paragraphs, then add this item to the existing right-hand item array:

```jsx
{ label: 'Freelance IT Technician', val: 'On-call customer support', sub: 'Software, hardware, setup & maintenance' },
```

Use the following About content:

```jsx
Building practical IT solutions with a clear technical foundation.

My portfolio reflects hands-on IT experience across software development, hardware support, and customer troubleshooting. Alongside building web and mobile systems, I work as a freelance IT Technician providing on-call help with software issues, hardware concerns, device setup, maintenance, and practical technical support.

I am ready to contribute in IT Associate, Junior System Administrator, technical support, and other IT-related roles where I can solve problems, keep learning, and help people use technology with confidence.
```

- [ ] **Step 3: Update contact messaging for general IT roles**

Replace the contact heading and lead paragraph:

```jsx
Open to IT Associate, Junior System Administrator, technical support, and other IT-related roles.

If you need an IT professional who can support users, troubleshoot software and hardware issues, and contribute to dependable digital systems, I'd be glad to connect. Let's solve practical problems together.
```

- [ ] **Step 4: Run ESLint**

Run: `npm run lint`

Expected: ESLint completes with no errors.

- [ ] **Step 5: Run the production build**

Run: `npm run build`

Expected: Vite completes successfully and writes the production assets to `dist`.

- [ ] **Step 6: Review the final diff**

Run: `git diff -- src/components/Portfolio.jsx`

Expected: The diff only contains the approved positioning and experience text changes.
