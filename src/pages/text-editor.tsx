import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import TextEditor from "../../lib/components/shared/text-editor/text-editor";


export default function TextEditors() {
    return (
        <Container
            title="Text Editor"
            description="Easy to use drag and drop file uploader with image previews."
        >

            {/* 1. Multiple File Upload */}
            <Section
                title="Multiple File Upload"
                description="Allow users to select and upload multiple files at once. New files are appended to the list."
            >
                <TextEditor />

                <SourceCode code={`import { FileUploader } from 'sanmo-ui';

<FileUploader 
  multiple 
  onFilesSelected={(files) => console.log(files)} 
/>`} />
            </Section>


        </Container>
    );
}