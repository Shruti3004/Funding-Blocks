import React, { useEffect, useState } from "react";
import { Navbar as NavCustom, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { getAccount, logIn, getUser } from "../../api/index";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    () =>
      getAccount().then((res) =>
        getUser(res.address).then((user) => {
          if (user) setIsLoggedIn(res.result);
        })
      ),
    []
  );

  return (
    <>
      <NavCustom
        expand="xl"
        className="bg-primaryColor py-2 px-5"
        sticky="top"
        collapseOnSelect={true}
        variant="dark"
      >
        <NavCustom.Brand href="/" className="mx-0">
          <img src={Logo} alt="Funding Blocks" className="img-fluid py-0 my-0" width={150} />
        </NavCustom.Brand>
        <NavCustom.Toggle aria-controls="basic-navbar-nav" />
        <NavCustom.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "auto", textAlign: "center" }}>
            <Nav.Link as={Link} to="/" className="text-white font-demi px-4">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white font-demi px-4">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/createBlock" className="text-white font-demi px-4">
              Create Blocks
            </Nav.Link>
            <Nav.Link as={Link} to="/blocks" className="text-white font-demi px-4">
              All Blocks
            </Nav.Link>
            {!isLoggedIn ? (
              <span className="mr-2">
                <Button onClick={() => logIn().then(() => (window.location.href = "/signup"))}>
                  Sign In
                </Button>
              </span>
            ) : (
              <Nav.Link as={Link} to="/editProfile" className="text-white font-demi px-4">
                My Profile
              </Nav.Link>
            )}
            <div id="google_translate_element"></div>
          </Nav>
        </NavCustom.Collapse>
      </NavCustom>
    </>
    // <>
    //   <NavCustom
    //     variant="dark"
    //     expand="xl"
    //     className="bg-primaryColor py-0"
    //     collapseOnSelect={true}
    //   >
    //     <div className="px-5 w-100 d-flex">
    //       <NavCustom.Brand as={Link} to="/">
    //         <img src={Logo} alt="Funding Blocks" className="img-fluid my-2" width="35%" />
    //       </NavCustom.Brand>
    //       <NavCustom.Toggle aria-controls="responsive-navbar-nav" />
    //       <div>
    //         <NavCustom.Collapse id="responsive-navbar-nav" className="text-white text-center">
    //           <Nav style={{ marginLeft: "auto" }}>
    //             <Nav.Link as={Link} to="/" className="text-white font-demi px-4">
    //               Home
    //             </Nav.Link>
    //             <Nav.Link as={Link} to="/about" className="text-white font-demi px-4">
    //               About
    //             </Nav.Link>
    //             <Nav.Link as={Link} to="/createBlock" className="text-white font-demi px-4">
    //               Create Blocks
    //             </Nav.Link>
    //             <Nav.Link as={Link} to="/blocks" className="text-white font-demi px-4">
    //               All Blocks
    //             </Nav.Link>
    //             {/* {!isLoggedIn ? (
    //               <span className="mr-2">
    //                 <Button onClick={() => logIn().then(() => (window.location.href = "/signup"))}>
    //                   Sign In
    //                 </Button>
    //               </span>
    //             ) : (
    //               <Nav.Link as={Link} to="/editProfile" className="text-white font-demi px-4">
    //                 My Profile
    //               </Nav.Link>
    //             )}
    //             <div id="google_translate_element"></div> */}
    //           </Nav>
    //         </NavCustom.Collapse>
    //       </div>
    //     </div>
    //   </NavCustom>
    // </>
  );
};

export default Navbar;
