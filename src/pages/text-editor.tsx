import { useState } from "react";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import TextEditor from "../../lib/components/shared/text-editor/text-editor";


export default function TextEditors() {
    const [content, setContent] = useState("");

    return (
        <Container
            title="Text Editor"
            description="Compose and format rich text with Quill."
        >
            <Section
                title="Rich Text Editor"
                description="Format text with headings, emphasis, alignment, lists, links, and images. The editor returns the content as HTML."
            >
                <div className="space-y-4">
                    <TextEditor label="Content" value={content} onChange={setContent} />

                    <div>
                        <h3 className="mb-2 text-sm font-medium">HTML output</h3>
                        <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all rounded-md bg-background p-3 text-xs">
                            {content || "Your formatted HTML will appear here as you type."}
                        </pre>
                    </div>
                </div>

                <SourceCode code={`import { useState } from 'react';
import { TextEditor } from 'sanmo-ui';

function Example() {
  const [content, setContent] = useState('');

  return (
    <>
      <TextEditor label="Content" value={content} onChange={setContent} />
      <pre>{content}</pre>
    </>
  );
}`} />
            </Section>
        </Container>
    );
}