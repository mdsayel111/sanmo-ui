import { Home, Slash } from 'lucide-react';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';
import Breadcrumb from '../../lib/components/shared/breadcrumb';



export default function Breadcrumbs() {

    // Mock Data
    const level1 = [{ label: 'Home', href: '/' }];
    const level2 = [{ label: 'Home', href: '/' }, { label: 'Library', href: '/library' }];
    const level3 = [{ label: 'Home', href: '/' }, { label: 'Library', href: '/library' }, { label: 'Data', active: true }];

    return (
        <Container
            title="Breadcrumbs"
            description="Indicate the current page's location within a navigational hierarchy."
        >
            {/* 1. Default Example (Chevron) */}
            <Section
                title="Default Example"
                description="Use an ordered list with linked list items to create a minimally styled breadcrumb. Default uses a chevron separator."
            >
                <div className="space-y-4">
                    <Breadcrumb items={level1} />
                    <Breadcrumb items={level2} />
                    <Breadcrumb items={level3} />
                </div>

                <SourceCode code={`import { Breadcrumb } from 'sanmo-ui';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Data', active: true }
]} />`}
                />
            </Section>

            {/* 2. Custom Dividers */}
            <Section
                title="Dividers Breadcrumb"
                description="Optionally you can specify a custom character or icon for the separator."
            >
                <div className="space-y-4">
                    {/* Example with '>' character string */}
                    <Breadcrumb items={level1} separator=">" />
                    <Breadcrumb items={level2} separator=">" />
                    <Breadcrumb items={level3} separator=">" />
                    {/* Example with Slash Icon */}
                    <Breadcrumb items={level3} separator={<Slash size={14} />} />

                </div>

                <SourceCode code={`import { Breadcrumb } from 'sanmo-ui';

// Using a string separator
<Breadcrumb items={items} separator=">" />

// Using an Icon component (e.g., Slash from lucide-react)
<Breadcrumb items={items} separator={<Slash size={14} />} />`} />

            </Section>

            {/* 3. With Icons */}
            <Section
                title="With Icons"
                description="Breadcrumb items can also accept icons for a richer visual experience."
            >
                <div className="space-y-4">
                    <Breadcrumb
                        items={[
                            { label: 'Home', href: '/', icon: <Home size={14} /> },
                            { label: 'Files', href: '/files' },
                            { label: 'Documents', active: true }
                        ]}
                    />
                </div>
                <SourceCode code={`import { Breadcrumb } from 'sanmo-ui';

<Breadcrumb
    items={[
        { label: 'Home', href: '/', icon: <Home size={14} /> }, // use icon component for show icon, the icon is optional
        { label: 'Files', href: '/files' },
        { label: 'Documents', active: true }
    ]}
/>`} />
            </Section>
        </Container>
    );
}