import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const getNavClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  return (
    <header className={styles.header}>
      <div className={`max-content-wrapper ${styles.navWrapper}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚑</span>
          <span className={styles.appName}>FlagForge</span>
          <span className={styles.badge}>User</span>
        </div>

        {/* <nav className={styles.nav}>
          <NavLink to="/check-feature-flag" className={getNavClass}>
            Check Feature Flag
          </NavLink>
        </nav> */}

        <div className={styles.userArea}>
          {/* {user?.email && (
            <span className={styles.userEmail}>{user.email}</span>
          )} */}
          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
