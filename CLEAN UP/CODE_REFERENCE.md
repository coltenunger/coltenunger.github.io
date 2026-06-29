# Code Structure & Naming Reference

## File Organization

```
/css/
  └─ styles.css          (All styling, organized by section)

/js/
  ├─ utils.js            (NEW: Shared helper functions)
  ├─ index.js            (Home page logic)
  ├─ selected.js         (Project detail page logic)
  ├─ info.js             (Info page logic)
  ├─ audio.js            (Entry blur & audio)
  └─ transition.js       (Page fade transitions)

/json/
  └─ details.json        (Project data)

/components/
  └─ nav-header.html     (Reusable nav component)

/
  ├─ index.html          (Home page)
  ├─ selected.html       (Project detail page)
  └─ info.html           (Info page)
```

## CSS Classes

### Naming Convention: `[feature]-[element]` or `[feature]`

| Class | Purpose | Used On |
|-------|---------|---------|
| `.navbar` | Top navigation bar | `<div>` |
| `.logo` | Logo/home link | `<a>` |
| `.nav-toggle` | Info/Index toggle button | `<a>` |
| `.plain-link` | Link with no decoration | `<a>` |
| `.project-list` | Main project footer | `<footer>` |
| `.project-link` | Individual project item | `<a>` |
| `.project-link.dimmed` | Dimmed inactive items | (state class) |
| `.project-link.coming-soon` | Placeholder project | (state class) |
| `.project-name` | Project title | `<span>` |
| `.project-category` | Project category | `<span>` |
| `.project-year` | Project year | `<span>` |
| `.sakura-container` | Background video wrapper | `<div>` |
| `.slideshow` | Image slideshow grid | `<div>` |
| `.project-details` | Project info footer | `<div>` |
| `.detail` | Info section | `<div>` |
| `.description` | Project description text | `<span>` |
| `.credit-link` | Credit attribution link | `<a>` |
| `.info-wrapper` | Info page layout | `<div>` |
| `.bio` | Bio text section | `<div>` |
| `.email` | Email link | `<a>` |
| `.nav-zone` | Clickable navigation area | `<div>` |
| `.nav-zone.prev` | Left click zone | (modifier) |
| `.nav-zone.next` | Right click zone | (modifier) |
| `.visible` | Show/visible state | (state class) |
| `.dimmed` | Reduced opacity state | (state class) |
| `.active` | Active/current state | (state class) |
| `.hidden` | Hide/hidden state | (state class) |
| `.fade-in` | Overlay active state | (state class) |

## CSS Variables

### Color & Visual
```css
--pad          /* Global padding (1rem) */
--trans        /* Primary transition (0.5s) */
--trans-fast   /* Fast transition (0.3s) */
--dimmed       /* Dimmed opacity (0.15) */
```

### Z-Index Scale (use these consistently)
```css
--z-bg         /* Background layer (-2) */
--z-content    /* Content layer (-1) */
--z-ui         /* UI elements (10) */
--z-nav        /* Navigation bar (20) */
--z-modal      /* Modal/overlay elements (100) */
--z-top        /* Topmost layer (999) */
```

## JavaScript Functions

### Shared Utilities (utils.js)
```javascript
loadComponent(path, targetId)
  // Load HTML from file into a DOM element
  // Example: loadComponent("components/nav-header.html", "nav-header")

loadJSON(path)
  // Fetch and parse JSON data
  // Example: const projects = await loadJSON("json/details.json")

setNavToggle(text, href)
  // Set nav toggle button text and link
  // Example: setNavToggle("INFO", "/info.html")
```

### Page Scripts
- **index.js** → Renders project list with preview on hover
- **selected.js** → Builds slideshow for project detail pages
- **info.js** → Updates clock display every second
- **audio.js** → Manages blur wall entry and audio playback
- **transition.js** → Fades between pages on link click

## ID Attributes

| ID | Purpose | Used On |
|----|---------|---------|
| `#blur-overlay` | Entry blur wall | `<div>` |
| `#enter-btn` | Enter button | `<button>` |
| `#overlay` | Page transition overlay | `<div>` |
| `#bgm` | Background music audio | `<audio>` |
| `#sakura-container` | Video background | `<div>` |
| `#nav-header` | Nav component container | `<div>` |
| `#nav-toggle` | Info/Index toggle | `<a>` |
| `#preview-container` | Project preview images | `<div>` |
| `#preview-{slug}` | Individual preview image | `<img>` |
| `#slideshow` | Slideshow wrapper | `<div>` |
| `#prev-zone` | Left click zone | `<div>` |
| `#next-zone` | Right click zone | `<div>` |
| `#cursor-label` | Image counter | `<div>` |
| `#clock` | Current time display | `<span>` |
| `#copyright` | Copyright text | `<span>` |

## Data Attributes

Used to associate links with preview images:
```html
<a data-slug="mister-tiger" class="project-link">Mister Tiger</a>
<!-- Corresponds to -->
<img id="preview-mister-tiger" src="..." />
```

## Event Flow Examples

### Home Page
1. User hovers project link
2. `mouseenter` fires → shows preview image, hides sakura video
3. User leaves link
4. `mouseleave` fires → hides image, shows sakura video again
5. User clicks link → transition.js fades page → navigates to selected.html

### Project Detail Page
1. User hovers left side → cursor label shows image number
2. User clicks left side → previous image
3. User clicks right side → next image
4. Slideshow uses CSS Grid to stack images

### Info Page
1. Page loads
2. info.js updates clock every 1000ms
3. All links use transition.js for page fade

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
