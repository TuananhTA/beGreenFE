"use client";
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { FaUserAlt, FaSignOutAlt, FaCartPlus, FaMicroblog } from 'react-icons/fa';
import './header.scss';

function Header() {
    const [account, setAccount] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccount(true)
        }
    }, []);
    return (
        <Navbar collapseOnSelect expand="lg" className="header-navbar" fixed="top">
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand className="navbar-brand">
                    <Link href="/" passHref>
                        <img src="/logoPage.png" alt="Logo" className="navbar-brand-img" style={{ maxWidth: '100%' }} />
                    </Link>
                </Navbar.Brand>

                {/* Toggle Button */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Navigation */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto justify-content-center w-100">
                        <Nav.Link as={Link} href="/">Trang chủ</Nav.Link>
                        <Nav.Link as={Link} href="/client/about">Giới thiệu</Nav.Link>
                        <Nav.Link as={Link} href="/client/product">Sản phẩm</Nav.Link>
                        <Nav.Link as={Link} href="/client/contact">Liên hệ</Nav.Link>
                        <Nav.Link as={Link} href="/client/blog">Blog</Nav.Link>
                    </Nav>

                    {/* User Avatar & Dropdown */}
                    <Nav>
                        {account ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle as="a" href="#" className="d-flex text-dark align-items-center">
                                    <p style={{ fontSize: '16px' }} className="m-0">Hi, Nam</p>
                                    <img class="size-10" src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} href="/profile">
                                        <FaUserAlt className="menu-icon" /> Tài khoản
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/admin">
                                        <FaMicroblog className="menu-icon" /> Quản lý
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/cart">
                                        <FaCartPlus className="menu-icon" /> Giỏ hàng
                                    </Dropdown.Item>
                                    <hr />
                                    <Dropdown.Item as={Link} href="/logout">
                                        <FaSignOutAlt className="menu-icon" /> Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Dropdown align="end">
                                <div className="d-flex align-items-center">
                                    <Link href="/cart" className="text-dark me-3">
                                        <FaCartPlus style={{ fontSize: '24px' }} />
                                    </Link>
                                    <Dropdown.Toggle as="div" className="d-flex align-items-center">
                                        <img class="size-10" src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} href="/login">Đăng nhập</Dropdown.Item>
                                        <Dropdown.Item as={Link} href="/register">Đăng ký</Dropdown.Item>
                                    </Dropdown.Menu>
                                </div>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
