import React, { useState } from "react";
import styles from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={styles.headerContainer}>
        <div className={styles.container}>
          <h1>
            ERS<span className={styles.dot}>.</span>
          </h1>

          <nav className={styles.navLinks}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
              to={"/"}
            >
              Home
            </NavLink>
            {isAdmin ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.inactiveLink
                  }
                  to={"/add"}
                >
                  Add Employee
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.inactiveLink
                  }
                  to={"/reviews"}
                >
                  Reviews
                </NavLink>
              </>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.inactiveLink
                }
                to={"/feedbacks"}
              >
                Feedback
              </NavLink>
            )}
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink
              }
              to={"/profile"}
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
