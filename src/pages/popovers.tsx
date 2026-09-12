import Button from "../../lib/components/shared/button";
import Popover from "../../lib/components/shared/popover";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";


export default function Popovers() {
  return (
    <Container
      title="Popovers"
      description="Documentation and examples for adding Bootstrap-like popovers to your site."
    >
      
      {/* 1. Live Demo */}
      <Section 
        title="Live demo" 
        description="Click the button to toggle the popover."
      >
        <Popover 
          title="Popover Title" 
          content="And here's some amazing content. It's very engaging. Right?"
          placement="right"
        >
          <Button variant="danger">Click to toggle popover</Button>
        </Popover>

        <SourceCode code={`<Popover 
  title="Popover Title" 
  content="And here's some amazing content..."
  placement="right"
>
  <Button variant="danger">Click to toggle popover</Button>
</Popover>`} />
      </Section>

      {/* 2. Directions */}
      <Section 
        title="Popover Directions" 
        description="Four options are available: top, right, bottom, and left aligned."
      >
        <div className="flex flex-wrap gap-4">
          <Popover placement="top" content="Top popover">
            <Button>Popover on top</Button>
          </Popover>
          <Popover placement="bottom" content="Bottom popover">
            <Button>Popover on bottom</Button>
          </Popover>
          <Popover placement="left" content="Left popover">
            <Button>Popover on left</Button>
          </Popover>
          <Popover placement="right" content="Right popover">
            <Button>Popover on right</Button>
          </Popover>
        </div>

        <SourceCode code={`<Popover placement="top" content="...">
  <Button>Popover on top</Button>
</Popover>

<Popover placement="bottom" content="...">
  <Button>Popover on bottom</Button>
</Popover>
...`} />
      </Section>

      {/* 3. Dismiss on Next Click */}
      <Section 
        title="Dismiss on Next Click" 
        description={<span>Use the <code>focus</code> trigger to dismiss popovers on the user's next click of a different element.</span>}
      >
        <Popover 
          trigger="focus" 
          title="Dismissible popover" 
          content="And here's some amazing content. It's very engaging. Right?"
          placement="right"
        >
          <Button variant="success">Dismissible popover</Button>
        </Popover>

        <SourceCode code={`<Popover trigger="focus" title="Dismissible..." content="...">
  <Button>Dismissible popover</Button>
</Popover>`} />
      </Section>

      {/* 4. Hover Trigger */}
      <Section 
        title="Hover" 
        description={<span>Use the <code>trigger="hover"</code> prop to show popover on hover.</span>}
      >
        <Popover 
          trigger="hover" 
          title="Hover Popover" 
          content="I appear on mouse enter and disappear on mouse leave."
          placement="right"
        >
          <Button variant="secondary">Please Hover Me</Button>
        </Popover>

        <SourceCode code={`<Popover trigger="hover" content="...">
  <Button>Please Hover Me</Button>
</Popover>`} />
      </Section>

      {/* 5. Custom Popovers */}
      <Section 
        title="Custom Popovers" 
        description="You can customize the appearance of popovers using variants."
      >
        <div className="flex flex-wrap gap-4">
          <Popover variant="primary" title="Primary Popover" content="This popover has a primary header." placement="top">
            <Button variant="primary">Primary popover</Button>
          </Popover>
          <Popover variant="success" title="Success Popover" content="This popover has a success header." placement="top">
            <Button variant="success">Success popover</Button>
          </Popover>
          <Popover variant="danger" title="Danger Popover" content="This popover has a danger header." placement="top">
            <Button variant="danger">Danger popover</Button>
          </Popover>
          <Popover variant="info" title="Info Popover" content="This popover has an info header." placement="top">
            <Button variant="info">Info popover</Button>
          </Popover>
        </div>

        <SourceCode code={`<Popover variant="primary" title="Primary..." ...>
  <Button>Primary popover</Button>
</Popover>

<Popover variant="success" title="Success..." ...>
  <Button>Success popover</Button>
</Popover>`} />
      </Section>

      {/* 6. Disabled Elements */}
      <Section 
        title="Disabled Elements" 
        description="Elements with the disabled attribute aren't interactive, meaning users cannot hover or click them to trigger a popover. Wrap them in a div to enable the popover."
      >
        <Popover 
          trigger="hover" 
          content="Disabled popover" 
          placement="right"
        >
          <span className="inline-block cursor-not-allowed">
            <Button disabled style={{ pointerEvents: 'none' }}>Disabled button</Button>
          </span>
        </Popover>

        <SourceCode code={`<Popover trigger="hover" content="Disabled popover">
  <span className="d-inline-block">
    <Button disabled style={{ pointerEvents: 'none' }}>
      Disabled button
    </Button>
  </span>
</Popover>`} />
      </Section>

    </Container>
  );
}