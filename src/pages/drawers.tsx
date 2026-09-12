import { Menu, Settings } from 'lucide-react';
import { useState } from 'react';
import Button from '../../lib/components/shared/button';
import Drawer from '../../lib/components/shared/drawer/drawer';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';

export default function Drawers() {
  // State for Demos
  const [defaultOpen, setDefaultOpen] = useState(false);

  // Backdrop Demos
  const [scrollingOpen, setScrollingOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [bothOpen, setBothOpen] = useState(false);

  // Position Demos
  const [posLeft, setPosLeft] = useState(false);
  const [posRight, setPosRight] = useState(false);
  const [posTop, setPosTop] = useState(false);
  const [posBottom, setPosBottom] = useState(false);

  // Dummy Text
  const Content = () => (
    <>
      <p>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
      </p>
      <div className="mt-4 p-4 rounded bg-slate-800/50 border border-slate-700 border-dashed">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><Settings size={14} /> Settings</li>
          <li className="flex items-center gap-2"><Menu size={14} /> Navigation</li>
        </ul>
      </div>
    </>
  );

  return (
    <Container
      title="Drawers (Offcanvas)"
      description="Build hidden sidebars into your project for navigation, shopping carts, and more."
    >

      {/* 1. Default Drawer */}
      <Section title="Default Drawer" description="Standard offcanvas drawer with a backdrop that disables body scrolling.">
        <Button onClick={() => setDefaultOpen(true)}>Launch demo drawer</Button>
        <Drawer
          isOpen={defaultOpen}
          onClose={() => setDefaultOpen(false)}
          title="Offcanvas"
        >
          <Content />
        </Drawer>
        <SourceCode code={`const [isOpen, setIsOpen] = useState(false);

<Drawer 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  title="Offcanvas"
>
  <p>Some text as placeholder...</p>
</Drawer>`} />
      </Section>

      {/* 2. Backdrop & Scrolling */}
      <Section title="Backdrop & Scrolling" description="Control how the backdrop behaves and whether the page body can scroll.">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setScrollingOpen(true)}>Enable body scrolling</Button>
          <Button variant="secondary" onClick={() => setBackdropOpen(true)}>Enable backdrop (default)</Button>
          <Button variant="success" onClick={() => setBothOpen(true)}>Enable both scrolling & backdrop</Button>
        </div>

        {/* 1. Scrolling Enabled, No Backdrop */}
        <Drawer
          isOpen={scrollingOpen}
          onClose={() => setScrollingOpen(false)}
          title="Body Scrolling"
          scroll={true}
          backdrop={false}
        >
          <p>Try scrolling the rest of the page! The backdrop is hidden and body scroll is active.</p>
        </Drawer>

        {/* 2. Standard (Backdrop Enabled, Scroll Locked) */}
        <Drawer
          isOpen={backdropOpen}
          onClose={() => setBackdropOpen(false)}
          title="Backdrop Enabled"
        // Default props: scroll=false, backdrop=true
        >
          <p>The body is locked and backdrop is present.</p>
        </Drawer>

        {/* 3. Both Enabled */}
        <Drawer
          isOpen={bothOpen}
          onClose={() => setBothOpen(false)}
          title="Scrolling & Backdrop"
          scroll={true}
          backdrop={true}
        >
          <p>The backdrop is visible (dimming the content) but you can still scroll the body.</p>
        </Drawer>

        <SourceCode code={`<Drawer scroll={true} backdrop={false} ... />
<Drawer backdrop={true} ... /> {/* Default */}
<Drawer scroll={true} backdrop={true} ... />`} />
      </Section>

      {/* 3. Offcanvas Position */}
      <Section title="Offcanvas Position" description="Drawers can be placed on the left, right, top, or bottom of the viewport.">
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setPosLeft(true)}>Toggle Left</Button>
          <Button variant="secondary" onClick={() => setPosRight(true)}>Toggle Right</Button>
          <Button variant="success" onClick={() => setPosTop(true)}>Toggle Top</Button>
          <Button variant="info" onClick={() => setPosBottom(true)}>Toggle Bottom</Button>
        </div>

        <Drawer isOpen={posLeft} onClose={() => setPosLeft(false)} position="left" title="Left Drawer"><Content /></Drawer>
        <Drawer isOpen={posRight} onClose={() => setPosRight(false)} position="right" title="Right Drawer"><Content /></Drawer>
        <Drawer isOpen={posTop} onClose={() => setPosTop(false)} position="top" title="Top Drawer"><Content /></Drawer>
        <Drawer isOpen={posBottom} onClose={() => setPosBottom(false)} position="bottom" title="Bottom Drawer"><Content /></Drawer>

        <SourceCode code={`<Drawer position="left" ... />
<Drawer position="right" ... />
<Drawer position="top" ... />
<Drawer position="bottom" ... />`} />
      </Section>

    </Container>
  );
}