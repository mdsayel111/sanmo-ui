import { ReactNode } from 'react';
import Tooltip from '../../lib/components/shared/tooltip';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';
import Button from '../../lib/components/shared/button';



// Helper button for demo
const DemoButton = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <button className={`px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded hover:bg-slate-800 hover:text-white transition-colors ${className}`}>
    {children}
  </button>
);

export default function Tooltips() {
  return (
    <Container
      title="Tooltips"
      description="Documentation and examples for adding custom tooltips with CSS and JavaScript using CSS3 for animations and data-attributes for local title storage."
    >

      {/* 1. Tooltip Directions */}
      <Section 
        title="Tooltip Directions" 
        description="Four directions: top, right, bottom, and left."
      >
        <div className="flex flex-wrap gap-4 items-center justify-center p-8 rounded-lg border border-slate-800 border-dashed">
          <Tooltip position="top" content="Tooltip on top">
            <Button>Tooltip on top</Button>
          </Tooltip>
          
          <Tooltip position="right" content="Tooltip on right">
            <Button>Tooltip on right</Button>
          </Tooltip>

          <Tooltip position="bottom" content="Tooltip on bottom">
            <Button>Tooltip on bottom</Button>
          </Tooltip>

          <Tooltip position="left" content="Tooltip on left">
            <Button>Tooltip on left</Button>
          </Tooltip>
        </div>

        <SourceCode code={`import { Tooltip } from 'sanmo-ui';

<Tooltip position="top" content="Tooltip on top">
  <button>Tooltip on top</button>
</Tooltip>

<Tooltip position="right" content="Tooltip on right">
  <button>Tooltip on right</button>
</Tooltip>

<Tooltip position="bottom" content="Tooltip on bottom">
  <button>Tooltip on bottom</button>
</Tooltip>

<Tooltip position="left" content="Tooltip on left">
  <button>Tooltip on left</button>
</Tooltip>`} />
      </Section>

      {/* 2. Custom Content */}
      <Section 
        title="Custom HTML Content" 
        description="Tooltips can contain more than just text."
      >
        <div className="flex items-center gap-4">
            <Tooltip 
              position="top" 
              content={
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Status: <b>Online</b></span>
                </div>
              }
            >
              <Button>Hover me</Button>
            </Tooltip>
        </div>

        <SourceCode code={`<Tooltip 
  position="top" 
  content={
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      <span>Status: <b>Online</b></span>
    </div>
  }
>
  <button>Hover me</button>
</Tooltip>`} />
      </Section>

      {/* 3. Delay Control */}
      <Section 
        title="Delay Control" 
        description="Control the delay before the tooltip appears (default is 200ms)."
      >
        <div className="flex items-center gap-4">
            <Tooltip position="top" content="Immediate!" delay={0}>
              <Button>No Delay (0ms)</Button>
            </Tooltip>

            <Tooltip position="top" content="Wait for it..." delay={1000}>
              <Button>Long Delay (1000ms)</Button>
            </Tooltip>
        </div>

        <SourceCode code={`<Tooltip delay={0} content="Immediate!">
  <button>No Delay</button>
</Tooltip>

<Tooltip delay={1000} content="Wait for it...">
  <button>Long Delay</button>
</Tooltip>`} />
      </Section>

    </Container>
  );
}