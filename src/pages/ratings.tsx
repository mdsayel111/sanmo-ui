import { useState } from 'react';
import Button from '../../lib/components/shared/button';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';
import Rating from '../../lib/components/shared/rating';


export default function Ratings() {
    const [resetRating, setResetRating] = useState(3);

    return (
        <Container
            title="Rating"
            description="Zero dependency, highly customizable rating component for React."
        >

            {/* 1. Basic Example */}
            <Section title="Basic Example" description="Simple controlled or uncontrolled rating component.">
                <div className="flex items-center gap-4">
                    <Rating defaultValue={3} />
                </div>

                <SourceCode code={`import { Rating } from 'sanmo-ui';

<Rating defaultValue={3} />`} />
            </Section>

            {/* 2. Read Only */}
            <Section title="Read Only Examples" description="Use readOnly prop to prevent user interaction. Ideal for displaying aggregated reviews.">
                <div className="flex flex-col gap-4">
                    <Rating value={4} readOnly />
                    <Rating value={2} readOnly activeClassName="fill-blue-500 text-blue-500" />
                </div>

                <SourceCode code={`<Rating value={4} readOnly />`} />
            </Section>

            {/* 3. Disabled */}
            <Section title="Disabled Rating Example" description="Use disabled prop to show a non-interactive, grayed-out state.">
                <Rating value={0} disabled />

                <SourceCode code={`<Rating value={0} disabled />`} />
            </Section>

            {/* 4. Highlight Selected Only */}
            <Section title="Highlight only selected Example" description="Useful for Likert scales or specific selection where cumulative value implies less.">
                <Rating defaultValue={3} highlightSelectedOnly />

                <SourceCode code={`<Rating defaultValue={3} highlightSelectedOnly />`} />
            </Section>

            {/* 5. Rating With Reset Button */}
            <Section title="Rating With Reset Button" description="Control the rating value externally to allow resetting.">
                <div className="flex items-center gap-4">
                    <Rating
                        value={resetRating}
                        onChange={setResetRating}
                    />
                    <Button variant="primary" onClick={() => setResetRating(0)}>Reset</Button>
                    <span className="text-sm text-slate-500 ml-2">Value: {resetRating}</span>
                </div>

                <SourceCode code={`const [rating, setRating] = useState(3);

<Rating value={rating} onChange={setRating} />
<Button onClick={() => setRating(0)}>Reset</Button>`} />
            </Section>

            {/* 6. Custom Styling (Clear/Reset Rater Example from Image) */}
            <Section title="Custom & Clear Rater Example" description="Customizing icons, colors, and max values.">
                <div className="flex flex-col gap-2">
                    {/* Row 1: Standard Orange */}
                    <Rating value={5} readOnly />

                    {/* Row 2: Standard Orange */}
                    <Rating value={4} readOnly />

                    {/* Row 3: Custom Color */}
                    <Rating
                        value={3}
                        readOnly
                        activeClassName="fill-yellow-400 text-yellow-400"
                    />

                    {/* Row 4: Custom Color */}
                    <Rating
                        value={2}
                        readOnly
                        activeClassName="fill-emerald-400 text-emerald-400"
                    />

                    {/* Row 5: Custom Color */}
                    <Rating
                        value={1}
                        readOnly
                        activeClassName="fill-rose-500 text-rose-500"
                    />
                </div>

                <SourceCode code={`<Rating value={5} activeClassName="fill-orange-400 text-orange-400" />
<Rating value={3} activeClassName="fill-yellow-400 text-yellow-400" />
<Rating value={1} activeClassName="fill-rose-500 text-rose-500" />`} />
            </Section>

        </Container>
    );
}