import React from "react";
import {
  Navbar as NavCustom,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <NavCustom
        collapseOnSelect
        variant="dark"
        expand="lg"
        className="bg-primaryColor"
      >
        <Container>
          <NavCustom.Brand href="#home" className="text-white font-bold">
            Funding Blocks
          </NavCustom.Brand>
          <NavCustom.Toggle aria-controls="responsive-navbar-nav" />
          <NavCustom.Collapse id="responsive-navbar-nav" className="text-white">
            <Nav className="me-auto"></Nav>
            <Nav>
            <Nav.Link
                as={Link}
                to="/about"
                className="text-white font-demi px-4"
              >
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                className="text-white font-demi px-4"
              >
                Register
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className="text-white font-demi px-4"
              >
                Login
              </Nav.Link>
            </Nav>
          </NavCustom.Collapse>
        </Container>
      </NavCustom>
    </>
  );
};

export default Navbar;
