# React Performance Optimization

## Project

This project demonstrates an optimized React + TypeScript product management interface for a simulated dataset of 10,000 products.

## Features

- Dashboard with summary statistics
- Product management UI
- 10,000 mock products
- Search, filter, and sorting
- Product detail page
- Before/after optimization structure
- Performance measurement guidance

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Performance Testing

1. Build production.
2. Run preview.
3. Open Chrome DevTools.
4. Use Lighthouse with Navigation mode and Desktop device.
5. Record the BEFORE result.
6. Capture the screenshot in `performance/lighthouse-before.png`.
7. Apply the optimization improvements.
8. Measure again and save the AFTER screenshot as `performance/lighthouse-after.png`.
9. Update `performance/performance-data.md` with the actual values.

## Performance Techniques

This project intentionally starts in the BEFORE phase with unoptimized rendering patterns in order to demonstrate real bottlenecks, including:

- Rendering all 10,000 product cards in one list
- Re-rendering product cards without memoization
- Running filter/sort logic on every render
- Loading product detail in the normal bundle instead of a code-split chunk

The optimization phase will add techniques such as virtualization, memoization, stable callbacks, memoized filtering, code splitting, and selected debounce patterns where appropriate.

