import React from "react";
import { Navbar as NavCustom, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png"

const Navbar = () => {
  return (
    <>
      <NavCustom collapseOnSelect variant="dark" expand="lg" className="bg-primaryColor">
        <Container>
          <NavCustom.Brand as={Link} to="/" className="text-white font-bold">
            <img src={Logo} alt="Funding Blocks" className="img-fluid" width="30%"/>
          </NavCustom.Brand>
          <NavCustom.Toggle aria-controls="responsive-navbar-nav" />
          <NavCustom.Collapse id="responsive-navbar-nav" className="text-white">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to="/about" className="text-white font-demi px-4">
                About
              </Nav.Link>
              <Nav.Link
                target="_blank"
                href="https://docs.google.com/presentation/d/1gfT7ly5WP2uYMpUgfPnc9wF2VfY-Yz1DNhWUIAQM4Og/edit#slide=id.gcb9a0b074_1_0"
                className="text-white font-demi px-4"
              >
                Presentation
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="text-white font-demi px-4">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/editProfile" className="text-white font-demi px-4">
                Edit Profile
              </Nav.Link>
            </Nav>
          </NavCustom.Collapse>
        </Container>
      </NavCustom>
    </>
  );
};

export default Navbar;
