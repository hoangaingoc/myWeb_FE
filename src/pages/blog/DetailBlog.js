import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../MyContext";
import DeleteBlog from "./DeleteBlog";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Like from "../like/Like";

export default function DetailBlog() {
    const [blogs, setBlogs] = useState(null);
    const [avatar, setAvatar] = useState(null); // State to store the avatar
    const { id } = useParams();  // Get the blog ID from URL
    const { currentUser } = useContext(MyContext);  // Get current user from context
    const username = currentUser?.data?.username || "Guest";  // Fallback to "Guest" if no username

    useEffect(() => {
        // Fetch blog details
        const fetchBlogDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/posts/${id}`);
                setBlogs(res.data);  // Update state with blog data

                if (res.data.username) {
                    // Fetch user avatar based on blog's username
                    const userRes = await axios.get(`http://localhost:3000/users/${res.data.username}`);
                    setAvatar(userRes.data.image);  // Update state with user's avatar
                }
            } catch (err) {
                console.error("Error fetching blog details or user data:", err);
            }
        };

        fetchBlogDetails();  // Call the function to fetch data
    }, [id]);

    const handleDeleteSuccess = () => {
        window.location.href = "/home";
    };

    // Show loading while blog data is being fetched
    if (!blogs) {
        return <p>Loading...</p>;
    }

    // Check if the current user is the author of the blog post
    const isUserBlog = currentUser?.data && blogs.username === currentUser.data.username;

    return (
        <div className="row align-items-center">
            <div className="col-6 mt-5 ml-5">
                <h2 align="center">{blogs.title}</h2>
                <br/>
                <img
                    src={avatar || 'https://mandalay.com.vn/wp-content/uploads/2023/06/co-4-la-may-man-avatar-dep-18.jpg'}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: '30px', height: '30px' }}
                /> - {blogs.username}
                <div>
                    {blogs.createAt
                        ? `${new Date(blogs.createAt).toISOString().slice(0, 10)} ${new Date(blogs.createAt).getHours().toString().padStart(2, '0')}:${new Date(blogs.createAt).getMinutes().toString().padStart(2, '0')}`
                        : "No date available"}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Like
                        postId={blogs.id}
                        username={username}  // Pass the username to the Like component
                        initialLikes={blogs.likeCount || 0}
                        initialLiked={blogs.userLiked || false}
                        onLikeUpdate={(newLikes) => {
                            setBlogs(prevState => ({
                                ...prevState,
                                likeCount: newLikes,
                            }));
                        }}
                    />
                    <div>
                        {isUserBlog && (
                            <>
                                {/* Edit button with icon */}
                                <Link to={`/home/edit/${blogs.id}`} style={{ marginRight: '10px' }}>
                                    <i className="fas fa-edit" style={{ marginRight: '5px' }}></i>
                                </Link>

                                {/* Delete button with icon */}
                                <DeleteBlog postId={blogs.id} onDeleteSuccess={handleDeleteSuccess} />
                            </>
                        )}
                    </div>
                </div>
                <hr/>
                <div className="card-text" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: blogs.content }} />
                <hr/>
            </div>
        </div>
    );
}
