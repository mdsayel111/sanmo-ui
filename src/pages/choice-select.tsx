import ChoiceSelect from "../../lib/components/shared/input/choice-select";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";




const cityOptions = [
  { value: 'new-york', label: 'New York' },
  { value: 'london', label: 'London' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'paris', label: 'Paris' },
  { value: 'berlin', label: 'Berlin' },
];

const groupOptions = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'go', label: 'Go', group: 'Backend' },
];

export default function ChoiceSelects() {
  return (
    <Container
      title="Choices"
      description="A versatile select component supporting single select, multiple select, groups, and creatable tags."
    >
      
      {/* 1. Basic Example */}
      <Section title="Basic Example" description="A simple single select input.">
        <ChoiceSelect options={cityOptions} placeholder="Choose a city..." />
        <SourceCode code={`<ChoiceSelect 
  options={[
    { value: 'new-york', label: 'New York' },
    { value: 'london', label: 'London' }, 
    ...
  ]} 
  placeholder="Choose a city..." 
/>`} />
      </Section>

      {/* 2. Option Groups */}
      <Section title="Option Groups Example" description="Organize options into categories.">
        <ChoiceSelect options={groupOptions} placeholder="Select a technology..." />
        <SourceCode code={`<ChoiceSelect 
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    ...
  ]} 
/>`} />
      </Section>

      {/* 3. Non-Searchable */}
      <Section title="Options added via config with no search" description="Disables the search input functionality.">
        <ChoiceSelect options={cityOptions} searchable={false} defaultValue="london" />
        <SourceCode code={`<ChoiceSelect searchable={false} options={...} defaultValue="london" />`} />
      </Section>

      {/* 4. Multiple Select */}
      <Section title="Multiple select input" description="Allows selecting multiple options.">
        <ChoiceSelect 
          options={cityOptions} 
          multiple 
          defaultValue={['new-york', 'paris']} 
          placeholder="Select cities..." 
        />
        <SourceCode code={`<ChoiceSelect multiple defaultValue={['new-york', 'paris']} options={...} />`} />
      </Section>

      {/* 5. Text Inputs (Creatable) */}
      <Section title="Text Inputs" description="Acts as a tag input where users can type and create new values.">
        <ChoiceSelect 
          creatable 
          multiple 
          placeholder="Type and press Enter..." 
          defaultValue={['Task-1', 'Task-2']}
        />
        <SourceCode code={`<ChoiceSelect creatable multiple defaultValue={['Task-1']} />`} />
      </Section>

      {/* 6. Unique Values Only */}
      <Section title="Text inputs in Unique values only" description="Prevents duplicate tags from being added.">
        <ChoiceSelect 
          creatable 
          multiple 
          unique 
          placeholder="Add unique project tags..." 
          defaultValue={['Project-A', 'Project-B']}
        />
        <SourceCode code={`<ChoiceSelect creatable multiple unique defaultValue={['Project-A']} />`} />
      </Section>

    </Container>
  );
}