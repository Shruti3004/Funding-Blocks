import React from "react";
import Button from "../../components/button";
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
        <div className="d-flex justify-content-center mt-4 pb-5">
          <Button title="All Disasters" className="mr-4" />
          <Button title="Create Disaster" type="outline" className="mx-4" />
        </div>
      </div>
    </div>
  );
};

export default Home;
