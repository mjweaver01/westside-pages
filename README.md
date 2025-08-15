# Westside Pages

A modern Vue 3 application built with TypeScript, SCSS, and Prettier for the Westside Barbell website.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **SCSS** - CSS preprocessor with existing Westside Barbell styles
- **Vue Router** - Client-side routing
- **Prettier** - Code formatting
- **ESLint** - Code linting

## Development Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Commands

- **Start development server:**
  ```bash
  npm run dev
  ```
  Runs the app in development mode at `http://localhost:3000`

- **Build for production:**
  ```bash
  npm run build
  ```
  Builds the app for production in the `dist` folder

- **Preview production build:**
  ```bash
  npm run preview
  ```

- **Lint code:**
  ```bash
  npm run lint
  ```

- **Format code:**
  ```bash
  npm run format
  ```

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── HeaderComponent.vue
│   └── FooterComponent.vue
├── pages/              # Page components
│   ├── HomePage.vue
│   └── AboutPage.vue
├── router/             # Vue Router configuration
│   └── index.ts
├── scss/               # SCSS styles (existing Westside styles)
│   ├── _variables.scss
│   ├── global.scss
│   └── ...
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## SCSS Architecture

The project uses the existing Westside Barbell SCSS architecture with:

- Global variables and mixins in `_variables.scss`
- Component-specific styles
- Utility classes and helpers
- Responsive design patterns

## Features

- 🎯 **Type Safety**: Full TypeScript support
- 🎨 **Modern Styling**: SCSS with existing Westside Barbell design system
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Fast**: Vite for instant hot-reload
- 🧹 **Clean Code**: Prettier and ESLint configured
- 🧭 **Routing**: Vue Router for seamless navigation

## Available Routes

- `/` - Home page
- `/about` - About page (converted from existing content)

## Contributing

1. Run `npm run format` before committing
2. Ensure `npm run lint` passes
3. Follow the existing code style and patterns
