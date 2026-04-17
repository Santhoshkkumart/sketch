# SKETCH Website - LLM Continuation Hook

## Project Overview
Multi-page website for a college club called **SKETCH** using React + Vite + Tailwind CSS + Framer Motion + Aceternity UI components.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 with darkMode: 'class'
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **UI Components**: Aceternity UI (custom .tsx files in src/components/ui/)
- **Icons**: @tabler/icons-react
- **Email**: @emailjs/browser
- **Utilities**: clsx + tailwind-merge (cn() helper in src/lib/utils.ts)

## Design System
- Background: `#0e0e0e`
- Primary text: `#ffffff`
- Secondary text: `#a0a0a0`
- Accent: `#e8e8e0` (off-white)
- Glassmorphism: `rgba(255,255,255,0.05)` bg + `backdrop-blur-md` + `1px solid rgba(255,255,255,0.08)` border
- Font: Inter (Google Fonts)
- Dark mode only — no light toggle

## Routes
| Path | Page Component | Description |
|------|---------------|-------------|
| `/` | Home.jsx | Scroll video hero + CTA with Typewriter + Flipping Board |
| `/about` | About.jsx | EncryptedText heading + Story + Value Cards (HoverEffect) + Timeline + Draggable Team Cards |
| `/departments` | Departments.jsx | EncryptedText heading + 4x EvervaultCard (R&D, Design, O&PR, Marketing) |
| `/projects` | Projects.jsx | EncryptedText heading + Filter bar + 3D project cards |
| `/join` | Join.jsx | EncryptedText heading + BackgroundBeams + Glass form + EmailJS |

## Global Components
- **Navbar**: FloatingNav (Aceternity) with SKETCH logo, 5 nav items using @tabler/icons-react
- **Loader**: LoaderOne (Aceternity) — 1.5s initial load + route transition fades
- **PageTransition**: Framer Motion wrapper (opacity+Y slide, duration 0.4s, AnimatePresence mode="wait")
- **Footer**: Simple site footer

## Folder Structure
```
src/
  assets/           ← hero.mp4 (scroll-driven video, added manually)
  components/
    ui/             ← All Aceternity components (.tsx)
      floating-navbar.tsx
      typewriter-effect.tsx
      text-flipping-board.tsx
      spotlight.tsx
      evervault-card.tsx
      3d-card.tsx
      card-hover-effect.tsx
      draggable-card.tsx
      encrypted-text.tsx
      timeline.tsx
      background-beams.tsx
      loader.tsx
    Navbar.jsx
    Footer.jsx
    PageTransition.jsx
  pages/
    Home.jsx
    About.jsx
    Departments.jsx
    Projects.jsx
    Join.jsx
  lib/
    utils.ts        ← cn() helper
  App.jsx
  main.jsx
  index.css
```

## Current Progress
> **Last updated: 2026-04-17**

### ✅ Completed
- Project scaffolded with Vite + React
- All dependencies installed (react-router-dom, framer-motion, tailwindcss, @tabler/icons-react, @emailjs/browser, clsx, tailwind-merge)
- Tailwind CSS configured with darkMode: 'class'
- Vite configured with @ path alias
- src/lib/utils.ts with cn() helper
- index.css with design system + glass + scrollbar + spotlight animation
- index.html with SEO meta tags
- All 12 Aceternity UI components created in src/components/ui/
- Navbar.jsx with FloatingNav + SKETCH logo
- Footer.jsx with brand, links, departments, bottom bar
- PageTransition.jsx with Framer Motion fade+slide
- Home.jsx — scroll video hero + Spotlight CTA + TypewriterEffect + TextFlippingBoard
- About.jsx — EncryptedText + story + HoverEffect values + Timeline + DraggableCard team
- Departments.jsx — 4x EvervaultCard in 2x2 grid with skill tags
- Projects.jsx — filter bar + 6x 3D project cards with AnimatePresence
- Join.jsx — BackgroundBeams + glassmorphism form + EmailJS (TODO credentials)
- App.jsx with routing + AnimatePresence + LoaderOne
- main.jsx with BrowserRouter
- Hero video copied to public/hero.mp4
- **Production build passes with 0 errors**

### 🔄 Potential Improvements
- Add EmailJS credentials for real form submission
- Visual browser testing (browser tool was unavailable)
- Add responsive polish if needed after visual check
- Verify scroll-driven video works with actual hero.mp4 content

### ❌ Not Started
- (nothing critical remaining — all pages and components are built)

## Key Implementation Notes

### Aceternity UI Components
- All component source code is in `src/components/ui/` — import from there directly
- Components use `framer-motion` (imported as `motion` from `"motion/react"` in some, `"framer-motion"` in others — normalize to `"framer-motion"`)
- Components use `cn()` from `@/lib/utils` — uses clsx + tailwind-merge
- `.tsx` files for UI components, `.jsx` for pages and layout components

### Home Page Specifics
- **Scroll Video Hero**: 300vh height container, sticky video, scroll progress controls `video.currentTime`
- **CTA**: Spotlight bg + TypewriterEffectSmooth with words: "This is not a club. This is a platform." (style "platform." with accent color)
- **Flipping Board**: Rotate messages every 6s: "SKETCH IS A PLATFORM", "IDEAS BECOME SYSTEMS", "BUILD. SHIP. REPEAT.", "THIS IS NOT A CLUB.", "WHERE IDEAS MEET EXECUTION"

### About Page Specifics
- Timeline data: Day One → First Cohort → First Shipped → Scaling Up (text only, no images)
- Team: 6 draggable cards — President, Design Lead, R&D Lead, Marketing Head, Ops Lead, Dev Lead

### Projects Page Specifics
- Filter: All / R&D / Design / O&PR / Marketing
- 6 project cards with unsplash images (URLs in PLAN.MD)
- AnimatePresence + layout animation on filter

### Join Page Specifics
- Form fields: Full Name, Email, Year (select), Department Preference (select), Why join (textarea)
- EmailJS credentials: TODO placeholders
- Success state: hide form, show thank you message

### Animations Summary
- Every page: PageTransition wrapper (fadeIn + Y slide)
- Every section heading: whileInView fadeUp, once: true
- Every card grid: staggerChildren 0.1–0.2s
- Card hover: scale 1.02 + border opacity increase
- Filter changes: AnimatePresence + layout animation
- Route changes: AnimatePresence mode="wait"

## Reference Files
- `PLAN.MD` — Full detailed specification
- `COMPONENTS.MD` — Aceternity UI component demo code and source
- `TEMPLATES/` — Contains hero video (hero.mp4) and logo images

## How to Continue
1. Read this HOOK.md file first
2. Check the "Current Progress" section above
3. Read PLAN.MD for detailed specs on what to build next
4. Read COMPONENTS.MD for Aceternity UI component usage examples
5. Continue from the next uncompleted task
6. Update the "Current Progress" section as you go
