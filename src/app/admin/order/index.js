"use client"
import {useState, useEffect} from "react";
import {createInPos, getOrderPendingInPos} from "@/service/OrderService";
import EmptyOrder from "@/components/order/Empty";
import ModalSelectOrders from "@/components/order/ModalSelectOrders";
import ModalSelectProduct from "@/components/order/ModalSelectProduct";
import { FaTimes } from 'react-icons/fa';
import {toast} from "react-toastify";
export default function Order() {

    const [orderCallApi, setOrdersCallApi] = useState([])

    const  [orders, setOrder] = useState([]);
    const [selectOrder, setSelectOrder] = useState(null)
    const [selectOrderDetails, setSelectOrderDetails] = useState(null)

    const addOrder = async () => {
        if(orders && orders.length >=5){
            toast.error("Vui lòng đóng 1 hóa đơn rồi tạo mới!")
            return
        }
       let newOrder = await createInPos();
       setOrdersCallApi([...orderCallApi, newOrder.data])
       setOrder([
           ...orders,
           newOrder.data
       ])
    }

    const handleRemoveOrder = (item) => {
        const updatedOrders = orders.filter(order => order.code !== item.code);
        setOrder(updatedOrders);
    };


    useEffect(()=>{
        (async ()=>{
            let resOrders = await getOrderPendingInPos();
            setOrdersCallApi(resOrders.data);
        })()
    },[])


    useEffect(()=>{
        if(selectOrder){
            let item = orders.find(item => item.id === selectOrder.id)
            if(!item) setSelectOrder(null)
        }
    },[orders])


    useEffect(()=>{
       if(selectOrder){
           setSelectOrderDetails(selectOrder.orderDetailList)
       }
    },[selectOrder])

    const handleSelectOrder = (item) => {
        setSelectOrder(item);
    }
    return (
        <div className="text-sm m-auto text-sm">
            <div className="d-flex justify-content-sm-between">
                <h2>Bán hàng</h2>
                <ModalSelectOrders
                    data={orderCallApi}
                    callBack={setOrder}
                    selectData = {orders}
                />
            </div>
            <div>
                <ul className="flex border-b pt-2 mb-0 pl-0">
                    {orders.map(item => {
                        return (
                            <li className="mr-1  relative" key={item.code}>
                                {/* Nút x đỏ */}
                                <button
                                    onClick={() => handleRemoveOrder(item)}
                                    style={{
                                        top : "-9px",
                                        right: "-8px"
                                    }}
                                    className="absolute text-red-500 hover:text-red-700 text-lg p-1 bg-white rounded-full border-2 border-red-500 hover:scale-110 transition-all duration-200"
                                >
                                    <FaTimes/>
                                </button>

                                <button
                                    onClick={() => handleSelectOrder(item)}
                                    className={`inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold 
                ${selectOrder === item ? 'bg-blue-600 text-white' : 'bg-white text-blue-700'}`}
                                >
                                    {item.code}
                                </button>
                            </li>
                        );
                    })}
                    <li className="mr-1">
                        <button
                            onClick={addOrder}
                            className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        >Thêm
                        </button>
                    </li>
                </ul>
            </div>

            {!selectOrder? <EmptyOrder/> : (
                <div className="flex">
                    <div className="w-2/3 bg-white p-6 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <ModalSelectProduct/>
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Stt</th>
                                <th className="px-4 py-2 text-left">Sản phẩm</th>
                                <th className="px-4 py-2 text-left">Số lượng</th>
                                <th className="px-4 py-2 text-left">Đơn giá</th>
                                <th className="px-4 py-2 text-left">Tổng cộng</th>
                            </tr>
                            </thead>
                            <tbody>
                                {selectOrderDetails?.map(item =>{
                                    return (
                                        <tr key={item.id} className="border-t">
                                            <td className="px-4 py-2 text-center">2</td>
                                            <td className="px-4 py-2 flex items-center">
                                                <img alt="Product image" className="inline-block mr-4 rounded-lg"
                                                     height="50"
                                                     src="https://placehold.co/50x50" width="50"/>
                                                <div className="font-semibold">{item.productName}</div>
                                                {item.type === "RETAIL" ? "" :
                                                    <div className="text-sm text-gray-500">{item.productDetailName}</div>}
                                            </td>
                                            <td className="py-2">
                                                <input
                                                    value={item.quantity}
                                                    className="border-b px-2 py-1 rounded-none outline-none
                                                    appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                                                    type="number"
                                                />
                                                <label className="px-4 py-2 text-center">đơn vị</label>
                                            </td>

                                            <td className="px-4 py-2 text-center">{item.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/3 bg-white p-6 border rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Thông tin</h2>
                        <div className="mb-2">
                            <label className="block mb-1 font-semibold">Tên khách hàng</label>
                            <input className="border w-full px-4 py-2 rounded-lg" type="text"/>
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1 font-semibold">SĐT</label>
                            <input className="border w-full px-4 py-2 rounded-lg" type="text"/>
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1 font-semibold">Địa chỉ</label>
                            <input className="border w-full px-4 py-2 rounded-lg" type="text"/>
                        </div>
                        <div className="mb-1">
                            <button
                                className="border px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Chọn
                                khách hàng
                            </button>
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1 font-semibold">Mã giảm giá</label>
                            <div className="flex">
                                <input className="border w-full px-4 py-2 rounded-lg" type="text" value="387745432894"/>
                                <button
                                    className="border px-4 py-2 ml-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Kiểm
                                    tra
                                </button>
                            </div>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                            <label className="block mb-1 font-semibold">Số lượng sản phẩm</label>
                            <div className="font-semibold">{selectOrder.totalQuantity}</div>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                            <label className="block mb-1 font-semibold">Tổng tiền sản phẩm</label>
                            <div className="font-semibold">{selectOrder.totalAmount} vnd</div>
                        </div>
                        <div className="mb-2 d-flex justify-content-between">
                            <label className="mb-1 font-semibold">Giảm</label>
                            <div className="font-semibold">0 vnđ</div>
                        </div>
                        <div className="flex justify-between mb-6">
                            <button
                                className="border px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Banking
                            </button>
                            <button
                                className="border px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Tiền
                                mặt
                            </button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="text-xl font-bold mb-4">Tổng cộng</div>
                            <div className="text-xl font-bold mb-6">vnđ</div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="border px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Hủy
                            </button>
                            <button
                                className="border px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">Thanh
                                toán
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
