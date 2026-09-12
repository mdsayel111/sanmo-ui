import Badge, { BadgeVariant } from '../../lib/components/shared/badge';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';



export default function Badges() {
    const allVariants: BadgeVariant[] = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark', 'purple', 'pink', 'orange'];

    return (
        <Container title="Badges" description="Documentation and examples for badges, our small count and labeling component.">
            {/* 1. Headings Example */}
            <Section
                title="Headings"
            >
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h1. Example heading <Badge variant="primary">New</Badge>
                    </h1>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h2. Example heading <Badge variant="secondary">New</Badge>
                    </h2>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h3. Example heading <Badge variant="success">New</Badge>
                    </h3>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h4. Example heading <Badge variant="info">New</Badge>
                    </h4>
                    <h5 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h5. Example heading <Badge variant="warning">New</Badge>
                    </h5>
                    <h6 className="text-base font-bold text-gray-900 dark:text-slate-100 flex items-center gap-3">
                        h6. Example heading <Badge variant="danger">New</Badge>
                    </h6>
                </div>
                <SourceCode code={`import { Badge } from 'sanmo-ui';

<h1>Example heading <Badge variant="primary">New</Badge></h1>
<h2>Example heading <Badge variant="secondary">New</Badge></h2>
<h3>Example heading <Badge variant="success">New</Badge></h3>
<h4>Example heading <Badge variant="info">New</Badge></h4>
<h5>Example heading <Badge variant="warning">New</Badge></h5>
<h6>Example heading <Badge variant="danger">New</Badge></h6>`} />
            </Section>

            {/* 2. Default & Pill Badges */}
            <Section
                title="Default & Pill Badges"
            >
                <div className="space-y-6">
                    {/* Standard */}
                    <div className="flex flex-wrap gap-2">
                        {allVariants.map(v => (
                            <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>

                    {/* Pill */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/30">
                        {allVariants.map(v => (
                            <Badge key={`${v}-pill`} variant={v} pill>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>
                </div>
                <SourceCode code={`import { Badge } from 'sanmo-ui';

// Default Solid Badges
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>

// Pill Badges
<Badge variant="primary" pill>Primary</Badge>
<Badge variant="purple" pill>Purple</Badge>`} />
            </Section>

            {/* 3. Outline Badges */}
            <Section
                title="Outline & Outline Pill Badges"
            >
                <div className="space-y-6">
                    {/* Standard */}
                    <div className="flex flex-wrap gap-2">
                        {allVariants.map(v => (
                            <Badge key={`${v}-outline`} variant={v} styleType="outline">{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>

                    {/* Pill */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/30">
                        {allVariants.map(v => (
                            <Badge key={`${v}-outline-pill`} variant={v} styleType="outline" pill>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>
                </div>
                <SourceCode code={`import { Badge } from 'sanmo-ui';

<Badge variant="primary" styleType="outline">Primary</Badge>
<Badge variant="warning" styleType="outline" pill>Warning</Badge>`} />
            </Section>

            {/* 4. Soft Badges */}
            <Section
                title="Soft & Soft Pill Badges"
            >
                <div className="space-y-6">
                    {/* Standard */}
                    <div className="flex flex-wrap gap-2">
                        {allVariants.map(v => (
                            <Badge key={`${v}-soft`} variant={v} styleType="soft">{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>

                    {/* Pill */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/30">
                        {allVariants.map(v => (
                            <Badge key={`${v}-soft-pill`} variant={v} styleType="soft" pill>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
                        ))}
                    </div>
                </div>
                <SourceCode code={`import { Badge } from 'sanmo-ui';
                
// Soft Badges
<Badge variant="primary" styleType="soft">Primary</Badge>
<Badge variant="danger" styleType="soft" pill>Danger</Badge>`} />
            </Section>

            {/* 5. Buttons & Positioning */}
            <Section
                title="Buttons & Position"
            >
                <div className="flex flex-wrap gap-6 items-center">

                    {/* Example 1: Inline Badge */}
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm flex items-center transition-colors">
                        Notifications
                        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-white text-xs">4</span>
                    </button>

                    {/* Example 2: Pill Inline */}
                    <button className="px-4 py-2 bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-md font-medium text-sm flex items-center transition-colors">
                        Notifications
                        <Badge variant="info" pill className="ml-2">new</Badge>
                    </button>

                    {/* Example 3: Badge styling with custom class */}
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-medium text-sm flex items-center transition-colors">
                        Notifications
                        <Badge variant="primary" className="ml-2 rounded-md">11</Badge>
                    </button>

                    {/* Example 4: Text Link */}
                    <a href="#" className="text-slate-400 hover:text-blue-400 font-medium text-sm flex items-center">
                        Notifications
                        <Badge variant="info" className="ml-2">90+</Badge>
                    </a>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700/50 flex gap-8">
                    {/* Position Example 1 */}
                    <button className="relative px-6 py-2 bg-blue-600 text-white rounded-md font-medium text-sm shadow-lg shadow-blue-900/20">
                        Inbox
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-[#0f172a]">
                            99+
                        </span>
                    </button>

                    {/* Position Example 2 */}
                    <button className="relative px-6 py-2 bg-cyan-600 text-white rounded-md font-medium text-sm shadow-lg shadow-cyan-900/20">
                        Profile
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>
                </div>
                <SourceCode code={`import { Badge } from 'sanmo-ui';

// Inside Button
<button className="btn...">
  Notifications <Badge variant="light" className="ml-2">4</Badge>
</button>

// Absolute Positioning (Notification Dot)
<button className="relative...">
  Inbox
  <Badge 
    variant="danger" 
    pill 
    className="absolute -top-2 -right-2 px-1.5 py-0.5"
  >
    99+
  </Badge>
</button>`} />
            </Section>
        </Container>
    );
}