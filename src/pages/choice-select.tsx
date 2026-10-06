import { useState } from "react";
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
  const [city, setCity] = useState("");
  const [technology, setTechnology] = useState("");
  const [configuredCity, setConfiguredCity] = useState("london");
  const [cities, setCities] = useState<string[]>(["new-york", "paris"]);
  const [tasks, setTasks] = useState<string[]>(["Task-1", "Task-2"]);
  const [projects, setProjects] = useState<string[]>(["Project-A", "Project-B"]);

  return (
    <Container
      title="Choices"
      description="A versatile select component supporting single select, multiple select, groups, and creatable tags."
    >
      
      {/* 1. Basic Example */}
      <Section title="Basic Example" description="A simple single select input.">
        <ChoiceSelect
          label="City"
          options={cityOptions}
          value={city}
          onChange={setCity}
          placeholder="Choose a city..."
        />
        <SourceCode code={`<ChoiceSelect 
  label="City"
  options={[
    { value: 'new-york', label: 'New York' },
    { value: 'london', label: 'London' }, 
    ...
  ]} 
  value={city}
  onChange={setCity}
  placeholder="Choose a city..." 
/>`} />
      </Section>

      <Section title="Input Sizing" description="Use the same inputSize options as the Input component.">
        <div className="space-y-4">
          <ChoiceSelect inputSize="sm" options={cityOptions} placeholder="Small choice select" />
          <ChoiceSelect options={cityOptions} placeholder="Default choice select" />
          <ChoiceSelect inputSize="lg" options={cityOptions} placeholder="Large choice select" />
        </div>
        <SourceCode code={`<ChoiceSelect inputSize="sm" options={options} />
<ChoiceSelect inputSize="default" options={options} />
<ChoiceSelect inputSize="lg" options={options} />`} />
      </Section>

      {/* 2. Option Groups */}
      <Section title="Option Groups Example" description="Organize options into categories.">
        <ChoiceSelect
          label="Technology"
          options={groupOptions}
          value={technology}
          onChange={setTechnology}
          placeholder="Select a technology..."
        />
        <SourceCode code={`<ChoiceSelect 
  label="Technology"
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    ...
  ]} 
  value={technology}
  onChange={setTechnology}
/>`} />
      </Section>

      {/* 3. Non-Searchable */}
      <Section title="Options added via config with no search" description="Disables the search input functionality.">
        <ChoiceSelect
          label="Configured city"
          options={cityOptions}
          searchable={false}
          value={configuredCity}
          onChange={setConfiguredCity}
        />
        <SourceCode code={`<ChoiceSelect
  label="Configured city"
  searchable={false}
  options={...}
  value={city}
  onChange={setCity}
/>`} />
      </Section>

      {/* 4. Multiple Select */}
      <Section title="Multiple select input" description="Allows selecting multiple options.">
        <ChoiceSelect 
          label="Cities"
          options={cityOptions} 
          multiple 
          value={cities}
          onChange={setCities}
          placeholder="Select cities..." 
        />
        <SourceCode code={`<ChoiceSelect
  label="Cities"
  multiple
  value={cities}
  onChange={setCities}
  options={...}
/>`} />
      </Section>

      {/* 5. Text Inputs (Creatable) */}
      <Section title="Text Inputs" description="Acts as a tag input where users can type and create new values.">
        <ChoiceSelect 
          label="Tasks"
          creatable 
          multiple 
          placeholder="Type and press Enter..." 
          value={tasks}
          onChange={setTasks}
        />
        <SourceCode code={`<ChoiceSelect
  label="Tasks"
  creatable
  multiple
  value={tasks}
  onChange={setTasks}
/>`} />
      </Section>

      {/* 6. Unique Values Only */}
      <Section title="Text inputs in Unique values only" description="Prevents duplicate tags from being added.">
        <ChoiceSelect 
          label="Projects"
          creatable 
          multiple 
          unique 
          placeholder="Add unique project tags..." 
          value={projects}
          onChange={setProjects}
        />
        <SourceCode code={`<ChoiceSelect
  label="Projects"
  creatable
  multiple
  unique
  value={projects}
  onChange={setProjects}
/>`} />
      </Section>

    </Container>
  );
}