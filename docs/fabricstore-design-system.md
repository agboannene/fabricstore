# FabricStore — Design System

**Version:** 1.0  
**Date:** 2026-07-10  
**Scope:** Customer-facing store + Internal dashboard  

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [Layout & Grid](#2-layout--grid)
3. [Component Library](#3-component-library)
4. [Form Patterns](#4-form-patterns)
5. [Data Display](#5-data-display)
6. [Navigation Patterns](#6-navigation-patterns)
7. [Feedback & Messaging](#7-feedback--messaging)
8. [Motion & Animation](#8-motion--animation)
9. [Accessibility](#9-accessibility)
10. [Dashboard-Specific Patterns](#10-dashboard-specific-patterns)
11. [Implementation Notes](#11-implementation-notes)

---

## 1. Design Tokens

### 1.1 Colour Tokens

```css
/* ---- BRAND PALETTE ---- */

/* Primary */
--color-primary-50:  #EEF0FA;
--color-primary-100: #C2C8E8;
--color-primary-200: #9BA4D8;
--color-primary-300: #6F7CC5;
--color-primary-400: #4E5DB5;
--color-primary-500: #1A237E;    /* Deep Indigo — main */
--color-primary-600: #0D175E;
--color-primary-700: #0A1150;
--color-primary-800: #060C3B;
--color-primary-900: #030725;

/* Accent */
--color-accent-50:  #FEF8E8;
--color-accent-100: #FCE9B8;
--color-accent-200: #FADD94;
--color-accent-300: #F7CE65;
--color-accent-400: #F5C344;
--color-accent-500: #D4A843;    /* Warm Gold — main */
--color-accent-600: #C49A35;
--color-accent-700: #A8831E;
--color-accent-800: #8B6B10;
--color-accent-900: #6E5308;

/* Secondary */
--color-secondary-50:  #F9EDF1;
--color-secondary-100: #E8C3D1;
--color-secondary-200: #D99AB5;
--color-secondary-300: #C86A8F;
--color-secondary-400: #B54972;
--color-secondary-500: #7B1F3E;  /* Rich Burgundy */
--color-secondary-600: #631832;
--color-secondary-700: #4C1327;
--color-secondary-800: #360E1B;
--color-secondary-900: #200810;

/* ---- NEUTRAL PALETTE ---- */
--color-neutral-50:  #F5F0EB;    /* Off White */
--color-neutral-100: #EDE8E0;
--color-neutral-200: #E0D8CE;
--color-neutral-300: #C8C0B6;
--color-neutral-400: #A0988E;
--color-neutral-500: #7A7268;
--color-neutral-600: #5C544A;
--color-neutral-700: #3E3630;
--color-neutral-800: #2E2824;
--color-neutral-900: #1A1816;

/* ---- SEMANTIC PALETTE ---- */
--color-success-50:  #E8F5E9;
--color-success-100: #C8E6C9;
--color-success-200: #A5D6A7;
--color-success-300: #81C784;
--color-success-400: #66BB6A;
--color-success-500: #2E7D32;   /* Forest Green */
--color-success-600: #1B5E20;
--color-success-700: #0D3B0F;

--color-warning-50:  #FFF8E1;
--color-warning-100: #FFECB3;
--color-warning-200: #FFE082;
--color-warning-300: #FFD54F;
--color-warning-400: #FFCA28;
--color-warning-500: #F57F17;   /* Warning Amber */
--color-warning-600: #F57C00;
--color-warning-700: #E65100;

--color-error-50:   #FFEBEE;
--color-error-100:  #FFCDD2;
--color-error-200:  #EF9A9A;
--color-error-300:  #E57373;
--color-error-400:  #EF5350;
--color-error-500:  #C62828;    /* Error Red */
--color-error-600:  #B71C1C;
--color-error-700:  #8E0000;

--color-info-50:   #E3F2FD;
--color-info-100:  #BBDEFB;
--color-info-200:  #90CAF9;
--color-info-300:  #64B5F6;
--color-info-400:  #42A5F5;
--color-info-500:  #1565C0;    /* Info Blue */
--color-info-600:  #0D47A1;
--color-info-700:  #072A6C;

/* ---- SURFACE TOKENS ---- */
--color-surface:          #FFFFFF;
--color-surface-alt:      #FFF8F0;    /* Ivory White (store background) */
--color-surface-dashboard:#F5F0EB;    /* Off White (dashboard background) */
--color-surface-hover:    #F5F0EB;
--color-surface-selected: #EEF0FA;

/* ---- BORDER TOKENS ---- */
--color-border:         #E0E0E0;
--color-border-light:   #F0ECE6;
--color-border-focus:   #1A237E;
--color-border-error:   #C62828;
--color-border-success: #2E7D32;
```

### 1.2 Typography Tokens

```css
/* ---- FONT FAMILIES ---- */
--font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* ---- TYPE SCALE (Store) ---- */
--text-display-xl:  3rem;     /* 48px */
--text-display-l:   2.25rem;  /* 36px */
--text-h1:          2rem;     /* 32px */
--text-h2:          1.5rem;   /* 24px */
--text-h3:          1.25rem;  /* 20px */
--text-h4:          1.125rem; /* 18px */
--text-body-lg:     1.125rem; /* 18px */
--text-body:        1rem;     /* 16px */
--text-body-sm:     0.875rem; /* 14px */
--text-caption:     0.75rem;  /* 12px */
--text-label:       0.875rem; /* 14px */
--text-button:      1rem;     /* 16px */

/* ---- TYPE SCALE (Dashboard) ---- */
--text-dash-h1:     1.5rem;   /* 24px */
--text-dash-h2:     1.125rem; /* 18px */
--text-dash-body:   0.875rem; /* 14px */
--text-dash-sm:     0.75rem;  /* 12px */
--text-dash-label:  0.75rem;  /* 12px */

/* ---- FONT WEIGHTS ---- */
--weight-regular:   400;
--weight-medium:    500;
--weight-semibold:  600;
--weight-bold:      700;

/* ---- LINE HEIGHTS ---- */
--leading-tight:    1.1;
--leading-snug:     1.25;
--leading-normal:   1.5;
--leading-relaxed:  1.6;
--leading-loose:    1.75;
```

### 1.3 Spacing Scale

```css
--space-0:    0;
--space-1:    0.25rem;   /* 4px  */
--space-2:    0.5rem;    /* 8px  */
--space-3:    0.75rem;   /* 12px */
--space-4:    1rem;      /* 16px */
--space-5:    1.25rem;   /* 20px */
--space-6:    1.5rem;    /* 24px */
--space-8:    2rem;      /* 32px */
--space-10:   2.5rem;    /* 40px */
--space-12:   3rem;      /* 48px */
--space-16:   4rem;      /* 64px */
--space-20:   5rem;      /* 80px */
--space-24:   6rem;      /* 96px */

/* Dashboard uses a tighter scale (multiply store spacing by 0.75) */
--space-dash-1:  0.1875rem; /* 3px  */
--space-dash-2:  0.375rem;  /* 6px  */
--space-dash-3:  0.5rem;    /* 8px  */
--space-dash-4:  0.75rem;   /* 12px */
--space-dash-6:  1rem;      /* 16px */
--space-dash-8:  1.25rem;   /* 20px */
--space-dash-12: 1.5rem;    /* 24px */
```

### 1.4 Border Radius

```css
--radius-none:    0;
--radius-sm:      0.25rem;   /* 4px  */
--radius-md:      0.5rem;    /* 8px  */
--radius-lg:      0.75rem;   /* 12px */
--radius-xl:      1rem;      /* 16px */
--radius-full:    9999px;    /* Pill / circle */

/* Dashboard radius (tighter) */
--radius-dash:    0.375rem;  /* 6px */
```

### 1.5 Shadows

```css
--shadow-xs:  0 1px 2px rgba(26, 35, 126, 0.05);
--shadow-sm:  0 1px 3px rgba(26, 35, 126, 0.08), 0 1px 2px rgba(26, 35, 126, 0.04);
--shadow-md:  0 4px 6px rgba(26, 35, 126, 0.07), 0 2px 4px rgba(26, 35, 126, 0.04);
--shadow-lg:  0 10px 15px rgba(26, 35, 126, 0.08), 0 4px 6px rgba(26, 35, 126, 0.03);
--shadow-xl:  0 20px 25px rgba(26, 35, 126, 0.10), 0 10px 10px rgba(26, 35, 126, 0.04);

/* Modal / overlay shadow */
--shadow-modal: 0 25px 50px rgba(26, 35, 126, 0.18);

/* Dashboard shadows (more subtle) */
--shadow-dash-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-dash-md: 0 2px 4px rgba(0, 0, 0, 0.05);
```

### 1.6 Breakpoints

```css
--bp-sm:   640px;   /* Mobile landscape */
--bp-md:   768px;   /* Tablet */
--bp-lg:   1024px;  /* Desktop */
--bp-xl:   1280px;  /* Wide desktop */
--bp-2xl:  1536px;  /* Max content width */

/* Dashboard breakpoints (compact) */
--bp-dash-collapse: 768px;  /* Sidebar collapses below this */
```

### 1.7 Z-Index Scale

```css
--z-base:       0;
--z-dropdown:   100;
--z-sticky:     200;
--z-navbar:     300;
--z-sidebar:    400;
--z-backdrop:   500;
--z-modal:      600;
--z-popover:    700;
--z-tooltip:    800;
--z-toast:      900;
```

### 1.8 Opacity Tokens

```css
--opacity-disabled:   0.4;
--opacity-backdrop:   0.5;
--opacity-hover:      0.08;   /* For hover overlays */
--opacity-selected:   0.12;
--opacity-scrim:      0.6;    /* Text overlay on images */
```

### 1.9 Transition Tokens

```css
--ease-out:          cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:       cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);

--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-slow:    400ms;

--transition-default: all 250ms var(--ease-out);
--transition-fade:    opacity 250ms var(--ease-out);
--transition-slide:   transform 300ms var(--ease-out);
```

---

## 2. Layout & Grid

### 2.1 Store Layout

```
┌────────────────────────────────────────────────────────────┐
│  Top Nav (fixed, h-16, z-navbar)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Logo    Catalogue  Track  Contact  [Login / Cart]   │  │
│  └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│  Page Content                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Max-width: 1280px, centered, px-6                    │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│  Footer (bg: deep-indigo, text: white)                     │
└────────────────────────────────────────────────────────────┘
```

- **Content max-width:** 1280px, centered horizontally
- **Page padding:** `--space-6` (24px) on each side, reducing to `--space-4` (16px) on mobile
- **Section spacing:** `--space-16` (64px) vertical between major sections; `--space-8` (32px) on mobile
- **Card grid:** Auto-fill, min 280px, max 1fr

### 2.2 Dashboard Layout

```
┌────────────┬─────────────────────────────────────────────────┐
│            │  Top Bar                                        │
│  Sidebar   │  ┌─────────────────────────────────────────┐    │
│  (w-60)    │  │  Search        [Notifications] [Avatar] │    │
│  bg:       │  └─────────────────────────────────────────┘    │
│  charcoal  │  Main Content Area                               │
│            │  ┌─────────────────────────────────────────┐    │
│  Collaps-  │  │  Page Header (h1 + breadcrumbs)         │    │
│  ible on   │  ├─────────────────────────────────────────┤    │
│  mobile    │  │                                         │    │
│            │  │  Content (scrollable)                   │    │
│            │  │  Padding: 6                             │    │
│            │  │                                         │    │
│            │  └─────────────────────────────────────────┘    │
└────────────┴─────────────────────────────────────────────────┘
```

- **Sidebar width:** 240px expanded, 64px collapsed (icon only)
- **Top bar height:** 56px
- **Content padding:** `--space-6` (24px) — `--space-4` (16px) on mobile

### 2.3 Grid System

```css
/* 12-column grid for page-level layouts */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Product grid (store) */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}

/* Dashboard card grid */
.dash-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-4);
}

/* Responsive column helpers */
.col-span-1  { grid-column: span 1; }
.col-span-2  { grid-column: span 2; }
.col-span-3  { grid-column: span 3; }
.col-span-4  { grid-column: span 4; }
.col-span-6  { grid-column: span 6; }
.col-span-8  { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }

@media (max-width: 768px) {
  .col-span-1, .col-span-2, .col-span-3,
  .col-span-4, .col-span-6, .col-span-8 {
    grid-column: span 12;
  }
}
```

---

## 3. Component Library

### 3.1 Button

**Variants:** Primary, Secondary, Accent, Ghost, Danger, Link  
**Sizes:** sm (32px), md (40px), lg (48px) — Dashboard uses sm only (32px)  
**States:** Default, Hover, Active, Focus, Disabled, Loading

```
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  Primary Button    │  │  Secondary Button  │  │  Accent Button     │
│  [bg: primary-500] │  │  [bg: transparent] │  │  [bg: accent-500]  │
│  [text: white]     │  │  [border-primary]  │  │  [text: charcoal]  │
│  [radius: md]      │  │  [text: primary]   │  │  [radius: md]      │
└────────────────────┘  └────────────────────┘  └────────────────────┘

┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  Ghost Button      │  │  Danger Button     │  │  Link Button       │
│  [bg: transparent] │  │  [bg: error-500]   │  │  [no bg, no border]│
│  [text: primary]   │  │  [text: white]     │  │  [text: primary]   │
│  [hover: bg-hover] │  │  [radius: md]      │  │  [underline:hover] │
└────────────────────┘  └────────────────────┘  └────────────────────┘
```

**Design tokens:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  font-size: var(--text-button);
  line-height: 1;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-default);
  white-space: nowrap;
  text-decoration: none;
  border: 1.5px solid transparent;
}

.btn--sm  { height: 32px; padding: 0 var(--space-3); font-size: var(--text-body-sm); }
.btn--md  { height: 40px; padding: 0 var(--space-4); }
.btn--lg  { height: 48px; padding: 0 var(--space-6); font-size: var(--text-body-lg); }

.btn--primary {
  background: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
}
.btn--primary:hover  { background: var(--color-primary-600); border-color: var(--color-primary-600); }
.btn--primary:active { background: var(--color-primary-700); }

.btn--secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}
.btn--secondary:hover { background: var(--color-primary-50); }

.btn--accent {
  background: var(--color-accent-500);
  color: var(--color-neutral-900);
  border-color: var(--color-accent-500);
}
.btn--accent:hover { background: var(--color-accent-600); border-color: var(--color-accent-600); }

.btn--ghost {
  background: transparent;
  color: var(--color-primary-500);
  border-color: transparent;
}
.btn--ghost:hover { background: var(--color-surface-hover); }

.btn--danger {
  background: var(--color-error-500);
  color: white;
  border-color: var(--color-error-500);
}
.btn--danger:hover { background: var(--color-error-600); }

.btn--link {
  background: transparent;
  color: var(--color-primary-500);
  border: none;
  padding: 0;
  height: auto;
}
.btn--link:hover { text-decoration: underline; }

.btn--disabled,
.btn:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.btn--loading {
  position: relative;
  color: transparent;
}
.btn--loading::after {
  content: '';
  position: absolute;
  width: 16px; height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 600ms linear infinite;
}
```

**Usage rules:**
- One primary button per view/page (the main CTA)
- Danger buttons need confirmation dialog
- Loading state disables interaction and shows spinner
- Icon buttons: use with aria-label
- Dashboard: use `btn--dash` variant (32px height, --radius-dash, --text-dash-body)

### 3.2 Input

**Variants:** Text, Email, Phone, Password, Number, Search, Textarea  
**Sizes:** md (40px), sm (32px dashboard)  
**States:** Default, Focus, Hover, Error, Disabled, Read-only, Filled

```
┌─────────────────────────────────────────────────────┐
│  Label                                               │
│  ┌───────────────────────────────────────────────┐   │
│  │  Input text                                    │   │
│  └───────────────────────────────────────────────┘   │
│  Helper text or error message                        │
└─────────────────────────────────────────────────────┘
```

**Design tokens:**
```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.input-label {
  font-family: var(--font-body);
  font-size: var(--text-label);
  font-weight: var(--weight-medium);
  color: var(--color-neutral-800);
}

.input-field {
  font-family: var(--font-body);
  font-size: var(--text-body);
  height: 40px;
  padding: 0 var(--space-3);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-neutral-900);
  transition: var(--transition-default);
  outline: none;
  width: 100%;
}

.input-field:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.12);
}

.input-field:hover:not(:disabled) {
  border-color: var(--color-primary-300);
}

.input-field--error {
  border-color: var(--color-border-error);
}
.input-field--error:focus {
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.12);
}

.input-field:disabled {
  background: var(--color-surface-hover);
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.input-helper {
  font-size: var(--text-caption);
  color: var(--color-neutral-500);
}

.input-error {
  font-size: var(--text-caption);
  color: var(--color-error-500);
}

/* Dashboard compact */
.input-field--dash {
  height: 32px;
  font-size: var(--text-dash-body);
  border-radius: var(--radius-dash);
}

/* Textarea */
.textarea {
  height: auto;
  min-height: 80px;
  padding: var(--space-3);
  resize: vertical;
}
```

### 3.3 Select

Same visual as Input but with a dropdown chevron icon.

```css
.select-wrapper {
  position: relative;
}
.select-wrapper::after {
  content: '▾';
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-neutral-500);
  pointer-events: none;
}
.select-field {
  appearance: none;
  padding-right: var(--space-8);
  /* inherits input-field styles */
}
```

### 3.4 Badge

**Variants:** Neutral, Success, Warning, Error, Info, Brand  
**Sizes:** sm (20px), md (24px), lg (28px)

```
 ┌──────────────┐
 │  In Stock    │  ← Success (green bg, white text)
 └──────────────┘

 ┌──────────────┐
 │  Pending     │  ← Warning (amber bg, dark text)
 └──────────────┘

 ┌──────────────┐
 │  Cancelled   │  ← Error (red bg, white text)
 └──────────────┘
```

**Design tokens:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  font-size: var(--text-caption);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.badge--sm { height: 20px; padding: 0 var(--space-2); }
.badge--md { height: 24px; padding: 0 var(--space-2); }
.badge--lg { height: 28px; padding: 0 var(--space-3); font-size: var(--text-body-sm); }

.badge--success { background: var(--color-success-100); color: var(--color-success-700); }
.badge--warning { background: var(--color-warning-100); color: var(--color-warning-700); }
.badge--error   { background: var(--color-error-100);   color: var(--color-error-600); }
.badge--info    { background: var(--color-info-100);    color: var(--color-info-700); }
.badge--neutral { background: var(--color-neutral-100); color: var(--color-neutral-700); }
.badge--brand   { background: var(--color-primary-100); color: var(--color-primary-700); }

/* Dot variant (for dashboard status indicators) */
.badge--dot::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: var(--radius-full);
  background: currentColor;
}
```

### 3.5 Card

**Variants:** Default, Elevated, Bordered, Flat  
**Dashboard variant:** Compact (smaller padding, tighter spacing)

```
┌────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐  │
│  │  Card Header (optional)                          │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Card Body                                        │  │
│  │  Padding: space-6 (store) / space-4 (dash)       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Design tokens:**
```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card--default {
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xs);
}

.card--elevated {
  border: none;
  box-shadow: var(--shadow-md);
}

.card--bordered {
  border: 1.5px solid var(--color-border);
  box-shadow: none;
}

.card--flat {
  border: none;
  box-shadow: none;
}

.card__header {
  padding: var(--space-6) var(--space-6) 0;
  font-family: var(--font-heading);
  font-size: var(--text-h3);
}

.card__body {
  padding: var(--space-6);
}

.card__footer {
  padding: 0 var(--space-6) var(--space-6);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}

/* Dashboard compact card */
.card--dash {
  border-radius: var(--radius-dash);
}
.card--dash .card__header {
  padding: var(--space-4) var(--space-4) 0;
  font-family: var(--font-body);
  font-size: var(--text-dash-h2);
}
.card--dash .card__body {
  padding: var(--space-4);
}
```

### 3.6 Modal / Dialog

```
┌────────────────────────────────────────────────────────┐
│  Backdrop (z-backdrop, bg: charcoal, opacity: 0.5)      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Modal (z-modal, centered, max-w-lg)             │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │  Title                          [Close X]  │  │   │
│  │  ├────────────────────────────────────────────┤  │   │
│  │  │  Body content                              │  │   │
│  │  │                                            │  │   │
│  │  ├────────────────────────────────────────────┤  │   │
│  │  │  Footer: [Cancel]              [Confirm]   │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

**Sizes:** sm (max-w-sm: 384px), md (max-w-lg: 512px), lg (max-w-2xl: 672px), full (max-w-4xl: 896px)

**Design tokens:**
```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(33, 33, 33, var(--opacity-backdrop));
  z-index: var(--z-backdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  animation: fadeIn 200ms var(--ease-out);
}

.modal {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-modal);
  z-index: var(--z-modal);
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: modalEnter 250ms var(--ease-out);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-6) 0;
}

.modal__title {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-neutral-900);
}

.modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-neutral-500);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: var(--transition-default);
}
.modal__close:hover { background: var(--color-surface-hover); color: var(--color-neutral-900); }

.modal__body {
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
}

/* Dashboard modal (compact) */
.modal--dash {
  border-radius: var(--radius-lg);
}
.modal--dash .modal__title {
  font-family: var(--font-body);
  font-size: var(--text-dash-h1);
}
.modal--dash .modal__body,
.modal--dash .modal__header {
  padding: var(--space-4);
}
.modal--dash .modal__footer {
  padding: var(--space-3) var(--space-4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
```

### 3.7 Colour Swatch (Fabric-Specific)

```
   ┌──────┐
   │  ●   │  ← Circular, 32px, filled with colour hex
   └──────┘

Selected state: White border (2px) + ring shadow
Hover state: Slight scale (1.1)
Disabled (out of stock): 50% opacity, strikethrough
```

```css
.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-surface);
  box-shadow: 0 0 0 1px var(--color-border);
  cursor: pointer;
  transition: var(--transition-default);
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch--selected {
  box-shadow: 0 0 0 2px var(--color-primary-500);
}

.color-swatch--oos {
  opacity: 0.4;
  cursor: not-allowed;
  position: relative;
}
.color-swatch--oos::after {
  content: '';
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 2px;
  background: var(--color-error-500);
  transform: rotate(-45deg);
}

/* Size variants */
.color-swatch--sm { width: 24px; height: 24px; }
.color-swatch--lg { width: 40px; height: 40px; }
```

### 3.8 Quantity Stepper

```
   ┌────┬──────┬────┐
   │ −  │  5   │  + │
   └────┴──────┴────┘
```

```css
.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.qty-stepper__btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-neutral-800);
  font-size: var(--text-body-lg);
  transition: var(--transition-default);
}
.qty-stepper__btn:hover { background: var(--color-surface-hover); }
.qty-stepper__btn:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }

.qty-stepper__value {
  width: 48px;
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  border-left: 1.5px solid var(--color-border);
  border-right: 1.5px solid var(--color-border);
  padding: var(--space-1) 0;
}
```

### 3.9 Loading / Skeleton

```css
/* Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 2.5px solid var(--color-border);
  border-top-color: var(--color-primary-500);
  border-radius: var(--radius-full);
  animation: spin 600ms linear infinite;
}

.spinner--sm { width: 16px; height: 16px; border-width: 2px; }
.spinner--lg { width: 40px; height: 40px; border-width: 3px; }

/* Skeleton placeholder */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-100) 25%,
    var(--color-neutral-50) 50%,
    var(--color-neutral-100) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

.skeleton--text { height: 16px; width: 100%; margin-bottom: var(--space-2); }
.skeleton--heading { height: 24px; width: 60%; margin-bottom: var(--space-3); }
.skeleton--image { aspect-ratio: 3/4; width: 100%; }
.skeleton--avatar { width: 40px; height: 40px; border-radius: var(--radius-full); }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
```

---

## 4. Form Patterns

### 4.1 Form Layout

```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 640px;  /* Comfortable form width */
}

.form--wide { max-width: 100%; }
.form--compact { gap: var(--space-3); }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
```

### 4.2 Checkbox & Radio

```css
/* Checkbox */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.checkbox__input {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  accent-color: var(--color-primary-500);
  cursor: pointer;
}

/* Radio */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.radio__input {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  accent-color: var(--color-primary-500);
  cursor: pointer;
}
```

### 4.3 Toggle Switch

```
  ┌──────────┐     ┌──────────┐
  │ ●────── │     │ ──────● │
  └──────────┘     └──────────┘
     Off               On
```

```css
.toggle {
  position: relative;
  width: 44px;
  height: 24px;
  cursor: pointer;
}

.toggle__track {
  width: 100%;
  height: 100%;
  background: var(--color-neutral-300);
  border-radius: var(--radius-full);
  transition: var(--transition-default);
}

.toggle--on .toggle__track {
  background: var(--color-primary-500);
}

.toggle__thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 20px; height: 20px;
  background: white;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-default);
}

.toggle--on .toggle__thumb {
  left: 22px;
}
```

### 4.4 Colour Picker (Dashboard)

For adding/editing colour variants — combines a hex input and a native colour picker:

```css
.color-picker {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.color-picker__swatch {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  padding: 0;
}

.color-picker__input {
  width: 90px;
  font-family: var(--font-mono);
  font-size: var(--text-body-sm);
  text-transform: uppercase;
}
```

---

## 5. Data Display

### 5.1 Data Table (Dashboard Primary)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Toolbar (search + filters + actions)                                │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────┬────────────┬────────┬────────┬────────┬────────┬────────┐│
│  │ #    │ Customer   │ Date   │ Total  │ Status │ Assign │ Action ││
│  ├──────┼────────────┼────────┼────────┼────────┼────────┼────────┤│
│  │ 1001 │ Chidi O.   │ 10 Jul │₦45,000 │ ●Pend. │ —      │ [⋯]   ││
│  │ 1002 │ Amina B.   │ 10 Jul │₦32,500 │ ●Conf. │ Femi   │ [⋯]   ││
│  │ 1003 │ Tunde K.   │ 09 Jul │₦12,000 │ ●POD   │ Dele   │ [⋯]   ││
│  └──────┴────────────┴────────┴────────┴────────┴────────┴────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  Pagination: 1-10 of 156                < 1 2 3 ... 16 >           │
└─────────────────────────────────────────────────────────────────────┘
```

```css
.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-dash-body);
}

.table th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-weight: var(--weight-medium);
  font-size: var(--text-dash-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-neutral-500);
  background: var(--color-neutral-50);
  border-bottom: 1.5px solid var(--color-border);
  white-space: nowrap;
  position: sticky;
  top: 0;
}

.table th--sortable {
  cursor: pointer;
  user-select: none;
}
.table th--sortable:hover { color: var(--color-primary-500); }

.table td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: middle;
}

.table tr:last-child td {
  border-bottom: none;
}

.table tr:hover td {
  background: var(--color-surface-hover);
}

.table tr--selected td {
  background: var(--color-surface-selected);
}

/* Dashboard compact table */
.table--compact td,
.table--compact th {
  padding: var(--space-2) var(--space-3);
}

/* Empty state */
.table-empty {
  text-align: center;
  padding: var(--space-12) var(--space-6);
  color: var(--color-neutral-500);
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-dash-body);
  color: var(--color-neutral-500);
}

.pagination__pages {
  display: flex;
  gap: var(--space-1);
}
```

### 5.2 Stat Card (Dashboard)

```
  ┌────────────────────┐
  │  Revenue Today      │
  │  ₦245,000           │  ← Large text
  │  ↑ 12% from yesterday  │  ← Trend indicator
  └────────────────────┘
```

```css
.stat-card {
  background: var(--color-surface);
  border-radius: var(--radius-dash);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
}

.stat-card__label {
  font-size: var(--text-dash-body);
  color: var(--color-neutral-500);
  margin-bottom: var(--space-1);
}

.stat-card__value {
  font-size: var(--text-dash-h1);
  font-weight: var(--weight-bold);
  color: var(--color-neutral-900);
}

.stat-card__trend {
  font-size: var(--text-dash-sm);
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.stat-card__trend--up   { color: var(--color-success-500); }
.stat-card__trend--down { color: var(--color-error-500); }
```

### 5.3 Product Card (Store)

```
  ┌───────────────────────┐
  │  ┌─────────────────┐  │
  │  │  Product Image   │  │
  │  │  (3:4 aspect)    │  │
  │  └─────────────────┘  │
  │  Lace — Premium        │
  │  Royal Blue, Ivory...  │  ← Colour names
  │  ● ● ● ○ ○            │  ← Colour swatches
  │  ₦15,000 / yard        │
  │  [   Add to Cart   ]   │  ← Accent button
  └───────────────────────┘
```

```css
.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition-default);
  border: 1px solid var(--color-border);
}

.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.product-card__image {
  aspect-ratio: 3 / 4;
  width: 100%;
  object-fit: cover;
  display: block;
}

.product-card__body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.product-card__type {
  font-size: var(--text-caption);
  color: var(--color-primary-500);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  color: var(--color-neutral-900);
  line-height: var(--leading-snug);
}

.product-card__price {
  font-size: var(--text-body-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-primary-500);
}

.product-card__swatches {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.product-card__more-colours {
  font-size: var(--text-caption);
  color: var(--color-neutral-500);
}
```

### 5.4 Order Timeline (Dashboard)

Vertical timeline showing order status progression:

```
  ┌─────────────────────────────────────┐
  │  ● Delivered                        │
  │  │  Jul 10, 2026 2:30 PM — by Chioma│
  │  ● Out for Delivery                 │
  │  │  Jul 10, 2026 10:15 AM — by Dele │
  │  ● Packed                           │
  │  │  Jul 9, 2026 4:45 PM — by Femi   │
  │  ● Assigned to Packing              │
  │  │  Jul 9, 2026 2:00 PM — to Femi   │
  │  ● Confirmed                        │
  │     Jul 9, 2026 1:30 PM — Auto      │
  └─────────────────────────────────────┘
```

```css
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--color-border);
}

.timeline__item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  position: relative;
}

.timeline__dot {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline__dot--active {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}
.timeline__dot--active::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: white;
}

.timeline__dot--success {
  background: var(--color-success-500);
  border-color: var(--color-success-500);
}

.timeline__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.timeline__status {
  font-weight: var(--weight-semibold);
  color: var(--color-neutral-900);
}

.timeline__meta {
  font-size: var(--text-dash-sm);
  color: var(--color-neutral-500);
}
```

---

## 6. Navigation Patterns

### 6.1 Top Navigation (Store)

```css
.nav-store {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  background: var(--color-primary-500);
  color: white;
  z-index: var(--z-navbar);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
}

.nav-store__logo {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  color: white;
  text-decoration: none;
}

.nav-store__links {
  display: flex;
  gap: var(--space-6);
  align-items: center;
}

.nav-store__link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: var(--text-body-sm);
  font-weight: var(--weight-medium);
  transition: var(--transition-default);
}
.nav-store__link:hover { color: white; }
.nav-store__link--active { color: var(--color-accent-500); }

/* Mobile: hamburger menu */
.nav-store__mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-store__links { display: none; }
  .nav-store__mobile-toggle { display: block; }
}
```

### 6.2 Sidebar Navigation (Dashboard)

```css
.sidebar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 240px;
  background: var(--color-neutral-800);
  color: white;
  z-index: var(--z-sidebar);
  display: flex;
  flex-direction: column;
  transition: transform 300ms var(--ease-out);
}

.sidebar--collapsed {
  width: 64px;
}

.sidebar__header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar__logo {
  font-weight: var(--weight-bold);
  font-size: var(--text-dash-h1);
  white-space: nowrap;
  overflow: hidden;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-dash);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: var(--text-dash-body);
  transition: var(--transition-default);
  white-space: nowrap;
}

.sidebar__item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.sidebar__item--active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left: 3px solid var(--color-accent-500);
}

.sidebar__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar--open {
    transform: translateX(0);
  }
}
```

### 6.3 Breadcrumbs

```
Home  ›  Catalogue  ›  Lace  ›  Premium French Lace
```

```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-body-sm);
  color: var(--color-neutral-500);
  margin-bottom: var(--space-4);
}

.breadcrumbs__item {
  color: var(--color-neutral-500);
  text-decoration: none;
}
.breadcrumbs__item:hover { color: var(--color-primary-500); }

.breadcrumbs__separator {
  color: var(--color-neutral-300);
}

.breadcrumbs__item--current {
  color: var(--color-neutral-800);
  font-weight: var(--weight-medium);
}
```

---

## 7. Feedback & Messaging

### 7.1 Toast / Notification

```
 ┌──────────────────────────────────────────────┐
 │ ✅ Order placed successfully!          [ ✕ ]  │  ← Success
 └──────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────┐
 │ ⚠️ Low stock: Royal Blue Lace (3 left) [ ✕ ] │  ← Warning
 └──────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────┐
 │ ✕ Payment failed. Please try again.   [ ✕ ] │  ← Error
 └──────────────────────────────────────────────┘
```

**Position:** Top-right (desktop), top-centre (mobile)  
**Auto-dismiss:** Success (4s), Info (5s), Warning (sticky), Error (sticky)

```css
.toast-container {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 420px;
}

@media (max-width: 640px) {
  .toast-container {
    left: var(--space-4);
    right: var(--space-4);
    top: var(--space-4);
    max-width: none;
  }
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid;
  animation: slideInRight 300ms var(--ease-out);
}

.toast--success { border-left-color: var(--color-success-500); }
.toast--warning { border-left-color: var(--color-warning-500); }
.toast--error   { border-left-color: var(--color-error-500); }
.toast--info    { border-left-color: var(--color-info-500); }

.toast__icon { font-size: var(--text-body-lg); flex-shrink: 0; }
.toast__message { flex: 1; font-size: var(--text-body-sm); }
.toast__dismiss {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-neutral-400);
  padding: var(--space-1);
}
.toast__dismiss:hover { color: var(--color-neutral-800); }

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

### 7.2 Empty State

```
  ┌─────────────────────────────────────┐
  │                                     │
  │      🛒 (illustration)              │
  │                                     │
  │      Your cart is empty             │
  │      Looks like you haven't         │
  │      added any fabric yet.          │
  │                                     │
  │    [  Browse Fabrics  ]             │
  │                                     │
  └─────────────────────────────────────┘
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.empty-state__illustration {
  width: 120px;
  height: 120px;
  margin-bottom: var(--space-6);
  color: var(--color-neutral-300);
}

.empty-state__title {
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--color-neutral-800);
  margin-bottom: var(--space-2);
}

.empty-state__description {
  font-size: var(--text-body);
  color: var(--color-neutral-500);
  max-width: 400px;
  margin-bottom: var(--space-6);
}
```

### 7.3 Inline Alert

```
┌──────────────────────────────────────────────────────┐
│ ⚠️ This will permanently delete the fabric and all   │
│    its colour variants. This action cannot be undone. │
└──────────────────────────────────────────────────────┘
```

```css
.alert {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-body-sm);
  line-height: var(--leading-normal);
}

.alert--info    { background: var(--color-info-50);    color: var(--color-info-700); }
.alert--success { background: var(--color-success-50); color: var(--color-success-700); }
.alert--warning { background: var(--color-warning-50); color: var(--color-warning-700); }
.alert--error   { background: var(--color-error-50);   color: var(--color-error-600); }

.alert__icon { flex-shrink: 0; font-size: var(--text-body-lg); }
.alert__content { flex: 1; }
.alert__title { font-weight: var(--weight-semibold); margin-bottom: var(--space-1); }
```

---

## 8. Motion & Animation

### 8.1 Principles

- **Subtle:** Motion should enhance, not distract. 250ms default.
- **Purposeful:** Animate to communicate state change (open/close, add/remove, success/error).
- **Performant:** Use `transform` and `opacity` only (GPU-accelerated). Avoid animating `width`, `height`, `top`, `left`.

### 8.2 Duration Map

| Interaction | Duration | Easing |
|---|---|---|
| Button hover / active | 150ms | ease-out |
| Modal enter | 250ms | ease-out (spring-like) |
| Modal exit | 200ms | ease-in |
| Dropdown open | 200ms | ease-out |
| Dropdown close | 150ms | ease-in |
| Page transition (SPA) | 300ms | ease-in-out |
| Toast slide in | 300ms | ease-out |
| Toast slide out | 200ms | ease-in |
| Accordion expand | 250ms | ease-out |
| Skeleton shimmer | 1.5s (loop) | linear |
| Colour swatch hover | 150ms | ease-out |

### 8.3 Shared Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes slideUp {
  from { transform: translateY(8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Accessibility

### 9.1 Colour Contrast

All text/background combinations must meet WCAG 2.1 AA standards:

| Token Pair | Contrast Ratio | Passes AA |
|---|---|---|
| `--color-primary-500` on white | 8.5:1 | ✅ |
| `--color-primary-500` on `--color-primary-50` | 5.2:1 | ✅ |
| `--color-neutral-900` on white | 15.3:1 | ✅ |
| `--color-neutral-500` on white | 4.6:1 | ✅ (large text only) |
| `--color-accent-500` on white | 2.8:1 | ❌ (use on dark bg only) |
| White on `--color-primary-500` | 8.5:1 | ✅ |
| `--color-error-500` on white | 5.8:1 | ✅ |
| `--color-success-500` on white | 4.8:1 | ✅ |

> **Rule:** Warm Gold (`--color-accent-500`) must only be used as text on dark backgrounds (min. `--color-neutral-700`) or as a background colour with large/white text. Never use it as body text on white.

### 9.2 Focus Indicators

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Remove focus for mouse clicks */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 9.3 Interactive Element Minimum Target Size

- All touch targets: minimum 44×44px (WCAG 2.5.8)
- Applies to: buttons, links, icons, swatches, stepper buttons

### 9.4 Keyboard Navigation

- All interactive elements must be reachable via Tab
- Modal: trap focus while open, close on Escape
- Dropdowns: open on Enter/Space, navigate with Arrow keys, close on Escape
- Data tables: sortable headers are buttons with `role="columnheader"`
- Tab order follows visual order (left-to-right, top-to-bottom)

### 9.5 Screen Reader Support

```html
<!-- Loading state -->
<button aria-busy="true" aria-label="Submitting order...">Save</button>

<!-- Badge with status -->
<span class="badge badge--success" role="status">
  <span class="sr-only">Status:</span> In Stock
</span>

<!-- Icon-only button -->
<button aria-label="Close modal">
  <IconX aria-hidden="true" />
</button>

<!-- Live region for dynamic updates -->
<div aria-live="polite" aria-atomic="true">
  Cart updated: 3 items (₦45,000)
</div>

<!-- Toast notifications -->
<div role="alert" aria-live="assertive">
  Order placed successfully.
</div>
```

```css
/* Screen-reader-only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 9.6 Form Accessibility

- Every input must have an associated `<label>` (explicit `for`/`id` or `aria-label`)
- Error messages use `aria-describedby` on the input
- Required fields marked with `required` attribute and `*` in label
- Grouped checkboxes/radios use `<fieldset>` and `<legend>`

---

## 10. Dashboard-Specific Patterns

### 10.1 Dashboard Page Shell

Every dashboard page follows this structure:

```html
<div class="page">
  <header class="page__header">
    <div>
      <h1 class="page__title">Orders</h1>
      <nav class="breadcrumbs">...</nav>
    </div>
    <div class="page__actions">
      <button>Export</button>
      <button class="btn btn--primary">Create</button>
    </div>
  </header>
  <div class="page__content">
    <!-- Table / cards / form -->
  </div>
</div>
```

```css
.page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  gap: var(--space-4);
}

.page__title {
  font-size: var(--text-dash-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-neutral-900);
}

.page__actions {
  display: flex;
  gap: var(--space-3);
  flex-shrink: 0;
}
```

### 10.2 Dashboard Filter Bar

```css
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-dash);
}

.filter-bar__group {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.filter-bar__label {
  font-size: var(--text-dash-sm);
  color: var(--color-neutral-500);
  font-weight: var(--weight-medium);
}
```

### 10.3 KPI Cards Row

```css
.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
```

### 10.4 Dashboard Colour Usage

| Purpose | Token |
|---|---|
| Sidebar background | `--color-neutral-800` |
| Sidebar text (default) | `rgba(255,255,255,0.7)` |
| Sidebar text (active) | `#FFFFFF` |
| Sidebar active indicator | `--color-accent-500` (left border) |
| Top bar background | `--color-surface` |
| Top bar border | `--color-border` |
| Page background | `--color-surface-dashboard` |
| Data table header | `--color-neutral-50` |
| Data table border | `--color-border` |
| Card background | `--color-surface` |
| Card border | `--color-border` |

---

## 11. Implementation Notes

### 11.1 CSS Architecture

Recommended approach: **CSS Modules** with design tokens as CSS custom properties.

```
styles/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── shadows.css
├── base/
│   ├── reset.css
│   └── global.css
├── components/
│   ├── Button.module.css
│   ├── Input.module.css
│   ├── Modal.module.css
│   └── ...
└── utilities/
    ├── layout.css
    └── animations.css
```

### 11.2 Component Naming Convention

| Pattern | Example |
|---|---|
| **Store components** | `Button.tsx` → exports `<Button>` |
| **Dashboard components** | `DataTable.tsx` → exports `<DataTable>` |
| **Shared components** | `packages/shared/src/ui/Modal.tsx` |
| **Composed components** | `ProductCard.tsx` (composes Button, Badge, ColorSwatch) |
| **Page components** | `app/products/[id]/page.tsx` (Next.js App Router) |

### 11.3 Component Props Convention

```typescript
// Shared component pattern
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
}
```

### 11.4 Responsive Breakpoints Reference

| Breakpoint | Width | Target |
|---|---|---|
| `xs` | < 640px | Mobile portrait |
| `sm` | 640px+ | Mobile landscape |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Desktop |
| `xl` | 1280px+ | Wide desktop |
| `2xl` | 1536px+ | Max content |

### 11.5 Design-to-Dev Handoff

- All colour values, spacing, typography, and shadows are defined as CSS custom properties in a single token file
- Component specs are in this document; deviations should be rare and documented
- New components should be added to this document before implementation
- Visual regression tests are recommended for all core components

---

*This design system is a living document. Update it as new components are added, patterns evolve, or accessibility improvements are identified.*
