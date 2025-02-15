"use client";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "./Login.scss";
import Link from 'next/link';
const LoginPage = () => {

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required("Vui lòng nhập tên đăng nhập!")
            .email("Tên đăng nhập phải là email hợp lệ!"),
        password: yup.string().required("Vui lòng nhập mật khẩu!"),
    });

    const handleLogin = async (values) => {
        try {
            const userRq = {
                email: values.username,
                password: values.password,
            };
            try {

            } catch (error) {
                console.error(error);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="bg p-5">
                <div className="form">
                    <div className="form-toggle"></div>
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Đăng nhập</h1>
                        </div>
                        <div className="form-content">
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleLogin}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group my-5">
                                            <label htmlFor="username">Email</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`form-control ${touched.username && errors.username
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                            {touched.username && errors.username && (
                                                <div className="invalid-feedback">
                                                    {errors.username}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group my-5">
                                            <label htmlFor="password">Mật Khẩu</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`form-control ${touched.password && errors.password
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                            {touched.password && errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group my-5">
                                            <button type="submit" className="btn-submit">
                                                Đăng nhập
                                            </button>
                                        </div>
                                        <p className="form-group text">
                                            Bạn chưa có tài khoản?
                                            <Link
                                                className="form-recovery link-item"
                                                href="/register"
                                            >
                                                Đăng ký
                                            </Link>
                                        </p>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
