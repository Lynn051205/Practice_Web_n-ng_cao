# Performance Measurement Guide

This folder is reserved for the Lighthouse measurement artifacts for this project.

## Before optimization

1. Run the production build.
2. Start the preview server.
3. Open Chrome DevTools.
4. Go to Lighthouse.
5. Use Navigation mode, Desktop device, and analyze the page.
6. Save the screenshot as `lighthouse-before.png` in this folder.

## After optimization

1. Repeat the same steps after the performance pass.
2. Save the screenshot as `lighthouse-after.png` in this folder.

## Notes

- Do not fabricate results.
- Run Lighthouse 2-3 times and keep the most stable result.
- Keep the real values in `performance-data.md` once they are measured.
