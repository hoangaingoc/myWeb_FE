
import {Outlet} from "react-router-dom";
import React from "react";
import NavBar from "../../components/layout/NavBar";

export default function Home() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
