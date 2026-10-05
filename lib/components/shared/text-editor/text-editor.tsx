import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import './text-editor.css';

type FroalaEditorComponent = typeof import('react-froala-wysiwyg').default;

interface Props {
    modelValue?: string;
    onChange?: (value: string) => void;
}

export default function TextEditor({ modelValue = '', onChange }: Props) {
    const [content, setContent] = useState(modelValue);
    const [FroalaEditor, setFroalaEditor] = useState<FroalaEditorComponent | null>(null);
    const [editorError, setEditorError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadEditor = async () => {
            try {
                await Promise.all([
                    import('froala-editor/css/froala_editor.pkgd.min.css'),
                    import('froala-editor/css/froala_style.min.css'),
                ]);
                await import('froala-editor/js/plugins.pkgd.min.js');
                const editorModule = await import('react-froala-wysiwyg');

                if (!cancelled) {
                    setFroalaEditor(() => editorModule.default);
                }
            } catch (error) {
                if (!cancelled) {
                    setEditorError(error instanceof Error ? error.message : String(error));
                }
            }
        };

        void loadEditor();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (modelValue !== content) {
            setContent(modelValue);
        }
    }, [modelValue]);

    const handleModelChange = (newContent: string) => {
        setContent(newContent);
        if (onChange) onChange(newContent);
    };

    return (
        <div className={cn("w-full rounded-2xl p-4")}>
            {editorError ? (
                <p role="alert">Unable to load the text editor: {editorError}</p>
            ) : FroalaEditor ? (
                <FroalaEditor
                    tag="textarea"
                    model={content}
                    onModelChange={handleModelChange}
                    config={{
                        placeholderText: 'Write your content here...',
                        heightMin: 300,
                        charCounterCount: true,
                        toolbarButtons: [
                            'bold',
                            'italic',
                            'underline',
                            '|',
                            'paragraphFormat',
                            'align',
                            'formatOL',
                            'formatUL',
                            '|',
                            'insertLink',
                            'insertImage',
                            'undo',
                            'redo',
                        ],
                    }}
                />
            ) : (
                <p>Loading text editor...</p>
            )}
        </div>
    );
}
