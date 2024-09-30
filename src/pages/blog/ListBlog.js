import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFilter from "./Filter";  // Import the custom hook
import formatDate from "../../components/utils/FormatDate";
import axios from "axios";

export default function ListBlog() {
    const { filters, handleChange, applyFilters } = useFilter();  // Use the custom hook
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [avatars, setAvatars] = useState({});

    const getStatusIcon = (status) => {
        switch (status) {
            case "public":
                return <i className="material-icons" style={{ fontSize: "16px" }}>public</i>;
            case "private":
                return <i className={"fas fa-lock"}></i>;
            default:
                return null;
        }
    };

    // Get filtered blogs using applyFilters()
    const filteredBlogs = applyFilters();

    // Fetch avatars based on the username
    useEffect(() => {
        const fetchAvatars = async () => {
            const usernames = filteredBlogs.map(blog => blog.username);
            const avatarPromises = usernames.map(username =>
                axios.get(`http://localhost:3000/users/${username}`).then(res => ({ [username]: res.data.image }))
            );
            const avatarResults = await Promise.all(avatarPromises);
            const avatarMap = Object.assign({}, ...avatarResults);
            setAvatars(avatarMap);
        };

        if (filteredBlogs.length > 0) {
            fetchAvatars();
        }
    }, [filteredBlogs]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    // Calculate indices for slicing the filtered blogs array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination Handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {currentBlogs.length > 0 ? (
                currentBlogs.map((item, index) => {
                    return (
                        <div className="col-lg-6" key={index}>
                            <div className="card mb-4">
                                <p>
                                    <img className="card-img-top" src={item.imgPost} alt="Blog Image" />
                                </p>
                                <div className="card-body">
                                    <h6 className="card-title">
                                        {item.title} {getStatusIcon(item.status)}
                                    </h6>
                                    <div className="small text-muted">
                                        {formatDate(item.createAt)}
                                    </div>
                                    <div>
                                        <img
                                            src={avatars[item.username] || 'https://mandalay.com.vn/wp-content/uploads/2023/06/co-4-la-may-man-avatar-dep-18.jpg'}
                                            alt="Avatar"
                                            className="rounded-circle"
                                            style={{ width: '25px', height: '25px' }}
                                        /> - {item.username}
                                    </div>
                                    <div className="text-right">
                                        <Link className="btn btn-primary btn-sm" to={'/home/detail/' + item.id}>
                                            Đọc tiếp →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No blogs available</p>
            )}

            {/* Pagination Controls */}
            <nav aria-label="Pagination">
                <hr className="my-0" />
                <ul className="pagination justify-content-center my-4">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" onClick={goToPreviousPage}>
                            Newer
                        </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <a className="page-link" onClick={() => goToPage(index + 1)}>
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <a className="page-link" onClick={goToNextPage}>
                            Older
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
