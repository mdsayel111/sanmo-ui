import { Button } from '../../lib';
import Dropdown from '../../lib/components/shared/dropdown/dropdown';
import DropdownContent from '../../lib/components/shared/dropdown/dropdown-content';
import DropdownDivider from '../../lib/components/shared/dropdown/dropdown-deivider';
import DropdownItem from '../../lib/components/shared/dropdown/dropdown-item';
import DropdownPlaceholder from '../../lib/components/shared/dropdown/dropdown-placeholder';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';


export default function Dropdowns() {
    return (
        <Container
            title="Dropdowns"
            description="Toggle contextual overlays for displaying lists of links and more with the Dropdown plugin."
        >
            {/* 1. Single Button */}
            <Section title="Single Button Dropdowns">
                <div className="flex flex-wrap gap-4">
                    <Dropdown>
                        <DropdownPlaceholder><Button variant="primary">Dropdown link</Button></DropdownPlaceholder>
                        <DropdownContent>
                            <DropdownItem>Option 1</DropdownItem>
                            <DropdownItem>Option 2</DropdownItem>
                            <DropdownItem>Option 3</DropdownItem>
                            <DropdownItem>Option 4</DropdownItem>
                            <DropdownItem>Option 5</DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                    <Dropdown variant='link'>
                        <DropdownPlaceholder><Button variant="secondary">Dropdown button</Button></DropdownPlaceholder>
                        <DropdownContent>
                            <DropdownItem>Option 1</DropdownItem>
                            <DropdownItem>Option 2</DropdownItem>
                            <DropdownItem>Option 3</DropdownItem>
                            <DropdownItem>Option 4</DropdownItem>
                            <DropdownItem>Option 5</DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </div>
                <SourceCode code={`import { Dropdown } from 'sanmo-ui';

<Dropdown>
    <DropdownPlaceholder>
        <Button variant="primary">Dropdown link</Button>
    </DropdownPlaceholder>
    <DropdownContent>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownItem>Option 4</DropdownItem>
        <DropdownItem>Option 5</DropdownItem>
    </DropdownContent>
</Dropdown>


<Dropdown variant='link'>
    <DropdownPlaceholder>
        <Button variant="secondary">Dropdown button</Button>
    </DropdownPlaceholder>
    <DropdownContent>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownItem>Option 4</DropdownItem>
        <DropdownItem>Option 5</DropdownItem>
    </DropdownContent>
</Dropdown>

`} />
            </Section>
        </Container>
    );
}