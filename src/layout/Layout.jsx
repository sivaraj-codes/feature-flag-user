import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";

export const Layout = () => (
  <>
    <Header />
    <main className="page-content-wrapper">
      <Outlet />
    </main>
  </>
);
