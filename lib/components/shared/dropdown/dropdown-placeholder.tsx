import { useContext } from "react";
import { DropdownContext } from "./dropdown-context";

export default function DropdownPlaceholder({ children, className }: { children: React.ReactNode, className?: string }) {
      const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownHeader must be inside a Dropdown");
const { toggle } = context;
    return (<div onClick={toggle} className={className}>
        {children}
    </div>)
}

// {/* {
    // placeholder ? placeholder : 
    // (split ? (
    //     <span onClick={toggle} className='flex'>
    //         <button type="button" className={cn(getVariantClasses(true), "focus:outline-0 focus:ring-0")}>
    //             {label}
    //         </button>
    //         <button type="button" className={cn(getVariantClasses(false), "focus:outline-0 focus:ring-0")} >
    //             {renderArrow()}
    //         </button>
    //     </span>
    // ) : (
    //     <button type="button" className={`${getVariantClasses()} flex items-center gap-2`} onClick={toggle}>
    //         {label}
    //         {variant !== 'link' && renderArrow()}
    //     </button>
    // ))
// } */}