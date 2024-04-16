import { createContext } from "react";

const AuthContext = createContext({
    userId: null
})

export const AuthContextProvider = (props) => {

    return (
        <AuthContext.Provider value={{userId: 111}}>
            {props.children}
            {/* <App/> */}
        </AuthContext.Provider>
    )
}

export default AuthContext