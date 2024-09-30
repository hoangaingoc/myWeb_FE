import {Field, Form, Formik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {MyContext} from "../../MyContext";

export default function Login() {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(MyContext);

    const handlelogin = (values) => {
        axios.post("http://localhost:3000/login", values)
            .then((res) => {
                alert('Đăng nhập thành công');
                setCurrentUser(res.data);

                console.log(res.data)

                localStorage.setItem("currentUser", JSON.stringify(res.data));
                navigate('/home');
            }).catch(e => {
            alert('Sai tài khoản, mật khẩu');
        });
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => handlelogin(values)}
            >
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-7">
                        <section className="text-center text-lg-start">
                            <div className="card mb-3">
                                <div className="row g-0 d-flex align-items-center">
                                    <div className="col-lg-4 d-none d-lg-flex">
                                        <img
                                            src="https://img.freepik.com/free-photo/beautiful-flower-vase-studio_23-2150788583.jpg?t=st=1727526035~exp=1727529635~hmac=15cc202221c0885413566a6991bbe3d5a68fc9a8e43b77e1b18f3ac91266ebce&w=360"
                                            alt="Trendy Pants and Shoes"
                                            className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                                        />
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card-body py-5 px-md-5">
                                            <Form>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example1">
                                                        Username
                                                    </label>
                                                    <Field
                                                        type="username"
                                                        id="form2Example1"
                                                        className="form-control"
                                                        name="username"
                                                    />
                                                </div>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example2">
                                                        Password
                                                    </label>
                                                    <Field
                                                        type="password"
                                                        id="form2Example2"
                                                        className="form-control"
                                                        name="password"
                                                    />
                                                </div>
                                                <div className="row mb-4">
                                                    <div>
                                                    <Link to={"/forgot-password"}>Forgot password?</Link>
                                                    </div>
                                                    <p>
                                                        Don't have an account? <Link to="/register" className="link-info">
                                                        Register here
                                                    </Link>
                                                    </p>
                                                </div>

                                                <button className="btn btn-primary btn-block mb-4">
                                                    Sign in
                                                </button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Formik>
        </>
    );
}
