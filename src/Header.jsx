import React from "react"
import { useContext } from "react"
import AuthContext from "./store/authContext.jsx"

const Header = () => {
    const {userId} = useContext(AuthContext)
    console.log(userId)
    return <div>Header</div>
}

export default Header
