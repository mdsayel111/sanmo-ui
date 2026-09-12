import React from "react";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function Home() {
    return (
        <Container
            title="Sanmo UI"
            description="A modern, customizable React UI component library built with Vite, TypeScript, and Tailwind CSS."
        >
            <Section
                title="✨ Features"
            >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc pl-5">
                    <li>⚛️ Built for React 19+</li>
                    <li>🎨 Powered by Tailwind CSS</li>
                    <li>🧩 Modular & tree-shakable components</li>
                    <li>📦 Lightweight and production-ready</li>
                    <li>🛠️ Fully typed with TypeScript</li>
                    <li>🔌 Easy integration into any React project</li>
                </ul>
            </Section>

            {/* Installation */}
            <Section
                title="📦 Installation"
            >
                <SourceCode
                    text=""
                    code={`npm install sanmo-ui`}
                />
                <SourceCode
                    text=""
                    code={`yarn add sanmo-ui`}
                />

                <p className="mt-6 text-xl font-black text-gray-600">
                    ⚠️ Peer dependencies:
                </p>

                <SourceCode
                    text=""
                    code={`npm install react react-dom react-router-dom`}
                />
            </Section>

            {/* Getting Started */}
            <Section
                title="🚀 Getting Started"
            >

                <h3 className="font-medium mb-2">1. Import styles</h3>
                <SourceCode
                    code={`import "sanmo-ui/style.css";`}
                />

                {/* <h3 className="font-medium mt-6 mb-2">2. Use RootLayout</h3>
                <SourceCode
                    code={`import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "sanmo-ui";

const navItemsData: SidebarNavItem[] = [
    {
        category: "Apps",
    },
    {
        name: 'First Page',
        href: '/first-page',
        icon: FirstPageIcon,
    },
    {
        name: 'Nested Page',
        href: '/nested-page',
        icon: FileTextIcon,
        children: [
            {
                name: 'Nested Page 1',
                href: '/nested-page/nested-page-1',
            },
            {
                name: 'Nested Page 2',
                href: '/nested-page/nested-page-2',
            },
        ],
    },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <h1>home</h1>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
`
                    } /> */}
                <SourceCode
                    code={`import { Button } from "sanmo-ui";
export default function App() {
  return <Button>Click me</Button>;
}`}
                />
            </Section>

            {/* TypeScript */}
            <Section
                title="📚 TypeScript Support"
            >
                <SourceCode
                    code={`import { Button } from "sanmo-ui";
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
}`}
                />
            </Section>
        </Container >
    );
}