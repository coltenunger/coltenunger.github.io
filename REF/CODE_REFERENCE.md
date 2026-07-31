## Adding New Projects

1. Add object to `/json/details.json`
2. Upload images to `/assets/images/selected_works/{slug}/`
3. Files should be numbered: `1.jpg`, `2.jpg`, etc.
4. Set `photoFormat` to match extension
5. Set `photoCount` to number of images

## Mobile Breakpoint Strategy

Currently responsive breakpoint is set to `@media (max-width: 768px)`. You'll need to adjust:

- Navigation layout (consider hamburger menu)
- Project list layout (stacked vs side-by-side)
- Slideshow navigation (touch-friendly zones)
- Font sizes
- Padding/gaps
- `.nav-zone` widths (maybe 100% height with top/bottom instead of left/right)

Key things to consider for mobile:

- `.navbar` → stack or reduce padding
- `.project-list` → change from side layout to something more mobile-friendly
- `.project-details` → adjust gap and layout
- `.bio` → adjust width (currently 12rem)
- `.slideshow` / `.nav-zone` → adjust for touch navigation

Currently responsive breakpoint is set to `@media (max-width: 768px)`. You'll need to adjust:

- Navigation layout (consider hamburger menu)
- Project list layout (stacked vs side-by-side)
- Slideshow navigation (touch-friendly zones)
- Font sizes
- Padding/gaps
- `.nav-zone` widths (maybe 100% height with top/bottom instead of left/right)
