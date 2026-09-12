import { PaginationFirst, PaginationLast, PaginationNext, PaginationPrevious } from '../../lib/components/shared/pagination/page-change-buttons';
import Pagination from '../../lib/components/shared/pagination/pagination';
import PaginationItem from '../../lib/components/shared/pagination/pagination-item';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';

export default function Paginations() {
    return (
        <Container
            title="Pagination"
            description="Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages."
        >

            {/* 1. Default Pagination */}
            <Section
                title="Default Pagination"
                description="Use the button classes on an <a>, <button> or <input> element."
            >
                <div className="space-y-8">
                    {/* Text Based */}
                    <Pagination>
                        <PaginationPrevious />
                        <PaginationItem active>1</PaginationItem>
                        <PaginationItem>2</PaginationItem>
                        <PaginationItem>3</PaginationItem>
                        <PaginationNext />
                    </Pagination>

                    {/* Icon Based */}
                    <Pagination>
                        <PaginationFirst />
                        <PaginationItem active>1</PaginationItem>
                        <PaginationItem>2</PaginationItem>
                        <PaginationItem>3</PaginationItem>
                        <PaginationLast />
                    </Pagination>
                </div>

                <SourceCode code={`import { Pagination, PaginationItem, PaginationNext, PaginationPrevious } from 'sanmo-ui';

<Pagination>
    <PaginationPrevious />
    <PaginationItem active>1</PaginationItem>
    <PaginationItem>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationNext />
</Pagination>
          
<Pagination>
    <PaginationFirst />
    <PaginationItem active>1</PaginationItem>
    <PaginationItem>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationLast />
</Pagination>    
          `} />
            </Section>

            {/* 2. Rounded Pagination */}
            <Section
                title="Rounded Pagination"
                description="Simple pagination inspired by Rdio, great for apps and search results."
            >
                <div className="space-y-8">
                    <Pagination rounded>
                        <PaginationPrevious />
                        <PaginationItem>1</PaginationItem>
                        <PaginationItem active>2</PaginationItem>
                        <PaginationItem>3</PaginationItem>
                        <PaginationNext />
                    </Pagination>

                    <Pagination rounded>
                        <PaginationFirst />
                        <PaginationItem>1</PaginationItem>
                        <PaginationItem active>2</PaginationItem>
                        <PaginationItem>3</PaginationItem>
                        <PaginationLast />
                    </Pagination>
                </div>

                <SourceCode code={`<Pagination rounded>
  <PaginationPrevious />
  <PaginationItem>1</PaginationItem>
  <PaginationItem active>2</PaginationItem>
  <PaginationItem>3</PaginationItem>
  <PaginationNext />
</Pagination>

<Pagination rounded>
    <PaginationFirst />
    <PaginationItem>1</PaginationItem>
    <PaginationItem active>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationLast />
</Pagination>
`} />
            </Section>

            {/* 3. Alignment */}
            <Section
                title="Alignment"
                description="Change the alignment of pagination components with flexbox utilities."
            >
                <div className="space-y-8">
                    {/* Center */}
                    <div className="p-4">
                        <Pagination align="center">
                            <PaginationPrevious />
                            <PaginationItem active>1</PaginationItem>
                            <PaginationItem>2</PaginationItem>
                            <PaginationItem>3</PaginationItem>
                            <PaginationNext />
                        </Pagination>
                    </div>

                    {/* End */}
                    <div className="p-4">
                        <Pagination align="end">
                            <PaginationPrevious />
                            <PaginationItem active>1</PaginationItem>
                            <PaginationItem>2</PaginationItem>
                            <PaginationItem>3</PaginationItem>
                            <PaginationNext />
                        </Pagination>
                    </div>
                </div>

                <SourceCode code={`{/* Center Alignment */}
<Pagination align="center">
    <PaginationPrevious />
    <PaginationItem active>1</PaginationItem>
    <PaginationItem>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationNext />
</Pagination>

{/* Right Alignment */}
Pagination align="end">
    <PaginationPrevious />
    <PaginationItem active>1</PaginationItem>
    <PaginationItem>2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationNext />
</Pagination>`} />
            </Section>

            {/* 4. Sizing */}
            <Section
                title="Sizing"
                description="Add size props for additional sizes."
            >
                <div className="space-y-8">
                    {/* Large */}
                    <div>
                        <p className="mb-4 text-xs font-semibold text-slate-500 uppercase">Large</p>
                        <Pagination size="lg">
                            <PaginationItem active>1</PaginationItem>
                            <PaginationItem>2</PaginationItem>
                            <PaginationItem>3</PaginationItem>
                        </Pagination>
                    </div>

                    {/* Medium (Default) */}
                    <div>
                        <p className="mb-4 text-xs font-semibold text-slate-500 uppercase">Default</p>
                        <Pagination size="md">
                            <PaginationItem active>1</PaginationItem>
                            <PaginationItem>2</PaginationItem>
                            <PaginationItem>3</PaginationItem>
                        </Pagination>
                    </div>

                    {/* Small */}
                    <div>
                        <p className="mb-4 text-xs font-semibold text-slate-500 uppercase">Small</p>
                        <Pagination size="sm">
                            <PaginationItem active>1</PaginationItem>
                            <PaginationItem>2</PaginationItem>
                            <PaginationItem>3</PaginationItem>
                        </Pagination>
                    </div>
                </div>

                <SourceCode code={`<Pagination size="lg">...</Pagination>
<Pagination size="sm">...</Pagination>`} />
            </Section>

        </Container>
    );
}