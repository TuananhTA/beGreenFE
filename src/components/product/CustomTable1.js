'use client';
import { useState } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
const CustomTable = ({ columns, data, actions = {} }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Đặt số lượng mục hiển thị trên mỗi trang
    const current = [...data];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = current?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(current.length / itemsPerPage);

    const handleClickPage = (number) => {
        setCurrentPage(number);
    };

    // Tạo danh sách các nút phân trang
    const getPaginationItems = () => {
        let startPage, endPage;

        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage === 1) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
    };
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((col, index) => (
                            <th key={index} className="border p-2 text-left">{col.label}</th>
                        ))}
                        {Object.keys(actions).length > 0 && <th className="border p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100 cursor-pointer">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="border p-2">
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                            {Object.keys(actions).length > 0 && (
                                <td className="border p-2 flex space-x-2">
                                    {Object.entries(actions).map(([actionName, actionConfig]) => (
                                        <button
                                            key={actionName}
                                            onClick={() => {
                                                actionConfig.handler(row.id);
                                            }}
                                            className={`px-2 py-1 rounded ${actionConfig.color || "bg-blue-500"} text-white`}
                                        >
                                            {actionName}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

                    {getPaginationItems().map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handleClickPage(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    )
}