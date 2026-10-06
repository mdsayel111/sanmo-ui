import { useState } from "react";
import ImageInput, { type ImageInputValue } from "../../lib/components/shared/input/image-input";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function ImageInputs() {
    const [image, setImage] = useState<ImageInputValue>(null);

    return (
        <Container
            title="Image Input"
            description="Select, preview, change, and remove an image."
        >
            <Section
                title="Image Input"
                description="Choose an image file to preview it. Hover over the preview to change or remove the image."
            >
                <ImageInput
                    label="Profile image"
                    value={image}
                    onChange={setImage}
                    className="h-64 max-w-md"
                />
                <SourceCode code={`import { useState } from 'react';
import { ImageInput, type ImageInputValue } from 'sanmo-ui';

function Example() {
  const [image, setImage] = useState<ImageInputValue>(null);

  return (
    <ImageInput
      label="Profile image"
      value={image}
      onChange={setImage}
      className="h-64 max-w-md"
    />
  );
}`} />
            </Section>
        </Container>
    );
}
