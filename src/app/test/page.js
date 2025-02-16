"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader() {
    const [images, setImages] = useState(Array(6).fill(null));

    const onDrop = useCallback((acceptedFiles, index) => {
        const imageFile = acceptedFiles[0]; // Chỉ nhận 1 ảnh cho mỗi ô
        if (!imageFile) return;

        const newImages = [...images];
        newImages[index] = Object.assign(imageFile, { preview: URL.createObjectURL(imageFile) });
        setImages(newImages);
    }, [images]);

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    return (
        <div className="mb-4" style={{ width: "max-content" }}>
            {[0, 3].map((rowStart) => (
                <div key={rowStart} className="flex">
                    {images.slice(rowStart, rowStart + 3).map((file, i) => {
                        const index = rowStart + i;
                        return (
                            <DropzoneBox
                                key={index}
                                file={file}
                                onDrop={(files) => onDrop(files, index)}
                                onRemove={() => removeImage(index)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function DropzoneBox({ file, onDrop, onRemove }) {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1,
    });

    return (
        <div {...getRootProps()} className="w-40 h-40 border border-gray-400 m-2 flex items-center justify-center cursor-pointer relative">
            <input {...getInputProps()} />
            {file ? (
                <>
                    <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                    <button
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                    >
                        X
                    </button>
                </>
            ) : (
                <span>Thêm ảnh</span>
            )}
        </div>
    );
}
