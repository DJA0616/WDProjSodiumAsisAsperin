# Generated with AI

# Utility-First CSS Refactoring Guide

## Overview
This project now includes comprehensive utility classes in `public/stylesheets/utils.css`. You can use utilities in **two ways**:

1. **Directly in HTML** (utility-first approach)
2. **Inside CSS** (composition approach)

---

## Using Utilities in HTML

### Before (component-heavy)
```html
<div class="greeting-section">
  <h1 class="greeting-header">Welcome</h1>
</div>
```

### After (utility-first)
```html
<div class="box-border rounded-2 p-1 d-flex flex-column align-center">
  <h1 class="font-sans text-responsive-md m-auto">Welcome</h1>
</div>
```

---

## Using Utilities in CSS (Composition)

You can extend utilities inside your component classes to reduce repetition:

### Before
```css
.modal-goal-name,
.modal-goal-details {
    background-color: white;
    border: 1px;
    box-sizing: border-box;
    border-radius: 1vw;
    padding: 1vw;
    box-shadow: 0vw 0vw 0.5vw lightgray;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
    text-shadow: 0 0 0.2vw lightgray;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    word-break: break-word;
}
```

### After (using utilities)
```css
.modal-goal-name,
.modal-goal-details {
    /* Apply utility patterns */
    @extend .bg-white, .box-border, .rounded-1, .p-1, .shadow-sm;
    @extend .font-sans, .text-center, .text-shadow, .word-wrap;
}
```

Or without `@extend` (plain CSS):
```css
.modal-goal-name,
.modal-goal-details {
    /* Only unique styles here */
}

/* Add utility classes directly in HTML */
<div class="modal-goal-name bg-white box-border rounded-1 p-1 shadow-sm font-sans text-center text-shadow word-wrap">
```

---

## Common Patterns

### Card Component
```html
<!-- Old way -->
<div class="goal-card">...</div>

<!-- Utility way -->
<div class="bg-gradient-primary border box-border rounded-1 p-1 d-flex justify-between gap-1 shadow-sm transition-fast scale-101">
  ...
</div>
```

### Flexbox Container
```html
<!-- Old -->
<div style="display: flex; gap: 1vw; flex-direction: column;">

<!-- New -->
<div class="d-flex flex-column gap-1">
```

### Progress Bar
```css
/* Old */
.progress-bar {
    position: relative;
    background-image: linear-gradient(#51ff77cc, #73ff00cc);
    transition: all 0.5s ease-out;
}

/* New - use utilities */
.progress-bar {
    /* Only unique properties */
}
/* Then add in HTML: class="progress-bar position-relative bg-gradient-accent transition-slow" */
```

---

## Utility Categories

### Spacing
- **Padding:** `.p-1`, `.px-2`, `.pt-3`
- **Margin:** `.m-1`, `.mx-auto`, `.mt-2`
- **Gap:** `.gap-1`, `.gap-5`

### Layout
- **Display:** `.d-flex`, `.d-grid`, `.d-none`
- **Flex:** `.flex-column`, `.justify-center`, `.align-center`
- **Position:** `.position-relative`, `.top-0`, `.z-1000`

### Sizing
- `.w-full`, `.h-auto`, `.min-h-85vh`, `.max-w-full`

### Borders & Shadows
- **Radius:** `.rounded-1`, `.rounded-2`, `.rounded-full`
- **Shadow:** `.shadow-sm`, `.shadow-lg`, `.text-shadow`

### Backgrounds
- `.bg-white`, `.bg-gradient-primary`, `.bg-gradient-text`

### Typography
- **Size:** `.text-lg`, `.text-2xl`, `.text-responsive-md`
- **Align:** `.text-center`, `.text-left`
- **Color:** `.text-black`, `.text-accent`
- **Font:** `.font-sans`, `.font-bold`

### Interactions
- `.cursor-pointer`, `.transition-fast`, `.scale-103`
- `.outline-dashed`, `.outline-solid-focus`

### Scrollbars
- `.scrollbar-thin` (thin scrollbars with custom styling)

---

## Refactoring Strategy

### Step 1: Identify Repeated Patterns
Look for rules that appear multiple times across components:
- `border-radius: 1vw` → `.rounded-1`
- `padding: 1vw` → `.p-1`
- `display: flex` → `.d-flex`

### Step 2: Replace in CSS
```css
/* Before */
.my-component {
    display: flex;
    gap: 1vw;
    padding: 1vw;
    border-radius: 1vw;
    box-shadow: 0 0 0.5vw lightgray;
    background-color: white;
}

/* After - just unique styles */
.my-component {
    /* Only component-specific properties */
}
```

### Step 3: Add Utilities to HTML
```html
<div class="my-component d-flex gap-1 p-1 rounded-1 shadow-sm bg-white">
```

---

## Example Refactor: Goal Card

### Original CSS (50+ lines)
```css
.goal-card {
    background-image: linear-gradient(rgba(220, 240, 255, 0.5),rgba(90, 199, 0, 0.5));
    border: 1px solid gray;
    box-sizing: border-box;
    border-radius: 1vw;
    height: clamp(300px, 30vw, 576px);
    padding: 1vw;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    gap: 1vw;
    box-shadow: 0vw 0vw 0.5vw lightgray;
    transition: all 0.2s ease-in-out;
}

.goal-card:hover {
    transform: scale(1.01);
}
```

### Refactored (HTML utilities)
```html
<div class="goal-card bg-gradient-primary border box-border rounded-1 p-1 flex-grow-1 d-flex justify-between gap-1 shadow-sm transition-fast scale-101">
```

### Refactored CSS (minimal)
```css
.goal-card {
    height: clamp(300px, 30vw, 576px); /* unique constraint */
}
```

---

## Benefits

✅ **Less CSS duplication** — `padding: 1vw` defined once  
✅ **Faster development** — compose layouts without writing CSS  
✅ **Consistent spacing** — utilities enforce design system  
✅ **Easier maintenance** — change `.p-1` once, affects everywhere  
✅ **Smaller CSS files** — fewer custom rules

---

## Best Practices

1. **Use utilities for layout & spacing** (flex, padding, margin, gap)
2. **Keep unique styles in component classes** (animations, pseudo-elements)
3. **Combine both approaches** — utility classes in HTML + custom CSS for complex logic
4. **Don't force it** — if a component is truly unique, custom CSS is fine

---

## Next Steps

1. ✅ Review utility classes in [public/stylesheets/utils.css](public/stylesheets/utils.css)
2. ⏳ Refactor one component at a time (start with simple ones)
3. ⏳ Update HTML to include utility classes
4. ⏳ Remove redundant CSS from components
5. ⏳ Test thoroughly to ensure visual consistency

---

## Questions?

- **Why `!important`?** Utilities are meant to override component styles when applied directly
- **Can I customize?** Yes! Modify values in `utils.css` to match your design system
- **What about mobile?** Add responsive utilities (`.sm:p-2`, `.md:flex-row`) if needed

Happy refactoring! 🚀
