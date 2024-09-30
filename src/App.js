import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Header from "./components/layout/Header";
import AddBlog from "./pages/blog/AddBlog";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";
import ListBlog from "./pages/blog/ListBlog";
import DetailBlog from "./pages/blog/DetailBlog";
import EditBlog from "./pages/blog/EditBlog";
import ForgotPassword from "./pages/user/ForgotPassword";
import Info from "./pages/user/Info";
import EditUser from "./pages/user/EditUser";

function Category() {
    return null;
}

function App() {

    return (
        <>
            <div className="container">
                <NavBar/>
                <Header/>
                <Routes>
                    <Route path={''} element={<Main/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'info'} element={<Info/>}/>
                    <Route path={'info/edit/:username'} element={<EditUser/>}/>
                    <Route path={'forgot-password'} element={<ForgotPassword/>}/>
                    <Route path={'register'} element={<Register/>}/>
                    <Route path={'home'} element={<Main/>}/>
                    <Route path={'home/add-blog'} element={<AddBlog/>}/>
                    <Route path={'home/listblog'} element={<ListBlog/>}/>
                    <Route path={'home/detail/:id'} element={<DetailBlog/>}/>
                    <Route path={'home/edit/:id'} element={<EditBlog/>}/>
                    <Route path="category/:category" element={<Category />} />
                </Routes>
                <Footer/>
            </div>
        </>
    );
}

export default App;
