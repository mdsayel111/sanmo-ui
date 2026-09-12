import React from 'react';
import { InputSize } from '../types';
import SelectContent from './select-content';
import SelectItem from './select-item';
import SelectTrigger from './select-trigger';
import SelectValue from './select-value';
import SelectWrapper from './select-wrapper';
import { SelectOption } from './types';

type SelectProps = {
    multiple?: boolean;
    selectSize?: InputSize;
    options: SelectOption[];
    onValueChange?: (value: SelectValueType) => void;
    value?: any;
    placeholder?: string;
}



type SelectValueType = string | string[];


const Select: React.FC<SelectProps> = ({ multiple, selectSize, options, placeholder, onValueChange, value }) => {
    // const [framework, setFramework] = useState<string>('');

    // const selectedValue = multiple ? options.filter(option => value.includes(option.value))?.map(option => option.label) : options?.find(option => option.value === value)?.label;


    return (
        <>
            <SelectWrapper multiple={multiple} value={value} onValueChange={onValueChange} options={options}>
                <SelectTrigger selectSize={selectSize}>
                    <SelectValue placeholder={placeholder || "Select"} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options?.map(option => (
                            <SelectItem value={option.value} selectSize={selectSize}>{option.label}</SelectItem>
                        ))
                    }
                </SelectContent>
            </SelectWrapper>
        </>
    );
};

export default Select;
