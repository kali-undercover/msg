import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          quatsch-app
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacts/" aria-current="page">
                Contacts
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/chats" aria-current="page">
                Chats
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="profile"
              >
                Profile
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    onClick={async (e) => {
                      e.preventDefault();
                      var url = new URL(document.location);
                      url.hash = `/contacts/add/${user}`;
                      try {
                        await navigator.share({
                          title: "me on mw-chatt-v2",
                          url,
                        });
                      } catch (err) {}
                    }}
                    className="dropdown-item"
                    to={`/contacts/add/${user}`}
                  >
                    Share Your User
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"profile/you"}>
                    You
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"profile/login"}>
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="profile/logout">
                    Log out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
