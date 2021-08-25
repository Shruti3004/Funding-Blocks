import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-tertiaryColor text-white text-center py-4 font-18">
        <span className="font-bold font-22">Funding Blocks</span> is offering an
        opportunity for community members and investors to help.
      </div>
      <div className="footer-bg bg-primaryColor py-5 text-white">
        <div className="flex-container container pt-4 pb-5 font-medium">
          <div className="px-4">Name</div>
          <div className="px-4">Address</div>
          <div className="px-4">Edit Profile</div>
          <div className="px-4">Current Balance</div>
          <div className="px-4">Register</div>
          <div className="px-4">Login</div>
        </div>
        <hr />
        <div className="text-center pt-3">
          {new Date().getFullYear()} &copy; Team Funding Blocks
        </div>
      </div>
    </>
  );
};

export default Footer;
