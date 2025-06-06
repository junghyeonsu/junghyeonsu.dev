# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based blog/portfolio website (junghyeonsu.com) built with TypeScript, React, and Chakra UI. The site serves MDX content for blog posts organized by categories and tags, with multilingual support (Korean/English).

## Development Commands

```bash
# Development server
yarn dev
# or
yarn develop

# Build for production
yarn build

# Type checking
yarn typecheck

# Serve production build locally
yarn serve

# Clean build artifacts
yarn clean
```

## Architecture & Key Concepts

### Content Management
- **Blog Posts**: Located in `/content/` directory, organized by category folders
- **Portfolio**: Single MDX file in `/portfolio/` directory  
- **Frontmatter**: Each MDX file uses frontmatter for metadata (title, slug, tags, createdAt, description, etc.)
- **Multilingual**: Posts can have `locale` field (English posts), Korean posts have no locale field

### Gatsby Configuration
- **Page Generation**: `gatsby-node.js` creates pages dynamically:
  - Individual post pages at `/posts/{slug}` (Korean) or `/{locale}/posts/{slug}` (English)
  - Paginated tag pages at `/tags/{tag}` and `/tags/{tag}/{pageNumber}`
  - Paginated homepage at `/` and `/{pageNumber}`
  - Portfolio page at `/portfolio`
- **Content Sources**: MDX files from `/content/` and `/portfolio/` directories
- **Image Processing**: Gatsby Sharp plugins for optimized images with max width 800px
- **Typography**: Uses Pretendard font loaded via web font loader

### Component Architecture
- **Layouts**: 
  - `MainLayout`: Standard page wrapper with header/footer, 900px max width
  - `PostLayout`: MDX content wrapper with wider max width (800px base, 1100px xl), includes MDXProvider
- **Theme System**: Chakra UI with custom theme in `/src/chakra/`
  - Custom breakpoints: sm(320px), md(768px), lg(960px), xl(1200px), 2xl(1536px)
  - Custom colors and semantic tokens
- **MDX Components**: Custom components in `/src/components/mdx/` for enhanced content rendering

### TypeScript & Build
- **Type Generation**: Gatsby TypeGen generates GraphQL types in `src/__generated__/gatsby-types.d.ts`
- **ESLint**: Airbnb TypeScript config with Prettier integration
- **Package Manager**: Yarn v4.8.1 (check yarn version before installing packages)
- **Node Version**: Requires Node.js >=18.0.0

### Content Structure
- Posts are organized by category folders under `/content/`
- Each post folder contains the MDX file and associated images
- Reading time is calculated at 500 words per minute
- Pagination shows 10 posts per page

## Common Development Patterns

When adding new blog posts:
- Create folder under appropriate category in `/content/`
- Include MDX file with proper frontmatter
- Images should be co-located in the same folder
- Use `yarn develop` to see changes in development

When modifying components:
- Follow existing Chakra UI patterns
- Maintain responsive design using custom breakpoints
- Use semantic tokens for colors when possible
- TypeScript is strict mode enabled