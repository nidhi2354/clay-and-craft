# Zivonix — Shop Smarter, Live Better

Storefront for **Zivonix** (zivonix.com), a multi-category online store:
toys, sports, gifts, watches, fashion, stationery, electronics, computer
accessories, home & decor and a flagship **handmade pottery** range.

**Client:** Sintu Kumar · Main Road, Mokama, Patna, Bihar 803302

## Stack

| | |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Icons | lucide-react |
| Lint | oxlint |

## Commands

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Structure

```
src/
├── main.jsx                  entry
├── App.jsx                   shell: TopBar + Header + page + Footer + bottom nav
├── index.css                 @theme design tokens — the only place colours live
│
├── data/                     all content, swap for API responses later
│   ├── site.js               brand, contact details, nav definitions
│   ├── categories.js         10 categories + subcategories
│   ├── products.js           catalogue + selectors (getBestSellers, getDeals…)
│   └── content.js            hero slides, promos, collections, reviews
│
├── hooks/
│   └── useCountdown.js       live deal timer
│
├── components/
│   ├── layouts/              TopBar, Header, Footer, MobileBottomNav
│   ├── common/               Logo, Button, Section, SectionHeading,
│   │                         StarRating, ProductCard, ProductRail
│   └── home/                 one file per home-page section
│
└── pages/
    └── Home.jsx              section composition
```

## Conventions

**Colours never appear as hex in a component.** Every colour is a token
defined in `src/index.css` under `@theme` (`navy-*`, `gold-*`, `clay-*`,
`ink-*`, `brand-*`). Change a value there and the whole site follows.

**Content lives in `src/data/`, not in JSX.** Sections read from the
selectors in `products.js`. When the backend is ready, replace the array
with the API response — the selectors keep their shape, so no component
changes.

**`Section` owns page rhythm.** Every home block wraps in
`<Section>`, which sets max width, gutters and vertical spacing. Sections
never set their own container width.

**`ProductRail` owns responsive product layout.** Horizontal snap rail on
mobile, grid on desktop. New product sections reuse it rather than writing
another responsive layout.

## Responsive behaviour

| Breakpoint | Layout |
|---|---|
| `< 640px` | Single column, product rails scroll horizontally, fixed bottom nav, drawer menu |
| `640–1024px` | Two-up grids, arrows appear on the hero |
| `≥ 1024px` | Full desktop nav row with the All Categories dropdown, 5–6 column product grids, top utility bar |

## Not built yet

- Routing — every link is an in-page anchor. Add `react-router-dom` when
  Shop / Product / Cart / About pages exist.
- Cart and wishlist state — counts in `Header.jsx` and `MobileBottomNav.jsx`
  are placeholders.
- Search — the field is inert; wire it to the catalogue or a search API.
- Images are Unsplash placeholders. Replace the URLs in `data/products.js`,
  `data/categories.js` and `data/content.js` with the client's own photography.
- Newsletter form does not submit anywhere.
