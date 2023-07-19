import { Navigate } from "react-router-dom";

const Protected = (props) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login"></Navigate>;
  }else{
    return <>{props.children}</>;
  }
};

export default Protected;
