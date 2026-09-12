import Input from '../../lib/components/shared/input/input';
import Select from '../../lib/components/shared/input/select/select';
import Textarea from '../../lib/components/shared/input/text-area';
import Container from '../components/shared/container';
import Section from '../components/shared/section';
import SourceCode from '../components/shared/source-code';

export default function Inputs() {
  return (
    <Container
      title="Input"
      description="Give textual form controls like <input>s and <textarea>s an upgrade with custom styles, sizing, focus states, and more."
    >

      {/* 1. Basic Examples */}
      <Section title="Basic Example" description="Standard form controls.">
        <div className="space-y-4">
          <Input label="Text" placeholder="Text Input" />
          <Input label="Email" type="email" placeholder="Email" />
          <Input label="Password" type="password" placeholder="password" />
          <Input label="Placeholder" placeholder="placeholder" />
          <Textarea label="Text area" placeholder="Write something..." />
        </div>

        <SourceCode code={`<Input label="Text" placeholder="Text Input" />
<Input label="Email" type="email" placeholder="Email" />
<Input label="Password" type="password" placeholder="password" />
<Textarea label="Text area" />`} />
      </Section>

      {/* 2. Sizing */}
      <Section
        title="Input Sizing"
        description={
          <span>
            Set heights using size props like <code>inputSize="lg"</code> and <code>inputSize="sm"</code>.
          </span>
        }
      >
        <div className="space-y-4">
          <Input inputSize="lg" placeholder=".form-control-lg" />
          <Input inputSize="default" placeholder="Default input" />
          <Input inputSize="sm" placeholder=".form-control-sm" />
        </div>

        <SourceCode code={`<Input inputSize="lg" placeholder=".form-control-lg" />
<Input placeholder="Default input" />
<Input inputSize="sm" placeholder=".form-control-sm" />`} />
      </Section>

      {/* 3. Disabled */}
      <Section
        title="Disabled Input"
        description={
          <span>
            Add the <code>disabled</code> boolean attribute on an input to give it a grayed out appearance, remove pointer events, and prevent focusing.
          </span>
        }
      >
        <div className="space-y-4">
          <Input disabled placeholder="Disabled input" />
          <Input disabled readOnly placeholder="Disabled readonly input" />
        </div>

        <SourceCode code={`<Input disabled placeholder="Disabled input" />
<Input disabled readOnly placeholder="Disabled readonly input" />`} />
      </Section>

      {/* 4. Readonly */}
      <Section
        title="Readonly Input"
        description={
          <span>
            Add the <code>readOnly</code> boolean attribute on an input to prevent modification of the input's value. <code>readOnly</code> inputs can still be focused and selected, while <code>disabled</code> inputs cannot.
          </span>
        }
      >
        <div className="space-y-4">
          <Input readOnly placeholder="Readonly input here..." />
          <div className="border-t border-slate-800 pt-4 mt-4">
            <p className="text-sm text-slate-400 mb-2">
              If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled as plain text, use the <code>plaintext</code> prop to remove the default form field styling and preserve the correct margin and padding.
            </p>
            <Input plaintext readOnly defaultValue="email@example.com" />
          </div>
        </div>

        <SourceCode code={`<Input readOnly placeholder="Readonly input here..." />

{/* Plaintext Readonly */}
<Input plaintext readOnly defaultValue="email@example.com" />`} />
      </Section>

      {/* 5. Datalists */}
      <Section

        title="Datalists input"
        description="Datalists allow you to create a group of options that can be accessed (and autocompleted) from within an input."
      >
        <div className="space-y-4">
          <Input list="datalistOptions" placeholder="Type to search..." />
          <datalist id="datalistOptions">
            <option value="San Francisco" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </div>

        <SourceCode code={`<Input list="datalistOptions" placeholder="Type to search..." />
<datalist id="datalistOptions">
  <option value="San Francisco" />
  <option value="New York" />
  <option value="Seattle" />
  <option value="Los Angeles" />
  <option value="Chicago" />
</datalist>`} />
      </Section>

      {/* 6. Select */}
      <Section
        title="Select"
        description="Custom select menus need only a custom class to trigger the custom styles."
      >
        <div className="space-y-6">
          <div className='space-y-4'>

            <Select
              // value={"1"}
              onValueChange={() => { }}
              selectSize='lg'
              options={[
                { label: 'Open this select menu', value: '1' },
                { label: 'One', value: '2' },
                { label: 'Two', value: '3' },
                { label: 'Three', value: '4' },
              ]}
            />
            {/* <Select
              value={[]}
              onValueChange={() => { }}
              multiple
              options={[
                { label: 'Open this select menu', value: 'text' },
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ]}
            /> */}
          </div>
        </div>

        <SourceCode code={`<Select>
  <option>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</Select>

{/* Multiple */}
<Select multiple>
  <option value="1">One</option>
  {/* ... */}
</Select>`} />
      </Section>

    </Container>
  );
}