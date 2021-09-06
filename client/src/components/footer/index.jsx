import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-footer.svg";

const Footer = () => {
  return (
    <>
      <div className="bg-tertiaryColor text-white text-center py-4 font-18">
        <span className="font-bold font-22">Funding Blocks</span> is offering an opportunity for
        community members and investors to help.
      </div>
      <div className="footer-bg bg-primaryColor py-5 text-white">
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={Logo} alt="logo" max-width="20%" className="mb-4" />
            <div className="flex-container container justify-content-center pt-4 pb-5 font-medium text-center">
              <Link to="/">
                <div className="px-4 py-1 text-white">Home</div>
              </Link>
              <Link to="/about">
                <div className="px-4 py-1 text-white">About</div>
              </Link>
              <Link to="/editProfile">
                <div className="px-4 py-1 text-white">My Profile</div>
              </Link>
              <Link to="/createBlock">
                <div className="px-4 py-1 text-white">Create Block</div>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center pt-4">
          Copyright &copy; {new Date().getFullYear()} Funding Blocks
        </div>
      </div>
    </>
  );
};

export default Footer;
