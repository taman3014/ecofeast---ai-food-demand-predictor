# Animation Classes Reference

A comprehensive guide to all available animations in EcoFeast.

## 📚 Animation Categories

### Fade Animations
Perfect for elements appearing gradually.

```jsx
// Fade in from transparent
<div className="animate-fade-in">Content</div>

// Fade in while sliding up
<div className="animate-fade-in-up">Appears from bottom</div>

// Fade in while sliding down
<div className="animate-fade-in-down">Appears from top</div>
```

**Duration**: 0.6-0.8s | **Easing**: ease-out

### Slide Animations
Great for directional entrances.

```jsx
// Slide in from left
<div className="animate-slide-in-left">From left</div>

// Slide in from right
<div className="animate-slide-in-right">From right</div>

// Slide up with fade
<div className="animate-slide-up">Up with fade</div>
```

**Duration**: 0.6-0.8s | **Easing**: ease-out

### Scale & Size Animations
Perfect for emphasis and attention.

```jsx
// Scale from 90% to 100%
<div className="animate-scale-in">Grows smoothly</div>

// Subtle bounce effect
<div className="animate-bounce-soft">Bounces gently</div>
```

**Duration**: 0.6s | **Easing**: ease-out

### Continuous Animations
For ongoing, looping effects.

```jsx
// Gentle floating motion
<div className="animate-float">Floats up and down</div>

// Subtle pulsing opacity
<div className="animate-pulse-soft">Pulses gently</div>

// Glowing box-shadow
<div className="animate-glow">Glows continuously</div>

// Animated gradient shift
<div className="animate-gradient-shift">Gradient moves</div>
```

**Duration**: 2-3s | **Loop**: infinite

---

## 🎯 Stagger Delays

Create cascading animations with delays:

```jsx
<div className="animate-fade-in-up stagger-1">First</div>
<div className="animate-fade-in-up stagger-2">Second</div>
<div className="animate-fade-in-up stagger-3">Third</div>
<div className="animate-fade-in-up stagger-4">Fourth</div>
<div className="animate-fade-in-up stagger-5">Fifth</div>
<div className="animate-fade-in-up stagger-6">Sixth</div>
```

**Delays**: 0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s

### Using Dynamic Delays

```jsx
{items.map((item, idx) => (
  <div
    key={idx}
    className="animate-fade-in-up"
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    {item}
  </div>
))}
```

---

## ✨ Hover & Transition Effects

### Hover Lift
Elevate elements on hover:

```jsx
<button className="hover-lift">Lifts on hover</button>
<div className="hover-lift">Hovers up</div>
```

**Effect**: -8px Y translation + shadow
**Duration**: 0.3s

### Smooth Transitions

```jsx
{/* Universal smooth transition */}
<div className="transition-smooth">Smooth changes</div>

{/* Larger, slower transitions */}
<div className="transition-smooth-lg">Slower transition</div>
```

---

## 📋 Complete Animation List

| Class | Type | Duration | Loop | Use Case |
|-------|------|----------|------|----------|
| `animate-fade-in` | Fade | 0.6s | No | Generic fade-in |
| `animate-fade-in-up` | Fade+Slide | 0.8s | No | Content entrance |
| `animate-fade-in-down` | Fade+Slide | 0.8s | No | Top entrance |
| `animate-slide-in-left` | Slide | 0.8s | No | Left entrance |
| `animate-slide-in-right` | Slide | 0.8s | No | Right entrance |
| `animate-slide-up` | Slide | 0.6s | No | Bottom entrance |
| `animate-scale-in` | Scale | 0.6s | No | Emphasis |
| `animate-float` | Float | 3s | Yes | Background elements |
| `animate-pulse-soft` | Pulse | 2s | Yes | Attention/loading |
| `animate-glow` | Glow | 2s | Yes | Highlight |
| `animate-gradient-shift` | Gradient | 3s | Yes | Background |
| `animate-bounce-soft` | Bounce | 2s | Yes | Subtle movement |
| `hover-lift` | Hover | 0.3s | No | Interactive feedback |

---

## 🎨 Practical Examples

### Hero Section with Floating Background
```jsx
<div className="relative">
  <div className="absolute top-20 right-10 animate-float">
    Floating element
  </div>
  <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
    Second float
  </div>
</div>
```

### Cascading Card Entrance
```jsx
<div className="grid gap-4">
  {cards.map((card, idx) => (
    <div
      key={idx}
      className="animate-fade-in-up"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      {card.content}
    </div>
  ))}
</div>
```

### Button with Loading State
```jsx
<button className="hover-lift transition-smooth">
  {loading ? <span className="animate-spin">⏳</span> : 'Click Me'}
</button>
```

### Pulsing CTA Button
```jsx
<button className="bg-emerald-500 animate-glow">
  Sign Up Now
</button>
```

### Animated List
```jsx
<ul className="space-y-2">
  {items.map((item, idx) => (
    <li
      key={idx}
      className="animate-fade-in-left"
      style={{ animationDelay: `${idx * 150}ms` }}
    >
      {item}
    </li>
  ))}
</ul>
```

### Form with Staggered Fields
```jsx
<form className="space-y-4">
  <input className="animate-fade-in-up stagger-1" placeholder="Field 1" />
  <input className="animate-fade-in-up stagger-2" placeholder="Field 2" />
  <input className="animate-fade-in-up stagger-3" placeholder="Field 3" />
  <button className="animate-fade-in-up stagger-4">Submit</button>
</form>
```

---

## 🚀 Performance Tips

1. **Use GPU-accelerated properties** only:
   - ✅ `transform`, `opacity`, `box-shadow`
   - ❌ Avoid `width`, `height`, `left`, `top`

2. **Limit simultaneous animations**:
   - Use `animation-delay` to stagger
   - Avoid animating 100+ elements at once

3. **Use `will-change` sparingly**:
```jsx
<div className="will-change-transform animate-float">Content</div>
```

4. **Consider `prefers-reduced-motion`**:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

---

## 🎓 Creating Custom Animations

Add to `styles/animations.css`:

```css
@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-bottom {
  animation: slideInBottom 0.6s ease-out;
}
```

Then use:
```jsx
<div className="animate-slide-in-bottom">Content</div>
```

---

## 🔗 Related Classes

### Transition Classes
```jsx
<div className="transition-smooth">Smooth transition</div>
<div className="transition-smooth-lg">Larger transition</div>
```

### Utility Classes
```jsx
{/* Scroll behavior */}
<html className="scroll-smooth"> {/* In index.html */}

{/* Gradient text */}
<h1 className="gradient-text">Emerald gradient text</h1>

{/* Smooth scroll */}
* { scroll-behavior: smooth; }
```

---

## 📝 Best Practices

1. **Match animation to purpose**:
   - Entrance: Use fade-in or slide animations
   - Emphasis: Use scale or glow
   - Status: Use pulse or float
   - Continuous: Use float or gradient-shift

2. **Respect user preferences**:
   - Some users disable animations
   - Always provide `prefers-reduced-motion` fallback

3. **Keep animations brief**:
   - Most animations: 0.3-0.8s
   - Continuous: 2-3s loops
   - Avoid 1s+ entrance animations

4. **Test performance**:
   - Check 60fps on mobile
   - Profile with DevTools
   - Reduce if experiencing lag

---

**Now you're ready to create beautifully animated interfaces! 🎬**
