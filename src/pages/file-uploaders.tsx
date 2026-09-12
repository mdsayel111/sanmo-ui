import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import FileUploader from "../../lib/components/shared/file-uploader";


export default function FileUploaders() {
    return (
        <Container
            title="File Uploads"
            description="Easy to use drag and drop file uploader with image previews."
        >

            {/* 1. Multiple File Upload */}
            <Section
                title="Multiple File Upload"
                description="Allow users to select and upload multiple files at once. New files are appended to the list."
            >
                <FileUploader multiple={true} />

                <SourceCode code={`import { FileUploader } from 'sanmo-ui';

<FileUploader 
  multiple 
  onFilesSelected={(files) => console.log(files)} 
/>`} />
            </Section>

            {/* 2. Single File Upload */}
            <Section
                title="Single File Upload"
                description="Restrict selection to a single file. Dropping or selecting a new file replaces the existing one."
            >
                <FileUploader multiple={false} />

                <SourceCode code={`<FileUploader 
  multiple={false} 
  onFilesSelected={(files) => console.log(files[0])} 
/>`} />
            </Section>

        </Container>
    );
}