# Cinematic Scroll Portfolio Design Spec

Date: 2026-04-04
Project: `myportfolio`
Topic: Cinematic whole-page 3D scroll motion upgrade

## Goal

Enhance the current futuristic portfolio with a premium cinematic scroll system that adds stronger 3D depth across the whole page while preserving readability, hierarchy, and professional presentation.

The upgrade should:

- Add dramatic but controlled scroll-based 3D motion
- Make the whole page feel more immersive and high-end
- Keep the strongest motion emphasis on the hero and featured `EBPLS` section
- Use lighter motion on supporting sections to preserve hierarchy
- Keep desktop motion rich, tablet motion lighter, and mobile motion minimal
- Fully respect reduced-motion preferences

## Audience

Primary audience:

- Employers
- Hiring managers
- Recruiters
- Technical interviewers

Secondary audience:

- Designers and developers reviewing front-end quality
- Collaborators and clients

## Positioning

The portfolio should continue to present the owner as:

- A software developer
- A fresh graduate with strong front-end instincts
- Someone capable of building polished and technically thoughtful web experiences

The new motion system should support that positioning rather than distract from it.

## Creative Direction

Selected direction: `Full Cinematic Scroll`

### Visual principles

- Stronger 3D depth across the page
- Scroll-driven movement with layered perspective
- Richer atmosphere through drifting glows, grid layers, and panel movement
- Controlled motion hierarchy so important content remains dominant
- Premium and intentional, not chaotic

### Tone

- Cinematic
- Futuristic
- Premium
- Immersive
- Professional

## Motion System

## 1. Whole-Page 3D Space

Purpose:

- Make the site feel like it exists in a shallow 3D environment

Design direction:

- Background glows, grid layers, and surface wrappers should move at different speeds on scroll
- The page should feel spatial rather than flat
- Depth should be noticeable, but text content should remain anchored and readable

## 2. Hero Motion

Purpose:

- Make the first screen the strongest cinematic moment

Design direction:

- Hero layers should shift with scroll and perspective
- Floating glass cards can compress, drift, or subtly rotate as the page moves
- The hero remains the most dramatic use of depth

## 3. Featured Project Motion

Purpose:

- Reinforce `EBPLS` as the most important proof point

Design direction:

- The featured project panel should feel like it rises forward slightly on scroll
- Supporting layers inside the featured panel can move at different rates
- The effect should feel premium and case-study-like, not distracting

## 4. Supporting Section Motion

Purpose:

- Extend the cinematic system across the page without flattening hierarchy

Design direction:

- About, technical focus, supporting projects, and contact should use lighter 3D movement
- Cards can shift subtly in perspective or vertical depth as they enter view
- Supporting content should never compete visually with the hero and featured project

## Interaction and Scroll Requirements

- Motion should be scroll-driven, not constant idle animation
- Large atmospheric layers can drift independently of content
- Section wrappers can use subtle translate, scale, or perspective adjustments based on scroll position
- Motion should be clamped so it never becomes jumpy or excessive

## Responsive Behavior

- Desktop: full cinematic effect
- Tablet: reduced depth and reduced transform intensity
- Mobile: near-flat layout with only light reveal motion
- Reduced motion: disable cinematic scroll transforms and preserve content clarity

## Accessibility and Quality

The upgrade should preserve or improve:

- semantic structure
- readable text against moving backgrounds
- reduced-motion handling
- predictable section navigation
- mobile usability
- strong visual hierarchy

## Implementation Scope

In scope:

- Add scroll-based transform system for key visual layers
- Enhance hero and featured project with stronger scroll depth
- Add lighter section motion across the page
- Tune motion per device size
- Maintain the existing futuristic visual system

Out of scope:

- Rewriting content structure again
- Adding heavy external animation libraries unless necessary
- Breaking readability for visual spectacle

## Risks and Guardrails

Risks:

- Too much motion can feel chaotic
- Heavy transforms can reduce performance on weaker devices
- Supporting sections can become visually too competitive

Guardrails:

- Hero and featured project get the strongest effects
- Supporting sections stay more restrained
- Clamp all transform ranges carefully
- Flatten motion on mobile
- Respect reduced-motion settings fully

## Success Criteria

The upgrade succeeds if:

- The portfolio feels more cinematic and immersive while scrolling
- The strongest 3D emphasis remains on the hero and `EBPLS`
- Supporting sections still feel premium but secondary
- The page remains readable and professional
- Mobile and reduced-motion experiences remain usable and controlled
