import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import { USER_ROLES } from "./shared/constants";
import { Layout } from "./layout/Layout";
import { CheckFeatureFlag } from "./pages/feature-flags/CheckFeatureFlag";
import { AuthPage } from "./pages/auth/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />

      <Route path="/auth" element={<AuthPage />} />

      <Route
        element={
          <ProtectedRoute allowedRole={USER_ROLES.EU}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/check-feature-flag" element={<CheckFeatureFlag />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
