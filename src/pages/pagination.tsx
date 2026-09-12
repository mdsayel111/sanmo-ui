import { useState } from "react";

import Pagination from "../../lib/components/shared/pagination";

import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";

export default function PaginationPage() {

    const [defaultPage, setDefaultPage] = useState(1);

    const [outlinePage, setOutlinePage] = useState(5);

    const [ghostPage, setGhostPage] = useState(3);

    const [smallPage, setSmallPage] = useState(2);

    const [largePage, setLargePage] = useState(8);

    const [squarePage, setSquarePage] = useState(4);

    const [infoPage, setInfoPage] = useState(5);

    const [customLengthPage, setCustomLengthPage] = useState(11);

    return (
        <Container
            title="Pagination"
            description="Examples and usage guidelines for pagination component."
        >

            {/* Default Variant */}
            <Section
                title="Default Variant"
                description="Primary filled pagination style."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={defaultPage}
                        totalPages={10}
                        onPageChange={setDefaultPage}
                        variant="default"
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(1);

<Pagination
    currentPage={page}
    totalPages={10}
    onPageChange={setPage}
    variant="default"
/>`}
                />
            </Section>

            {/* Outline Variant */}
            <Section
                title="Outline Variant"
                description="Bordered pagination style."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={outlinePage}
                        totalPages={20}
                        onPageChange={setOutlinePage}
                        variant="outline"
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(5);

<Pagination
    currentPage={page}
    totalPages={20}
    onPageChange={setPage}
    variant="outline"
/>`}
                />
            </Section>

            {/* Ghost Variant */}
            <Section
                title="Ghost Variant"
                description="Minimal ghost pagination style."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={ghostPage}
                        totalPages={12}
                        onPageChange={setGhostPage}
                        variant="ghost"
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(3);

<Pagination
    currentPage={page}
    totalPages={12}
    onPageChange={setPage}
    variant="ghost"
/>`}
                />
            </Section>

            {/* Small Size */}
            <Section
                title="Small Pagination"
                description="Compact pagination component."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={smallPage}
                        totalPages={8}
                        onPageChange={setSmallPage}
                        size="sm"
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(2);

<Pagination
    currentPage={page}
    totalPages={8}
    onPageChange={setPage}
    size="sm"
/>`}
                />
            </Section>

            {/* Large Size */}
            <Section
                title="Large Pagination"
                description="Large pagination buttons."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={largePage}
                        totalPages={50}
                        onPageChange={setLargePage}
                        size="lg"
                        variant="default"
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(8);

<Pagination
    currentPage={page}
    totalPages={50}
    onPageChange={setPage}
    size="lg"
    variant="default"
/>`}
                />
            </Section>

            {/* Square Pagination */}
            <Section
                title="Square Pagination"
                description="Pagination without rounded corners."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={squarePage}
                        totalPages={15}
                        onPageChange={setSquarePage}
                        rounded={false}
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(4);

<Pagination
    currentPage={page}
    totalPages={15}
    onPageChange={setPage}
    rounded={false}
/>`}
                />
            </Section>

            {/* With Info */}
            <Section
                title="With Info"
                description="Show current page information."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={infoPage}
                        totalPages={24}
                        onPageChange={setInfoPage}
                        showInfo
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(5);

<Pagination
    currentPage={page}
    totalPages={24}
    onPageChange={setPage}
    showInfo
/>`}
                />
            </Section>

            {/* Custom Visible Length */}
            <Section
                title="Custom Visible Length"
                description="Control how many pagination items appear at once."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={customLengthPage}
                        totalPages={50}
                        onPageChange={setCustomLengthPage}
                        visiblePages={5}
                    />
                </div>

                <SourceCode
                    code={`const [page, setPage] = useState(11);

<Pagination
    currentPage={page}
    totalPages={50}
    onPageChange={setPage}
    visiblePages={5}
/>`}
                />
            </Section>

            {/* Large Visible Length */}
            <Section
                title="Large Visible Length"
                description="Display more pagination items."
            >
                <div className="p-4">
                    <Pagination
                        currentPage={17}
                        totalPages={50}
                        visiblePages={8}
                    />
                </div>

                <SourceCode
                    code={`<Pagination
    currentPage={17}
    totalPages={50}
    visiblePages={8}
/>`}
                />
            </Section>

        </Container>
    );
}