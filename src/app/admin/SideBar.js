import { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaTimes, FaBars, FaChevronDown } from 'react-icons/fa';
import { FaChartPie, FaBoxesPacking } from "react-icons/fa6";
import { MdOutlinePayment, MdLocalOffer } from "react-icons/md";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);

    // Reset menu con khi Sidebar đóng
    useEffect(() => {
        if (!isOpen) setOpenMenu(null);
    }, [isOpen]);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-lg h-screen flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-16"
                    }`}
            >
                {/* Header Sidebar */}
                <div className="p-4 flex justify-between items-center">
                    <h1 className={`text-blue-600 text-3xl font-bold transition-all ${!isOpen && "hidden"}`}>
                        K-Ü
                    </h1>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes className="text-black text-xl" /> : <FaBars className="text-black text-xl" />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="mt-4 flex-grow">
                    <a href="#" className=" mt-2 mb-2 flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <FaChartPie className="text-lg" />
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Thống kê</span>
                    </a>
                    <a href="/admin/order" className="  mt-2 mb-2 flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <FaMoneyBillAlt className="text-lg" />
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Bán hàng</span>
                    </a>
                    <a href="#" className=" mt-2 mb-2 flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <MdOutlinePayment className="text-lg" />
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Quán lý hóa đơn</span>
                    </a>
                    <div className="  mt-2 mb-2 relative">
                        <button
                            className="flex w-full items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all"
                            onClick={() => toggleMenu("thongke")}
                        >
                            <FaBoxesPacking className="text-lg" />
                            <span className={`ml-3 text-lg text-justify flex-1 transition-all ${!isOpen && "hidden"}`}>
                                Quản lý sản phẩm
                            </span>
                            {isOpen && <FaChevronDown
                                className={`text-sm transition-transform ${openMenu === "thongke" ? "rotate-180" : ""}`} />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all ${openMenu === "thongke" ? "max-h-40" : "max-h-0"}`}>
                            <a href="/admin/product" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">Sản phẩm</a>
                            <a href="#" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">Đơn vị</a>
                        </div>
                    </div>
                    <div className="mt-2 mb-2 relative">
                        <button
                            className="flex w-full items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all"
                            onClick={() => toggleMenu("promotion")}
                        >
                            <MdLocalOffer className="text-lg" />
                            <span className="ml-3 text-lg flex-1 transition-all">Quản lý khuyến mãi</span>
                            <FaChevronDown
                                className={`text-sm transition-transform ${openMenu === "promotion" ? "rotate-180" : ""}`}
                            />
                        </button>
                        <div className={`overflow-hidden transition-all ${openMenu === "promotion" ? "max-h-40" : "max-h-0"}`}>
                            <a href="/admin/voucher" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">
                                Voucher
                            </a>
                            <a href="/admin/promotion" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">
                                Chương trình khuyến mãi
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
