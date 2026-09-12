import Checkbox from "../../lib/components/shared/input/checkbox";
import Radio from "../../lib/components/shared/input/radio";
import Switch from "../../lib/components/shared/input/switch";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function FormTogglesDocs() {
    return (
        <Container
            title="Form Toggles"
            description="Checkbox, Radio, and Switch inputs with extensive styling options."
        >

            {/* 1. Checkbox */}
            <Section title="Checkbox" description="Each checkbox input and label pairing is wrapped in a div to create our custom control.">
                <div className="flex items-center gap-2">
                    <Checkbox />
                    <Checkbox />
                </div>
                <SourceCode code={`<Checkbox />
<Checkbox />`} />
            </Section>

            {/* 2. Inline Checkbox */}
            <Section title="Inline Checkbox" description="Add multiple checkboxes on the same row.">
                <div className="flex items-center gap-2">
                    <Checkbox />
                    <Checkbox />
                </div>
                <SourceCode code={`<Checkbox />
<Checkbox />`} />
            </Section>

            {/* 3. Disabled Checkbox */}
            <Section title="Disabled Checkbox" description="Add the disabled attribute to disable the control.">
                <div className="flex items-center gap-2">
                    <Checkbox disabled checked />
                    <Checkbox disabled />
                </div>
                <SourceCode code={`<Checkbox disabled checked />
<Checkbox disabled />`} />
            </Section>

            {/* 4. Colors Checkbox */}
            <Section title="Colors Checkbox" description="Use the variant prop to change the active color.">
                <div className="flex items-center gap-2">
                    <Checkbox defaultChecked variant="primary" />
                    <Checkbox defaultChecked variant="secondary" />
                    <Checkbox defaultChecked variant="success" />
                    <Checkbox defaultChecked variant="danger" />
                    <Checkbox defaultChecked variant="warning" />
                    <Checkbox defaultChecked variant="info" />
                    <Checkbox defaultChecked variant="dark" />
                    <Checkbox defaultChecked variant="light" />
                </div>
                <SourceCode code={`<Checkbox variant="primary" defaultChecked />
<Checkbox variant="secondary" defaultChecked />
<Checkbox variant="success" defaultChecked />
<Checkbox variant="danger" defaultChecked />
<Checkbox variant="warning" defaultChecked />
<Checkbox variant="info" defaultChecked />
<Checkbox variant="dark" defaultChecked />
<Checkbox variant="light" defaultChecked />`} />
            </Section>

            {/* 5. Radio */}
            <Section title="Radio" description="Radio buttons for selecting a single option from a list.">
                <div className="flex items-center gap-2">
                    <Radio name="radio1" checked />
                    <Radio name="radio1" defaultChecked />
                </div>
                <SourceCode code={`<Radio name="radio1" checked />
<Radio name="radio1" defaultChecked />`} />
            </Section>

            {/* 6. Inline Radio */}
            <Section title="Inline Radio" description="Display radio buttons horizontally.">
                <div className="flex items-center gap-2">
                    <Radio name="radio2" />
                    <Radio name="radio2" />
                </div>
                <SourceCode code={`<Radio name="radio2" />
<Radio name="radio2" />`} />
            </Section>

            {/* 7. Disabled Radio */}
            <Section title="Disabled Radio" description="Disabled state for radio buttons.">
                <div className="flex items-center gap-2">
                    <Radio disabled checked />
                    <Radio disabled />
                </div>
                <SourceCode code={`<Radio disabled checked />
<Radio disabled />`} />
            </Section>

            {/* 8. Colors Radio */}
            <Section title="Colors Radio" description="Color variants for radio buttons.">
                <div className="flex items-center gap-2">
                    <Radio name="c1" variant="primary" defaultChecked />
                    <Radio name="c2" variant="secondary" defaultChecked />
                    <Radio name="c3" variant="success" defaultChecked />
                    <Radio name="c4" variant="danger" defaultChecked />
                    <Radio name="c5" variant="warning" defaultChecked />
                    <Radio name="c6" variant="info" defaultChecked />
                    <Radio name="c7" variant="dark" defaultChecked />
                    <Radio name="c8" variant="light" defaultChecked />
                </div>
                <SourceCode code={`<Radio name="c1" variant="primary" defaultChecked />
<Radio name="c2" variant="secondary" defaultChecked />
<Radio name="c3" variant="success" defaultChecked />
<Radio name="c4" variant="danger" defaultChecked />
<Radio name="c5" variant="warning" defaultChecked />
<Radio name="c6" variant="info" defaultChecked />
<Radio name="c7" variant="dark" defaultChecked />
<Radio name="c8" variant="light" defaultChecked />`} />
            </Section>

            {/* 9. Switch */}
            <Section title="Switch" description="A switch has the markup of a custom checkbox but uses a toggle switch style.">
                <div className="flex items-center gap-2">
                    <Switch checked variant="danger" onChange={() => console.log()} size="sm" />
                    <Switch checked onChange={() => console.log()} />
                    <Switch disabled checked onChange={() => console.log()} />
                    <Switch disabled onChange={() => console.log()} />
                </div>
                <SourceCode code={`<Switch checked variant="danger" size="sm" onChange={() => {}} />
<Switch checked onChange={() => {}} />
<Switch disabled checked onChange={() => {}} />
<Switch disabled onChange={() => {}} />`} />
            </Section>

        </Container>
    );
}
