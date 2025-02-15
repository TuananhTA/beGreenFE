"use client";
import React from 'react';
import './contact.scss';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
const Contact = () => {

  // Validation schema for form inputs
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Họ và tên là bắt buộc')
      .min(2, 'Tên phải chứa ít nhất 2 ký tự')
      .max(50, 'Tên không được vượt quá 50 ký tự'),
    phoneNumber: yup
      .string()
      .required('Số điện thoại là bắt buộc')
      .matches(/^0[0-9]{9,10}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 số'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    birthday: yup.date().required('Ngày sinh là bắt buộc'),
    gender: yup
      .string()
      .required('Giới tính là bắt buộc')
      .oneOf(['1', '2'], 'Vui lòng chọn giới tính hợp lệ'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {

    } catch (error) {
      toast.error('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
    }
  };

  return (
    <div className="row pt-5 contact">
      <div className="row pt-5 ">
        <div className="col-6 p-5">
          <h1 className="pb-4">Liên hệ:</h1>
          <label>Địa chỉ chúng tôi</label>
          <p className="ps-1">Cầu Giấy, Hà Nội, Việt Nam</p>
          <label>Email chúng tôi:</label>
          <p className="ps-1">contact@beegreen.vn</p>
          <label>Điện thoại:</label>
          <p className="ps-1">+84 888 888 888</p>
          <img
            src="/imageAbout2.png"
            alt="Contact"
            className="img-fluid"
          />
        </div>

        <div className="formdk col-6">
          <div className="form-panelDK one">
            <div className="form-header">
              <h1>Đăng Ký</h1>
            </div>
            <div className="form-content">
              <Formik
                initialValues={{
                  name: '',
                  phoneNumber: '',
                  email: '',
                  birthday: '',
                  gender: '',
                  role: 'CUSTOMER',
                  status: 'ACTIVE',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <div className="form-group col">
                      <label htmlFor="name">Họ và tên</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        maxLength={50}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                      />
                      {touched.name && errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group col">
                      <label htmlFor="phoneNumber">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div className="invalid-feedback">{errors.phoneNumber}</div>
                      )}
                    </div>
                    <div className="form-group col">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      />
                      {touched.email && errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group col">
                      <label htmlFor="birthday">Ngày sinh</label>
                      <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={values.birthday}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${touched.birthday && errors.birthday ? 'is-invalid' : ''}`}
                      />
                      {touched.birthday && errors.birthday && (
                        <div className="invalid-feedback">{errors.birthday}</div>
                      )}
                    </div>
                    <div className="form-group col">
                      <label className="labels">
                        <span className="text-danger">*</span> Giới tính:
                      </label>
                      <div className="gender-options">
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="gender"
                            id="nam"
                            value="1"
                            onChange={handleChange}
                            checked={values.gender === '1'}
                          />
                          <label className="form-check-label m-1" htmlFor="nam">
                            Nam
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="radio"
                            name="gender"
                            id="nu"
                            value="2"
                            onChange={handleChange}
                            checked={values.gender !== '1'}
                          />
                          <label className="form-check-label m-1" htmlFor="nu">
                            Nữ
                          </label>
                        </div>
                      </div>
                      {touched.gender && errors.gender && (
                        <div className="text-danger">{errors.gender}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn-submit">
                        Đăng Ký
                      </button>
                    </div>
                    <p className="form-group text">
                      Bạn đã có tài khoản?{" "}
                      <Link className="form-recovery" href="/login">
                        Đăng nhập
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
