import React from 'react'
import Section from './section'

export default function Usage({ children }: { children: React.ReactNode }) {
    return (
        <Section>
            <h2 className="text-2xl font-bold mb-3 text-slate-200">Usage Example :</h2>
            <div>
                <div className="space-y-4">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </Section>
    )
}
