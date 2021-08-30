import React from "react";
// import Button from "../button";
import Logo from "../../assets/images/logo.svg";

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
            <img src={Logo} alt="logo" width="20%" className="mb-4" />
            <div className="flex-container container justify-content-center pt-4 pb-5 font-medium">
              <div className="px-4">Name</div>
              <div className="px-4">Address</div>
              <div className="px-4">Edit Profile</div>
              <div className="px-4">Current Balance</div>
              <div className="px-4">Register</div>
              <div className="px-4">Login</div>
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
