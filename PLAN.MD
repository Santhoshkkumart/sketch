Build a multi-page website for a college club called SKETCH using React + Vite + Tailwind CSS + Framer Motion + React Router DOM.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Background: #0e0e0e
- Primary text: #ffffff
- Secondary text: #a0a0a0
- Accent: #e8e8e0 (off-white)
- Glassmorphism: background rgba(255,255,255,0.05), backdrop-blur-md, border 1px solid rgba(255,255,255,0.08)
- Sketch aesthetic: thin 1px rgba(255,255,255,0.1) divider lines between sections
- Font: Inter (import from Google Fonts)
- All pages dark mode only — no light mode toggle needed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/
  assets/
    hero.mp4              ← scroll-driven video
  components/
    ui/                   ← all Aceternity UI components go here
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
    utils.ts              ← cn() helper for Aceternity components
  App.jsx
  main.jsx
  index.css

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPENDENCIES TO INSTALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm install react-router-dom framer-motion @emailjs/browser
npm install clsx tailwind-merge
npm install @tabler/icons-react
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGES & ROUTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/ → Home
/about → About
/departments → Departments
/projects → Projects
/join → Join Us

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL — NAVBAR (All Pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use Aceternity FloatingNav component from /components/ui/floating-navbar.tsx

Nav items with @tabler/icons-react icons:
- Home (/) — IconHome
- About (/about) — IconUser
- Departments (/departments) — IconLayoutGrid
- Projects (/projects) — IconCode
- Join Us (/join) — IconPencil

Logo "SKETCH" top-left in white, fixed position, outside FloatingNav
FloatingNav floats centered at top, appears on scroll up

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL — LOADER (All Pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use Aceternity LoaderOne from /components/ui/loader.tsx

- Show on initial app load for 1.5 seconds
- Also show between route transitions via AnimatePresence
- Fade out with Framer Motion opacity transition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL — PAGE TRANSITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Wrap every page in PageTransition.jsx:
- Framer Motion: initial opacity 0 + y 20, animate opacity 1 + y 0
- Exit: opacity 0 + y -20
- Duration: 0.4s ease
- Use AnimatePresence in App.jsx with mode="wait"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOME PAGE (/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Scroll Video Hero
- Outer div: height 300vh, position relative
- Inner video: position sticky, top 0, height 100vh, width 100%, object-fit cover
- Video src: /src/assets/hero.mp4
- NO autoplay, NO controls, NO loop
- On scroll: calculate progress = scrollY / (scrollHeight - windowHeight)
- Set video.currentTime = progress * video.duration
- Use useEffect + useRef for scroll listener
- Overlay: subtle dark gradient at bottom of video

SECTION 2 — CTA (after video section)
Wrap with Aceternity Spotlight component (fill="white")

Use Aceternity TypewriterEffectSmooth:
- Words array: ["This", "is", "not", "a", "club.", "This", "is", "a", "platform."]
- Style "platform." with className: "text-[#e8e8e0]"
- Below typewriter: subtext "SKETCH — where ideas become systems." in text-neutral-400
- Button: "Join Us" → /join
  - Style: border border-white/30 bg-transparent text-white px-8 py-3 rounded-full
  - Hover: bg-white text-black transition-all
- Wrap section in Framer Motion fadeInUp (initial y:40 opacity:0, whileInView y:0 opacity:1)

SECTION 3 — Flipping Board
Use Aceternity TextFlippingBoard:
- Rotating messages every 6 seconds:
  "SKETCH IS A PLATFORM"
  "IDEAS BECOME SYSTEMS"
  "BUILD. SHIP. REPEAT."
  "THIS IS NOT A CLUB."
  "WHERE IDEAS MEET EXECUTION"
- Place below CTA with 80px vertical gap
- Framer Motion whileInView fade-in

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT PAGE (/about)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Heading
Use Aceternity EncryptedText:
- text="We started with an idea."
- encryptedClassName="text-neutral-500"
- revealedClassName="text-white text-4xl font-bold"
- Triggers on page load

SECTION 2 — Story
Plain paragraph (3-4 lines):
"SKETCH is a college club that runs like a platform. We believe ideas deserve more than just conversations — they deserve execution. Across four departments, we research, design, operate, and grow. This is where students become builders."

Thin 1px rgba(255,255,255,0.1) divider below paragraph

SECTION 3 — Value Cards
Use Aceternity CardHoverEffect:
- 3 items:
  { title: "Collaborate", description: "Work across departments, share ideas, and build together.", link: "#" }
  { title: "Build", description: "Ship real projects. Turn concepts into systems.", link: "#" }
  { title: "Grow", description: "Develop skills, find your domain, and grow with the club.", link: "#" }
- Framer Motion staggerChildren 0.15s whileInView

SECTION 4 — Timeline
Use Aceternity Timeline component:
- Data:
  { title: "Day One", content: "SKETCH was founded with one question: what if a college club ran like a startup?" }
  { title: "First Cohort", content: "20 members. 4 departments. One shared mission to build something real." }
  { title: "First Shipped", content: "Our first internal project went live. Design met engineering met marketing." }
  { title: "Scaling Up", content: "New members. Bigger projects. SKETCH is becoming the platform we always imagined." }
- Text only, no images needed

SECTION 5 — Team
Use Aceternity DraggableCardDemo:
- 6 placeholder member cards
- Each card: solid color background (use Tailwind bg colors), member name + role text
- Roles: President, Design Lead, R&D Lead, Marketing Head, Ops Lead, Dev Lead
- Background text: "The people behind the platform."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPARTMENTS PAGE (/departments)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Heading
Use Aceternity EncryptedText:
- text="Our Departments"
- Same style as About heading

SECTION 2 — Department Cards
Use Aceternity EvervaultCard (4 cards in 2x2 grid):

Card 1 — R&D
- EvervaultCard text="R&D"
- Below card: "Research, prototyping, and emerging tech"
- Skills tags: ML · Prototyping · Research

Card 2 — Design
- EvervaultCard text="Design"
- Below card: "Visual identity, UI/UX, and motion design"
- Skills tags: Figma · Branding · Motion

Card 3 — O & PR
- EvervaultCard text="O & PR"
- Below card: "Operations, events, and public relations"
- Skills tags: Events · Outreach · Communication

Card 4 — Marketing
- EvervaultCard text="Marketing"
- Below card: "Growth strategy, content, and analytics"
- Skills tags: Social Media · Content · Analytics

Each card wrapper:
- border border-white/[0.2] relative h-[30rem]
- Include all 4 corner Icon components as shown in EvervaultCard demo
- Skills tags: small rounded-full pills, border border-white/20 text-neutral-400 text-xs px-3 py-1
- Framer Motion staggered entrance: staggerChildren 0.2s whileInView

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECTS PAGE (/projects)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Heading
Use Aceternity EncryptedText:
- text="What We Build"

SECTION 2 — Filter Bar
- Buttons: All / R&D / Design / O&PR / Marketing
- Active: border-white text-white
- Inactive: border-white/20 text-neutral-500
- Style: rounded-full border px-5 py-2 text-sm transition-all
- React useState for active filter
- Framer Motion layout animation on filter change

SECTION 3 — Project Cards
Use Aceternity ThreeDCard (3D Card) — one per project:

Project data:
[
  { title: "Brand Identity System", dept: "Design", desc: "Complete visual language and brand guidelines for SKETCH.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500" },
  { title: "Internal Task Manager", dept: "R&D", desc: "A productivity tool built in-house for club operations.", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500" },
  { title: "Freshers Campaign", dept: "Marketing", desc: "Social media onboarding campaign for new recruits.", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500" },
  { title: "Club OS Dashboard", dept: "R&D", desc: "Internal ops dashboard for tracking club performance.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500" },
  { title: "Event Identity Pack", dept: "Design", desc: "Visual kit and motion assets for club events.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500" },
  { title: "Growth Analytics", dept: "Marketing", desc: "Member growth tracking and engagement reporting system.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500" }
]

Each 3D card:
- CardItem translateZ=50: project title (text-white font-bold)
- CardItem translateZ=60: department tag (small pill, off-white border)
- CardItem translateZ=100: project image (h-48 w-full object-cover rounded-xl)
- CardItem translateZ=20: "View →" button (bottom right)
- Dark card background: bg-[#111111] border border-white/[0.1]

Filter logic: filter cards array by dept using React useState
Framer Motion AnimatePresence on filtered list with layout prop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOIN PAGE (/join)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Heading
Use Aceternity EncryptedText:
- text="Be Part of SKETCH"

SECTION 2 — Full page background
Use Aceternity BackgroundBeams
- Wrap entire page content with BackgroundBeams component
- Base: bg-neutral-950

SECTION 3 — Form
Glassmorphism container on top of BackgroundBeams:
- background rgba(255,255,255,0.04)
- backdrop-blur-md
- border 1px solid rgba(255,255,255,0.08)
- border-radius 16px
- padding 48px
- max-width 560px, mx-auto

Form fields:
- Full Name (text input)
- Email (email input)
- Year (select: 1st Year / 2nd Year / 3rd Year / 4th Year)
- Department Preference (select: R&D / Design / O & PR / Marketing)
- Why do you want to join (textarea, 4 rows)

Input styles:
- bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full
- focus: border-white/40 outline-none ring-0
- placeholder: text-neutral-600

Submit button:
- Full width, border border-white/30 bg-transparent text-white
- Hover: bg-white text-black transition-all
- Text: "Send Application"

EmailJS integration:
// TODO: Replace with your actual EmailJS credentials
// SERVICE_ID: "your_service_id"
// TEMPLATE_ID: "your_template_id"  
// PUBLIC_KEY: "your_public_key"
import emailjs from '@emailjs/browser'
Use emailjs.sendForm() on submit

Success state:
- Hide form, show thank you message with Framer Motion fadeIn
- "Application received. We'll be in touch." in text-white
- Small subtext in text-neutral-400

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATIONS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Every page: PageTransition wrapper (fadeIn + Y slide)
- Every section heading: whileInView fadeUp, once: true
- Every card grid: staggerChildren 0.1–0.2s
- Card hover: scale 1.02 + border opacity increase
- Filter changes: AnimatePresence + layout animation
- Route changes: AnimatePresence mode="wait" in App.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT NOTES FOR CLAUDE CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. All Aceternity UI component source files are in /components/ui/ — import from there directly
2. Create /src/lib/utils.ts with the cn() helper: import { clsx } from 'clsx'; import { twMerge } from 'tailwind-merge'; export function cn(...inputs) { return twMerge(clsx(inputs)) }
3. hero.mp4 will be added manually to /src/assets/ after setup — build the scroll logic assuming the file exists
4. All pages must be fully mobile responsive
5. Deploy ready for Vercel with zero config — ensure vite.config.js has no custom base path
6. No TypeScript errors — use .jsx for pages/components, .tsx only for Aceternity UI components
7. tailwind.config.js must include darkMode: 'class' and content paths for all src files