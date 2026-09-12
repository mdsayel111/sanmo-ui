import { Bell, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../../lib/components/shared/button';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';
import { ToastPosition } from '../../lib/components/shared/toast/types';
import Toast from '../../lib/components/shared/toast/toast';
import ToastBody from '../../lib/components/shared/toast/toast-body';
import ToastContainer from '../../lib/components/shared/toast/toast-container';
import ToastHeader from '../../lib/components/shared/toast/toast-header';
import { Dropdown, Select } from '../../lib';





export default function Toasts() {
    // Demo States
    const [showLiveToast, setShowLiveToast] = useState(false);
    const [showPlacementToast, setShowPlacementToast] = useState(false);
    const [placement, setPlacement] = useState<ToastPosition>('top-right');

    // Helper to format placement string
    const formatPlacement = (p: string) => p.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    const options = [
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Middle Left', value: 'middle-left' },
        { label: 'Middle Center', value: 'middle-center' },
        { label: 'Middle Right', value: 'middle-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Right', value: 'bottom-right' },
    ]

    return (
        <Container
            title="Toasts"
            description="Push notifications to your visitors with a toast, a lightweight and easily customizable alert message."
        >

            {/* 1. Basic Example (Static) */}
            <Section title="Basic Examples" description="Toasts are as flexible as you need and have very little required markup.">
                <div className="">
                    <Toast show={true} className="mb-4">
                        <ToastHeader icon={<Bell size={25} />} time="11 mins ago">Rasket</ToastHeader>
                        <ToastBody>Hello, world! This is a toast message.</ToastBody>
                    </Toast>
                </div>

                <SourceCode code={`<Toast show={true}>
  <ToastHeader icon={<Bell size={16} />} time="11 mins ago">
    Rasket
  </ToastHeader>
  <ToastBody>
    Hello, world! This is a toast message.
  </ToastBody>
</Toast>`} />
            </Section>

            {/* 2. Live Example */}
            <Section title="Live Example" description="Click the button below to show a toast (positioned with our utilities in the lower right corner) that has been hidden by default.">
                <Button onClick={() => setShowLiveToast(true)}>Show live toast</Button>

                {/* Rendered outside in a fixed container */}
                <ToastContainer position="bottom-right">
                    <Toast show={showLiveToast} onClose={() => setShowLiveToast(false)} autohide delay={3000}>
                        <ToastHeader icon={<div className="w-4 h-4 bg-secondary rounded" />} time="Just now" onClose={() => setShowLiveToast(false)}>
                            Bootstrap
                        </ToastHeader>
                        <ToastBody>See? Just like this.</ToastBody>
                    </Toast>
                </ToastContainer>

                <SourceCode code={`const [show, setShow] = useState(false);

<Button onClick={() => setShow(true)}>Show live toast</Button>

{/* Usually placed at root level */}
<ToastContainer position="bottom-right">
  <Toast show={show} onClose={() => setShow(false)} autohide>
    <ToastHeader time="Just now" onClose={() => setShow(false)}>
      Bootstrap
    </ToastHeader>
    <ToastBody>See? Just like this.</ToastBody>
  </Toast>
</ToastContainer>`} />
            </Section>

            {/* 3. Translucent */}
            <Section title="Translucent" description="Toasts are slightly translucent to blend over whatever they might appear over.">
                <div className="relative p-12 rounded-lg overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 z-0" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10">
                        <Toast show={true} className="backdrop-blur-md border-slate-700/50">
                            <ToastHeader icon={<Bell size={25} />} time="11 mins ago" onClose={() => { }}>Rasket</ToastHeader>
                            <ToastBody>Hello, world! This is a toast message.</ToastBody>
                        </Toast>
                    </div>
                </div>

                <SourceCode code={`<Toast show={true} className="bg-slate-900/80 backdrop-blur-md">
  {/* ... */}
</Toast>`} />
            </Section>

            {/* 4. Custom Content */}
            <Section title="Custom Content" description="Customize your toasts by removing sub-components, adding utilities, or custom markup.">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Simple Text + Close */}
                    <Toast show={true} className="w-full">
                        <div className="flex items-center justify-between p-3">
                            <span className="text-sm text-slate-600 dark:text-slate-200">Hello, world! This is a toast message.</span>
                            <button className="text-slate-400 hover:text-black dark:hover:text-white"><X size={16} /></button>
                        </div>
                    </Toast>

                    {/* Action Buttons */}
                    <Toast show={true} className="w-full">
                        <ToastBody>
                            Hello, world! This is a toast message.
                            <div className="mt-3 pt-3 border-t border-slate-700 flex gap-2">
                                <Button variant="primary" className="py-1 px-3 text-xs">Take action</Button>
                                <Button variant="secondary" className="py-1 px-3 text-xs">Close</Button>
                            </div>
                        </ToastBody>
                    </Toast>

                    {/* Color Schemes */}
                    <Toast show={true} variant="primary" className="w-full">
                        <div className="flex items-center justify-between p-3 bg-secondary">
                            <span className="text-sm font-medium">Hello, world! This is a toast message.</span>
                            <button className="text-white/70 hover:text-white"><X size={16} /></button>
                        </div>
                    </Toast>
                </div>
            </Section>

            {/* 5. Placement */}
            <Section title="Placement" description="Place toasts with custom CSS as you need them. Select a position below to see it in action.">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-400 mb-2">Toast placement</label>
                    <Select
                        options={options}
                        placeholder='Select position'
                        value={placement}
                        onValueChange={(value) => setPlacement(value as ToastPosition)}
                    />
                </div>

                <div className="bg-background relative h-64 rounded flex items-center justify-center overflow-hidden">
                    {/* We simulate the viewport container within this box for demo purposes by using absolute positioning inside relative container instead of fixed */}
                    <div className={`absolute flex flex-col gap-4 p-4 transition-all duration-300 ${{
                        'top-left': 'top-0 left-0',
                        'top-center': 'top-0 left-1/2 -translate-x-1/2',
                        'top-right': 'top-0 right-0',
                        'middle-left': 'top-1/2 left-0 -translate-y-1/2',
                        'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                        'middle-right': 'top-1/2 right-0 -translate-y-1/2',
                        'bottom-left': 'bottom-0 left-0',
                        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
                        'bottom-right': 'bottom-0 right-0',
                    }[placement]
                        }`}>
                        <Toast show={true}>
                            <ToastHeader icon={<Bell size={25} />} time="11 mins ago">Rasket</ToastHeader>
                            <ToastBody>Position: {formatPlacement(placement)}</ToastBody>
                        </Toast>
                    </div>
                </div>

                <SourceCode code={`<ToastContainer position="${placement}">
  <Toast show={true}>
    {/* ... */}
  </Toast>
</ToastContainer>`} />
            </Section>

        </Container>
    );
}