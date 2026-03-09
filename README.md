# Belleville Dental

A modern, responsive dental website built with React, TypeScript, and Vite. This application provides information on dental services, research, education, products, and contact details for Belleville Dental Center.

## Features

- **Home Page**: Overview of services and welcome content.
- **Professional & Patient Education**: Educational resources and guides.
- **Research**: Latest dental research articles and educational videos.
- **Products**: Dental products with shopping cart functionality.
- **About Us**: Information about the dental center.
- **Contact**: Contact form, office details, and embedded map.
- **Booking**: Appointment booking page.
- **Cart System**: Add products to cart, manage quantities, and checkout simulation with animations.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Animations**: Smooth GSAP animations for enhanced user experience.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Routing**: React Router
- **Forms**: Formspree for contact form submissions
- **Data**: JSON files for static data (products, research, education)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd belleville-dental
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Cart.tsx          # Shopping cart component with animations
│   └── Layout.tsx        # Main layout wrapper
├── pages/
│   ├── Home.tsx          # Home page
│   ├── Research.tsx      # Research and video library
│   ├── Contact.tsx       # Contact form and info
│   ├── Book.tsx          # Appointment booking
│   └── ...               # Other pages
├── hooks/
│   ├── cartStore.ts      # Zustand store for cart state
│   └── ...               # Other custom hooks
├── data/
│   ├── products.json     # Product data
│   ├── research.json     # Research articles and videos
│   └── education.json    # Education content
├── assets/               # Static assets
└── main.tsx              # App entry point
```

## Key Components

- **Cart Component** ([`src/components/Cart.tsx`](src/components/Cart.tsx)): Handles cart UI, animations, and checkout simulation.
- **Research Page** ([`src/pages/Research.tsx`](src/pages/Research.tsx)): Displays articles and YouTube videos with modal player.
- **Contact Page** ([`src/pages/Contact.tsx`](src/pages/Contact.tsx)): Form submission via Formspree, with validation.

## Configuration

- **Vite Config**: [`vite.config.ts`](vite.config.ts)
- **TypeScript Configs**: [`tsconfig.json`](tsconfig.json), [`tsconfig.app.json`](tsconfig.app.json), [`tsconfig.node.json`](tsconfig.node.json)
- **ESLint Config**: [`eslint.config.js`](eslint.config.js)

## Deployment

This app can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. Ensure the build output in `dist/` is served.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes and test.
4. Submit a pull request.

## License

This project is private and proprietary to Belleville Dental Center.

## Contact

For questions or support, contact info@bellevilledental.com or visit [Belleville Dental Center].
# Belliville Dental
