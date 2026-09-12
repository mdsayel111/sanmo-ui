import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import Button from "../../lib/components/shared/button";
import Spinner from "../../lib/components/shared/spinner";

export default function Spinners() {
  return (
    <Container
      title="Spinners"
      description="Indicate the loading state of a component or page with Bootstrap spinners, built entirely with HTML, CSS, and no JavaScript."
    >

      {/* 1. Border Spinners */}
      <Section
        title="Border Spinners"
        description="Use the border spinners for a lightweight loading indicator."
      >
        <Spinner color="primary" />
        <SourceCode code={`<Spinner />`} />
      </Section>

      {/* 2. Color Spinners */}
      <Section
        title="Color Spinners"
        description="You can use any of our text color utilities on the standard spinner."
      >
        <div className="flex flex-wrap gap-4">
          <Spinner color="primary" />
          <Spinner color="secondary" />
          <Spinner color="success" />
          <Spinner color="danger" />
          <Spinner color="warning" />
          <Spinner color="info" />
          <Spinner color="light" />
        </div>

        <SourceCode code={`<Spinner color="primary" />
<Spinner color="secondary" />
<Spinner color="success" />
<Spinner color="danger" />
<Spinner color="warning" />
<Spinner color="info" />
<Spinner color="light" />`} />
      </Section>

      {/* 3. Growing Spinners */}
      <Section
        title="Growing Spinners"
        description="If you don't fancy a border spinner, switch to the grow spinner. While it doesn't technically spin, it does repeatedly grow!"
      >
        <Spinner variant="grow" color="primary" />
        <SourceCode code={`<Spinner variant="grow" />`} />
      </Section>

      {/* 4. Color Growing Spinners */}
      <Section
        title="Color Growing Spinners"
        description="You can use any of our text color utilities on the standard spinner."
      >
        <div className="flex flex-wrap gap-4">
          <Spinner variant="grow" color="primary" />
          <Spinner variant="grow" color="secondary" />
          <Spinner variant="grow" color="success" />
          <Spinner variant="grow" color="danger" />
          <Spinner variant="grow" color="warning" />
          <Spinner variant="grow" color="info" />
          <Spinner variant="grow" color="light" />
        </div>

        <SourceCode code={`<Spinner variant="grow" color="primary" />
<Spinner variant="grow" color="secondary" />
...`} />
      </Section>

      {/* 5. Alignment */}
      <Section
        title="Alignment"
        description="Use flexbox utilities, float utilities, or text alignment utilities to place spinners exactly where you need them in any situation."
      >
        <div className="p-12 bg-slate-950/50 rounded-lg flex justify-center items-center border border-slate-800">
          <Spinner color="primary" />
        </div>

        <SourceCode code={`<div className="flex justify-center">
  <Spinner />
</div>`} />
      </Section>

      {/* 6. Size */}
      <Section
        title="Size"
        description={<span>Add <code>size="sm"</code> to make a smaller spinner that can quickly be used within other components.</span>}
      >
        <div className="flex items-center gap-4">
          <Spinner size="sm" color="primary" />
          <Spinner variant="grow" size="sm" color="primary" />
          <div className="w-px h-8 bg-slate-800 mx-2"></div>
          <Spinner size="md" color="secondary" />
          <Spinner variant="grow" size="md" color="secondary" />
        </div>

        <SourceCode code={`<Spinner size="sm" />
<Spinner variant="grow" size="sm" />`} />
      </Section>

      {/* 7. Buttons Spinner */}
      <Section
        title="Buttons Spinner"
        description="Use spinners within buttons to indicate an action is currently processing or taking place."
      >
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <Spinner size="sm" color="light" />
          </Button>

          <Button disabled className="flex items-center gap-2">
            <Spinner size="sm" color="light" />
            Loading...
          </Button>

          <Button disabled className="flex items-center gap-2" >
            <Spinner variant="grow" size="sm" color="light" />
            Loading...
          </Button>
        </div>

        <SourceCode code={`<Button disabled>
  <Spinner size="sm" color="light" />
</Button>

<Button disabled>
  <Spinner size="sm" color="light" />
  Loading...
</Button>`} />
      </Section>

    </Container>
  );
}