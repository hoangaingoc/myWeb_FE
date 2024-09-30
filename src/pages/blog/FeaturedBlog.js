import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { MyContext } from "../../MyContext"; // Assuming you're using MyContext for current user

export default function FeaturedBlog() {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(MyContext); // Getting current user context

    // Fetch posts data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/posts");
                if (response.data.length > 0) {
                    setPosts(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching posts", error);
            }
        };
        fetchPosts();
    }, []);

    // Filter featured posts based on the status and current user
    const featuredPosts = posts.filter(post => {
        const isPublic = post.status === 'public';
        const isUserBlog = currentUser && currentUser.data && post.username === currentUser.data.username;
        return post.type === 'featured' && (isPublic || isUserBlog);
    });

    return (
        <>
            {featuredPosts.length > 0 && (
                <div className="card mb-4">
                    <Carousel>
                        {featuredPosts.map((post, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={post.imgPost || "https://dummyimage.com/850x350/dee2e6/6c757d.jpg"}
                                    alt={`Featured Post ${index}`}
                                    style={{height: '500px', objectFit: 'cover'}} // Adjust height as needed
                                />
                                <Carousel.Caption
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark transparent overlay
                                        padding: '10px',
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '100%',
                                        textAlign: 'center',
                                        color: 'white', // Text color always white against the dark background
                                        borderRadius: '5px',
                                    }}
                                >
                                    <div className="featured-icon">
                                        <h5 className="card-title">
                                            <i className="fas fa-star text-warning ms-2" style={{fontSize: "16px"}}></i>
                                            {post.title}
                                            <i className="fas fa-star text-warning ms-2" style={{fontSize: "16px"}}
                                               title="Featured"></i>
                                        </h5>
                                    </div>
                                    <div>
                                        <Link className="btn btn-outline-light btn-sm" to={`/home/detail/${post.id}`}>
                                            Đọc tiếp →
                                        </Link>
                                    </div>
                                </Carousel.Caption>

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
}
