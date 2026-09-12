import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import Slider from "../../lib/components/shared/slider";


export default function Sliders() {
    const [basicVal, setBasicVal] = useState<number | number[]>(50);
    const [rangeVal, setRangeVal] = useState<number | number[]>([20, 80]);
    const [vertVal, setVertVal] = useState<number | number[]>([40]);

    // Color Picker State
    const [red, setRed] = useState<number | number[]>(200);
    const [green, setGreen] = useState<number | number[]>(150);
    const [blue, setBlue] = useState<number | number[]>(80);

    return (
        <Container
            title="Range Slider"
            description="A lightweight and powerful range slider component with support for single values, ranges, vertical orientation, and custom styling."
        >

            {/* 1. Basic Range Slider */}
            <Section title="Basic Range Slider" description="A standard single-handle horizontal slider.">
                <div className="py-4">
                    <Slider
                        value={basicVal}
                        onChange={setBasicVal}
                    />
                    <div className="mt-4 text-sm text-slate-400">Value: {basicVal}</div>
                </div>
                <SourceCode code={`<Slider value={value} onChange={setValue} />`} />
            </Section>

            {/* 2. Multi Elements Range */}
            <Section title="Multi Elements Range" description="Select a range between two values.">
                <div className="py-4">
                    <Slider
                        value={rangeVal}
                        onChange={setRangeVal}
                    />
                    <div className="mt-4 text-sm text-slate-400">
                        Range: {(rangeVal as number[])[0]} - {(rangeVal as number[])[1]}
                    </div>
                </div>
                <SourceCode code={`<Slider value={[20, 80]} onChange={setValue} />`} />
            </Section>

            {/* 3. Vertical Range Slider */}
            <Section title="Vertical Range Slider" description="Sliders can be oriented vertically with the vertical prop.">
                <div className="h-64 flex items-center gap-8 pl-4">
                    <Slider
                        vertical
                        value={vertVal}
                        onChange={setVertVal}
                    />
                    <Slider
                        vertical
                        value={[30, 70]}
                        onChange={() => { }}
                        color="bg-emerald-500"
                    />
                </div>
                <SourceCode code={`<Slider vertical value={40} onChange={setValue} />`} />
            </Section>

            {/* 4. Colorpicker Example */}
            <Section title="Colorpicker" description="Combine multiple sliders to create interactive UI controls.">
                <div className="flex gap-8 items-center bg-background p-8 rounded-xl">

                    {/* Sliders */}
                    <div className="flex gap-6 h-48">
                        <div className="flex flex-col items-center gap-2">
                            <Slider vertical max={255} value={red} onChange={setRed} color="bg-rose-500" />
                            <span className="text-xs text-rose-500 font-bold">R</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Slider vertical max={255} value={green} onChange={setGreen} color="bg-emerald-500" />
                            <span className="text-xs text-emerald-500 font-bold">G</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Slider vertical max={255} value={blue} onChange={setBlue} color="bg-blue-500" />
                            <span className="text-xs text-blue-500 font-bold">B</span>
                        </div>
                    </div>

                    {/* Color Preview */}
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="w-32 h-32 rounded-xl shadow-2xl border-4 border-slate-700 transition-colors"
                            style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
                        />
                        <code className="text-xs bg-slate-950 px-2 py-1 rounded text-slate-400">
                            rgb({red}, {green}, {blue})
                        </code>
                    </div>

                </div>
                <SourceCode code={`<Slider vertical max={255} value={red} onChange={setRed} color="bg-rose-500" />
<Slider vertical max={255} value={green} onChange={setGreen} color="bg-emerald-500" />
<Slider vertical max={255} value={blue} onChange={setBlue} color="bg-blue-500" />

<div style={{ backgroundColor: \`rgb(\${red}, \${green}, \${blue})\` }} />`} />
            </Section>

        </Container>
    );
}