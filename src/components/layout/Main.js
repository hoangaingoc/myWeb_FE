import React from "react";
import ListBlog from "../../pages/blog/ListBlog";
import FeaturedBlog from "../../pages/blog/FeaturedBlog";
import Sidebar from "./Sidebar";

export default function Main() {


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <FeaturedBlog/>
                        <div class="row">
                            <ListBlog/>
                        </div>
                    </div>
                    <Sidebar/>
                </div>
            </div>
        </>
    )
}
