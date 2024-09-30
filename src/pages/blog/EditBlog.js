import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {handleImageUpload} from "../../components/upload/ImageUpload";
import EditorToolbar, {modules} from "../../components/utils/EditorToolbar";


export default function EditBlog() {
    const [initialValues, setInitialValues] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    const idUpdate = params.id;

    useEffect(() => {
        if (idUpdate) {
            axios.get(`http://localhost:3000/posts/${idUpdate}`)
                .then((res) => {
                    const data = res.data;
                    console.log("API Response: ", res.data);

                    setInitialValues({
                        title: data.title,
                        content: data.content,
                        status: data.status,
                        type: data.type,
                        imgPost: data.imgPost
                    });

                })
                .catch((error) => alert("Error fetching blog data: ", error));
        }
    }, [idUpdate]);
    const handleUpdate = async (values) => {
            try {
                if (values.imgPost) {
                    values.imgPost = await handleImageUpload(values.imgPost); // Upload and get image URL for post image
                    console.log("Post Image URL:", values.imgPost);
                }
                await axios.put(`http://localhost:3000/posts/${idUpdate}`, values)
                alert("Blog updated successfully");
                navigate("/home");
            } catch (error) {
                console.error("Error updating blog:", error);
            };

        };

    return (
        <div className="lg-reg-container">
            <h1 align={"center"}>Cập nhật bài viết</h1>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => {
                    console.log("Form Values on Submit:", values);
                    handleUpdate(values)
                }}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <Field type="text" className="form-control" name="title" />
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
                                    const file = e.currentTarget.files[0];
                                    if (file) {
                                        setFieldValue('imgPost', file); // Set file in Formik
                                        setImagePreview(URL.createObjectURL(file)); // Set image preview
                                        console.log("Selected image file:", file); // Log the file
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
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}