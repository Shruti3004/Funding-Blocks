import React, { useEffect, useState } from "react";
import { Navbar as NavCustom, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { getAccount, logOut } from "../../api/index";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const print = () => window.print();

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
            <img src={Logo} alt="Funding Blocks" className="img-fluid my-3" width="30%" />
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
                  {/* <Button variant="danger" onClick={() => logout()}>
                    Log Out
                  </Button> */}
                </>
              )}
              <div className="d-flex">
                <button className="mx-2 btn text-white" onClick={print} title="Print this page">
                  <i className="fa fa-print" aria-hidden="true"></i>
                </button>
                <div id="google_translate_element"></div>
              </div>
            </Nav>
          </NavCustom.Collapse>
        </Container>
        {/* <div className="sidebar" id="sidebar">
          <div className="sidebar-content">
            <Link to="/profile" className="px-5 d-flex mb-4 mt-3" style={{ cursor: "pointer" }}>
              <div className="ml-3">
                <div
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  className="font-vcr mt-1 font-blue"
                >
                  ABC
                </div>
                <span style={{ cursor: "pointer" }} className="font-robot mt-2 font-blue">
                  ABC
                </span>
              </div>
            </Link>
            <Link to="/">
              <div
                className={`mt-2 font-vcr px-5 sidebar-item text-uppercase py-2 ${
                  location.pathname === "/" && "sidebar-item-active"
                }`}
              >
                Home
              </div>
            </Link>
            <Link to="/events">
              <div
                className={`mt-2 font-vcr px-5 sidebar-item text-uppercase py-2 ${
                  location.pathname === "/events" && "sidebar-item-active"
                }`}
              >
                Events
              </div>
            </Link>
          </div>
        </div> */}
      </NavCustom>
    </>
  );
};

export default Navbar;
