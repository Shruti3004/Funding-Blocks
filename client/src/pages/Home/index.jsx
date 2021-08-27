import React from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="custom-blue-bg">
        <div
          className="container py-5 text-white text-center"
          style={{ height: "95vh" }}
        >
          <h1 className="d-flex justify-content-center align-items-center h-100 display-2">
            An easy way to raise secure funds. <br />
            What if donations becomes transparent? <br />
            <br />
            <br />
            <CountUp end={10000000} duration={5} className="text-center mt-5" />
          </h1>
        </div>
      </section>
      <div className="bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center py-5 ">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4 pb-5">
            <Button title="All Disasters" className="mx-2" />
            <Link to="/createBlock">
              <Button
                title="Create Funding Block"
                type="outline"
                className="mx-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
