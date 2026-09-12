import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import Accordion from "../../lib/components/shared/accordion/accordion";
import AccordionItem from "../../lib/components/shared/accordion/accordion-item";
import AccordionTrigger from "../../lib/components/shared/accordion/accordion-trigger";
import AccordionContent from "../../lib/components/shared/accordion/accordion-content";



export default function Accordions() {
  return (
    <Container
      title="Accordion"
      description="Build vertically collapsing accordions in combination with our Collapse JavaScript plugin."
    >
      
      {/* 1. Basic Example */}
      <Section 
        title="Basic Example" 
        description="Using the card component, you can extend the default collapse behavior to create an accordion."
      >
        <Accordion defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger value="item-1">Accordion Item #1</AccordionTrigger>
            <AccordionContent value="item-1">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger value="item-2">Accordion Item #2</AccordionTrigger>
            <AccordionContent value="item-2">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger value="item-3">Accordion Item #3</AccordionTrigger>
            <AccordionContent value="item-3">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SourceCode code={`<Accordion defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Accordion Item #1</AccordionTrigger>
    <AccordionContent value="item-1">
      ...content...
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger value="item-2">Accordion Item #2</AccordionTrigger>
    <AccordionContent value="item-2">
      ...content...
    </AccordionContent>
  </AccordionItem>
</Accordion>`} />
      </Section>

      {/* 2. Flush Accordion */}
      <Section 
        title="Flush Accordion" 
        description={<span>Add <code>flush</code> prop to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.</span>}
      >
        <div className="rounded-xl overflow-hidden">
          <Accordion flush defaultValue="flush-1">
            <AccordionItem value="flush-1">
              <AccordionTrigger value="flush-1">Accordion Item #1</AccordionTrigger>
              <AccordionContent value="flush-1">
                Placeholder content for this accordion, which is intended to demonstrate the <code>flush</code> class. This is the first item's accordion body.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="flush-2">
              <AccordionTrigger value="flush-2">Accordion Item #2</AccordionTrigger>
              <AccordionContent value="flush-2">
                Placeholder content for this accordion, which is intended to demonstrate the <code>flush</code> class. This is the second item's accordion body.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="flush-3">
              <AccordionTrigger value="flush-3">Accordion Item #3</AccordionTrigger>
              <AccordionContent value="flush-3">
                Placeholder content for this accordion, which is intended to demonstrate the <code>flush</code> class. This is the third item's accordion body.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SourceCode code={`<Accordion flush>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`} />
      </Section>

      {/* 3. Always Open */}
      <Section 
        title="Always Open Accordion" 
        description={<span>Set <code>type="multiple"</code> to make accordion items stay open when another item is opened.</span>}
      >
        <Accordion type="multiple" defaultValue={['open-1', 'open-2']}>
          <AccordionItem value="open-1">
            <AccordionTrigger value="open-1">Accordion Item #1</AccordionTrigger>
            <AccordionContent value="open-1">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="open-2">
            <AccordionTrigger value="open-2">Accordion Item #2</AccordionTrigger>
            <AccordionContent value="open-2">
              <strong>This is the second item's accordion body.</strong> It is also shown by default, because <code>type="multiple"</code> is set.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="open-3">
            <AccordionTrigger value="open-3">Accordion Item #3</AccordionTrigger>
            <AccordionContent value="open-3">
              <strong>This is the third item's accordion body.</strong> It is hidden by default.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SourceCode code={`<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
  <AccordionItem value="item-3">...</AccordionItem>
</Accordion>`} />
      </Section>

    </Container>
  );
}