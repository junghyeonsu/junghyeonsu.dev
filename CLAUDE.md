# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog/portfolio website (junghyeonsu.com) built with TypeScript, React, and Tailwind CSS v4. The site serves MDX content for blog posts organized by categories and tags, with multilingual support (Korean/English).

## Development Commands

```bash
# Development server
yarn dev

# Build for production
yarn build

# Preview production build locally
yarn preview

# Lint code
yarn lint

# Lint and fix
yarn lint:fix

# Format code
yarn format
```

## Architecture & Key Concepts

### Content Management
- **Blog Posts**: Located in `/content/` directory, organized by category folders
- **Portfolio**: Single MDX file in `/portfolio/` directory
- **Frontmatter**: Each MDX file uses frontmatter for metadata (title, slug, tags, createdAt, description, etc.)
- **Multilingual**: Posts can have `locale` field (English posts), Korean posts have no locale field
- **Content Collections**: Defined in `src/content.config.ts` using Astro's Content Collections API

### Astro Configuration
- **Page Generation**: Dynamic routes in `/src/pages/`:
  - Individual post pages at `/posts/{slug}` (Korean) via `posts/[...slug].astro`
  - English posts at `/en/posts/{slug}` via `en/posts/[slug].astro`
  - Paginated tag pages at `/tags/{tag}` via `tags/[tag]/[...page].astro`
  - Paginated homepage via `[...page].astro`
  - Portfolio page at `/portfolio.astro`
- **Content Sources**: MDX files from `/content/` and `/portfolio/` directories
- **Image Processing**: Astro's built-in Sharp service with `limitInputPixels: false` for large GIFs
- **Deployment**: Cloudflare Pages via `@astrojs/cloudflare` adapter

### Component Architecture
- **Layouts** (`src/layouts/`):
  - `BaseLayout.astro`: Base HTML structure with theme initialization
  - `MainLayout.astro`: Standard page wrapper with header/footer
  - `PostLayout.astro`: MDX content wrapper with prose styling
- **Components**:
  - `src/components/astro/`: Native Astro components (Header, Footer, PostGrid, etc.)
  - `src/components/react/`: Interactive React islands (ThemeToggler, PostCard, Giscus, etc.)
  - `src/components/mdx/`: Custom MDX components (Callout, YouTubePlayer)
  - `src/components/ui/`: Reusable UI primitives

### Styling
- **Tailwind CSS v4**: Configured via Vite plugin in `astro.config.mjs`
- **Global Styles**: `src/styles/globals.css`
- **Dark Mode**: CSS variables with `.dark` class, managed by ThemeToggler React component
- **Typography**: `@tailwindcss/typography` plugin for prose styling
- **Custom Breakpoints**: sm(320px), md(768px), lg(960px), xl(1200px), 2xl(1536px)

### React Islands Architecture
Interactive React components use client directives:
- `client:load` - Hydrate immediately (ThemeToggler)
- `client:visible` - Hydrate when visible (PostCard)
- `client:idle` - Hydrate on browser idle (Giscus)

### TypeScript & Tooling
- **TypeScript**: Strict mode with Astro's strict config
- **Biome**: Code linting and formatting (replaces ESLint/Prettier)
- **Package Manager**: Yarn v4.12.0
- **Node Version**: Requires Node.js >=18.0.0

### Content Structure
- Posts are organized by category folders under `/content/`
- Each post folder contains the MDX file and associated WebP images
- Images are in WebP format for optimal performance
- Pagination shows 10 posts per page

## Common Development Patterns

When adding new blog posts:
- Create folder under appropriate category in `/content/`
- Include MDX file with proper frontmatter
- Images should be co-located in same folder (use WebP format)
- Use `yarn dev` to see changes in development

When modifying components:
- Use Tailwind CSS for styling
- Follow existing patterns for Astro vs React components
- Use `dark:` prefix for dark mode styles
- Maintain responsive design using custom breakpoints

### Key Files
- `astro.config.mjs` - Astro configuration
- `src/content.config.ts` - Content collection schemas
- `src/styles/globals.css` - Global styles and CSS variables
- `biome.json` - Linting and formatting rules
