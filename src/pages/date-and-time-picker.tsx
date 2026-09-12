import { useState } from 'react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";
import SourceCode from "../components/shared/source-code";
import DateTimePicker from "../../lib/components/shared/date-picker";

export default function DateTimePickers() {
    const [basicDate, setBasicDate] = useState<Date | Date[] | undefined>();
    const [dateTime, setDateTime] = useState<Date | Date[] | undefined>();
    const [timeOnly, setTimeOnly] = useState<Date | Date[] | undefined>(new Date());
    const [limitTime, setLimitTime] = useState<Date | Date[] | undefined>(new Date());
    const [rangeDate, setRangeDate] = useState<Date | Date[] | undefined>();
    const [multiDate, setMultiDate] = useState<Date | Date[] | undefined>();

    return (
        <Container
            title="Date & Time Picker"
            description="A lightweight and powerful datetime picker component built from scratch for React."
        >

            {/* 1. Basic Date Picker */}
            <Section title="Basic" description="A simple date picker." contentClassName="relative z-[15]">
                <DateTimePicker
                    value={basicDate}
                    onChange={setBasicDate}
                    placeholder="Basic datepicker"
                />
                <SourceCode code={`<DateTimePicker placeholder="Basic datepicker" />`} />
            </Section>

            {/* 2. Date Time */}
            <Section title="DateTime" description="Allows enabling time selection alongside date." contentClassName="relative z-[14]">
                <DateTimePicker
                    value={dateTime}
                    onChange={setDateTime}
                    enableTime
                    placeholder="Date and Time"
                />
                <SourceCode code={`<DateTimePicker enableTime placeholder="Date and Time" />`} />
            </Section>

            {/* 3. Time Picker Only (24hr) */}
            <Section title="24-hour Time Picker" description="Enables time picker functionality without calendar view." contentClassName="relative z-[13]">
                <DateTimePicker
                    value={timeOnly}
                    onChange={setTimeOnly}
                    enableTime
                    noCalendar
                    time_24hr
                    placeholder="16:21"
                />
                <SourceCode code={`<DateTimePicker enableTime noCalendar time_24hr />`} />
            </Section>

            {/* 4. Time Picker w/ Limits */}
            <Section title="Time Picker w/ Limits" description="Limit the selectable time range (e.g., 4:00 PM to 10:00 PM)." contentClassName="relative z-[12]">
                <DateTimePicker
                    value={limitTime}
                    onChange={setLimitTime}
                    enableTime
                    noCalendar
                    minTime="16:00"
                    maxTime="22:00"
                    placeholder="Limits (4pm - 10pm)"
                />
                <SourceCode code={`<DateTimePicker 
  enableTime 
  noCalendar 
  minTime="16:00" 
  maxTime="22:00" 
/>`} />
            </Section>

            {/* 5. Range Calendar */}
            <Section title="Range Calendar" description="Select a range of dates." contentClassName="relative z-50">
                <DateTimePicker
                    mode="range"
                    value={rangeDate}
                    onChange={setRangeDate}
                    placeholder="2018-10-03 to 2018-10-10"
                />
                <SourceCode code={`<DateTimePicker mode="range" placeholder="Select Range..." />`} />
            </Section>

            {/* 6. Multiple Dates */}
            <Section title="Selecting multiple dates" description="It is possible to select multiple dates." contentClassName="relative z-[11]">
                <DateTimePicker
                    mode="multiple"
                    value={multiDate}
                    onChange={setMultiDate}
                    placeholder="Multiple dates"
                />
                <SourceCode code={`<DateTimePicker mode="multiple" placeholder="Multiple dates" />`} />
            </Section>

            {/* 7. Constraints / Disabling */}
            <Section title="Disabling dates" description="Disable specific dates, ranges, or min/max." contentClassName="relative z-[10]">
                <DateTimePicker
                    minDate={new Date()}
                    disable={[
                        new Date(new Date().setDate(new Date().getDate() + 2)),
                        new Date(new Date().setDate(new Date().getDate() + 4))
                    ]}
                    placeholder="Disabling dates"
                />
                <SourceCode code={`<DateTimePicker 
  minDate={new Date()} 
  disable={[new Date('2025-01-15'), new Date('2025-01-20')]} 
/>`} />
            </Section>

        </Container>
    );
}