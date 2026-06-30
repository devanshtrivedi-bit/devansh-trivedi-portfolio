# Devansh Trivedi — Glassmorphism Interactive Portfolio

A premium, modern developer portfolio built with a soft, elegant glassmorphism aesthetic. It features an interactive intro sequence, ambient background soundtracks, 3D graphics integration, dynamic parallax motion elements, and a fully custom profile editor.

🔗 **Live Website URL:** [https://devansh-trivedi.vercel.app](https://devansh-trivedi.vercel.app)

---

## ✨ Features

- **Cinematic Welcome Screen:** An introductory landing card with a loading bar and staggered interactive click-to-enter music gate.
- **Glass Bubble Wave Transitions:** A staggered transition wave of 22 rapid glassmorphic bubbles masking the loading timeline, paired with a smooth portal scale, slide-up, and de-blur animation onto the main dashboard.
- **Continuous Ambient Motion:** Slowly rising background glass orbs combined with horizontally flowing wind waves (`windCurrents` sways) that float behind dashboard panels.
- **3D Spline Scene:** Rich glassmorphic elements blending on top of a dynamic 3D Spline workspace background.
- **Interactive Profile Editor (WhatsApp/Instagram style):**
  - Interactive upload of custom photos cached securely in `localStorage`.
  - Drag-and-pan movement (Left, Right, Up, Down) mapped precisely to mouse coordinates.
  - Zoom slider scaling up to 3x.
  - Dedicated **"CROP MODE"** editing state that locks position and hides controllers once **"DONE"** is clicked.
- **Glassmorphic HUD Navigation:** Overhauled sidebar navigations, project cards, credentials timelines, and contact consoles styled with frosted-glass transparencies, blur layers, and soft borders.
- **Ambient Lofi Sound:** Built-in loop audio control with a global volume mute/unmute toggle.

---

## 🛠️ Technology Stack

- **Framework:** React + TypeScript (Vite)
- **Styling:** Vanilla CSS (Tailwind CSS for utility setup)
- **Animations:** Framer Motion (for physics-based sweeps, scales, and sways)
- **3D Scenes:** `@splinetool/react-spline`
- **Icons:** Lucide React
- **Hosting:** Vercel

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devanshtrivedi-bit/devansh-trivedi-portfolio.git
   cd devansh-trivedi-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```
