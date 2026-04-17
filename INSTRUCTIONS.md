# Sample Frontend Architecture & Standards

**Last Updated:** April 2026  
**Framework:** Next.js 16.2.0 with Turbopack  
**Package Manager:** npm  
**Language:** JavaScript (JSX/TSX)  
**Styling:** Tailwind CSS 4 + PostCSS

---

## 📋 Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Project Structure](#project-structure)
3. [Component Type Decisions](#component-type-decisions)
4. [Architectural Laws](#architectural-laws)
5. [Performance Standards](#performance-standards)
6. [File Naming & Organization](#file-naming--organization)
7. [Import Standards](#import-standards)
8. [Testing & Validation](#testing--validation)

---

## Tech Stack Overview

### Core Dependencies

- **Next.js 16.2.0** - React framework with app router, SSR, static generation, Turbopack bundler
- **React 19.2.4** - UI library with hooks, server components, automatic batching
- **next-intl 4.8.3** - Internationalization (i18n) for EN/ES with locale detection via cookies
- **lucide-react 0.577.0** - Icon library (~500 icons, tree-shakeable)
- **Tailwind CSS 4** - Utility-first CSS framework with custom CSS plugin
- **PostCSS 4** - CSS transformation pipeline

### Dev Dependencies

- **ESLint 9** - Code quality & linting
- **Prettier 3.8.3** - Code formatting with tailwindcss plugin
- **TypeScript** - Optional; project uses JSX without TypeScript

### Key Characteristics

- **Server-First Architecture:** Next.js App Router with server components by default
- **Streaming Ready:** Supports React Server Components and Suspense
- **Edge Runtime:** Compatible with Vercel Edge Functions and middleware
- **Build Speed:** Turbopack ~5-10x faster than Webpack for most projects

---

## Project Structure

```
sample-frontend/
├── src/
│   ├── app/                              # App Router pages (Next.js 13+)
│   │   ├── layout.js                     # Root layout (fonts, providers, nav, footer)
│   │   ├── page.js                       # Home page
│   │   ├── globals.css                   # Global CSS + Tailwind directives
│   │   ├── business-opportunities/       # Feature page (SSR)
│   │   ├── business-solutions/           # Feature page (SSR)
│   │   ├── privacy-policy/               # Feature page (SSR)
│   │   ├── testing-services/             # Dynamic routes for products
│   │   ├── covid-19/                     # Static/dynamic feature page
│   │   ├── about/                        # Static feature page
│   │   ├── contact/                      # Form page (SSR)
│   │   └── [locale]/                     # i18n route segment (optional structure)
│   │
│   ├── components/                       # Shared UI components
│   │   ├── common/                       # Global shared components
│   │   │   ├── SiteNavbar.jsx            # Client: Navigation with scroll detection
│   │   │   ├── SiteFooter.jsx            # Server: Footer with translations
│   │   │   ├── RouteScrollReset.jsx      # Client: Auto-scroll on navigation
│   │   │   ├── FloatingLocaleSwitcher.jsx# Client: Language toggle (bottom-right)
│   │   │   └── AITestFinderModal.jsx     # Client: Interactive modal with AI logic
│   │   │
│   │   ├── home/                         # Home page components
│   │   │   ├── HomePage.jsx              # Client: Main home component (stateful)
│   │   │   ├── HomePageShared.jsx        # Shared: Exported subcomponent utilities
│   │   │   ├── useHomePageInteractions.js # Custom hook: Carousel, scroll tracking
│   │   │   └── sections/                 # Home subsections
│   │   │       ├── HomeHeroSection.jsx   # Hero with carousel
│   │   │       ├── HomeServicesSection.jsx
│   │   │       ├── HomeWhyChooseSection.jsx
│   │   │       ├── HomeFaqSection.jsx    # Accordion component
│   │   │       ├── HomeAppointmentSection.jsx
│   │   │       ├── HomeProcessSection.jsx
│   │   │       ├── HomeReviewsSection.jsx
│   │   │       └── HomeBreadcrumbs.jsx
│   │   │
│   │   └── testing-services/             # Product catalog components
│   │       ├── TestingServicesPage.jsx   # Client: Filters, pagination, search
│   │       ├── TestingServiceDetailsPage.jsx # Client: Product details & variants
│   │       └── components/
│   │           ├── TestingServiceCard.jsx       # Memoized product card
│   │           ├── TestingServicesHero.jsx      # Hero section
│   │           ├── TestingServicesFilters.jsx   # Category/search filters
│   │           ├── TestingServicesPagination.jsx# Page navigation
│   │           └── TestingServicesEmptyState.jsx# Fallback UI
│   │
│   ├── lib/                              # Utility functions
│   │   ├── api.js                        # Fetch functions (products, categories)
│   │   ├── locale.js                     # i18n helpers (cookie-based)
│   │   └── i18n-utils.js                 # Translation utilities
│   │
│   ├── hooks/                            # Global custom hooks (if any)
│   │   └── [hook-files]
│   │
│   └── i18n/
│       └── request.js                    # i18n configuration
│
├── locales/
│   ├── en/
│   │   ├── common.json                   # Shared/global copy
│   │   ├── home.json                     # Home page domain copy
│   │   ├── testing.json                  # Testing services/domain copy
│   │   ├── business.json                 # Business domain copy
│   │   ├── services.json                 # Service pages domain copy
│   │   └── company.json                  # About/contact/trust/privacy copy
│   └── es/
│       ├── common.json
│       ├── home.json
│       ├── testing.json
│       ├── business.json
│       ├── services.json
│       └── company.json
│
├── public/
│   └── images/                           # Static images
│       └── bannerSlider/
│
├── next.config.mjs                       # Next.js configuration
├── tailwind.config.js                    # Tailwind configuration
├── postcss.config.mjs                    # PostCSS plugins
├── jsconfig.json                         # Path aliases (@/), module settings
├── eslint.config.mjs                     # ESLint rules
└── package.json                          # Dependencies & scripts
```

### Naming Conventions

**Files:**

- Page components: `page.js` (App Router standard)
- Components: `ComponentName.jsx` (PascalCase, JSX extension recommended)
- Hooks: `useHookName.js` (camelCase with use prefix)
- Utils: `utilityName.js` (camelCase, descriptive)
- Styles: Tailwind classes (no separate CSS files unless global)

**Directories:**

- Feature folders: `kebab-case` (e.g., `testing-services`, `business-solutions`)
- Component folders: `PascalCase` optional (e.g., `components/common/`)
- Logical grouping: By feature > by type

---

## Component Type Decisions

### 🟢 Server Components (Default)

**When to use:**

- Pages that only render static/translated content
- Components without interactivity
- Data fetching from backend/database
- Sensitive operations (auth, payments)

**Examples:**

- `/app/about/page.js` - Async server component with markdown/copy
- `/app/privacy-policy/page.js` - Static policy with translations
- `/app/business-solutions/page.js` - Marketing page with no interactive state
- `SiteFooter.jsx` - Footer with translated links
- `SiteNavbar.jsx` - ⚠️ **EXCEPTION**: Client due to scroll tracking + mobile menu

**Pattern:**

```javascript
// ✅ Server Component (default)
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export async function generateMetadata() {}

export default async function PageComponent() {
	const cookieStore = await cookies();
	const t = await getTranslations({ namespace: 'PageKey' });
	return <main>{/* static JSX */}</main>;
}
```

### 🔵 Client Components (Selective)

**When to use:**

- Interactive features (clicks, toggles, form inputs)
- Browser APIs (localStorage, geolocation, scroll events)
- State management (useState, useReducer)
- Hooks (useEffect, useMemo, useCallback)
- Real-time updates

**Examples:**

- `HomePage.jsx` - State for carousel, FAQ, section tracking
- `TestingServicesPage.jsx` - Filters, search, pagination
- `SiteNavbar.jsx` - Scroll detection, mobile menu toggle
- `BusinessOpportunitiesFaq.jsx` - FAQ accordion expand/collapse
- `AITestFinderModal.jsx` - Interactive wizard with steps

**Pattern:**

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl'; // Client-side i18n

export default function ClientComponent() {
	const [state, setState] = useState(null);
	const t = useTranslations('PageKey');
	return <div>{/* interactive JSX */}</div>;
}
```

### ⚠️ Hybrid Approach

**Strategy:** Server page + Client subsection

**Use when:**

- Page is mostly static but has one interactive section
- Want to minimize client-side bundle

**Example:**

```javascript
// /app/business-opportunities/page.js (Server)
import BusinessOpportunitiesFaq from './BusinessOpportunitiesFaq';

export default async function Page() {
  const faqs = await getTranslations(...);
  return (
    <main>
      {/* Static sections */}
      <BusinessOpportunitiesFaq faqs={faqs} /> {/* Client component */}
    </main>
  );
}

// ./BusinessOpportunitiesFaq.jsx (Client)
'use client';
export default function BusinessOpportunitiesFaq({ faqs }) {
  const [expanded, setExpanded] = useState(null);
  return <section>{/* interactive */}</section>;
}
```

### 🎯 Decision Tree

```
Does component need interactivity?
├─ YES → Client Component ('use client')
└─ NO → Does it fetch data?
    ├─ YES → Server Component (async)
    └─ NO → Server Component (static)
```

---

## Architectural Laws

### Law 1: Server-by-Default

- **Rule:** Always make components Server Components unless you have a specific reason for interactivity
- **Rationale:** Reduces client-side JavaScript, improves Core Web Vitals, faster initial load
- **Exception:** Browser APIs, real-time updates, form state

### Law 2: Translate on the Server

- **Rule:** Use `getTranslations()` in Server Components; `useTranslations()` only in Client Components
- **Rationale:** Server-side translation = no client-side bundle bloat, no runtime lookup lag
- **Pattern:**

  ```javascript
  // ❌ Wrong
  'use client';
  const t = useTranslations('Page'); // Heavy client code

  // ✅ Right (Server)
  const t = await getTranslations({ namespace: 'Page' }); // Compile-time
  ```

### Law 3: Memoize List Items

- **Rule:** Components rendered in `.map()` should be `React.memo()` if props are stable
- **Rationale:** Prevents unnecessary re-renders when parent updates
- **Apply to:**
  - `TestingServiceCard` - Rendered in product grid
  - `WhyChooseFeatureCard` - Rendered in feature lists
  - Other card components in loops

**Pattern:**

```javascript
// ❌ Without memo (re-renders on parent update)
function ProductCard({ product }) {
	return <div>{product.name}</div>;
}

// ✅ With memo (skips render if props unchanged)
const ProductCard = React.memo(function ProductCard({ product }) {
	return <div>{product.name}</div>;
});
```

### Law 4: Extract Utilities Out of Components

- **Rule:** Utility functions (formatPrice, parsePrice, summarizeText) must be in `/lib/` or separate files
- **Rationale:** Reusability, testability, tree-shaking optimization
- **Current Example:** Utilities inside `TestingServicesPage.jsx` should be in `lib/testing-utils.js`

### Law 5: Use Path Aliases

- **Rule:** Always use `@/` alias for imports (configured in jsconfig.json)
- **Rationale:** Cleaner imports, easier refactoring
- **Pattern:**

  ```javascript
  // ❌ Wrong
  import Layout from '../../../components/common/Layout';

  // ✅ Right
  import Layout from '@/components/common/Layout';
  ```

### Law 6: Lazy Load Heavy Components

- **Rule:** Large components or code-split features use `next/dynamic` with `ssr: false` if client-only
- **Rationale:** Reduces initial page load, improves time-to-interactive
- **Current:** `AITestFinderModal` is a good candidate

**Pattern:**

```javascript
import dynamic from 'next/dynamic';

const AITestFinderModal = dynamic(() => import('@/components/common/AITestFinderModal'), {
	loading: () => <div>Loading...</div>,
});
```

### Law 7: Handle Errors Gracefully

- **Rule:** Async operations must have try/catch; display fallbacks to users
- **Rationale:** Production reliability, better UX
- **Pattern:**
  ```javascript
  try {
  	const data = await fetchAPI();
  } catch (error) {
  	console.error('API Error:', error);
  	return <ErrorFallback />;
  }
  ```

### Law 8: Metadata for Every Page

- **Rule:** Every page file must export `generateMetadata()` for SEO
- **Rationale:** OpenGraph, Twitter, search engine optimization
- **Pattern:**
  ```javascript
  export async function generateMetadata() {
  	const t = await getTranslations();
  	return {
  		title: t('metadata.title'),
  		description: t('metadata.description'),
  	};
  }
  ```

### Law 9: Zero Hardcoded UI Copy

- **Rule:** All user-visible text (labels, headings, buttons, helper text, badges, empty states, CTA copy) must come from locale files only.
- **Rationale:** Guarantees parity between EN/ES, prevents untranslated regressions, and keeps content maintainable.
- **Do not hardcode:** `'Submit'`, `'Loading...'`, `'Call Now'`, `'Includes:'`, etc.
- **Allowed exceptions:** non-user-facing technical strings (IDs, CSS classes, route paths, API field names).

---

## Performance Standards

### Bundle & Runtime

**Target Metrics:**

- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total JS Bundle: < 150KB (gzipped)

**Optimization Techniques:**

1. **Server Components:** Minimize client JS
2. **Code Splitting:** Use dynamic imports for heavy features
3. **Memoization:** React.memo + useMemo for expensive computations
4. **Image Optimization:** Next.js Image component with lazy loading
5. **Caching:** HTTP caching headers, browser caching

### Image Handling

**Rules:**

- Always use `next/image` Image component (not `<img>`)
- Set explicit `width` and `height` for static images
- Use `priority` prop for above-fold images only
- Lazy load images below fold (default behavior)
- Compress images: WebP format, ~600px for thumbnails

**Pattern:**

```javascript
import Image from 'next/image';

{
	/* Above fold */
}
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />;

{
	/* Below fold (default lazy) */
}
<Image src="/card.jpg" alt="Card" width={300} height={300} />;
```

### CSS & Styling

**Rules:**

- Use Tailwind utilities (no custom CSS except globals)
- Group related styles: spacing, colors, typography
- Use CSS variables for theming: `--tl-primary`, `--tl-accent`
- Avoid inline styles
- Animate with Tailwind transition utilities

**Gradient Pattern (Signature):**

```html
<!-- Blue gradient hero (consistent across business pages) -->
bg-gradient-to-br from-[var(--tl-primary)] via-[#0b68c8] to-[#3ca2f5]
```

---

## File Naming & Organization

### Component Files

| Type             | Pattern             | Example                                       |
| ---------------- | ------------------- | --------------------------------------------- |
| Page             | `page.js`           | `/app/about/page.js`                          |
| Server Component | `ComponentName.jsx` | `/components/common/SiteFooter.jsx`           |
| Client Component | `ComponentName.jsx` | `/components/home/HomePage.jsx`               |
| Custom Hook      | `useHookName.js`    | `/components/home/useHomePageInteractions.js` |
| Utility          | `utilityName.js`    | `/lib/api.js`                                 |
| Constants        | `CONSTANT_NAME.js`  | `/lib/constants.js`                           |

### Directory Structure Rules

1. **Feature-based grouping** (preferred over type-based)

   ```
   ❌ BAD:  components/ → buttons/, cards/, modals/
   ✅ GOOD: components/ → home/, testing-services/, business/
   ```

2. **Logical depth** (max 3-4 levels)

   ```
   ✅ src/components/home/sections/HomeHeroSection.jsx
   ❌ src/ui/layout/sections/home/hero/HeroSection.jsx (too deep)
   ```

3. **Co-locate related files**
   ```
   /app/business-opportunities/
   ├── page.js (main server component)
   ├── BusinessOpportunitiesFaq.jsx (client subcomponent)
   └── layout.js (if needed)
   ```

---

## Import Standards

### Order of Imports (Enforce with Prettier)

1. React/Next.js core
2. External packages (npm, lucide-react)
3. Internal components (@/components)
4. Internal lib/utils (@/lib)
5. Internal styles
6. Types (future TypeScript)

**Example:**

```javascript
// ✅ Correct order
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CheckCircle, ArrowRight } from 'lucide-react';

import SiteFooter from '@/components/common/SiteFooter';
import { fetchProducts } from '@/lib/api';
import { formatPrice } from '@/lib/formatting';
```

### Alias Usage

**jsconfig.json Configuration:**

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

**Usage:**

- `@/components` - Any component
- `@/lib` - Utilities & helpers
- `@/hooks` - Custom hooks
- `@/styles` - Global styles (if any)

---

## Testing & Validation

### Pre-Commit Checks

**Commands:**

```bash
npm run lint      # ESLint check
npm run format    # Prettier auto-fix
npm run build     # Full build validation
npm run dev       # Local testing
```

**ESLint Rules:**

- No unused variables
- No console.log in production
- Require React import (if using JSX without React 17+)
- No prop spreading (enforces explicit props)

### Performance Validation

1. **Lighthouse:** `npm run build` → Check bundle analysis
2. **Next.js Analysis:** `ANALYZE=true npm run build`
3. **Image Optimization:** Check all images use `next/image`
4. **API Calls:** Verify no N+1 queries, proper caching

### Browser Testing

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile: iOS Safari, Android Chrome

**Viewport Sizes:**

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+

---

## Translation & i18n

### Adding Translations

### Locale File Strategy

- Use domain-based locale files under `locales/en/*.json` and `locales/es/*.json`.
- Load all locale chunks through `src/i18n/loadMessages.js`.
- Do not reintroduce monolithic `messages/en.json` or `messages/es.json` files.
- Keep key names stable by page/component namespace (e.g. `BusinessSolutionPage`, `TestingServicesPage`, `LocalizationCommon`).

1. **Namespace structure:** Group by page/feature

   ```json
   {
   	"HomePage": {
   		/* home page strings */
   	},
   	"BusinessSolutionPage": {
   		/* business page strings */
   	},
   	"ContactPage": {
   		/* contact page strings */
   	}
   }
   ```

2. **Server-side access:**

   ```javascript
   const t = await getTranslations({ namespace: 'PageName' });
   const text = t('keyPath');
   ```

3. **Client-side access:**

   ```javascript
   const t = useTranslations('PageName');
   const text = t('keyPath');
   ```

4. **Raw data objects:**
   ```javascript
   const items = t.raw('items'); // Returns array/object
   ```

### Locale Detection

- **Method:** Cookie-based via `getLocaleFromCookieStore()`
- **Default:** English (EN)
- **Supported:** EN, ES
- **Switch:** FloatingLocaleSwitcher component (bottom-right)

---

## Build & Deployment

### Build Process

```bash
npm run build   # Turbopack compilation
```

**Outputs:**

- `.next/` - Build artifacts
- Static pages - SSG
- Server functions - API routes
- Config validation

### Environment Variables

**Required:** None for development  
**Optional:** (API endpoints, analytics keys, etc.)

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Deployment

- **Platform:** Vercel (recommended) or any Node.js host
- **Node Version:** 18+
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

---

## Common Patterns & Code Examples

### Pattern: Server Component with Async Data

```javascript
export async function generateMetadata() {
	const messages = await import(`../../../messages/en.json`);
	return { title: messages.PageTitle };
}

export default async function Page() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale, namespace: 'PageKey' });

	const data = await fetchData(); // Any async operation

	if (!data) return <NotFound />;

	return (
		<main>
			<h1>{t('title')}</h1>
			<p>{t('description')}</p>
		</main>
	);
}
```

### Pattern: Client Component with Interactivity

```javascript
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

export default function InteractiveComponent({ items }) {
	const t = useTranslations('ComponentKey');
	const [filter, setFilter] = useState('');

	const filtered = useMemo(() => items.filter((item) => item.name.includes(filter)), [items, filter]);

	return (
		<section>
			<input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={t('filterPlaceholder')} />
			{filtered.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</section>
	);
}
```

### Pattern: Memoized List Item

```javascript
import React from 'react';

const ProductCard = React.memo(function ProductCard({ product, t, formatPrice }) {
	return (
		<article className="rounded-lg border bg-white p-4">
			<h3>{product.name}</h3>
			<p>{formatPrice(product.price)}</p>
			<button>{t('addToCart')}</button>
		</article>
	);
});

export default ProductCard;
```

### Pattern: Server + Client Hybrid

```javascript
// /app/business-opportunities/page.js (Server)
import BusinessOpportunitiesFaq from './BusinessOpportunitiesFaq';

export default async function Page() {
  const t = await getTranslations({ namespace: 'BusinessOpportunitiesPage' });
  const faqs = t.raw('faq.questions');

  return (
    <main>
      <h1>{t('title')}</h1>
      <StaticSection />
      <BusinessOpportunitiesFaq faqs={faqs} /> {/* Client interactivity */}
    </main>
  );
}

// ./BusinessOpportunitiesFaq.jsx (Client)
'use client';
export default function BusinessOpportunitiesFaq({ faqs }) {
  const [expanded, setExpanded] = useState(null);
  return <section>{/* FAQ UI */}</section>;
}
```

---

## Troubleshooting

### Common Issues

| Issue                                   | Solution                                                       |
| --------------------------------------- | -------------------------------------------------------------- |
| `useTranslations()` in Server Component | Use `getTranslations()` async instead                          |
| Images not optimizing                   | Add `width`, `height` to Image component                       |
| Page not rendering                      | Check `generateMetadata()` doesn't error                       |
| Bundle too large                        | Run `ANALYZE=true npm run build`                               |
| Flickering on navigation                | Check for hydration mismatches, use `suppressHydrationWarning` |

---

## Future Enhancements

1. **TypeScript migration** - Full type safety
2. **E2E testing** - Playwright or Cypress
3. **CMS integration** - Decoupled content management
4. **Advanced caching** - SWR, Redis, CDN strategies
5. **Monitoring** - Sentry, PostHog analytics
6. **Feature flags** - A/B testing, gradual rollouts

---

## References & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs
- **next-intl:** https://next-intl-docs.vercel.app
- **lucide-react:** https://lucide.dev

---

**Document Owner:** AI Agent  
**Last Review:** April 2026  
**Next Review:** Quarterly or after major architectural changes
