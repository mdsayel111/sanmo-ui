import React from 'react'
import CodeSnippet from './code-snippet'

export default function SourceCode({ code, text = "Source Code" }: { code: string, text?: string }) {
    return (
        <div className="mt-4">
            {
                text && <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-black dark:text-white">{text}</p>
            }
            <CodeSnippet code={code} />
        </div>
    )
}
