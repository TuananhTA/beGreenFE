"use client"
import ProductList from "@/components/product/ProductList";
import { useState } from 'react';
import {getProduct} from "@/app/Service/ProductSevice";

const Product = () =>{
    const [activeTab, setActiveTab] = useState('All');
    const tabs = [
        { label: 'All 26', value: 'All' },
        { label: 'Active 15', value: 'Active' },
        { label: 'Inactive 11', value: 'Inactive' },
        { label: 'Deleted', value: 'Deleted' },
    ];
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrenSize] = useState(10);
    const {
        data: products,
        error,
        isLoading,
        mutate
    } = getProduct({page: currentPage, size: currentSize});

    if(isLoading) return <>Loading...</>
    let productList = products.data.content || [];
    let  totalPage = products.data.totalPages;



    const handlePageChange = (newPage) => {
        console.log("change page")
        if (newPage >= 10 && newPage < totalPage) {
            setCurrentPage(newPage);
        }
    };

    const handleSizeChange = (newSize) => {
        console.log("change size ", newSize)
        if (newSize >= 0) {
            setCurrenSize(newSize);
        }
    };


    return(
        <div className="container">
            <div className="pt-2 d-flex justify-content-between">
                <h3>Quản lý sản phẩm</h3>
                <div className="flex justify-end mb-4">
                    <button type="button" className="btn btn-primary">
                        <a href="/admin/product/create-product" className="text-white no-underline">Thêm sản phẩm
                            mới</a>
                    </button>
                </div>
            </div>
            <div className="tab">
                <div className="flex items-center space-x-4 p-4 bg-transparent">
                    {tabs.map((tab) => (
                        <div
                            key={tab.value}
                            className={`cursor-pointer font-semibold text-sm ${
                                activeTab === tab.value ? 'text-teal-500' : 'text-gray-600'
                            }`}
                            onClick={() => setActiveTab(tab.value)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-3 shadow-md rounded  text-sm">
                <div className="flex flex-wrap items-center space-x-2">
                    <input type="text" placeholder="Search by product name, ID or seller SKU"
                           className="flex-grow p-2 border border-gray-300 rounded"/>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>Price</option>
                    </select>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>Skincare</option>
                    </select>
                    <button className="p-2 border border-gray-300 rounded flex items-center">
                        <i className="fas fa-filter mr-2"></i> Filter
                    </button>
                    <button className="p-2 border border-gray-300 rounded">Reset</button>
                </div>
                <div className="flex flex-wrap items-center space-x-2 mt-4">
                    <span>Selected: 0</span>
                    <button className="p-2 bg-gray-200 text-gray-500 rounded" disabled>Activate</button>
                    <button className="p-2 bg-gray-200 text-gray-500 rounded" disabled>Deactivate</button>
                    <button className="p-2 bg-gray-200 text-gray-500 rounded" disabled>Delete</button>
                </div>
            </div>
            <div>
                <ProductList
                    productList={productList}
                    currentPage={currentPage}
                    currentSize={currentSize}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handleSizeChange}

                />
            </div>
        </div>
    )
}
export default Product;