// lib/global.d.ts  (or src/global.d.ts)
declare module '*.module.css' {
    const classes: Record<string, string>;
    export default classes;
}

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}