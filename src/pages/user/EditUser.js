import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {MyContext} from "../../MyContext";
import {handleImageUpload} from "../../components/upload/ImageUpload";
import {Field, Form, Formik} from "formik";
import EditorToolbar, {modules} from "../../components/utils/EditorToolbar";
import ReactQuill from "react-quill";

export default function EditUser({ info }) {
    const {currentUser} = useContext(MyContext)
    const [initialValues, setInitialValues] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const username = currentUser?.data?.username || "Guest"
    const navigate = useNavigate();

    console.log("Username:", username);

    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:3000/users/${username}`)
                .then((res) => {
                    const data = res.data;
                    console.log("API Response: ", res.data);

                    setInitialValues({
                        password: data.password,
                        dob: data.dob,
                        image: data.image
                    });

                })
                .catch((error) => alert("Error fetching product data: ", error));
        }
    }, [username]);

    const handleUpdate = async (values) => {
            try {
                if (values.image) {
                    values.image = await handleImageUpload(values.image); // Upload and get image URL for post image
                    console.log("Post Image URL:", values.image);
                }
                await axios.put(`http://localhost:3000/users/${username}`, values)
                alert("Update successfully");
                navigate("/info");
            } catch (error) {
                console.error("Error updating user:", error);
            }
            ;
        }
    ;

    return (

        <div className="lg-reg-container">
            <h1 align={"center"}>Thay đổi thông tin</h1>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => {
                    console.log("Form Values on Submit:", values);
                    handleUpdate(values)
                }}
            >
                {({setFieldValue, values}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="title">Password</label>
                            <Field type="text" className="form-control" name="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Trạng thái</label>
                            <Field as="select" className="form-control" name="status">
                                <option value="private">Private</option>
                                <option value="public">Public</option>

                            </Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Thể loại</label>
                            <Field as="select" className="form-control" name="type">
                                <option value="">Select Type</option>
                                <option value="featured">Tin mới</option>
                                <option value="personal">Cuộc sống</option>
                                <option value="technology">Công nghệ</option>
                            </Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Nội dung</label>
                            <EditorToolbar/>
                            <ReactQuill
                                value={values.content}
                                onChange={(value) => setFieldValue('content', value)}
                                theme="snow"
                                className="quill-editor"
                                style={{height: "50vh"}}
                                modules={modules}
                            />
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) => {
                                    setFieldValue('imgPost', e.currentTarget.files[0]); // Set the file in Formik
                                    const file = e.currentTarget.files[0];
                                    if (file) {
                                        setImagePreview(URL.createObjectURL(file)); // Set image preview URL
                                    }
                                }}
                            />
                            <label className="custom-file-label">Upload ảnh đại diện bài viết</label>
                        </div>

                        {/* Image preview section */}
                        {imagePreview && (
                            <div className="image-preview mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{maxWidth: "100%", maxHeight: "300px"}}
                                />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
