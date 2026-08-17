# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack & Tools

- **React 19** with TypeScript 6
- **Vite 8** - fast build tool, dev server, HMR
- **TailwindCSS 4** + **shadcn UI** - component library built on Radix UI
- **React Router v7** - client-side routing
- **React Query v5** - server state management & caching
- **Axios** - HTTP client
- **Vitest 4** - testing framework (jsdom environment)
- **OXLint** - Rust-based linter (faster than ESLint)
- **React Compiler** - Babel plugin for optimizing component renders

## Common Commands

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # TypeScript check + Vite build
npm run lint         # Run OXLint
npm run test         # Run tests in watch mode
npm run test:ui      # Launch Vitest UI (interactive test dashboard)
npm run coverage     # Generate coverage report
npm run preview      # Preview production build locally
```

### Running Specific Tests

```bash
npm run test -- src/path/to/file.test.ts        # Single file
npm run test -- --grep "search term"            # Pattern match
npm run test -- --reporter=verbose              # Verbose output
```

## Code Architecture

### Module Structure

The project is organized into feature modules under `src/`:

- **`src/heroes/`** - Core feature (heroes data & display)
  - `api/` - API calls (axios + React Query integration)
  - `actions/` - Server actions & data-fetching logic (follows TanStack Query patterns)
  - `pages/` - Route-level components (HomePage, SearchPage, HeroPage)
  - `components/` - Feature-specific UI (HeroGrid, HeroCard, HeroStats)
  - `hooks/` - Feature-specific hooks (usePaginatedHero, useHeroSummary)
  - `context/` - React Context (FavoriteHeroContext for cross-feature state)
  - `types/` - TypeScript interfaces & response types

- **`src/admin/`** - Admin panel feature
  - `pages/` - Admin routes
  - `layouts/` - Admin layout wrapper

- **`src/components/`** - Shared components
  - `ui/` - Shadcn UI components (button, card, input, accordion, slider, etc.)
  - `custom/` - Custom wrappers & composed components (CustomMenu, CustomBreadcrumbs, etc.)

- **`src/router/`** - React Router configuration

- **`src/lib/`** - Utilities (clsx/tailwind-merge helpers via `utils.ts`)

### Key Patterns

**Data Fetching Pattern:**
- API layer in `src/heroes/api/hero.api.ts` uses axios
- Actions in `src/heroes/actions/` wrap API calls with React Query (useQuery, useMutation)
- Components consume via custom hooks (e.g., `usePaginatedHero`) that abstract the query logic

**Component Composition:**
- Use shadcn components from `src/components/ui/` as building blocks
- Compose into feature-specific components in `src/heroes/components/`
- Export custom wrappers from `src/components/custom/` for reuse across features

**Type Safety:**
- Response types defined in `src/heroes/types/` (e.g., `get-heroes.response.ts`)
- Path alias `@/` resolves to `src/` for clean imports

**State Management:**
- Server state via React Query (recommended)
- Cross-feature state via React Context (FavoriteHeroContext)
- Query caching handled by React Query; no Redux/Zustand needed for this scope

## TypeScript & Path Resolution

- TypeScript config references `tsconfig.app.json` (app code) and `tsconfig.node.json` (build config)
- Path alias in vite.config.ts: `@/` → `./src/`
- Use `@/components/ui/button` instead of relative imports

## Testing Notes

- Test environment: **jsdom** (browser-like DOM, no real browser)
- Vitest globals enabled (no need to import `describe`, `it`, `expect`)
- Place tests next to source files or in `*.test.ts` / `*.test.tsx` files
- Testing Library available (`@testing-library/react`, `@testing-library/dom`)

## Known Development Considerations

- **React Compiler** is enabled via Babel plugin; do not disable without explicit reason — it optimizes renders automatically
- **TailwindCSS v4** uses the Vite plugin; keep `@tailwindcss/vite` in dependencies
- **React Router v7** — check [official upgrade guide](https://reactrouter.com/upgrade/v7) if adding new features
- Linting is strict (OXLint); failures will block build. Run `npm run lint` before committing
