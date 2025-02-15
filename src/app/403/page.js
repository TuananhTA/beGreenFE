"use client"; // Đảm bảo mã chạy trong Client Component
import React from 'react';
import { useRouter } from 'next/navigation';  // Đảm bảo import useRouter
import './Page403.scss';

const Page403 = () => {
    const router = useRouter();  // Khai báo router ở đây

    const handleGoHome = () => {
        router.push('/');  // Sử dụng router.push để điều hướng về trang chủ
    };

    return (
        <div className="container-fluid page403-container">
            <h1 className="page403-title">403</h1>
            <p className="page403-message">Bạn không có quyền truy cập vào trang này.</p>
            <button className="page403-button" onClick={handleGoHome}>
                Quay về trang chủ
            </button>
        </div>
    );
};

export default Page403;
