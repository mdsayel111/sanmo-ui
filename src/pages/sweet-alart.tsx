import React, { useState, useEffect, ReactNode } from 'react';
import { Check, Copy, XCircle, CheckCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react';

/**
 * =========================================================================
 * SHARED HELPER COMPONENTS
 * =========================================================================
 */

const Container = ({ title, description, children }: { title: string, description: string, children: ReactNode }) => (
  <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
    <div className="max-w-6xl mx-auto">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                {title}
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                {description}
                </p>
            </div>
            <button className="px-4 py-2 bg-transparent border border-emerald-500 text-emerald-500 rounded hover:bg-emerald-500/10 transition-colors text-sm font-medium">
                Official Website
            </button>
        </div>
      </header>
      <div className="space-y-16">
        {children}
      </div>
    </div>
  </div>
);

const Section = ({ title, description, children }: { title: string, description?: string, children: ReactNode }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-100 flex items-center after:content-[''] after:h-px after:flex-1 after:bg-slate-800 after:ml-6">
        {title}
      </h2>
      {description && <p className="mt-2 text-slate-400 text-sm">{description}</p>}
    </div>
    <div className="p-6 border border-slate-800 bg-slate-900/30 rounded-xl relative overflow-hidden">
      {children}
    </div>
  </div>
);

const SourceCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 rounded-lg overflow-hidden bg-[#0f172a] border border-slate-800 shadow-inner group">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800/50">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Example Usage</span>
        <button
          onClick={copyToClipboard}
          className="text-slate-500 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono text-blue-300/90 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
  const variants: any = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    info: "bg-cyan-500 hover:bg-cyan-600 text-white",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
    dark: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700",
  };
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/**
 * =========================================================================
 * SWEET ALERT COMPONENT LOGIC (Custom Implementation)
 * =========================================================================
 */

type SweetAlertIcon = 'success' | 'warning' | 'error' | 'info' | 'question' | 'none';

interface SweetAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  imageUrl?: string;
  imageAlt?: string;
  confirmButtonColor?: string; // Custom color override
}

export const SweetAlert = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
  icon = 'none',
  showCancelButton = false,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  imageUrl,
  imageAlt,
  confirmButtonColor,
}: SweetAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  // Icon Rendering Logic
  const renderIcon = () => {
    const iconSize = 64;
    const baseClass = "mx-auto mb-4 flex items-center justify-center rounded-full border-4 w-20 h-20 animate-in zoom-in duration-300";
    
    switch (icon) {
      case 'success':
        return (
          <div className={`${baseClass} border-emerald-500/30 text-emerald-500`}>
             <CheckCircle size={iconSize} className="animate-in fade-in duration-500" />
          </div>
        );
      case 'error':
        return (
          <div className={`${baseClass} border-rose-500/30 text-rose-500`}>
             <XCircle size={iconSize} className="animate-in fade-in duration-500" />
          </div>
        );
      case 'warning':
        return (
          <div className={`${baseClass} border-amber-500/30 text-amber-500`}>
             <AlertTriangle size={iconSize} className="animate-in fade-in duration-500" />
          </div>
        );
      case 'info':
        return (
          <div className={`${baseClass} border-cyan-500/30 text-cyan-500`}>
             <Info size={iconSize} className="animate-in fade-in duration-500" />
          </div>
        );
      case 'question':
        return (
          <div className={`${baseClass} border-slate-400/30 text-slate-400`}>
             <HelpCircle size={iconSize} className="animate-in fade-in duration-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden backdrop-blur-sm transition-all duration-300 ${isVisible ? 'bg-slate-950/80 opacity-100' : 'bg-slate-950/0 opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`
          relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-center
          transform transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)
          ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image / Icon */}
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={imageAlt || 'Alert image'} 
            className="mx-auto mb-4 max-h-40 rounded-lg object-cover"
          />
        ) : (
          renderIcon()
        )}

        {/* Content */}
        {title && <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>}
        {text && <p className="text-slate-400 mb-6 text-sm leading-relaxed">{text}</p>}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          {showCancelButton && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {cancelButtonText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            style={confirmButtonColor ? { backgroundColor: confirmButtonColor } : {}}
            className={`
              px-6 py-2 text-white rounded-lg text-sm font-medium transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
              ${!confirmButtonColor ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500' : ''}
            `}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * =========================================================================
 * DOCUMENTATION PAGE
 * =========================================================================
 */

export default function SweetAlerts() {
  // 1. Basic
  const [basicOpen, setBasicOpen] = useState(false);
  
  // 2. Title & Text
  const [textOpen, setTextOpen] = useState(false);

  // 3. Message Types
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  // 4. Image
  const [imageOpen, setImageOpen] = useState(false);

  // 5. Parameter (Confirm)
  const [paramOpen, setParamOpen] = useState(false);

  return (
    <Container
      title="Sweet Alert"
      description="A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes."
    >
      
      {/* 1. Basic */}
      <Section title="Basic" description="A basic message.">
        <Button onClick={() => setBasicOpen(true)}>Click me</Button>
        <SweetAlert 
          isOpen={basicOpen} 
          onClose={() => setBasicOpen(false)} 
          title="Any fool can use a computer" 
        />
        <SourceCode code={`<SweetAlert 
  isOpen={isOpen} 
  onClose={close} 
  title="Any fool can use a computer" 
/>`} />
      </Section>

      {/* 2. Title with Text */}
      <Section title="A Title with a Text Under" description="Not just a title, but also some explanatory text.">
        <Button onClick={() => setTextOpen(true)}>Click me</Button>
        <SweetAlert 
          isOpen={textOpen} 
          onClose={() => setTextOpen(false)} 
          title="The Internet?"
          text="That thing is still around?" 
          icon="question"
        />
        <SourceCode code={`<SweetAlert 
  isOpen={isOpen} 
  onClose={close} 
  title="The Internet?"
  text="That thing is still around?"
  icon="question"
/>`} />
      </Section>

      {/* 3. Message Types */}
      <Section title="Message Types" description="SweetAlert comes with 4 built-in icon types which will show a corresponding icon animation.">
        <div className="flex flex-wrap gap-4">
          <Button variant="success" onClick={() => setSuccessOpen(true)}>Success</Button>
          <Button variant="warning" onClick={() => setWarningOpen(true)}>Warning</Button>
          <Button variant="info" onClick={() => setInfoOpen(true)}>Info</Button>
          <Button variant="danger" onClick={() => setErrorOpen(true)}>Error</Button>
        </div>

        <SweetAlert isOpen={successOpen} onClose={() => setSuccessOpen(false)} title="Good job!" text="You clicked the button!" icon="success" />
        <SweetAlert isOpen={warningOpen} onClose={() => setWarningOpen(false)} title="Are you sure?" text="You won't be able to revert this!" icon="warning" showCancelButton confirmButtonText="Yes, delete it!" confirmButtonColor="#d33" />
        <SweetAlert isOpen={infoOpen} onClose={() => setInfoOpen(false)} title="Info" text="Here is some useful information." icon="info" />
        <SweetAlert isOpen={errorOpen} onClose={() => setErrorOpen(false)} title="Oops..." text="Something went wrong!" icon="error" />

        <SourceCode code={`<SweetAlert icon="success" title="Good job!" text="You clicked the button!" ... />
<SweetAlert icon="warning" title="Are you sure?" ... />
<SweetAlert icon="info" title="Info" ... />
<SweetAlert icon="error" title="Oops..." ... />`} />
      </Section>

      {/* 4. Long Content / Image */}
      <Section title="Image Message" description="A modal with a custom image.">
        <Button onClick={() => setImageOpen(true)}>Click me</Button>
        <SweetAlert 
          isOpen={imageOpen} 
          onClose={() => setImageOpen(false)} 
          title="Sweet!"
          text="Modal with a custom image."
          imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
          imageAlt="Custom image"
        />
        <SourceCode code={`<SweetAlert 
  isOpen={isOpen} 
  onClose={close} 
  title="Sweet!"
  text="Modal with a custom image."
  imageUrl="https://..."
/>`} />
      </Section>

      {/* 5. Parameter */}
      <Section title="Parameter" description="You can pass parameters to the confirmation button action.">
        <Button onClick={() => setParamOpen(true)}>Click me</Button>
        <SweetAlert 
          isOpen={paramOpen} 
          onClose={() => setParamOpen(false)} 
          title="Are you sure?"
          text="You won't be able to revert this!"
          icon="warning"
          showCancelButton
          confirmButtonText="Yes, delete it!"
          cancelButtonText="No, cancel!"
          confirmButtonColor="#d33"
          onConfirm={() => alert('Deleted!')}
        />
        <SourceCode code={`<SweetAlert 
  isOpen={isOpen} 
  onClose={close} 
  title="Are you sure?"
  text="You won't be able to revert this!"
  icon="warning"
  showCancelButton
  confirmButtonText="Yes, delete it!"
  confirmButtonColor="#d33"
  onConfirm={() => console.log('Deleted!')}
/>`} />
      </Section>

    </Container>
  );
}