import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {handleImageUpload} from "../../components/upload/ImageUpload";

export default function Register() {
    const navigate = useNavigate();

    const handleregister = async (values) => {
        try {
            if (values.image) {
                values.image = await handleImageUpload(values.image); // Upload and get image URL
                console.log(values.image);
            }
            await axios.post("http://localhost:3000/register", values);
            alert('Đăng ký thành công');
            navigate('/login');
        } catch (e) {
            alert('User đã tồn tại');
        }
    };
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    dob: '',
                    image: ''
                }}
                onSubmit={(values) => {
                    handleregister(values)
                }}>
                {({setFieldValue}) => (
                    <Form>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="col-7">
                                <section className="text-center text-lg-start">
                                    <div class="card mb-3">
                                        <div class="row g-0 align-items-center">
                                            <div class="col-lg-6 mb-5 mb-lg-0">
                                                <div class="card cascading-right bg-body-tertiary"
                                                     style={{backdropfilter: "blur(30px)"}}>

                                                    <div className="card-body p-5 shadow-5">
                                                        <h2 class="fw-bold mb-5 text-center">Sign up now</h2>

                                                        <div data-mdb-input-init className="form-outline mb-4">
                                                            <label className="form-label"
                                                                   htmlFor="form3Example3">Username</label>
                                                            <Field type="username" id="form3Example3"
                                                                   class="form-control"
                                                                   name={'username'}/>

                                                        </div>

                                                        <div data-mdb-input-init className="form-outline mb-4">
                                                            <label className="form-label"
                                                                   htmlFor="form3Example4">Password</label>
                                                            <Field type="password" id="form3Example4"
                                                                   class="form-control"
                                                                   name={'password'}/>

                                                        </div>
                                                        <div data-mdb-input-init className="form-outline mb-4">
                                                            <label className="form-label"
                                                                   htmlFor="form3Example4">DOB</label>
                                                            <Field type="date" id="form3Example4"
                                                                   class="form-control"
                                                                   name={'dob'}/>

                                                        </div>
                                                        <div className="row mb-4">
                                                        <p>Have an account? <Link to={'/login'}
                                                                                      className="link-info">Sign in
                                                                here</Link></p>
                                                        </div>
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                onChange={(e) => setFieldValue('image', e.currentTarget.files[0])} // Handle file input
                                                            />
                                                            <label className="custom-file-label">Your avatar</label>
                                                        </div>
                                                        <button
                                                            class="btn btn-primary btn-block mb-4">
                                                            Sign up
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 mb-5 mb-lg-0">
                                                <img src="https://img.freepik.com/free-photo/beautiful-flower-vase-studio_23-2150788583.jpg?t=st=1727526035~exp=1727529635~hmac=15cc202221c0885413566a6991bbe3d5a68fc9a8e43b77e1b18f3ac91266ebce&w=360"
                                                     class="w-100 rounded-4 shadow-4"
                                                     alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
