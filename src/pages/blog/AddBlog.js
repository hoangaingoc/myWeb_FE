import {useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {MyContext} from "../../MyContext";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import {handleImageUpload} from "../../components/upload/ImageUpload"; // Import styles for the editor
import ReactQuill from 'react-quill';
import EditorToolbar, {modules} from "../../components/utils/EditorToolbar"; // Import ReactQuill for rich text editing

export default function AddBlog() {
    const navigate = useNavigate();
    const {currentUser} = useContext(MyContext);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    const handleAdd = async (values) => {
        try {
            if (values.imgPost) {
                values.imgPost = await handleImageUpload(values.imgPost); // Upload and get image URL for post image
                console.log("Post Image URL:", values.imgPost);
            }
            await axios.post("http://localhost:3000/posts", values);

            alert("Blog added successfully");
            navigate("/home");
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    return (
        <>
            <div className="lg-reg-container">
                <h1 align={"center"}>Bài viết mới</h1>
                <Formik
                    initialValues={{
                        username: currentUser?.data?.username || '',
                        title: '',
                        content: '',
                        status: '',
                        type: '',
                        image: currentUser?.data?.image || '',
                        imgPost: ''
                    }}
                    onSubmit={(values) => {
                        console.log("Form Values on Submit:", values);
                        handleAdd(values);
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="title">Tiêu đề</label>
                                <Field type="text" className="form-control" name="title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Trạng thái bài viết</label>
                                <Field as="select" className="form-control" name="status">
                                    <option value="">Select Status</option>
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
                                <label htmlFor="content">Content</label>
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
                                        setFieldValue('imgPost', e.currentTarget.files[0]);
                                        const file = e.currentTarget.files[0];
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
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
                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                    />
                                </div>
                            )}

                            <button type="submit" className="ml-3 btn btn-primary">Đăng bài</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
