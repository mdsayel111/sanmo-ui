import { useEffect, useId, useRef, useState } from 'react';
import type Quill from 'quill';
import { cn } from '../../utils/cn';
import './text-editor.css';

interface Props {
    label?: string;
    id?: string;
    value?: string;
    modelValue?: string;
    onChange?: (value: string) => void;
}

export default function TextEditor({ label, id, value, modelValue, onChange }: Props) {
    const generatedId = useId();
    const editorId = id ?? generatedId;
    const labelId = `${editorId}-label`;
    const currentValue = value ?? modelValue ?? '';
    const toolbarRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const onChangeRef = useRef(onChange);
    const [editorReady, setEditorReady] = useState(false);
    const [editorError, setEditorError] = useState<string | null>(null);

    onChangeRef.current = onChange;

    useEffect(() => {
        const editorElement = editorRef.current;
        const toolbarElement = toolbarRef.current;
        if (!editorElement || !toolbarElement) return;

        let cancelled = false;
        let quill: Quill | null = null;
        let handleTextChange: (() => void) | null = null;

        const initializeEditor = async () => {
            try {
                const { default: QuillEditor } = await import('quill');
                if (cancelled) return;

                const editor = new QuillEditor(editorElement, {
                    theme: 'snow',
                    placeholder: 'Write your content here...',
                    modules: {
                        toolbar: {
                            container: toolbarElement,
                            handlers: {
                                undo(this: { quill: Quill }) {
                                    this.quill.history.undo();
                                },
                                redo(this: { quill: Quill }) {
                                    this.quill.history.redo();
                                },
                            },
                        },
                        history: {
                            userOnly: true,
                        },
                    },
                });

                quill = editor;
                quillRef.current = editor;
                handleTextChange = () => onChangeRef.current?.(editor.root.innerHTML);
                editor.on('text-change', handleTextChange);
                setEditorReady(true);
            } catch (error) {
                if (!cancelled) {
                    setEditorError(error instanceof Error ? error.message : String(error));
                }
            }
        };

        void initializeEditor();

        return () => {
            cancelled = true;
            if (quill && handleTextChange) {
                quill.off('text-change', handleTextChange);
                quill.disable();
            }
            quillRef.current = null;
        };
    }, []);

    useEffect(() => {
        const editor = quillRef.current?.root;
        if (!editor) return;

        editor.id = editorId;
        if (label) {
            editor.setAttribute('aria-labelledby', labelId);
            editor.removeAttribute('aria-label');
        } else {
            editor.removeAttribute('aria-labelledby');
            editor.setAttribute('aria-label', 'Text editor');
        }
    }, [editorId, editorReady, label, labelId]);

    useEffect(() => {
        const quill = quillRef.current;
        if (quill && quill.root.innerHTML !== currentValue) {
            quill.clipboard.dangerouslyPasteHTML(currentValue, 'silent');
        }
    }, [currentValue, editorReady]);

    return (
        <div className="w-full">
            {label && (
                <label id={labelId} htmlFor={editorId} className="mb-1.5 block text-sm text-gray-900 dark:text-slate-400">
                    {label}
                </label>
            )}
            <div className={cn('text-editor w-full rounded-2xl')}>
            {editorError ? (
                <p role="alert">Unable to load the text editor: {editorError}</p>
            ) : (
                <>
                    <div ref={toolbarRef} className="ql-toolbar ql-snow">
                        <span className="ql-formats">
                            <select className="ql-header" defaultValue="">
                                <option value="1" />
                                <option value="2" />
                                <option value="" />
                            </select>
                            <button type="button" className="ql-bold" aria-label="Bold" />
                            <button type="button" className="ql-italic" aria-label="Italic" />
                            <button type="button" className="ql-underline" aria-label="Underline" />
                        </span>
                        <span className="ql-formats">
                            <select className="ql-align" defaultValue="" aria-label="Text alignment">
                                <option value="" />
                                <option value="center" />
                                <option value="right" />
                                <option value="justify" />
                            </select>
                            <button type="button" className="ql-list" value="ordered" aria-label="Numbered list" />
                            <button type="button" className="ql-list" value="bullet" aria-label="Bulleted list" />
                        </span>
                        <span className="ql-formats">
                            <button type="button" className="ql-link" aria-label="Insert link" />
                            <button type="button" className="ql-image" aria-label="Insert image" />
                            <button type="button" className="ql-undo" aria-label="Undo">Undo</button>
                            <button type="button" className="ql-redo" aria-label="Redo">Redo</button>
                        </span>
                    </div>
                    <div ref={editorRef} />
                    {!editorReady && !editorError && <p>Loading text editor...</p>}
                </>
            )}
            </div>
        </div>
    );
}
