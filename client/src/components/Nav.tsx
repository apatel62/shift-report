import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const currentPage = useLocation().pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <header className="navbar navbar-expand-md navbar-dark sticky-top navbar-custom-1">
      <h1>Shift Report</h1>
      <nav >
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'active', otherwise we set it to '' or no class
          className={
            currentPage === "/"
              ? "nav-item nav-link active"
              : "nav-item nav-link"
          }
        >
          Shift Report
        </Link>
        <Link
          to="/ShiftHistory"
          // Check to see if the currentPage is `Portfolio`, and if so we use the active class. Otherwise, we set it to have no class
          className={
            currentPage === "/ShiftHistory"
              ? "nav-item nav-link active"
              : "nav-item nav-link"
          }
        >
          Shift Report History
        </Link>
        <button className="logoff"> Logoff </button>
      </nav>
    </header>
  );
};

export default Nav;
