# Vite Plugin SVGO

Vite plugin to load and optimize SVG files as raw string. For the optimization SVGO is used.

```typescript
// Lit-Element example
import {html, unsafeSVG} from 'lit';
import icon from '../assets/icon.svg';

html`
  <div>${unsafeSVG(icon)}</div>
`;
```

## Install

```
npm install -D vite-plugin-svgo
```

## Setup

```typescript
import svg from 'vite-plugin-svgo'

export default defineConfig({
  plugins: [svg()]
})
```

## SVGO Configuration
The plugin accepts custom optimize options.

```typescript
// vite.config.ts
svg({
  multipass: true,
})
```
