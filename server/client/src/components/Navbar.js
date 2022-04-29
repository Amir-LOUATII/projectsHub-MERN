import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import classes from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import UseHttp from "../hooks/useHttp.";
const NavbarComponent = () => {
  const navigate = useNavigate();
  const { isPending, success, sendRequest: logout, error } = UseHttp();
  const { user, dispatch } = useAuthContext();

  const logoutClickHandler = async () => {
    logout(
      {
        url: "/api/v1/auth/logout",
        headers: { "Content-type": "application/json" },
      },
      (data) => {
        dispatch({ type: "LOGOUT", payload: data.user });
      }
    );
  };
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);
  return (
    <Navbar
      variant="light"
      expand={"md"}
      collapseOnSelect={true}
      className={`${classes.nav} shadow-sm`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={`${classes.logo} `}>
          Projects<span className={classes.hub}>Hub</span>
        </Navbar.Brand>
        {!user && <Navbar.Toggle aria-controls="responsive-navbar-nav" />}

        <Navbar.Collapse>
          <Nav className="ms-auto text-center">
            {!user && (
              <>
                <Nav.Link as={NavLink} to="/" eventKey={4}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" eventKey={1}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" eventKey={2}>
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {user && !isPending && (
          <Button
            className={`${classes.btn} btn-sm mx-auto d-block `}
            disabled={isPending}
            onClick={logoutClickHandler}
          >
            Log out
          </Button>
        )}
        {user && isPending && (
          <Button className={`${classes.btn} btn-sm mx-auto d-block `}>
            Loading...
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
