import React from "react";
import error from "../../assets/images/error.svg";

const Default = () => {
  return (
    <div className="text-center container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
          <img src={error} alt="page not found" className="img-fluid my-5" />
        </div>
      </div>
    </div>
  );
};

export default Default;
