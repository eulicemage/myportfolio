# Portfolio Redesign Design Spec

Date: 2026-04-04
Project: `myportfolio`
Topic: Creative product-style portfolio redesign for software developer positioning

## Goal

Redesign the portfolio into a creative, interactive web experience that feels memorable to employers while staying credible for a fresh graduate software developer.

The site should:

- Present the owner primarily as a software developer
- Feel visually bold and interactive rather than template-like
- Highlight real project work instead of self-scored expertise
- Feature `EBPLS` as the flagship case study
- Emphasize that `EBPLS` is an LGU-oriented system built with React, Next.js, Node/Express, and Supabase
- Improve the likelihood that employers contact the owner for interviews or junior developer roles

## Audience

Primary audience:

- Employers
- Recruiters
- Technical interviewers
- Hiring managers reviewing junior candidates

Secondary audience:

- Potential collaborators
- Internship or freelance leads

## Positioning

The portfolio should position the owner as:

- A software developer with strong design taste
- A fresh graduate with real project-building experience
- Someone who can build usable, modern, full-stack systems
- A candidate with upside, initiative, and practical delivery ability

The site should avoid pretending to be senior-level or overly corporate. It should communicate confidence, curiosity, and execution.

## Creative Direction

Recommended direction: `Creative Product Showcase`

### Visual principles

- Strong first impression through a high-impact hero
- Intentional, product-like motion rather than decorative animation overload
- Rich visual depth through gradients, surfaces, layered cards, and contrast
- Premium typography and spacing
- Clear hierarchy so recruiters can still scan quickly

### Tone

- Creative
- Interactive
- Modern
- Professional enough for employers
- Ambitious but honest

## Information Architecture

The page should be reorganized into these sections:

1. Hero
2. Quick proof / credibility strip
3. About / developer value proposition
4. Selected stack and capabilities
5. Featured projects
6. Flagship `EBPLS` case study
7. Supporting project showcase
8. Contact / call to action

## Section Design

## 1. Hero

Purpose:

- Make a strong first impression
- Clearly state role identity
- Show energy and technical personality

Content direction:

- Headline centered on `Software Developer`
- Short supporting line about building real systems and interactive web experiences
- Primary CTA leading to projects
- Secondary CTA leading to contact
- Ambient visual effects that feel premium and alive

Behavior:

- Motion on load
- Responsive layered composition
- Immediate readability on mobile and desktop

## 2. Quick Proof / Credibility Strip

Purpose:

- Replace vague trust-building with fast, scannable signals

Content examples:

- Full-stack projects built
- Web technologies used
- LGU-oriented project experience
- Frontend to backend delivery

This section should feel compact and confident, not inflated.

## 3. About / Value Proposition

Purpose:

- Explain who the owner is in practical hiring terms

Content direction:

- Short narrative about being a fresh graduate software developer
- Emphasis on building usable systems, learning fast, and shipping complete experiences
- Mention interest in contributing to real teams and real products

This section should be concise and more employer-facing than autobiographical.

## 4. Stack and Capabilities

Purpose:

- Show technical breadth without using arbitrary percentage bars

Replace the current self-rated skill meters with grouped capability blocks such as:

- Frontend: React, Next.js, JavaScript, Tailwind CSS
- Backend: Node.js, Express, API development
- Data: Supabase, Firebase, MySQL
- Workflow: GitHub, Figma, responsive UI implementation

Presentation style:

- Clean cards or modular chips
- Short, applied wording
- Visual cues tied to actual project usage

## 5. Featured Projects

Purpose:

- Present work as curated case studies, not equal-weight thumbnails

Design direction:

- One project should clearly feel primary
- Supporting projects should still look polished but secondary
- Each project should foreground problem, build, stack, and user value

## 6. Flagship `EBPLS` Case Study

Purpose:

- Anchor the portfolio with the strongest, most hireable project story

Positioning:

- `EBPLS` should be presented as an LGU-oriented system
- It should signal real-world workflow relevance rather than a student-only demo

Required content:

- Project name and strong subtitle
- Short explanation of the permit or business workflow being digitized
- Why it matters in an LGU context
- Stack callout: React, Next.js, Node/Express, Supabase
- Visual breakdown of architecture or system areas if supported by available content

Suggested proof structure:

- Problem
- Solution
- Stack
- Role / contribution
- Key interface or workflow highlights

If quantitative outcomes are not available, do not invent them. Use truthful qualitative framing instead.

## 7. Supporting Projects

Purpose:

- Show range while keeping the page focused

Existing projects such as merchandise, fitness, and other web work can remain, but the presentation should:

- Reduce repetition
- Improve card hierarchy
- Use stronger summaries
- Show variety across platforms and problem types

## 8. Contact / Conversion

Purpose:

- Make it easy for employers to take the next step

Content direction:

- Clear invitation to discuss roles or collaboration
- Email and LinkedIn visibly accessible
- Contact form can remain if polished, but direct contact options should be primary
- Closing copy should reinforce readiness to contribute as a software developer

## UX Requirements

- Strong visual identity without sacrificing readability
- Smooth navigation between sections
- Improved scanability for recruiters
- Better mobile spacing and section rhythm
- Fewer template-like patterns
- Animation should support hierarchy and delight, not distract from content

## Content Strategy

The redesigned portfolio should shift from:

- self-rating
- generic titles
- animation-first presentation

Toward:

- proof-driven storytelling
- stronger role framing
- real-world project credibility
- focused calls to action

## Accessibility and Quality

The redesign should preserve or improve:

- semantic structure
- keyboard-accessible navigation
- readable color contrast
- alt text for project imagery
- reduced-motion tolerance where practical
- mobile responsiveness

## Implementation Scope

In scope:

- Rework visual system
- Rewrite core copy
- Replace current skills presentation
- Reorganize projects hierarchy
- Add `EBPLS` project
- Improve employer-focused CTA flow
- Refine animations and responsiveness

Out of scope for this pass:

- CMS or admin editing workflow
- Backend contact form service integration beyond current placeholder behavior
- Full multi-page conversion unless needed to support the chosen design

## Risks and Guardrails

Risks:

- Over-design could reduce recruiter clarity
- Excessive motion could feel gimmicky
- Unverified claims could hurt credibility

Guardrails:

- Keep content truthful and specific
- Make `Software Developer` the clear identity
- Use creativity to frame proof, not replace it
- Keep `EBPLS` as the flagship proof point

## Success Criteria

The redesign succeeds if:

- The portfolio feels distinct within a few seconds
- Employers can quickly understand the role and strengths
- `EBPLS` stands out as the strongest real-world project
- The site feels credible for a fresh graduate
- The overall UX is noticeably more polished, modern, and memorable
