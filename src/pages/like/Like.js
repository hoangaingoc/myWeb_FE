import { useState, useEffect, useContext } from 'react';
import { MyContext } from "../../MyContext";

const Like = ({ postId,username }) => { // Destructure postId from props

    console.log('Current user:', username);

    const [liked, setLiked] = useState(null); // Trạng thái đã like hay chưa
    const [likeCount, setLikeCount] = useState(0); // Số lượng lượt like

    // Kiểm tra xem người dùng đã like hay chưa và lấy số lượng like
    useEffect(() => {
        const fetchLikeData = async () => {
            try {
                // Gọi API GET để lấy danh sách những người đã like bài viết
                const response = await fetch(`http://localhost:3000/posts/${postId}/likes`);

                // Kiểm tra trạng thái phản hồi của API
                console.log('API Response Status:', response.status);

                const data = await response.json(); // Lấy dữ liệu danh sách like từ BE
                setLikeCount(data.length);

                // Log số lượng like sau khi cập nhật
                console.log('Total like count:', data.length);

                // Kiểm tra xem username hiện tại có nằm trong danh sách người đã like không
                if (username !== "Guest") {
                    const userHasLiked = data.some(like => like.username === username);
                    console.log('Has the user liked?', userHasLiked);
                    setLiked(userHasLiked); // Cập nhật trạng thái nút like nếu user đã đăng nhập
                }
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        // Always fetch the like data to show the like count
        fetchLikeData();
    }, [postId, username]); // Chạy lại khi postId hoặc username thay đổi

    // Xử lý khi người dùng nhấn vào nút like/unlike
    const handleLikeClick = async () => {
        if (username === "Guest") {
            alert('Bạn cần đăng nhập để like bài viết.');
            return; // Don't proceed if the user is not logged in
        }

        const apiUrl = liked ? `http://localhost:3000/posts/${postId}/unlike` : `http://localhost:3000/posts/${postId}/like`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setLiked(!liked); // Cập nhật trạng thái liked/unliked
                    setLikeCount(prevCount => liked ? prevCount - 1 : prevCount + 1); // Cập nhật số lượt like
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Yêu cầu thất bại:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p
                onClick={handleLikeClick} // Enable click for both guests and logged-in users
                style={{ fontWeight: liked ? 'bold' : 'normal', fontSize: '16px', marginRight: '8px', cursor: 'pointer' }}>
                <i className={liked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'} style={{ marginRight: '8px', color: 'blue' }}></i>
                {liked ? 'Đã Like' : 'Like'}
            </p>
            <p>{likeCount} likes</p>
        </div>
    );
};

export default Like;
