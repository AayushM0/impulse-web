# IMPULSE - Ideas in Motion

The official web application for IMPULSE, a community and accelerator platform for AI builders, systems engineers, and technical founders. 

The site features interactive WebGL graphics via Three.js, momentum virtual scrolling via Lenis synchronized with GSAP ScrollTrigger, and route-level code splitting using React 18 and React Router DOM.

---

## Key Features

- **3D Starburst Origin Hero**: Interactive WebGL scene featuring dynamic particle fields and responsive cursor tilt.
- **Synchronized Scroll Choreography**: Seamless integration between Lenis smooth scrolling and pinned GSAP ScrollTrigger timelines.
- **Builder Cohort Hub (`/cohort`)**: Five-month builder acceleration track, stage milestones, and project showcases.
- **Community Directory (`/community`)**: Interactive builder roster, discipline breakdown, and team directories.
- **Events and Hackathons (`/events`)**: Directory of upcoming hackathons, AI labs, and builder sprints.
- **Shark Hack Flagship (`/shark-hack`)**: Dedicated interface for the flagship Delhi hackathon and deal room showcase.
- **Membership Intake (`/join`)**: Application intake interface for new cohort candidates and community builders.

---

## Tech Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Framework | React | ^18.3.1 | Core UI component tree and state management |
| Language | TypeScript | ^5.5.3 | Static typing, interface definitions, compiler safety |
| Build Tool | Vite | ^5.4.2 | Development server with HMR and production bundling |
| Styling | Tailwind CSS | ^3.4.1 | Utility-first styling with custom theme tokens |
| 3D Graphics | Three.js | ^0.186.0 | WebGL canvas, particle fields, and lighting |
| Animation | GSAP / @gsap/react | ^3.15.0 | Pinned timelines and scrubbed scroll interactions |
| Smooth Scroll | Lenis | ^1.3.26 | Virtual momentum scroll tied to the GSAP animation ticker |
| Routing | React Router DOM | ^7.18.2 | Client-side routing and navigation lifecycle |
| Icons | Lucide React | ^0.446.0 | Vector iconography |

---

## Getting Started

### Prerequisites

- Node.js: version 20.x or higher
- npm: version 10.x or higher
- Git: version 2.40 or higher

### Installation

1. Navigate to the project root:
   ```bash
   cd impulse_website-main/impulse_website-main
   ```

2. Install dependencies using the lockfile:
   ```bash
   npm ci
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The local application will be available at `http://localhost:5173/`.

---

## Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement.
- `npm run build`: Compiles TypeScript and creates optimized production bundles in `dist/`.
- `npm run typecheck`: Runs `tsc --noEmit` to verify type safety across the application.
- `npm run preview`: Serves the production build locally for verification.
- `npm run lint`: Executes ESLint across the codebase.

---

## Project Structure

```
impulse_website-main/
├── docs/                 # Architecture, onboarding, and roadmap guides
├── public/               # Static assets, images, and favicons
├── src/
│   ├── components/       # Reusable UI components, 3D scenes, navigation
│   │   └── 3d/           # Three.js canvas implementations and 3D card tilt
│   ├── data/             # Centralized application content (content.ts)
│   ├── hooks/            # Custom hooks for scroll and reveal observers
│   ├── pages/            # Top-level route pages (Home, Cohort, Events, etc.)
│   ├── providers/        # Context providers (SmoothScrollProvider)
│   ├── sections/         # Composable section components for the homepage
│   ├── App.tsx           # Route declarations, page titles, and provider setup
│   ├── index.css         # Global Tailwind layers and custom keyframes
│   └── main.tsx          # Application entry point with React StrictMode
├── unused/               # Archived components and decommissioned pages
└── vite.config.ts        # Vite configuration, alias setup, and bundle chunking
```

---

## Architecture and Guidelines

- **Centralized Data**: All site copy, events, projects, and navigation links reside in `src/data/content.ts`. Update content there rather than hardcoding in components.
- **Smooth Scroll Integration**: Lenis controls vertical scroll kinematics. Never call native `window.scrollTo` without checking `getLenis()`, as doing so disrupts the GSAP animation ticker.
- **Developer Onboarding**: Refer to `docs/ONBOARDING.md` for in-depth architecture notes, task runbooks, and debugging guides.
