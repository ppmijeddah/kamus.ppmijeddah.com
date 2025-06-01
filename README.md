# Kamus Amiyah Saudi (PPMI Jeddah)

## 📖 Description

**Kamus Amiyah Saudi** is a digital dictionary for the local Arabic dialect of Saudi Arabia, developed by PPMI Jeddah. This application aims to bridge the communication gap by providing an easy-to-use platform for learning and understanding everyday Saudi Ammiyah. Features include a comprehensive dictionary, practical scenario-based conversations, a saved items list, and a planned AI-powered translation tool.

## 🚀 Deployment

The application is live and can be accessed at:
[https://kamus.ppmijeddah.com](https://kamus.ppmijeddah.com)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20 or later recommended, based on project dependencies)
- npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd kamus.ppmijeddah.com
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

-   **Development Mode:**
    This command will initialize the environment, set up the database (via `npm run init` and `npm run init:db`), and start the development server with Turbopack.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

-   **Production Build:**
    This command will initialize the environment, build the application for production, and set up the database (via `npm run init` and `npm run init:db`).
    ```bash
    npm run build
    ```

-   **Start Production Server:**
    This command starts the Next.js production server. Ensure you have run `npm run build` first.
    ```bash
    npm run start
    ```

### Linting

To check for code quality and style issues:
```bash
npm run lint
```

### Type Checking

To check for TypeScript type errors without emitting files:
```bash
npm run types
```

## ✨ Tech Stack

This project is built with a modern technology stack:

-   **Core Framework**: [Next.js](https://nextjs.org/) (v15.1.6)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (v5)
-   **UI & Styling**:
    -   [React](https://reactjs.org/) (v19)
    -   [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)
    -   [Radix UI](https://www.radix-ui.com/) (for accessible UI components)
    -   [Lucide React](https://lucide.dev/) (for icons)
    -   [Framer Motion](https://www.framer.com/motion/) (for animations, via `motion` package)
    -   [clsx](https://github.com/lukeed/clsx) (for constructing `className` strings conditionally)
-   **State Management**:
    -   [Zustand](https://zustand-demo.pmnd.rs/) (v5)
    -   [TanStack Query (React Query)](https://tanstack.com/query/latest) (v5)
-   **Database**:
    -   [SQLite](https://www.sqlite.org/index.html) (via `better-sqlite3`, `sqlite`, and `sqlite3` packages)
-   **API**: Next.js API Routes
-   **Progress Indicator**: [@bprogress/next](https://github.com/badrap/bprogress)
-   **Development Tools**:
    -   [ESLint](https://eslint.org/) (v9)
    -   Turbopack (for faster development builds with Next.js)
-   **Utilities**:
    -   [lodash.debounce](https://lodash.com/docs/4.17.15#debounce)
```
