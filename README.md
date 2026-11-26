# Interview Prep — Developer Knowledge Base

A complete, production-quality static interview preparation website for developers. Study JavaScript, React, TypeScript, and Data Structures & Algorithms with a beautiful, distraction-free interface.

## Features

- 📚 **10 topic pages** across JavaScript, React, TypeScript, and DSA
- 🔍 **Command palette search** (`Ctrl/Cmd + K`) with instant Fuse.js results
- ✅ **Progress tracking** — mark topics as completed per category
- 🔖 **Bookmarks** — save topics for quick access
- 🕐 **Recently viewed** — resume where you left off
- 🌙 **Dark/light theme** — respects system preference, persists choice
- 📖 **MDX content** — with Shiki syntax highlighting and Mermaid diagrams
- 💾 **Fully static** — no backend, all data in localStorage
- 📱 **Responsive** — mobile-first design

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router 6 |
| Content | MDX v3 |
| Syntax Highlighting | Shiki |
| Diagrams | Mermaid |
| Search | Fuse.js |
| Animation | Motion |
| Icons | Lucide React |
| Storage | localStorage |

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── app/           # App, router, providers
├── components/
│   ├── ui/        # Button, Tooltip, Dialog, Dropdown
│   ├── layout/    # AppLayout, Header, Sidebar, TableOfContents
│   └── content/   # CodeBlock, MermaidDiagram, Callout, QuestionCard
├── features/
│   ├── dashboard/ # Dashboard page with stats and progress
│   ├── search/    # Command palette (Ctrl+K)
│   ├── bookmarks/ # Bookmarked topics
│   ├── progress/  # Detailed per-topic progress
│   └── learning/  # MDX content pages + study hooks
├── content/       # MDX topic files
│   ├── javascript/ # fundamentals, closures, promises, event-loop
│   ├── react/      # fundamentals, hooks, performance
│   ├── typescript/ # fundamentals
│   └── dsa/        # arrays, strings
├── hooks/         # useTheme, useLocalStorage, useKeyboardShortcut
├── lib/           # utils, storage, mdx components, search index
├── data/          # navigation config, site config
└── types/         # TypeScript type definitions
```

## Content Topics

### JavaScript
- Variables, Hoisting, Coercion, Prototypes, Falsy values
- Closures, Lexical Scope, Common Pitfalls
- Promises, async/await, Promise combinators
- Event Loop, Microtasks, Macrotasks

### React
- JSX, Virtual DOM, Component types, Keys
- useState, useEffect, useCallback, useMemo, useRef, Custom hooks
- React.memo, Code splitting, Virtualization, State patterns

### TypeScript
- Types vs Interfaces, Generics, Union types, Type narrowing
- Utility types (Partial, Pick, Omit, Record...)
- `never` and `unknown`

### DSA
- Two Pointers, Sliding Window, Prefix Sum, Binary Search, Kadane's
- Palindromes, Anagrams, String manipulation, KMP

## Building

```bash
npm run build    # production build
npm run preview  # preview production build
```
