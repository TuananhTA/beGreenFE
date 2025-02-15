"use client"; // Đảm bảo mã chạy trong Client Component
import React, { useState } from 'react';

import './client.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FooterHome from "./footer/FooterHome";
import Header from "./hender/header";

export default function ClientLayout({ children }) {
    return (
        <div className="client-container">
            <PerfectScrollbar>
                <div className="client-header">
                    <Header />
                </div>
                <div className="client-content">
                    <div className="client-main">
                        {children} {/* Hiển thị nội dung route con */}
                    </div>
                </div>
                <div className="client-footer">
                    <FooterHome />
                </div>
            </PerfectScrollbar>
        </div>
    );
}
