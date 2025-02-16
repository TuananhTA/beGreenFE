'use client';
import { useState } from 'react';
import Pagination from "@/components/Pagination";

export default function ProductList({ productList, currentPage, totalPages, currentSize, onPageChange, onPageSizeChange }) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(productList.map(() => false));

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setSelectedProducts(productList.map(() => newSelectAll));
    };

    const handleSelectProduct = (index) => {
        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts[index] = !newSelectedProducts[index];
        setSelectedProducts(newSelectedProducts);
        setSelectAll(newSelectedProducts.every((selected) => selected));
    };

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const updatedOn = date.toLocaleDateString("vi-VN");
        const updatedTime = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        return { updatedOn, updatedTime };
    }

    return (
        <div className={"pt-3"}>
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover small bg-transparent">
                        <thead className="table-light">
                        <tr className="bg-transparent">
                            <th>
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                                Product
                            </th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Retail Price</th>
                            <th>Updated on</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {productList.map((product, index) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            checked={selectedProducts[index]}
                                            onChange={() => handleSelectProduct(index)}
                                        />
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="rounded-circle me-2"
                                            width={50}
                                            height={50}
                                        />
                                        <div>
                                            <div className="small">{product.name}</div>
                                            <div className="text-muted small">ID: {product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>--</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div>{formatDateTime(product.updatedAt).updatedOn}</div>
                                    <div className="text-muted small">{formatDateTime(product.updatedAt).updatedTime}</div>
                                </td>
                                <td>
                                        <span className={`badge bg-${product.status === "ACTIVE" ? "success" : "danger"}`}>
                                            {product.status}
                                        </span>
                                </td>
                                <td>
                                    <div>
                                        <a href="#" className="text-primary ms-2">Edit</a>
                                    </div>
                                    <div>
                                        <a href="#" className="text-primary ms-2">
                                            {product.status === "Active" ? "Deactivate" : "Activate"}
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" className="text-primary ms-2">More</a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                        Showing 1 to {productList.length} of {productList.length} entries
                    </div>
                   <Pagination
                       currentPage={currentPage}
                       currentSize={currentSize}
                       totalPages={totalPages}
                       onPageChange={onPageChange}
                       onPageSizeChange={onPageSizeChange}
                   />
                </div>
            </div>
        </div>
    );
}
