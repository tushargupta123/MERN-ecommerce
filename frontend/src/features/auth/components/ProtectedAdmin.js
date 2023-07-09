import {  useSelector } from "react-redux/es/hooks/useSelector"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);
    
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    if(!user && userInfo.role !== "admin"){
        return <Navigate to="/"></Navigate>
    }
  return children;
}

export default ProtectedAdmin