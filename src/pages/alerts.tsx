import {
    AlertTriangle,
    CheckCircle,
    Info,
    XCircle
} from 'lucide-react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

import Alert from "../../lib/components/shared/alert/alert";
import AlertHeading from "../../lib/components/shared/alert/alert-heading";
import AlertLink from "../../lib/components/shared/alert/alert-link";






/**
 * =========================================================================
 * DOCUMENTATION PAGE
 * =========================================================================
 */

export default function Alerts() {
    return (
        <Container
            title="Alerts"
            description="Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages."
        >

            {/* 1. Basic Examples */}
            <Section
                title="Basic Example"
                description="Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages."
            >
                <div className="space-y-4">
                    <Alert variant="primary">A simple primary alert — check it out!</Alert>
                    <Alert variant="secondary">A simple secondary alert — check it out!</Alert>
                    <Alert variant="success">A simple success alert — check it out!</Alert>
                    <Alert variant="danger">A simple danger alert — check it out!</Alert>
                    <Alert variant="warning">A simple warning alert — check it out!</Alert>
                    <Alert variant="info">A simple info alert — check it out!</Alert>
                    <Alert variant="light">A simple light alert — check it out!</Alert>
                    <Alert variant="dark">A simple dark alert — check it out!</Alert>
                </div>

                <SourceCode code={`<Alert variant="primary">A simple primary alert...</Alert>
<Alert variant="secondary">A simple secondary alert...</Alert>
<Alert variant="success">A simple success alert...</Alert>
<Alert variant="danger">A simple danger alert...</Alert>
<Alert variant="warning">A simple warning alert...</Alert>
<Alert variant="info">A simple info alert...</Alert>`} />
            </Section>

            {/* 2. Dismissible */}
            <Section
                title="Dismissible Alerts"
                description="Add the dismissible prop to add a functioning dismiss button to the alert."
            >
                <div className="space-y-4">
                    <Alert variant="primary" dismissible>
                        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    </Alert>
                    <Alert variant="success" dismissible>
                        <strong>Success!</strong> Your changes have been saved successfully.
                    </Alert>
                    <Alert variant="warning" dismissible>
                        <strong>Warning!</strong> Better check yourself, you're not looking too good.
                    </Alert>
                </div>

                <SourceCode code={`<Alert variant="warning" dismissible>
  <strong>Warning!</strong> Better check yourself...
</Alert>`} />
            </Section>

            {/* 3. With Icons */}
            <Section
                title="Icons Alert Example"
                description="You can also include additional elements like icons, heading, etc along side the actual message."
            >
                <div className="space-y-4">
                    <Alert variant="primary" icon={<Info size={18} />}>
                        A simple primary alert — check it out!
                    </Alert>
                    <Alert variant="secondary" icon={<XCircle size={18} />}>
                        A simple secondary alert — check it out!
                    </Alert>
                    <Alert variant="success" icon={<CheckCircle size={18} />}>
                        A simple success alert — check it out!
                    </Alert>
                    <Alert variant="danger" icon={<AlertTriangle size={18} />}>
                        A simple danger alert — check it out!
                    </Alert>
                </div>

                <SourceCode code={`import { Info, CheckCircle } from 'lucide-react';

<Alert variant="primary" icon={<Info size={18} />}>
  A simple primary alert...
</Alert>`} />
            </Section>

            {/* 4. Alert Links */}
            <Section
                title="Alert Link Example"
                description="Use the AlertLink component to quickly provide matching colored links within any alert."
            >
                <div className="space-y-4">
                    <Alert variant="primary">
                        A simple primary alert with <AlertLink>an example link</AlertLink>. Give it a click if you like.
                    </Alert>
                    <Alert variant="success">
                        A simple success alert with <AlertLink>an example link</AlertLink>. Give it a click if you like.
                    </Alert>
                    <Alert variant="danger">
                        A simple danger alert with <AlertLink>an example link</AlertLink>. Give it a click if you like.
                    </Alert>
                </div>

                <SourceCode code={`<Alert variant="primary">
  A simple primary alert with <AlertLink href="#">an example link</AlertLink>.
</Alert>`} />
            </Section>

            {/* 5. Additional Content */}
            <Section
                title="Additional Content"
                description="Alerts can also contain additional HTML elements like headings, paragraphs and dividers."
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <Alert variant="success">
                        <AlertHeading>Well done!</AlertHeading>
                        <p className="mb-4">
                            Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
                        </p>
                        <hr className="border-emerald-800 mb-4" />
                        <p className="mb-0">
                            Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                        </p>
                    </Alert>

                    <Alert variant="info">
                        <AlertHeading>Heads up!</AlertHeading>
                        <p>
                            This is a secondary alert block with additional content. It's useful for displaying larger chunks of information that need to stand out from the rest of the page content.
                        </p>
                    </Alert>
                </div>

                <SourceCode code={`<Alert variant="success">
  <AlertHeading>Well done!</AlertHeading>
  <p>Aww yeah, you successfully read this important alert message...</p>
  <hr className="border-emerald-800 my-4" />
  <p className="mb-0">Whenever you need to...</p>
</Alert>`} />
            </Section>

        </Container>
    );
}