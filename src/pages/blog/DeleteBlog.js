import React from 'react';
import axios from 'axios';

const DeleteBlog = ({ postId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        const isConfirm = window.confirm("Are you sure you want to delete this blog?");
        if (isConfirm) {
            try {
                await axios.delete(`http://localhost:3000/posts/${postId}`);
                alert("Blog deleted successfully.");
                onDeleteSuccess(); // Call the function to handle successful deletion
            } catch (err) {
                console.error("Error deleting blog:", err);
            }
        }
    };

    return (
            <i className="fas fa-trash" style={{marginRight: '5px'}} onClick={handleDelete}></i>
    );
};

export default DeleteBlog;
