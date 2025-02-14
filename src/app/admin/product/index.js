import ProductList from "@/components/product/ProductList";

const list = [
    {
        id: '1729641936772827919',
        name: 'Green Tea Toner for Hydration Skincare Serum',
        quantity: 50,
        price: 'Rp1.000.000',
        updatedOn: '18/07/2023',
        updatedTime: '16:13',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641947499367183',
        name: 'Beaute Glow Moisturizer for All Skin Type hydrating',
        quantity: 200,
        price: 'Rp990.000',
        updatedOn: '18/07/2023',
        updatedTime: '11:48',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '172964193996666895',
        name: 'Beautiful Night Cream for Sensitive Skin',
        quantity: 100,
        price: 'Rp1.800.000',
        updatedOn: '03/07/2023',
        updatedTime: '12:45',
        status: 'Inactive',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641936772827919',
        name: 'Green Tea Toner for Hydration Skincare Serum',
        quantity: 50,
        price: 'Rp1.000.000',
        updatedOn: '18/07/2023',
        updatedTime: '16:13',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641947499367183',
        name: 'Beaute Glow Moisturizer for All Skin Type hydrating',
        quantity: 200,
        price: 'Rp990.000',
        updatedOn: '18/07/2023',
        updatedTime: '11:48',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '172964193996666895',
        name: 'Beautiful Night Cream for Sensitive Skin',
        quantity: 100,
        price: 'Rp1.800.000',
        updatedOn: '03/07/2023',
        updatedTime: '12:45',
        status: 'Inactive',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641936772827919',
        name: 'Green Tea Toner for Hydration Skincare Serum',
        quantity: 50,
        price: 'Rp1.000.000',
        updatedOn: '18/07/2023',
        updatedTime: '16:13',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641947499367183',
        name: 'Beaute Glow Moisturizer for All Skin Type hydrating',
        quantity: 200,
        price: 'Rp990.000',
        updatedOn: '18/07/2023',
        updatedTime: '11:48',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '172964193996666895',
        name: 'Beautiful Night Cream for Sensitive Skin',
        quantity: 100,
        price: 'Rp1.800.000',
        updatedOn: '03/07/2023',
        updatedTime: '12:45',
        status: 'Inactive',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641936772827919',
        name: 'Green Tea Toner for Hydration Skincare Serum',
        quantity: 50,
        price: 'Rp1.000.000',
        updatedOn: '18/07/2023',
        updatedTime: '16:13',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '1729641947499367183',
        name: 'Beaute Glow Moisturizer for All Skin Type hydrating',
        quantity: 200,
        price: 'Rp990.000',
        updatedOn: '18/07/2023',
        updatedTime: '11:48',
        status: 'Active',
        imgSrc: 'https://placehold.co/50x50',
    },
    {
        id: '172964193996666895',
        name: 'Beautiful Night Cream for Sensitive Skin',
        quantity: 100,
        price: 'Rp1.800.000',
        updatedOn: '03/07/2023',
        updatedTime: '12:45',
        status: 'Inactive',
        imgSrc: 'https://placehold.co/50x50',
    },
]
const Product = () =>{
    return(
        <div className="container">
            <div className="pt-2 d-flex justify-content-between">
                <h3>Quản lý sản phẩm</h3>
                <button type="button" className="btn btn-primary">Thêm sản phẩm</button>
            </div>
            <div className="tab">
                <div className="flex items-center space-x-4 p-4 bg-transparent">
                    <div className="text-teal-500 font-semibold">All 26</div>
                    <div className="text-gray-600">Active 15</div>
                    <div className="text-gray-600">Inactive 11</div>
                    <div className="text-gray-600">Suspended 0</div>
                    <div className="text-gray-600">Draft</div>
                    <div className="text-gray-600">Deleted</div>
                </div>
            </div>
            <div className="bg-white p-4 shadow-md">
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
                    <button className="p-2 bg-gray-200 text-gray-500 rounded" disabled>Set Affiliate</button>
                </div>
            </div>
            <div>
                <ProductList productList={list}/>
            </div>
        </div>
    )
}
export default Product;