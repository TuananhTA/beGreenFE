// components/SlateEditor.js
import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { Transforms, Editor, Range } from 'slate';

const SlateEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'Type something...' }],
        },
    ]);

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'heading':
                return <h1 {...props.attributes}>{props.children}</h1>;
            case 'list':
                return <ul {...props.attributes}>{props.children}</ul>;
            case 'list-item':
                return <li {...props.attributes}>{props.children}</li>;
            default:
                return <p {...props.attributes}>{props.children}</p>;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <span {...props.attributes} className={props.leaf.italic ? 'italic' : ''}>{props.children}</span>;
    }, []);

    const toggleItalic = () => {
        const isActive = isMarkActive('italic');
        Transforms.setNodes(
            editor,
            { italic: !isActive },
            { match: (n) => Editor.isInline(n), split: true }
        );
    };

    const isMarkActive = (format) => {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg">
            <button onMouseDown={(event) => { event.preventDefault(); toggleItalic(); }}>
                Italic
            </button>
            <Slate initialValue={value} editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Type something..."
                    className="min-h-[200px] border border-gray-300 p-2 rounded-md"
                />
            </Slate>
        </div>
    );
};

export default SlateEditor;