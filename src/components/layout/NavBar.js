import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MyContext} from "../../MyContext";

export default function NavBar() {
    const {currentUser, setCurrentUser} = useContext(MyContext);

    // Load user from localStorage when the component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [setCurrentUser]);

    const handleLogout = () => {
        localStorage.clear();
        setCurrentUser(null);
        window.dispatchEvent(new Event('storage')); // Trigger storage event
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{background: "#f2eafa"}}>
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link active" to={'home'}>Trang chủ</Link></li>
                        </ul>
                    </div>

                    {!currentUser?.data ? (
                        <Link to={"/login"}>Login
                            <i className="fas fa-user-alt mr-lg-3" style={{fontSize: "16px", padding:"8px"}}></i>
                        </Link>
                    ) : (
                        <>

                            <div className={"navbar-text ml-lg-3"}>
                                <Link to={'/home/add-blog'}>Thêm bài viết</Link>
                            </div>
                            <div className={"navbar-text ml-lg-3"}>
                                <Link to={'/info'}>Thông tin cá nhân</Link>
                            </div>
                            <Link to={'/'}>
                                <button className="btn btn-outline-danger btn-sm my-2 my-sm-0 ml-lg-3"
                                        onClick={handleLogout}>Đăng xuất
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
