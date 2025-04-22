

import { Link } from "react-router-dom";

const Header =()=>{
    const user="admin"
    let active=""
    if((window.location.href).includes('inbox')){
      active="inbox"
    }
    if((window.location.href).includes('home')){
      active="home"
    }
    if((window.location.href).includes('profile')){
      active="profile"
    }
    if((window.location.href).includes('discord')){
      active="discord"
    }
    
    return(
      <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark py-3 ">
    <div className="container">
    <Link to="/" className="navbar-brand logo">
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
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pt-3">
        <li className="nav-item">
          <Link to="/home"
          //className="text-decoration-none text-white px-3 mx-4 nav-link text-center nav-link"
          className={(active==="home") ? 'btn-info btn active px-3 mx-4 nav-link text-center nav-link':'px-3 mx-4 nav-link text-center nav-link'}
          >
            <h5>HOME</h5>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inbox"
          //className="text-decoration-none text-white px-3 mx-4 nav-link text-center nav-link"
           className={(active==="inbox") ? 'active px-3 mx-4 nav-link text-center btn-info btn':'px-3 mx-4 nav-link text-center nav-link'}
            >
            <h5>INBOX</h5>
          </Link>
        </li>
        <li className="nav-item">
        <Link to="/discord"
        //className="text-decoration-none text-white px-3 mx-4 nav-link text-center nav-link"
        className={(active==="discord") ? 'active px-3 mx-4 nav-link text-center btn-info btn':'px-3 mx-4 nav-link text-center nav-link'}
          >
           <h5>DISCORD</h5> 
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile" 
          //className="text-decoration-none text-white px-3 mx-4 nav-link text-center btn-info btn"
          className={(active==="profile") ? 'active px-3 mx-4 nav-link text-center btn btn-info':'px-3 mx-4 nav-link text-center nav-link'}
          >
           <h5>PROFILE</h5> 
          </Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

</div>
    )
}

export default Header;