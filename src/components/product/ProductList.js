'use client';
import { useState } from 'react';

export default function ProductList({ productList }) {
    const [products, setProducts] = useState(productList);

    return (
        <div className={"pt-4"}>
            <div className="card shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Retail Price</th>
                            <th>Updated on</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="d-flex align-items-center mt-2">
                                        <input className="form-check-input me-2" type="checkbox" />
                                        <img
                                            src={product.imgSrc}
                                            alt={product.name}
                                            className="rounded-circle me-2"
                                            width={50}
                                            height={50}
                                        />
                                        <div>
                                            <div className="fw-bold">{product.name}</div>
                                            <div className="text-muted small">ID: {product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>--</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div>{product.updatedOn}</div>
                                    <div className="text-muted small">{product.updatedTime}</div>
                                </td>
                                <td>
                                    <span className={`badge bg-${product.status === 'Active' ? 'success' : 'danger'}`}>{product.status}</span>
                                </td>
                                <td>
                                    <a href="#" className="text-primary">Edit</a>
                                    <a href="#" className="text-primary ms-2">{product.status === 'Active' ? 'Deactivate' : 'Activate'}</a>
                                    <a href="#" className="text-primary ms-2">More</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div className="text-muted small">Showing 1 to {products.length} of {products.length} entries</div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary btn-sm me-2">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <span className="text-muted small">1</span>
                        <button className="btn btn-outline-secondary btn-sm ms-2">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                        <select className="form-select form-select-sm ms-3" style={{ width: 'auto' }}>
                            <option>50 /Page</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
