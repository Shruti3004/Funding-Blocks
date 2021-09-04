import React from "react";
import load from "../../assets/images/loader.gif";

const Loader = () => {
  return (
    <div className="text-center container">
      <img src={load} alt="loader" className="img-fluid" />
    </div>
  );
};

export default Loader;
