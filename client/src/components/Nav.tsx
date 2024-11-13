import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import auth from "../utils/auth";

const Nav = () => {
  const currentPage = useLocation().pathname;

  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
    console.log(`NavBar: ${loginCheck}`);
  }, [loginCheck]);

  const handleLogoffSubmit = () => {
    auth.logout();
  };

  const getTitle = () => {
    if (!loginCheck) {
      return "Login";
    } else if (loginCheck && currentPage === "/") {
      return "Report";
    } else if (loginCheck && currentPage === "/ShiftHistory") {
      return "Report History";
    } else {
      return "Page Not Found";
    }
  };

  return (
    <header className="navbar navbar-expand-md navbar-dark sticky-top navbar-custom">
      <nav className="navItem">
        <Link
          to="/"
          className={currentPage === "/" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>
        <Link
          to="/ShiftHistory"
          className={
            currentPage === "/ShiftHistory"
              ? "nav-bottom nav-link active"
              : "nav-bottom nav-link"
          }
        >
          History
        </Link>
      </nav>
      <h1 className="navbar-title">{getTitle()}</h1>
      <button
        className="logoff"
        style={{ display: loginCheck ? "block" : "none" }}
        onClick={handleLogoffSubmit}
      >
        Logoff
      </button>
    </header>
  );
};

export default Nav;
