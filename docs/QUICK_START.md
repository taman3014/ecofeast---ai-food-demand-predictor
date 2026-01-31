# Quick Start Guide - EcoFeast Landing Page

## 🚀 Quick Access

### Development Server
```
http://localhost:3001/
```

### Demo Credentials
- **Username**: demo
- **Password**: demo123

---

## 📍 Page Flow

### 1. Landing Page
- **URL**: Home page
- **Features**: Hero section, features showcase, testimonials, CTA buttons
- **Actions**: 
  - Click "Get Started" → Go to Login/Register
  - Click "Sign In" → Go to Login
  - Click navbar links → Scroll to sections

### 2. Login Page
- **Pre-filled Demo Account**: Yes (auto-populated)
- **Features**:
  - Email/Username input
  - Password input with visibility toggle
  - "Keep me signed in" checkbox
  - "Forgot password?" link
  - "Try Demo Account" button
  - Switch to Register link

### 3. Register Page
- **Features**:
  - Username field
  - Email field (required)
  - Password field with visibility toggle
  - Confirm password field
  - Terms agreement checkbox
  - Already have account? → Login link

### 4. Main Dashboard
- **Access**: After successful login
- **Features**:
  - Navbar with username display
  - Sidebar with navigation
  - Dashboard with stats
  - Data logging form
  - Analytics and forecaster views

---

## 🎨 Component Locations

| Component | Path | Type |
|-----------|------|------|
| Landing Page | `components/LandingPage.tsx` | Feature |
| Navbar | `components/Navbar.tsx` | Feature |
| Login | `components/Auth/Login.tsx` | Enhanced |
| Register | `components/Auth/Register.tsx` | Enhanced |
| Animations | `styles/animations.css` | New |
| App Router | `App.tsx` | Updated |

---

## ✨ Animation Classes

Use these classes on any element:

```jsx
// Fade animations
<div className="animate-fade-in">Fades in</div>
<div className="animate-fade-in-up">Fades and slides up</div>
<div className="animate-fade-in-down">Fades and slides down</div>

// Slide animations
<div className="animate-slide-in-left">Slides from left</div>
<div className="animate-slide-in-right">Slides from right</div>

// Other animations
<div className="animate-scale-in">Scales up while fading</div>
<div className="animate-float">Floating effect</div>
<div className="animate-pulse-soft">Subtle pulsing</div>

// Stagger delays (use with other animation)
<div className="animate-fade-in-up stagger-1">First element</div>
<div className="animate-fade-in-up stagger-2">Second element</div>
<div className="animate-fade-in-up stagger-3">Third element</div>

// Hover effects
<div className="hover-lift">Lifts on hover</div>
<button className="hover-lift">Button with lift</button>
```

---

## 🔧 Common Tasks

### Change Brand Colors
Find and replace in components:
- `from-emerald-500 to-emerald-600` → Your color
- `emerald-*` classes → Your color

### Update Landing Page Content
**File**: `components/LandingPage.tsx`

```jsx
// Hero section
<h1>Your custom headline</h1>

// Features
const features = [
  { title: 'Your Feature', description: 'Your description' },
  // ...
];

// Testimonials
const testimonials = [
  { name: 'John', text: 'Their review', rating: 5 },
  // ...
];
```

### Update Navbar Links
**File**: `components/Navbar.tsx`

```jsx
const navigationItems = [
  { label: 'Your Link', id: 'section-id' },
  // ...
];
```

### Modify Animation Speed
**File**: `styles/animations.css`

```css
@keyframes fadeInUp {
  /* Change 0.8s to desired speed */
  animation: fadeInUp 0.8s ease-out;
}
```

---

## 🎯 Testing Checklist

- [ ] Landing page loads successfully
- [ ] All animations play smoothly
- [ ] Navbar links scroll to sections
- [ ] "Get Started" button redirects to login
- [ ] Demo login works (demo/demo123)
- [ ] Register form validates inputs
- [ ] Login redirects to dashboard
- [ ] Navbar shows username when logged in
- [ ] Logout returns to landing page
- [ ] Mobile responsive (hamburger menu works)
- [ ] Forms have proper error handling

---

## 📊 Key Features Summary

✅ **Professional Landing Page**
- Hero section with animated backgrounds
- 6 feature cards
- Benefits metrics
- How it works steps
- 3 customer testimonials
- Complete footer

✅ **Smooth Animations**
- 15+ animation types
- Staggered element delays
- Hover effects
- Floating backgrounds
- Pulse & glow effects

✅ **Enhanced Auth**
- Modern login design
- Registration with validation
- Password visibility toggle
- Demo account support
- Error messaging

✅ **Responsive Navbar**
- Desktop & mobile versions
- Fixed positioning
- Smooth scroll navigation
- User display
- Logout button

✅ **Complete App Flow**
- Landing → Auth → Dashboard
- State management across pages
- Token persistence
- User session handling

---

## 🆘 Troubleshooting

### Port 3001 already in use
The dev server will automatically use port 3002, 3003, etc.

### Styles not loading
Ensure `animations.css` is imported in `index.tsx`:
```jsx
import './styles/animations.css';
```

### Demo login not working
Make sure backend is running:
```bash
cd backend
npm run dev
```

### Animations not playing
Check that animation classes are on the correct elements and CSS file is loaded.

---

## 📞 Support Resources

- **Animation docs**: See `styles/animations.css` for all available animations
- **Component props**: Check TypeScript interfaces in component files
- **Tailwind classes**: Used for styling (pre-installed)
- **Lucide icons**: Used for all icons (pre-installed)

---

**Your app is ready! 🎉**
Visit `http://localhost:3001/` and enjoy the new landing page!
