import React from "react";
import Card from "../../components/card";

const Home = () => {
  return (
    <div className="bg-light">
      <div className="container">
        <div className="row d-flex justify-content-center py-5 ">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
