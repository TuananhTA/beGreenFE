import React, { useMemo, useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const MyEditor = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "Chào vợ yêu! Hãy chỉnh sửa văn bản ở đây..." }],
        },
    ]);

    // Xử lý khi nhấn phím tắt (Ctrl+B, Ctrl+I, Ctrl+U)
    const handleKeyDown = (event) => {
        if (event.ctrlKey) {
            event.preventDefault();
            switch (event.key) {
                case "b":
                    toggleMark(editor, "bold");
                    break;
                case "i":
                    toggleMark(editor, "italic");
                    break;
                case "u":
                    toggleMark(editor, "underline");
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-xl shadow-lg">
            {/* Thanh công cụ */}
            <div className="flex gap-2 bg-gray-100 p-3 rounded-md border-b border-gray-300">
                {toolbarButtons.map(({ format, label, icon }) => (
                    <button
                        key={format}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleMark(editor, format);
                        }}
                        className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-blue-500 hover:text-white transition-all"
                    >
                        {icon ? icon : <span className="font-bold">{label}</span>}
                    </button>
                ))}
            </div>

            {/* Ô nhập văn bản */}
            <Slate initialValue={value} editor={editor} value={value || []} onChange={(newValue) => setValue(newValue)} >
                <Editable
                    className="p-5 min-h-[500px] border border-gray-300 rounded-md mt-3 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400"
                    renderLeaf={renderLeaf}
                    onKeyDown={handleKeyDown}
                />
            </Slate>
        </div>
    );
};

// Danh sách nút trên thanh công cụ
const toolbarButtons = [
    { format: "bold", label: "B", icon: <b>B</b> },
    { format: "italic", label: "I", icon: <i>I</i> },
    { format: "underline", label: "U", icon: <u>U</u> },
];

// Hàm bật/tắt kiểu chữ (in đậm, nghiêng, gạch chân)
const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

// Kiểm tra kiểu chữ có đang được áp dụng không
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

// Render kiểu chữ (in đậm, nghiêng, gạch chân)
const renderLeaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
};

export default MyEditor;
