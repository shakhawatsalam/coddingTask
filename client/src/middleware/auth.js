import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";



export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem("token");


    if (!token) {
        return <Navigate to={"/"} replase={true}></Navigate>
    }

    return children;
};


//Protecting Password Route

export const ProtectRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;

    if (!username) {
        return <Navigate to={'/'} replace={true}></Navigate>
    };

    return children;
};

