# Components Overview

This document provides a comprehensive overview of all the React components used across the Zurhai.mn codebase. It explains the purpose and usage of each component organized by their respective modules.

## 1. Landing Page Components (`components/landing/`)
These components are primarily used to construct the main landing page and establish the initial user experience.

- **`navbar.tsx`**: The top navigation bar of the website, providing links to various sections and pages.
- **`hero-section.tsx`**: The grand introduction section at the top of the landing page, featuring interactive dark cosmic themes, typography, and engaging visual hooks (e.g., interactive cursor-following asterism lines).
- **`categories-section.tsx`**: Displays the core categorizable elements such as "Western Zurhai", "Eastern Zurhai", and "Tarot" in structured columns.
- **`ancestral-karma-section.tsx`**: An engaging section specifically designed to highlight "Ancestral Karma" (Удмын карма), driving users toward personalized astrological readings by triggering related actions.
- **`features-section.tsx`**: Highlights the key selling points or features provided by Zurhai.mn.
- **`form-section.tsx`**: A wrapper section that houses the `mystic-form`, structurally placing it within the landing page's flow.
- **`footer.tsx`**: The global footer displaying copyright information, links, and secondary navigation.

## 2. Zodiac Hub Components (`components/zodiac/`)
These components are specifically designed to construct the individual Zodiac Hub pages (for both Western and Eastern signs). They provide highly personalized and visually distinct representations for each sign.

- **`zodiac-hub-hero.tsx`**: The hero section for an individual zodiac sign, leveraging specific imagery (constellations/animals), accent colors, and intro text.
- **`zodiac-hub-stats.tsx`**: Displays quick facts and stats related to the specific zodiac sign (e.g., element, ruling planet).
- **`zodiac-hub-traits.tsx`**: Highlights the positive and negative traits (or general characteristics) of the specific zodiac sign.
- **`zodiac-hub-siblings.tsx`**: A navigation or link component guiding users to other zodiac signs within the same system (e.g., showing other Western signs).
- **`zodiac-hub-articles.tsx`**: Renders a list/grid of Sanity-backed blog articles or content specifically related to that zodiac sign.
- **`zodiac-hub-cta.tsx`**: The Call to Action element prompting users to delve deeper, perhaps calculating their personalized chart.

## 3. Blog & Content Components (Root `components/`)
These components facilitate the reading experience for long-form content managed via Sanity CMS.

- **`portable-text.tsx`**: Critical for rendering Sanity's rich text (Portable Text) on the frontend. It maps custom Sanity blocks (like lists, links, headers, and code) to beautifully styled React components consistent with the blog's design system.
- **`table-of-contents.tsx`**: A sticky, interactive Table of Contents component that automatically generates links from article headings, tracking the user's scroll position for a better reading experience.
- **`blog-tracing-beam.tsx`**: Applies a stylized Aceternity UI Tracing Beam effect specifically constrained and optimized for reading blog articles.

## 4. UI & Form Components (`components/ui/` and Root)
These components are the building blocks of the application's interface, ranging from generic UI elements to highly specific stylized components.

- **`ui/button.tsx`, `ui/card.tsx`, `ui/input.tsx`, `ui/label.tsx`, `ui/separator.tsx`**: Standard, reusable UI primitives (likely based on shadcn/ui) used throughout the application to maintain a consistent design system.
- **`ui/tarot-card.tsx`**: A specialized, interactive card component with 3D tilt and styling effects used to display Tarot-related content.
- **`ui/tracing-beam.tsx`**: The base Aceternity UI component providing an animated, scrolling visual indicator line.
- **`mystic-form.tsx`**: A highly stylized, interactive form component used (typically within `landing/form-section.tsx`) to capture user data for generating personalized "Zurhai" readings.
- **`icons/tree-of-life.tsx`**: An SVG icon/graphic component used to visually support the "Ancestral Karma" theme.
