# sanmo-ui

A modern, customizable React UI component library built with Vite, TypeScript, and Tailwind CSS.

---

## ✨ Features

- ⚛️ Built for React 19+
- 🎨 Powered by Tailwind CSS
- 🧩 Modular & tree-shakable components
- 📦 Lightweight and production-ready
- 🛠️ Fully typed with TypeScript
- 🔌 Easy integration into any React project

---

# 📦 Installation

```bash
npm install sanmo-ui
```

or

```bash
yarn add sanmo-ui
```

## ⚠️ Peer Dependencies

Ensure these are installed:

```bash
npm install react react-dom
```

`sanmo-ui` does not require a routing library. The layout uses regular links by default; pass your framework's link component through `LinkComponent` when you want client-side navigation.

---

# 🚀 Getting Started

## 1. Import styles

```ts
import "sanmo-ui/style.css";
```

---

## 2. Use RootLayout

```tsx
import { RootLayout } from "sanmo-ui";
import "sanmo-ui/style.css"

export default function App() {
  return (
    <RootLayout
      logoSrc="/logo.svg"
      profileImageSrc="/profile.jpg"
      navItems={[{ name: "Home", href: "/" }]}
    >
      <h1>Home</h1>
    </RootLayout>
  );
}
```

For Inertia, pass its `Link` component and the current URL:

```tsx
import { Link, usePage } from "@inertiajs/react";

export default function App() {
  const { url } = usePage();

  return (
    <RootLayout
      logoSrc="/logo.svg"
      navItems={[{ name: "Home", href: "/" }]}
      LinkComponent={Link}
      currentPath={url}
    >
      <h1>Home</h1>
    </RootLayout>
  );
}
```

For Next.js App Router, provide its `Link` component and `usePathname()` value from a client component:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function App() {
  const pathname = usePathname();

  return (
    <RootLayout
      logoSrc="/logo.svg"
      navItems={[{ name: "Home", href: "/" }]}
      LinkComponent={Link}
      currentPath={pathname}
    >
      <h1>Home</h1>
    </RootLayout>
  );
}
```

Breadcrumbs also accept an optional `LinkComponent` prop.

```tsx
import { Button } from "sanmo-ui";

export default function App() {
  return <Button>Click me</Button>;
}
```

---

## 📚 TypeScript Support Components

Visit to see all components (https://sanmo-ui.vercel.app)


All components include type definitions.

```ts
import { Button } from "sanmo-ui";
import type { Shape, Size, StyleType, Variant } from "sanmo-ui";

type MyButtonProps = {
  size?: Size;
  variant?: Variant;
  shape?: Shape;
  styleType?: StyleType;
};

export default function MyButton({
  size = "md",
  variant = "primary",
  shape = "rounded",
  styleType = "filled",
}: MyButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      shape={shape}
      styleType={styleType}
    >
      Click me
    </Button>
  );
}
```

---

## 📄 License

MIT


## 🌐 Author

Sayel Sayed (https://github.com/mdsayel111)
