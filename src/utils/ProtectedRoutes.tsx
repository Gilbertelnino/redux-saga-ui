import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/slices/user/userSlice";

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const { user } = useAppSelector(userSelector);
  const localStorageUser = localStorage.getItem("user");
  if (user !== null || localStorageUser) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
