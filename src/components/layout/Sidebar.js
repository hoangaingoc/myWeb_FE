import React from 'react';
import {Link} from 'react-router-dom';
import useFilter from "../../pages/blog/Filter";


const Sidebar = () => {
    const {filters, handleChange, applyFilters} = useFilter(); // Destructure the filter hook

    // Apply the filters when rendering the posts
    let filteredData = applyFilters();

    // If no filters are applied, show "featured" posts by default
    const isFilterApplied = filters.username || filters.content || filters.type;
    if (!isFilterApplied) {
        filteredData = filteredData.filter(post => post.type === 'featured'); // Show featured posts by default
    }

    const handleFilterClick = (filterType, value) => {
        handleChange({target: {name: filterType, value}});
    };

    const listTitle = (!isFilterApplied || filters.type === 'featured') ? "Tin mới" : "Danh sách bài viết";

    return (
        <div className="col-lg-4">
            <div className="card mb-4">
                <div className="card-header">Tìm kiếm theo</div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-3 col-form-label">Tác giả:</label>
                            <div className="col-sm-7">
                                <input
                                    className="form-control mb-2 mr-sm-2"
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={filters.username}
                                    onChange={handleChange}
                                    placeholder="Tìm theo username"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="content" className="col-sm-3 col-form-label">Nội dung:</label>
                            <div className="col-sm-7">
                                <input
                                    className="form-control mb-2 mr-sm-2"
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={filters.content}
                                    onChange={handleChange}
                                    placeholder="Tìm theo nội dung"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">Thể loại</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <ul className="list-unstyled mb-0">
                                <li className="nav-item" style={{cursor: "pointer", color: "blue"}}
                                    onClick={() => handleFilterClick("type", "featured")}
                                    onMouseOver={(e) => e.target.style.color = "blue"}
                                    onMouseOut={(e) => e.target.style.color = "black"}>Tin mới
                                </li>
                                <li className="nav-item" style={{cursor: "pointer", color: "blue"}}
                                    onClick={() => handleFilterClick("type", "technology")}
                                    onMouseOver={(e) => e.target.style.color = "blue"}
                                    onMouseOut={(e) => e.target.style.color = "black"}>Technology
                                </li>
                                <li className="nav-item" style={{cursor: "pointer", color: "blue"}}
                                    onClick={() => handleFilterClick("type", "personal")}
                                    onMouseOver={(e) => e.target.style.color = "blue"}
                                    onMouseOut={(e) => e.target.style.color = "black"}>Personal
                                </li>
                            </ul>
                        </div>
                    </div>
<br/>
                    {/* Display filtered data */}
                    <div className="filtered-results">
                        <h5>{listTitle}</h5>
                        <ul>
                            {filteredData.map((post) => (
                                <li key={post.id}>
                                    <Link to={`/home/detail/${post.id}`}>{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;
