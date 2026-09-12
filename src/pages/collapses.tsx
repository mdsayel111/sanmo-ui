import { useState } from 'react';
import Button from "../../lib/components/shared/button";
import Collapse from "../../lib/components/shared/collapse";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function Collapses() {
  // State for Default Example
  const [defaultOpen, setDefaultOpen] = useState(false);

  // State for Horizontal Example
  const [horizontalOpen, setHorizontalOpen] = useState(false);

  // State for Multiple Targets Example
  const [multiFirstOpen, setMultiFirstOpen] = useState(false);
  const [multiSecondOpen, setMultiSecondOpen] = useState(false);

  return (
    <Container
      title="Collapse"
      description="Toggle the visibility of content across your project with a few classes and our JavaScript plugins."
    >
      
      {/* 1. Default Example */}
      <Section 
        title="Default Example" 
        description={
          <div>
            Click the buttons below to show and hide another element via class changes:
            <ul className="list-disc list-inside mt-2 ml-2">
              <li><code>.collapse</code> hides content</li>
              <li><code>.collapsing</code> is applied during transitions</li>
              <li><code>.collapse.show</code> shows content</li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button onClick={() => setDefaultOpen(!defaultOpen)}>
              Link with href
            </Button>
            <Button onClick={() => setDefaultOpen(!defaultOpen)}>
              Button with data-bs-target
            </Button>
          </div>

          <Collapse isOpen={defaultOpen}>
            <div className="p-4 rounded-lg text-slate-300">
              Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            </div>
          </Collapse>
        </div>

        <SourceCode code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>

<Collapse isOpen={isOpen}>
  <div className="card">
    Some placeholder content...
  </div>
</Collapse>`} />
      </Section>

      {/* 2. Horizontal */}
      <Section 
        title="Horizontal" 
        description={
          <span>
            The collapse plugin also supports horizontal collapsing. Add the <code>horizontal</code> prop to transition the <code>width</code> instead of <code>height</code>.
          </span>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <Button onClick={() => setHorizontalOpen(!horizontalOpen)}>
              Toggle width collapse
            </Button>
          </div>

          <div>
            <Collapse isOpen={horizontalOpen} horizontal>
              <div className="w-72 p-4 rounded-lg text-slate-300">
                This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
              </div>
            </Collapse>
          </div>
        </div>

        <SourceCode code={`<Collapse isOpen={isOpen} horizontal>
  <div className="w-72 card">
    Horizontal content...
  </div>
</Collapse>`} />
      </Section>

      {/* 3. Multiple Targets */}
      <Section 
        title="Multiple Targets" 
        description="A button can show and hide multiple elements by referencing them with a selector in its href or data-bs-target attribute."
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setMultiFirstOpen(!multiFirstOpen)}>
              Toggle first element
            </Button>
            <Button onClick={() => setMultiSecondOpen(!multiSecondOpen)}>
              Toggle second element
            </Button>
            <Button onClick={() => {
              const newState = !multiFirstOpen; // Toggle based on first state for simplicity in this demo
              setMultiFirstOpen(newState);
              setMultiSecondOpen(newState);
            }}>
              Toggle both elements
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Collapse isOpen={multiFirstOpen}>
              <div className="p-4 rounded-lg text-slate-300">
                <strong className="block text-white mb-1">First Element</strong>
                Some placeholder content for the first collapse component of this multi-collapse example.
              </div>
            </Collapse>

            <Collapse isOpen={multiSecondOpen}>
              <div className="p-4 rounded-lg text-slate-300">
                <strong className="block text-white mb-1">Second Element</strong>
                Some placeholder content for the second collapse component of this multi-collapse example.
              </div>
            </Collapse>
          </div>
        </div>

        <SourceCode code={`<Button onClick={() => setFirst(!first)}>Toggle First</Button>
<Button onClick={() => setSecond(!second)}>Toggle Second</Button>
<Button onClick={() => { setFirst(!first); setSecond(!first); }}>Toggle Both</Button>

<Collapse isOpen={first}>
  <div className="card">First Element...</div>
</Collapse>

<Collapse isOpen={second}>
  <div className="card">Second Element...</div>
</Collapse>`} />
      </Section>

    </Container>
  );
}