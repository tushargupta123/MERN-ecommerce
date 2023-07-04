import {  useSelector } from "react-redux/es/hooks/useSelector"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    if(!user && user.role !== "admin"){
        return <Navigate to="/"></Navigate>
    }
  return children;
}

export default ProtectedAdmin