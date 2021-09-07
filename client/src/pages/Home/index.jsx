import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import { Link } from "react-router-dom";
import HomeHero from "../../components/hero";
import { getFeaturedBlocks } from "../../api";
import { Fade } from "react-reveal";

const Home = () => {
  const [blocks, setBlocks] = React.useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    getFeaturedBlocks().then((res) => {
      setBlocks(res);
    });
  }, []);

  return (
    <>
      <HomeHero />
      <div className="bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center py-5 ">
            {blocks.map((block) => (
              <div key={block.id} className="col-lg-4 col-md-6 col-sm-12 col-12 mt-3">
                <Card block={block} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4 pb-5">
            <Link to="/blocks">
              <Button title="All Blocks" className="mx-2" />
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
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/accident.jpg" alt="accident" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Accident
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/covid.png" alt="covid" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Pandemic
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/cyclone.jpg" alt="cyclone" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Cyclone
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/earthquake.jpg" alt="earthquake" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Earthquake
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/epidemic.jpg" alt="epidemic" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Epidemic
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/flood.jpg" alt="flood" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Flood
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/landslide.jpg" alt="landslide" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Landslide
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/wildfire.jpg" alt="wildfire" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Wildfire
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/tornado.jpg" alt="tornado" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Tornado
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-6 mt-4">
              <Fade bottom>
                <div className="card">
                  <div className="card-img-top">
                    <img src="/images/tsunami.jpg" alt="tsunami" className="img-fluid" />
                  </div>
                  <div className="card-content">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Tsunami
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-section">
        <div className="container">
          <h1 className="text-primaryColor text-center mb-4">Future Enchancements</h1>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 text-center text-white mt-3">
              <Fade bottom>
                <div className="bg-primaryColor py-5 h-100">
                  <h3>Personal Fundraising</h3>
                  <p className="font-medium font-18">Anyone will be able to raise funds.</p>
                </div>
              </Fade>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 text-center text-white mt-3">
              <Fade bottom>
                <div className="bg-secondaryColor py-5 h-100">
                  <h3>Startup Funding</h3>
                  <p className="font-medium font-18">
                    Startups can also create their Funding Blocks.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 text-center text-white mt-3">
              <Fade bottom>
                <div className="bg-tertiaryColor py-5 h-100">
                  <h3>Refugee Relief</h3>
                  <p className="font-medium font-18">
                    The total relief funds will be distributed to each wallet separately.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
