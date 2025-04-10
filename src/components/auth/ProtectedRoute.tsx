import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../service/store/store";
import { fetchUserData } from "../../service/reducer/UserInfoReducer";
import { fetchUserPermission } from "../../service/reducer/UserPermissionReducer";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  // Access only permission data
  const userPermission = useSelector((state: RootState) => state.userPermission.data);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
      dispatch(fetchUserPermission());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (userPermission?.modules) {
      console.log("🎯 Role Permission JSON:", userPermission);
    }
  }, [userPermission]);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
