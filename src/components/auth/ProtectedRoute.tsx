import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../service/store/store";
import { fetchUserData } from "../../service/reducer/UserInfoReducer";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      console.log("Fetching user data...");
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
