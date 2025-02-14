import { useState, useEffect } from "react";
import { FaUser, FaMoneyBillAlt, FaShoePrints, FaUserAstronaut, FaUsers,FaTimes,FaBars,FaChevronDown } from 'react-icons/fa';
import { FaChartPie, FaBoxesPacking } from "react-icons/fa6";
import { MdOutlinePayment, MdLogout } from "react-icons/md";
import { GiConverseShoe, GiPresent, GiRunningShoe, GiMaterialsScience } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidDiscount, BiCategory } from "react-icons/bi";
import { IoMdColorFill, IoIosResize } from "react-icons/io";
import { TbBrandArc } from "react-icons/tb";

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
                className={`bg-white shadow-lg h-screen flex flex-col transition-all duration-300 ${
                    isOpen ? "w-64" : "w-16"
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
                    <a href="#" className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <FaChartPie  className="text-lg"/>
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Thống kê</span>
                    </a>
                    <a href="#" className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <FaMoneyBillAlt className="text-lg"/>
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Bán hàng</span>
                    </a>
                    <a href="#" className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all">
                        <MdOutlinePayment className="text-lg"/>
                        <span className={`ml-3 text-lg transition-all ${!isOpen && "hidden"}`}>Quán lý hóa đơn</span>
                    </a>
                    <div className="relative">
                        <button
                            className="flex w-full items-center text-gray-700 py-2 px-4 hover:bg-gray-200 transition-all"
                            onClick={() => toggleMenu("thongke")}
                        >
                            <FaBoxesPacking   className="text-lg"/>
                            <span className={`ml-3 text-lg text-justify flex-1 transition-all ${!isOpen && "hidden"}`}>
                                Sản phẩm
                            </span>
                            {isOpen && <FaChevronDown
                                className={`text-sm transition-transform ${openMenu === "thongke" ? "rotate-180" : ""}`}/>}
                        </button>
                        <div
                            className={`overflow-hidden transition-all ${openMenu === "thongke" ? "max-h-40" : "max-h-0"}`}>
                            <a href="/admin/product" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">Sản phẩm</a>
                            <a href="#" className="block pl-12 pr-4 py-2 text-gray-600 hover:bg-gray-100">Đơn vị</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
