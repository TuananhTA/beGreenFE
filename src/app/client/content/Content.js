"use client"
import React, { useState } from 'react';
import './Content.scss';
import Link from 'next/link';
import { Card, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Content = () => {

    const [products, setProducts] = useState(
        [
            { idProduct: 1, nameProduct: "Sản phẩm 1", image: "https://placehold.co/150x150", minPrice: 100000, maxPrice: 200000, minPriceAfterDiscount: 90000, maxPriceAfterDiscount: 180000 },
            { idProduct: 2, nameProduct: "Sản phẩm 2", image: "https://placehold.co/150x150", minPrice: 150000, maxPrice: 250000, minPriceAfterDiscount: 120000, maxPriceAfterDiscount: 230000 },
            { idProduct: 3, nameProduct: "Sản phẩm 3", image: "https://placehold.co/150x150", minPrice: 200000, maxPrice: 300000, minPriceAfterDiscount: 180000, maxPriceAfterDiscount: 270000 },
            { idProduct: 4, nameProduct: "Sản phẩm 4", image: "https://placehold.co/150x150", minPrice: 120000, maxPrice: 220000, minPriceAfterDiscount: 110000, maxPriceAfterDiscount: 210000 },
            { idProduct: 5, nameProduct: "Sản phẩm 5", image: "https://placehold.co/150x150", minPrice: 90000, maxPrice: 190000, minPriceAfterDiscount: 85000, maxPriceAfterDiscount: 180000 },
            { idProduct: 6, nameProduct: "Sản phẩm 6", image: "https://placehold.co/150x150", minPrice: 180000, maxPrice: 280000, minPriceAfterDiscount: 160000, maxPriceAfterDiscount: 260000 },
            { idProduct: 7, nameProduct: "Sản phẩm 7", image: "https://placehold.co/150x150", minPrice: 140000, maxPrice: 240000, minPriceAfterDiscount: 130000, maxPriceAfterDiscount: 230000 },
            { idProduct: 8, nameProduct: "Sản phẩm 8", image: "https://placehold.co/150x150", minPrice: 170000, maxPrice: 270000, minPriceAfterDiscount: 160000, maxPriceAfterDiscount: 260000 },
            { idProduct: 9, nameProduct: "Sản phẩm 9", image: "https://placehold.co/150x150", minPrice: 130000, maxPrice: 230000, minPriceAfterDiscount: 120000, maxPriceAfterDiscount: 220000 },
            { idProduct: 10, nameProduct: "Sản phẩm 10", image: "https://placehold.co/150x150", minPrice: 110000, maxPrice: 210000, minPriceAfterDiscount: 100000, maxPriceAfterDiscount: 200000 },
        ]
    );

    // Lọc sản phẩm duy nhất theo idProduct
    const getUniqueProducts = (products) => {
        const uniqueProducts = [];
        const uniqueIds = new Set();
        for (const product of products) {
            if (!uniqueIds.has(product.idProduct)) {
                uniqueProducts.push(product);
                uniqueIds.add(product.idProduct);
            }
            if (uniqueProducts.length >= 20) break; // Điều chỉnh theo nhu cầu
        }
        return uniqueProducts;
    };
    const formatCurrency = (value) => {
        if (!value) return 0;
        const roundedValue = Math.round(value) || 0;
        return roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const CustomPrevArrow = (props) => {
        const { currentSlide, slideCount, ...restProps } = props;
        return <button {...restProps} className="slick-arrow slick-prev">{'<'}</button>;
    };

    const CustomNextArrow = (props) => {
        const { currentSlide, slideCount, ...restProps } = props;
        return <button {...restProps} className="slick-arrow slick-next">{'>'}</button>;
    };

    const filteredProducts = products ? getUniqueProducts(products) : [];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };



    return (
        <div className='FeaturedProduct'>
            {/* Phần sản phẩm nổi bật */}
            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm nổi bật</h2>
                <Link href="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>



            <div className="slider-container">
                <Slider {...settings}>
                    {filteredProducts.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    href={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <img src={`https://placehold.co/150x150`} alt="" style={{ maxWidth: "150", maxHeight: "150" }} />
                                    </div>
                                </Link>
                                <div className="card-body text-center">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    <div className="product-pricing">
                                        {product.minPriceAfterDiscount === product.minPrice &&
                                            product.maxPriceAfterDiscount === product.maxPrice ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {formatCurrency(product.minPrice)} VND
                                                    </Tooltip>
                                                }
                                            >
                                                <p className="product-price truncate-text">
                                                    {formatCurrency(product.minPrice)} VND
                                                </p>
                                            </OverlayTrigger>
                                        ) : (
                                            <>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-sale-price text-danger truncate-text">
                                                        {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                    </p>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-original-price text-decoration-line-through truncate-text">
                                                        {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                    </p>
                                                </OverlayTrigger>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>


            {/* Phần bộ sưu tập */}
            <Row className="justify-content-center m-4">
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src='./imageAbout1.png' alt="Bộ sưu tập Minimal" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                Sản phẩm sạch
                            </Card.Title>
                            <Link href="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col md={6} lg={6} className="mb-4">
                    <Card className="text-white text-center border-0 shadow-sm hover-card">
                        <Card.Img src='./imageAbout2.png' alt="Bộ sưu tập Sneakers" className="img-fluid rounded" />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-overlay">
                            <Card.Title className="display-5 fw-bold  text-shadow mb-3 overlay-content">
                                NÔNG SẢN SẠCH
                            </Card.Title>
                            <Link href="allProducts" className="btn btn-light rounded-pill px-4 py-2 fw-semibold shadow overlay-content">
                                Mua ngay
                            </Link>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>


            <div className="row m-2">
                <h2 className="text-start col m-3">Sản phẩm mới</h2>
                <Link href="/allProducts" className="text-end col m-3">
                    <h4>Xem tất cả</h4>
                </Link>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {filteredProducts.map((product) => (
                        <div key={product.idProduct} className="product-slide">
                            <div className="card h-100">
                                <Link
                                    href={`/product-detail?idProduct=${product.idProduct}`}
                                    className="btn btn-light"
                                    aria-label="View details"
                                >
                                    <div className="image-container">
                                        <img src={`https://placehold.co/150x150`} alt="" style={{ maxWidth: "150", maxHeight: "150" }} />
                                    </div>
                                </Link>
                                <div className="card-body text-center ">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{product.nameProduct}</Tooltip>}
                                    >
                                        <p className="product-name truncate-text">{product.nameProduct}</p>
                                    </OverlayTrigger>
                                    <div className="product-pricing">
                                        {product.minPriceAfterDiscount === product.minPrice &&
                                            product.maxPriceAfterDiscount === product.maxPrice ? (
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        {formatCurrency(product.minPrice)} VND
                                                    </Tooltip>
                                                }
                                            >
                                                <p className="product-price truncate-text">
                                                    {formatCurrency(product.minPrice)} VND
                                                </p>
                                            </OverlayTrigger>
                                        ) : (
                                            <>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-sale-price text-danger truncate-text">
                                                        {formatCurrency(product.minPriceAfterDiscount)} VND - {formatCurrency(product.maxPriceAfterDiscount)} VND
                                                    </p>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip>
                                                            Giá trị hiện tại là :{formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                        </Tooltip>
                                                    }
                                                >
                                                    <p className="product-original-price text-decoration-line-through truncate-text">
                                                        {formatCurrency(product.minPrice)} VND - {formatCurrency(product.maxPrice)} VND
                                                    </p>
                                                </OverlayTrigger>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Content;
