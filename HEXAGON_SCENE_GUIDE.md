# HexagonScene Component - Usage Guide

## Overview
`HexagonScene` is a self-contained, reusable 3D scroll animation component featuring an animated hexagon tunnel with customizable overlay content that appears from the center as you scroll.

## Features
- ✨ Animated hexagon tunnel with scroll-based movement
- 🎨 Smooth rotation and zoom effects
- 📱 Fully responsive
- 🔧 Easy to customize overlay content
- 📦 Single file - just copy and paste!

## Installation

### 1. Copy the Component
Copy `HexagonScene.jsx` to your project's components folder.

### 2. Install Dependencies
```bash
npm install three @react-three/fiber @react-three/drei
```

### 3. Ensure CSS Setup
Make sure your project allows page scrolling:

```css
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #000000;
}

#root {
  width: 100%;
  height: 100%;
}
```

## Basic Usage

```jsx
import HexagonScene from './components/HexagonScene';

function App() {
  return (
    <>
      {/* Fixed 3D Scene */}
      <HexagonScene 
        overlayContent={
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h1>Your Content Here</h1>
            <p>This appears as you scroll!</p>
          </div>
        }
      />
      
      {/* Scroll spacer - creates scroll height */}
      <div style={{ height: '300vh' }} />
    </>
  );
}
```

> **Important**: The component uses a **fixed position canvas** that responds to native page scroll. You need to add a scroll spacer element (like `<div style={{ height: '300vh' }} />`) to create scrollable height on your page.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `overlayContent` | React.ReactNode | No | Content to display in the center overlay that appears on scroll |

## Customization Examples

### Example 1: Simple Text Overlay
```jsx
<>
  <HexagonScene 
    overlayContent={
      <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
        <h1>Welcome</h1>
        <p>Scroll to explore</p>
      </div>
    }
  />
  <div style={{ height: '300vh' }} />
</>
```

### Example 2: Feature Cards
```jsx
<>
  <HexagonScene 
    overlayContent={
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem',
        color: 'white' 
      }}>
        <div>Feature 1</div>
        <div>Feature 2</div>
        <div>Feature 3</div>
      </div>
    }
  />
  <div style={{ height: '300vh' }} />
</>
```

### Example 3: No Overlay (Just Animation)
```jsx
<>
  <HexagonScene />
  <div style={{ height: '300vh' }} />
</>
```

## How It Works

1. **Scroll Detection**: Uses native `window.scrollY` to track page scroll position
2. **Fixed Canvas**: The 3D scene is fixed to the viewport and responds to page scroll
3. **Hexagon Animation**: Six hexagons arranged in a ring move from far away toward and past the camera
4. **Overlay Reveal**: Content scales from 0.1 to 1.0 and fades in between scroll offsets 0.15 and 0.4
5. **Smooth Transitions**: All animations use damping for smooth, natural movement

## Customizing the Animation

To modify the animation behavior, edit these values in `HexagonScene.jsx`:

### Hexagon Colors
```javascript
color: i % 2 === 0 ? "#6644ff" : "#4422dd"  // Line ~67
```

### Scroll Spacer Height
```javascript
<div style={{ height: '300vh' }} />  // In your App component
// Increase vh value for more scroll distance, decrease for less
// 300vh = 3x viewport height of scrollable content
```

### Overlay Timing
```javascript
const start = 0.15;  // When overlay starts appearing
const end = 0.4;     // When overlay is fully visible
```

### Hexagon Movement Range
```javascript
const targetZ = -15 + (offset * 30);  // Line ~81
// Adjust the 30 to change how far hexagons travel
```

## Integration Tips

### With Existing Projects
1. Copy `HexagonScene.jsx` to your components folder
2. Import and use it in any component
3. Wrap your content in the `overlayContent` prop
4. Ensure parent container has `h-screen` or `height: 100vh`

### With Different Frameworks
- **Next.js**: Works out of the box, just import normally
- **Vite**: Works perfectly (already tested)
- **Create React App**: Compatible, ensure Three.js dependencies are installed

### Performance Notes
- The component uses hardware-accelerated WebGL rendering
- Scroll damping provides smooth 60fps animations
- Minimal re-renders thanks to React Three Fiber optimization

## Troubleshooting

### Black Screen
- Ensure parent container has proper height or add scroll spacer
- Check that dependencies are installed

### Overlay Not Appearing
- Verify you have a scroll spacer element (e.g., `<div style={{ height: '300vh' }} />`)
- Make sure your CSS allows page scrolling (`overflow-y: auto` on body)
- Check that `overlayContent` prop is passed correctly

### Can't Scroll
- Ensure you have a scroll spacer element that creates page height
- Check that body CSS has `overflow-y: auto` not `overflow: hidden`
- Verify the scroll spacer has sufficient height (e.g., `300vh`)

## File Structure
```
your-project/
├── src/
│   ├── components/
│   │   └── HexagonScene.jsx  ← Single file with everything!
│   ├── App.jsx
│   └── index.css
└── package.json
```

## License
Free to use in any project!
