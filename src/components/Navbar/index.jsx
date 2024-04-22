import React from "react";
import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../API/firebase";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const users = auth.currentUser

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="light" expand="lg" p-1  variant="dark" style={{ boxShadow: '10px 10px 20px' }}>
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "60px", marginRight: "auto", color: '#000', fontWeight: 'bold', fontSize: '25px' }}
      >

        <Image width={'80px'} src="./drop.png" /> DropBox

      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>
            <Nav.Link
              className="text-white d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome {user.email}
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-white"
              to="/dashboard/profile"
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="success"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="primary"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => logout()}
            >
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link
              as={Button}
              variant="primary"
              onClick={() => history.push("/login")}
              active
              style={{ marginRight: "5px" }}
              size="sm"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="success"
              onClick={() => history.push("/signup")}
              active
              size="sm"
            >
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
