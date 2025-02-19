import { useState } from "react";

export default function ModalSelectProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedRetail, setSelectedRetail] = useState(null);

    // Hàm xử lý thay đổi biến thể
    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    // Hàm xử lý thay đổi bán lẻ
    const handleRetailChange = () => {
        setSelectedRetail(true); // Chỉ có thể chọn một bán lẻ, bạn có thể điều chỉnh thêm nếu cần
    };

    return (
        <div className="pt-2">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Chọn sản phẩm
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-75 rounded-lg shadow-lg h-100">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h5 className="text-lg font-semibold">Chọn Sản Phẩm</h5>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sản phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Biến thể</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Bán lẻ</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="px-6 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img className="w-12 h-12 rounded-full mr-4"
                                                     src="https://placehold.co/50x50" alt="Placeholder image"/>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Tên sản phẩm</div>
                                                    <div className="text-sm text-gray-500">Tên chi tiết sản phẩm</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 whitespace-nowrap">
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-sm text-gray-700">Biến thể 1</span>
                                                    <input
                                                        type="radio"
                                                        name="variant"
                                                        checked={selectedVariant === "variant1"}
                                                        onChange={() => handleVariantChange("variant1")}
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-sm text-gray-700">Biến thể 2</span>
                                                    <input
                                                        type="radio"
                                                        name="variant"
                                                        checked={selectedVariant === "variant2"}
                                                        onChange={() => handleVariantChange("variant2")}
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="mr-2 text-sm text-gray-700">Biến thể 3</span>
                                                    <input
                                                        type="radio"
                                                        name="variant"
                                                        checked={selectedVariant === "variant3"}
                                                        onChange={() => handleVariantChange("variant3")}
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 whitespace-nowrap">
                                            <input
                                                type="radio"
                                                name="retail"
                                                checked={selectedRetail}
                                                onChange={handleRetailChange}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
