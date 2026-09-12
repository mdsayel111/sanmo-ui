import React from 'react'

export default function Container({ children, description, title, className }: { children: React.ReactNode, description?: string, title: string, className?: string }) {
  return (
    <div className="min-h-screen font-sans">
      <div className="mx-auto">

        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r pb-4 from-blue-400 to-emerald-400">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        {children}

      </div>
    </div>
  )
}
