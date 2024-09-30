import React, {useContext, useEffect, useState} from "react";
import {MyContext} from "../../MyContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {handleImageUpload} from "../../components/upload/ImageUpload";

export default function Info() {
    const {currentUser, setCurrentUser} = useContext(MyContext);
    const [info, setInfo] = useState(null);
    const username = currentUser?.data?.username || "Guest";
    const [editAvatar, setEditAvatar] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [editDob, setEditDob] = useState(false);
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [previewImage, setPreviewImage] = useState(null); // Để lưu ảnh xem trước

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/users/${username}`);
                setInfo(res.data); // Cập nhật state với dữ liệu user
            } catch (err) {
                console.error("Error fetching user details:", err);
            }
        };
        fetchUserDetails(); // Gọi hàm fetch dữ liệu user
    }, [username]);

    const handleEdit = async (values) => {
        setLoading(true); // Bắt đầu loading
        setError(null); // Xóa lỗi trước đó nếu có
        try {
            if (values.image) {
                values.image = await handleImageUpload(values.image); // Upload và lấy URL ảnh
            }
            await axios.put(`http://localhost:3000/users/${username}`, values);
            alert("Cập nhật thành công!");

            setCurrentUser((prevUser) => ({
                ...prevUser,
                data: {
                    ...prevUser.data,
                    image: values.image // Cập nhật avatar mới
                }
            }));

            // Fetch lại thông tin user để cập nhật giao diện sau khi chỉnh sửa
            const res = await axios.get(`http://localhost:3000/users/${username}`);
            setInfo(res.data); // Cập nhật state với dữ liệu user mới

            // Sau khi cập nhật thành công, đặt lại các trạng thái chỉnh sửa về false
            setEditAvatar(false);
            setEditPass(false);
            setEditDob(false);


        } catch (error) {
            setError("Đã xảy ra lỗi trong quá trình cập nhật. Vui lòng thử lại.");
            console.error("Error updating user:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL ảnh từ tệp
            setPreviewImage(imageUrl); // Cập nhật ảnh để xem trước
        }
    };

    return (
        <>
            {info ? (
                <div className="d-flex">
                    <div className="card" style={{width: "18rem"}}>
                        <div style={{position: "relative", display: "inline-block;"}}>
                            <img src={info.image} className="card-img-top" style={{borderRadius:"50%"}} alt="Avatar"/>
                            <i className='far fa-edit'
                               style={{
                                   cursor: "pointer",
                                   position: "absolute",
                                   bottom: "20px",
                                   right: "20px",
                               }}
                               onClick={() => setEditAvatar(!editAvatar)}></i>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">
                                Username: {info.username}
                            </h5>
                            <p className="card-text">
                                <strong>Password:</strong> {"*".repeat(info.password.length)}
                                <i className='far fa-edit'
                                   style={{
                                       cursor: "pointer",
                                       position: "absolute",
                                       right: "20px",
                                   }}
                                   onClick={() => setEditPass(!editPass)}>
                                </i>
                            </p>

                            <p className="card-text">
                                <strong>Date of Birth:</strong> {info.dob}
                                <i className='far fa-edit'
                                   style={{
                                       cursor: "pointer",
                                       position: "absolute",
                                       right: "20px",
                                   }}
                                   onClick={() => setEditDob(!editDob)}>

                                </i>
                            </p>
                        </div>


                    </div>

                    <div className="ms-4">
                        {/* Form thay đổi avatar */}
                        {editAvatar && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit({image: e.target.elements[0].files[0]});
                            }}>
                                <h5>Thay đổi Avatar</h5>
                                <input type="file" className="form-control" onChange={handleImageChange}/>
                                {/* Hiển thị ảnh xem trước nếu có */}
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }} />
                                ) : (
                                    <img src={info.image} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }} />
                                )}
                                <button type="submit" className="btn btn-success btn-sm mt-2">
                                    {loading ? "Đang cập nhật..." : "Lưu"}
                                </button>
                            </form>
                        )}

                        {/* Form thay đổi username */}
                        {editPass && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit({password: e.target.elements[0].value});
                            }}>
                                <h5>Đổi mật khẩu</h5>
                                <input type="text" className="form-control" defaultValue={info.password}/>
                                <button type="submit" className="btn btn-success btn-sm mt-2">
                                    {loading ? "Đang cập nhật..." : "Lưu"}
                                </button>
                            </form>
                        )}

                        {/* Form thay đổi ngày sinh */}
                        {editDob && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit({dob: e.target.elements[0].value});
                            }}>
                                <h5>Thay đổi Date of Birth</h5>
                                <input type="date" className="form-control" defaultValue={info.dob}/>
                                <button type="submit" className="btn btn-success btn-sm mt-2">
                                    {loading ? "Đang cập nhật..." : "Lưu"}
                                </button>
                            </form>
                        )}

                        {/* Hiển thị thông báo lỗi nếu có */}
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                    </div>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </>
    );
}
