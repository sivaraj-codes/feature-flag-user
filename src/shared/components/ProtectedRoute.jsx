import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "./FullPageSpinner";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <FullPageSpinner />;

  if (!user) return <Navigate to="/auth" replace />;

  if (allowedRole && user.roleId !== allowedRole) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
