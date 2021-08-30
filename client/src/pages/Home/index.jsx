import React from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container py-5 text-white text-center" style={{ height: "94vh" }}>
          <div className="d-flex justify-content-center align-items-center h-100 flex-column">
            <h1 className="display-2">
              <CountUp end={10000000} duration={5} className="text-center" />
            </h1>
            <h1 className="text-white">An easy way to raise funds</h1>
            <div className="text-white display-4 font-demi">
              What if donations becomes transparent?
            </div>
            <Button title="Know More" className="mt-4" />
          </div>
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
            <Link to="/blocks">
              <Button title="All Disasters" className="mx-2" />
            </Link>
            <Link to="/createBlock">
              <Button title="Create Funding Block" type="outline" className="mx-2" />
            </Link>
          </div>
        </div>
      </div>
      <div className="custom-blue-bg py-section">
        <h1 className="text-white text-center px-4">Causes you can raise funds for</h1>
        <p className="text-white font-18 font-regular px-4 text-center mb-4">
          Be it for a personal need, social cause or a creative idea - you can count on us for the
          project that you want to raise funds for.
        </p>
        <div className="container px-4">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/education.jpeg" alt="education" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/cancer.jpeg" alt="cancer" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/animals.jpeg" alt="animals" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/heart.jpeg" alt="heart" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/child-health.jpeg" alt="child-health" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/accident.jpeg" alt="accident" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/brain-injury.jpeg" alt="brain-injury" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/tsunami.jpeg" alt="tsunami" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/wildlife-fire.jpeg" alt="wildlife-fire" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/covid.jpeg" alt="covid" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/education.jpeg" alt="education" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <div className="card">
                <div className="card-img-top">
                  <img src="/images/education.jpeg" alt="education" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
