# Context for Claude Code

Hello Claude! This file contains the context for the **Frankie and Henry V2** project. The user's wife is taking over development of this project on her Macbook Pro and will be relying on you to help her build and manage it. Please read this context carefully to understand the design system, technical stack, and architecture decisions made so far to ensure consistency.

## Project Description
Frankie and Henry V2 is an interactive website featuring the adventures of Frankie (a terrier) and Henry (a spaniel) on a magical safari. The site is designed for children ages 4-8 and includes storytelling elements, a "Rescue Run" game, and interactive character cards.

## Tech Stack
- **Framework:** React
- **Build Tool:** Vite
- **Icons:** Lucide-React
- **Styling:** Custom Vanilla CSS with a focus on "Claymorphism" and CSS variables.
- **Node runtime:** Designed for local Node.js environments (Vite development server).

## Core Features & Architecture
- **Safari Heroes (`src/components/SafariHeroes.jsx`):** Interactive character cards for Frankie, Henry, and other safari characters.
- **Rescue Run Game (`src/components/Game.jsx`):** A maze-based game where players help characters navigate obstacles.
- **Storytelling (`src/components/Story.jsx`):** Interactive sections detailing the adventures of the duo.
- **Freebies / Extras (`src/components/Extras.jsx`):** Downloadable or interactive "freebies" for fans.
- **Main Layout (`src/App.jsx`):** Main application wrapper and layout.
- **Global Styles (`src/index.css`):** Global styles and design system variables.

## Claymorphism Design System
The visual aesthetic of this project is highly stylized using a "Claymorphism" design system. It is characterized by a soft, tactile, toy-like aesthetic that appeals to children.

### Typography
- **Headings:** 'Fredoka', sans-serif (Bold, rounded).
- **Body:** 'Nunito', sans-serif.

### Color Palette
The primary brand colors must be vibrant and warm:
- **Primary:** Vibrant Rose (`#E11D48`) and Amazon-like Yellow (`#FFD200`).
- **Backgrounds:** Warm White (`#FFF1F2`) or Sky Blue (`#F0F9FF`).
- **Accent Colors:** Blue (`#0EA5E9`), Green (`#4ADE80`), Teal (`#14B8A6`).

### CSS Classes & Patterns
- **`.clay-card`:** Applies the claymorphic shadow and border to cards.
- **`.clay-btn`:** Custom button style for a tactile feel.
- **Borders:** Thick, often 3px or more (e.g., `--border-clay: 3px solid #F4F4F5`).
- **Shadows:** Double shadows (outer for depth, inner for a "clay" or puffed look). Example: `8px 8px 16px rgba(136, 19, 55, 0.08), inset 2px 2px 4px rgba(255, 255, 255, 1)`.
- **Corners:** Large border radii (e.g., `--radius-lg: 32px`, `--radius-xl: 48px`).

## Setup Commands (macOS/Terminal)
- To install dependencies: `npm install`
- To run the development server: `npm run dev` (Runs Vite on `localhost:5173` or `5174`)
- To build for production: `npm run build`

Please ensure all future code additions respect this Claymorphic design system and file structure!
