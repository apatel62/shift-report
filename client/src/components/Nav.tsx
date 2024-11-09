import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;

  const getTitle = () => {
    if (currentPage === "/") {
      return "Report";
    } else if (currentPage === "/ShiftHistory") {
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
            currentPage === "/ShiftHistory" ? "nav-link active" : "nav-link"
          }
        >
          History
        </Link>
      </nav>
      <h1 className="navbar-title">{getTitle()}</h1>
      <button className="logoff">Logoff</button>
    </header>
  );
};

export default Nav;
