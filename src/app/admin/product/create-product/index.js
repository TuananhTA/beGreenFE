"use client"
import { useState } from "react";
import ImageUploader from "@/components/product/ImageUploader";
import MyEditor from "@/components/MyEditor";


export default function CreatProduct(){
    const [category, setCategory] = useState("");

    return (
        <div className="container">

            <div className="mx-auto bg-white p-6 shadow-lg rounded-lg">
                <div className="pt-2 d-flex justify-content-between mb-2">
                    <h2>Thêm sản phẩm</h2>
                    <button type="button" className="btn btn-primary">Lưu</button>
                </div>
                <div className="mb-4" style={{width: "max-content"}}>
                    <ImageUploader></ImageUploader>
                </div>
                <div className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="mb-4">
                        <label htmlFor="product-name" className="block mb-2 text-gray-700">Tên sản phẩm</label>
                        <input type="text" id="product-name"
                               className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <select
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Đơn vị</option>
                            <option>Kg</option>
                            <option>Ml</option>
                            <option>Hộp</option>
                        </select>
                        <input type="text" placeholder="Giá sản phẩm trên 1 đơn vị"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <select
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Nhà cung cấp</option>
                            <option>Long biên</option>
                            <option>Hà Nội</option>
                            <option>Đông Anh</option>
                        </select>
                    </div>
                </div>
                <div className=" mb-4">
                    <h4>Số lượng bán lẻ: 0</h4>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-lg ">Danh mục sản phẩm</label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Chọn danh mục sản phẩm</option>
                        <option>Danh mục 1</option>
                        <option>Danh mục 2</option>
                        <option>Danh mục 3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-lg">Mô tả sản phẩm</label>
                    <textarea placeholder="Mô tả sản phẩm (có kèm AI để tự động gen)"
                              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="4">

                    </textarea>
                    <MyEditor/>
                </div>
                <label className="block mb-2 text-lg ">Lô hàng</label>
                <div className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <input type="text" placeholder="Ngày thu hoạch"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Ngày hết hạn"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Số lượng"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"><i
                            className="fas fa-plus"></i></button>
                    </div>
                </div>
                <label className="block mb-2 text-lg ">Biến thể</label>
                <div className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Tên biến thể"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="cân nặng"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"><i
                            className="fas fa-plus"></i></button>
                    </div>
                </div>
                <label className="block mb-2 text-lg ">Phân phối</label>
                <div className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <input type="text" placeholder="Biến thể A"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Lô A"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Số lượng"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Giá"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <input type="text" placeholder="Biến thể A"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Lô B"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Số lượng"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="text" placeholder="Giá"
                               className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </div>
            </div>
        </div>
    )
}