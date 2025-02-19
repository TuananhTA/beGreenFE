"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const MAX_IMAGES = 6;

export default function ImageUploader({ onFilesChange }) {
    const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
    const prevImagesRef = useRef(images);

    // Chỉ gọi onFilesChange nếu images thực sự thay đổi
    useEffect(() => {
        const filteredImages = images.filter(img => img !== null);
        if (JSON.stringify(filteredImages) !== JSON.stringify(prevImagesRef.current)) {
            prevImagesRef.current = filteredImages;
            onFilesChange(filteredImages);
        }
    }, [images, onFilesChange]);

    const onDropNew = useCallback((acceptedFiles) => {
        setImages((prevImages) => {
            let newImages = [...prevImages];

            // Lọc ra các file trùng trước khi cập nhật state
            const existingNames = new Set(newImages.filter(img => img !== null).map(img => img.name));
            const duplicateFiles = acceptedFiles.filter(file => existingNames.has(file.name));

            // Nếu có file trùng, chỉ thông báo một lần và không xử lý tiếp
            if (duplicateFiles.length > 0) {
                toast.error(`Các ảnh sau đã tồn tại: ${duplicateFiles.map(f => f.name).join(", ")}`);
                return prevImages;
            }

            // Thêm ảnh mới nếu chưa đạt giới hạn
            for (let file of acceptedFiles) {
                const firstEmptyIndex = newImages.indexOf(null);
                if (firstEmptyIndex !== -1) {
                    newImages[firstEmptyIndex] = Object.assign(file, { preview: URL.createObjectURL(file) });
                } else {
                    toast.error(`Chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh!`);
                    break;
                }
            }

            return newImages;
        });
    }, []);

    const removeImage = (index) => {
        setImages((prevImages) => {
            let newImages = [...prevImages];
            newImages[index] = null; // Xóa ảnh tại vị trí index
            return newImages;
        });
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData("text/plain", index);
    };

    const handleDropImage = (event, dropIndex) => {
        event.preventDefault();
        const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);

        if (draggedIndex === dropIndex || isNaN(draggedIndex)) return;

        setImages((prevImages) => {
            let newImages = [...prevImages];
            [newImages[draggedIndex], newImages[dropIndex]] = [newImages[dropIndex], newImages[draggedIndex]];
            return newImages;
        });
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
                                onDropNew={onDropNew}
                                onRemove={() => removeImage(index)}
                                onDragStart={(event) => handleDragStart(event, index)}
                                onDropImage={(event) => handleDropImage(event, index)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function DropzoneBox({ file, onDropNew, onRemove, onDragStart, onDropImage }) {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => onDropNew(files),
        accept: "image/png, image/jpg, image/jpeg",
        maxFiles: 1,
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className="w-40 h-40 border border-gray-400 m-2 flex items-center justify-center cursor-pointer relative"
            draggable={file !== null}
            onDragStart={file ? onDragStart : undefined}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDropImage}
        >
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
