import { useState } from "react";
import { toast } from "react-toastify";

export default function ModalSelectOrders({ callBack, data, selectData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const toggleSelectInvoice = (invoice) => {
        if (!selectData.includes(invoice) && selectData.length >= 5) {
            toast.error("Chỉ được chọn tối đa 5 hóa đơn!");
            return;
        }
        callBack((prev) =>
            prev.includes(invoice)
                ? prev.filter((item) => item.id !== invoice.id) // Bỏ chọn
                : [...prev, invoice] // Chọn
        );
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Chọn hóa đơn
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 rounded-lg shadow-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h5 className="text-lg font-semibold">Chọn Hóa Đơn</h5>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <table className="w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">STT</th>
                                    <th className="border px-4 py-2">Mã Hóa Đơn</th>
                                    <th className="border px-4 py-2">Chọn</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((invoice, index) => (
                                    <tr key={invoice.id} className="text-center">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{invoice.code}</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectData.some((i) => i.id === invoice.id)}
                                                onChange={() => toggleSelectInvoice(invoice)}
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* Hiển thị danh sách hóa đơn đã chọn */}
                            {selectData.length > 0 && (
                                <p className="mt-4 text-blue-600 font-semibold">
                                    Hóa đơn đã chọn:{" "}
                                    {selectData
                                        .map((i) => i.code)
                                        .join(", ")}
                                </p>
                            )}
                        </div>

                        {/* Phân trang */}
                        <div className="flex justify-center p-4">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Previous
                            </button>
                            <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
