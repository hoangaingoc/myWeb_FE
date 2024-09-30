// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [username, setUsername] = useState(''); // Quản lý trạng thái của username
    const [message, setMessage] = useState(''); // Quản lý trạng thái thông báo
    const navigate = useNavigate();

    // Xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/forgot-password', { username }); // Gửi yêu cầu POST tới API
            alert('Reset mật khẩu thành công, mật khẩu mới của bạn: 123456');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message); // Hiển thị thông báo lỗi từ server (username không tìm thấy)
            } else {
                setMessage('Đã xảy ra lỗi, vui lòng thử lại.'); // Xử lý lỗi không xác định
            }
        }
    };

    return (
        <div>
            <h2>Quên mật khẩu</h2>
            <form className="form-inline" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
                <input
                    className="form-control mb-2 mr-sm-2"
                    type="text"
                    placeholder="Nhập tên tài khoản của bạn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị của username
                    required
                />
                <button type="submit" className="btn btn-primary mb-2">Gửi yêu cầu</button>
            </form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo */}
        </div>
    );
};

export default ForgotPassword;
