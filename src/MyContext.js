import {createContext, useState} from "react";

export const MyContext = createContext()
const MyContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({username: '', password: '', image: ''})

    return(
        <MyContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider