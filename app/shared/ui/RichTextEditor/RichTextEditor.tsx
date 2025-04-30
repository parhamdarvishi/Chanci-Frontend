import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';

const Editor = ({ content, onChange }: { content: string, onChange: (string: string) => void }) => {
    const editor = useEditor({
        extensions: [StarterKit, Link, Highlight, TextAlign.configure({ types: ['heading', 'paragraph'] }),],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
            //form.setFieldValue('content', editor.getHTML());
        },
    });

    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Strikethrough />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Hr />
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                    <RichTextEditor.Blockquote />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content
                style={{
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    padding: '12px',
                    minHeight: '150px',
                }}
            />
        </RichTextEditor>
    );
};
export default Editor;
