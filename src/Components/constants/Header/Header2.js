
import { Link } from "react-router-dom";

const Header2 =()=>{
    return(
        <div className="container-fluide header bg-dark">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <h3 className="fw-bolder">DHE Pune</h3>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ">
            <div className="btn-group  mb-1 pt-2">
              <button
                type="button"
                className="btn btn-info text-white dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </button>
              <ul className="dropdown-menu">
              <Link className="dropdown-item" to="/login">
                <li>
                    Student
                </li>
                </Link>
                <Link className="dropdown-item" to="/clogin">
                <li>
                    College
                </li>
                </Link>
                <Link className="dropdown-item" to="/adminlogin">
                <li>
                    Admin
                </li>
                </Link>
              </ul>
            </div>
              <Link to="/Registration" className="nav-link text-center">
              <li className='nav-item mb-1 btn btn-info text-white'>
                  Registeration
              </li>
              </Link>
              </ul>
          </div>  
          </div>
          </nav>
        </div>
      </div>
    )
}

export default Header2;