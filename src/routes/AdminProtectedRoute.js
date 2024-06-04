import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ShowNotification } from "../redux/actions";
import { getUserInfo } from "../redux/slices/auth";

export const AdminProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(userInfo);
  if (!userInfo) {
   
    // dispatch(
    //   ShowNotification({ severity: "error", message: "Please Login First" })
    // );
    // user is not authenticated
    return <Navigate to="/auth/signin" />;
  } else if (userInfo) {
    return children;
  }
};
