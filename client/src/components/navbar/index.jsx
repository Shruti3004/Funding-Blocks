import React, { useEffect, useState } from "react";
import { Navbar as NavCustom, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { getAccount, logOut } from "../../api/index";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getAccount());
  }, []);

  const logout = async () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <NavCustom collapseOnSelect variant="dark" expand="lg" className="bg-primaryColor py-0">
        <Container>
          <NavCustom.Brand as={Link} to="/" className="text-white font-bold py-0">
            <img src={Logo} alt="Funding Blocks" className="img-fluid" width="40%" />
          </NavCustom.Brand>
          <NavCustom.Toggle aria-controls="responsive-navbar-nav" />
          <NavCustom.Collapse id="responsive-navbar-nav" className="text-white">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to="/" className="text-white font-demi px-4">
                Home
              </Nav.Link>
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
              {!isLoggedIn ? (
                <Nav.Link as={Link} to="/signup" className="text-white font-demi px-4">
                  Register
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/editProfile" className="text-white font-demi px-4">
                    Edit Profile
                  </Nav.Link>
                  <Button variant="danger" onClick={() => logout()}>
                    Log Out
                  </Button>
                </>
              )}
            </Nav>
          </NavCustom.Collapse>
        </Container>
      </NavCustom>
    </>
  );
};

export default Navbar;
