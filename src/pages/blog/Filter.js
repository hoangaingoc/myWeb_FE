
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../MyContext";

export default function useFilter () {
    const {currentUser} = useContext(MyContext);

    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        username: "",
        status: "public", // Default to 'public'
        type: "",
        content: ""
    });

    const getList = async () => {
        try {
            const res = await axios.get("http://localhost:3000/posts");
            setData(res.data);
            console.log(res.data)
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        return data.filter((item) => {
            const isPublic = item.status === "public";
            const isUserBlog = currentUser && currentUser.data && item.username === currentUser.data.username;

            const matchesStatus = isUserBlog ? true : item.status === filters.status;
            const matchesUsername = filters.username ? item.username === filters.username : true;
            const matchesType = filters.type ? item.type === filters.type : true;
            const matchesContent = filters.content ? item.content.includes(filters.content) : true;

            return (isPublic || isUserBlog) &&
                matchesUsername &&
                matchesStatus &&
                matchesType &&
                matchesContent;
        });
    };



    return { filters, handleChange, applyFilters };
};


