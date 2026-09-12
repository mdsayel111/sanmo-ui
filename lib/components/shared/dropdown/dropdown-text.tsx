import { ReactNode } from "react";


const DropdownText = ({ children }: { children: ReactNode }) => (
    <div className="px-4 py-2 text-sm text-slate-400 w-64 leading-relaxed">{children}</div>
);

export default DropdownText;