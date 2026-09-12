import MaskedInput from "../../lib/components/shared/mask-input";
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";


export default function InputMasksDocs() {
  return (
    <Container
      title="Input Masks"
      description="Automatically format data as the user types using built-in input masks."
    >
      
      {/* 1. Date & Time */}
      <Section title="Date & Time" description="Masks for date and time formats.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaskedInput 
            label="Date" 
            maskType="date" 
            placeholder="DD/MM/YYYY" 
            helperText='e.g "DD/MM/YYYY"'
          />
          <MaskedInput 
            label="Time" 
            maskType="time" 
            placeholder="HH:MM:SS" 
            helperText='e.g "HH:MM:SS"'
          />
        </div>
        <SourceCode code={`<MaskedInput label="Date" maskType="date" placeholder="DD/MM/YYYY" />
<MaskedInput label="Time" maskType="time" placeholder="HH:MM:SS" />`} />
      </Section>

      {/* 2. Contact Info */}
      <Section title="Contact Information" description="Standard phone formats.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaskedInput 
            label="US Telephone" 
            maskType="phone-us" 
            placeholder="(xxx) xxx-xxxx" 
            helperText='e.g "(xxx) xxx-xxxx"'
          />
          <MaskedInput 
            label="Brazilian Telephone" 
            maskType="phone-br" 
            placeholder="(xx) xxxxx-xxxx" 
            helperText='e.g "(xx) xxxxx-xxxx"'
          />
        </div>
        <SourceCode code={`<MaskedInput maskType="phone-us" label="US Telephone" />
<MaskedInput maskType="phone-br" label="Brazilian Telephone" />`} />
      </Section>

      {/* 3. Financial & ID */}
      <Section title="Financial & IDs" description="Currency and identification numbers.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaskedInput 
            label="Currency (USD)" 
            maskType="currency" 
            placeholder="$0.00" 
            helperText="Auto-formats as currency"
          />
          <MaskedInput 
            label="Credit Card" 
            maskType="credit-card" 
            placeholder="0000 0000 0000 0000" 
            helperText="e.g 'xxxx xxxx xxxx xxxx'"
          />
          <MaskedInput 
            label="CPF (Brazil ID)" 
            maskType="cpf" 
            placeholder="xxx.xxx.xxx-xx" 
            helperText="e.g 'xxx.xxx.xxx-xx'"
          />
          <MaskedInput 
            label="ZIP Code" 
            maskType="zip" 
            placeholder="xxxxx-xxx" 
            helperText="e.g 'xxxxx-xxx'"
          />
        </div>
        <SourceCode code={`<MaskedInput maskType="currency" label="Currency" />
<MaskedInput maskType="credit-card" label="Credit Card" />
<MaskedInput maskType="cpf" label="CPF" />
<MaskedInput maskType="zip" label="ZIP Code" />`} />
      </Section>

      {/* 4. Network */}
      <Section title="Network" description="IP Address formatting.">
        <MaskedInput 
          label="IP Address" 
          maskType="ip" 
          placeholder="xxx.xxx.xxx.xxx" 
          helperText="Simple IP mask"
        />
        <SourceCode code={`<MaskedInput maskType="ip" label="IP Address" />`} />
      </Section>

      {/* 5. Input Sizing */}
      <Section title="Input Sizing" description="Set heights using size props like size='sm' and size='lg'.">
        <div className="space-y-6">
          <MaskedInput 
            label="Large Input" 
            maskType="date" 
            size="lg"
            placeholder="DD/MM/YYYY" 
          />
          <MaskedInput 
            label="Default Input" 
            maskType="date" 
            placeholder="DD/MM/YYYY" 
          />
          <MaskedInput 
            label="Small Input" 
            maskType="date" 
            size="sm"
            placeholder="DD/MM/YYYY" 
          />
        </div>
        <SourceCode code={`<MaskedInput size="lg" label="Large" ... />
<MaskedInput label="Default" ... />
<MaskedInput size="sm" label="Small" ... />`} />
      </Section>

    </Container>
  );
}