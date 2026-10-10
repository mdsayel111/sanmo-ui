import InputValue from "../../lib/components/shared/input/input-value";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function InputValues() {
    return (
        <Container
            title="Input Value"
            description="Display an individual form value with its label."
        >
            <Section
                title="Input Value"
                description="Use this component to display a labeled, read-only value."
            >
                <div className="max-w-3xl">
                    <InputValue
                        label="Invoice Number"
                        value="INV-1791274267"
                    />
                </div>

                <SourceCode code={`import { InputValue } from 'sanmo-ui';

<InputValue
  label="Invoice Number"
  value="INV-1791274267"
/>`} />
            </Section>
        </Container>
    );
}
