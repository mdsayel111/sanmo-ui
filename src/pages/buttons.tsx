import React from "react";
import { Button, Variant } from "../../lib/index";
import CodeSnippet from "../components/shared/code-snippet";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import Usage from "../components/shared/usage";


const Buttons: React.FC = () => {
    const variants = [
        "Primary",
        "Secondary",
        "Success",
        "Danger",
        "Warning",
        "Info",
        "Dark",
        "Light",
        "Link",
    ];

    const getVarKey = (label: string): Variant =>
        label.toLowerCase() as Variant;

    return (
        <Container
            title="Buttons"
            description="A flexible, Tailwind CSS styled button library with multiple styles and shapes."
        >
            {/* Default */}
            <Section
                title="Default Buttons"
            >
                {variants.map((v) => (
                    <Button key={v} variant={getVarKey(v)}>
                        {v}
                    </Button>
                ))}

                <SourceCode code={`import { Button } from 'sanmo-ui';

<Button variant="primary">Submit</Button>

<Button variant="danger" styleType="outline" shape="pill">
    Delete
</Button>

<Button variant="success" styleType="soft">
    Approved
</Button>
`} />
            </Section>

            {/* Rounded */}
            <Section
                title="Rounded Buttons"
            >
                {variants.map((v) => (
                    <Button key={v} variant={getVarKey(v)} shape="pill">
                        {v}
                    </Button>
                ))}
                <SourceCode code={`import { Button } from 'sanmo-ui';

<Button variant="primary" shape="pill">Submit</Button>

<Button variant="danger" styleType="outline" shape="pill">
    Delete
</Button>

<Button variant="success" styleType="soft" shape="pill">
    Approved
</Button>
`} />
            </Section>

            {/* Outline */}
            <Section
                title="Outline Buttons"
            >
                {variants
                    .filter((v) => v !== "Link")
                    .map((v) => (
                        <Button
                            key={v}
                            variant={getVarKey(v)}
                            styleType="outline"
                        >
                            {v}
                        </Button>
                    ))}

                <SourceCode code={`import { Button } from 'sanmo-ui';

<Button variant="primary" styleType="outline">Submit</Button>

<Button variant="danger" styleType="outline">
    Delete
</Button>

<Button variant="success" styleType="soft">
    Approved
</Button>
`} />
            </Section>

            {/* Pill Outline */}
            <Section
                title="Outline Rounded Buttons"
            >
                {variants
                    .filter((v) => v !== "Dark" && v !== "Light" && v !== "Link")
                    .map((v) => (
                        <Button
                            key={v}
                            variant={getVarKey(v)}
                            styleType="outline"
                            shape="pill"
                        >
                            {v}
                        </Button>
                    ))}

                <SourceCode code={`import { Button } from 'sanmo-ui';

<Button variant="primary" styleType="outline" shape="pill">Submit</Button>

<Button variant="danger" styleType="outline" shape="pill">
    Delete
</Button>

<Button variant="success" styleType="soft" shape="pill">
    Approved
</Button>
`} />
            </Section>

            {/* Soft */}
            <Section
                title="Soft Buttons"
            >
                {[
                    "Primary",
                    "Secondary",
                    "Success",
                    "Danger",
                    "Warning",
                    "Info",
                ].map((v) => (
                    <Button key={v} variant={getVarKey(v)} styleType="soft">
                        {v}
                    </Button>
                ))}

                <SourceCode code={`import { Button } from 'sanmo-ui';

<Button variant="primary" styleType="soft">Submit</Button>

<Button variant="danger" styleType="soft">
    Delete
</Button>

<Button variant="success" styleType="soft">
    Approved
</Button>
`} />
            </Section>
        </Container>
    );
};

export default Buttons;
