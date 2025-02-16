"use client"; // Đảm bảo mã chạy trong Client Component
import React, { useState } from 'react';

import './Admin.scss';
import SideBar from './SideBar';
import PerfectScrollbar from 'react-perfect-scrollbar';

export default function AdminLayout({ children }) {
    const [show, setShow] = useState(true);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar show={show} handleToggleSidebar={setShow} />
            </div>
            <div className="admin-content">
                <div className="admin-header" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                </div>
                <PerfectScrollbar>
                    <div className="admin-main">
                        {children} {/* Hiển thị nội dung route con */}
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
}
