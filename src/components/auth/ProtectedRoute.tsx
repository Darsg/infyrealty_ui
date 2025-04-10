import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../service/store/store";
import { fetchUserData } from "../../service/reducer/userInfoReducer";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
