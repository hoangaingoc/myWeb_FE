import React, {useContext, useEffect, useState} from 'react';
import useFilter from "../blog/Filter";
import axios from "axios";
import {MyContext} from "../../MyContext";


const Category = ({allPosts}) => {
    const [posts, setPosts] = useState([]);
    const {currentUser} = useContext(MyContext);



    return (
        <></>
    );
};

export default Category;
