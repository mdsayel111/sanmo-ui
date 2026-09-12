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
npm install react react-dom react-router-dom
```

---

# 🚀 Getting Started

## 1. Import styles

```ts
import "sanmo-ui/style.css";
```

---

## 2. Use RootLayout in (App.jsx)

```tsx
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from 'sanmo-ui'
import "sanmo-ui/style.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout>
      <Outlet />
    </RootLayout>
    ,
    children: [
      {
        index: true,
        element: <h1>home</h1>,
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

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
