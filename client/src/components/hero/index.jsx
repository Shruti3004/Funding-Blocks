import React, { useState } from "react";
import CountUp from "react-countup";
import Button from "../button";
import Modalcentered from "../modals/Modalcentered";
import { Fade } from "react-reveal";

const HomeHero = () => {
  const [modal, setModal] = useState(false);
  const handleSubmit = () => setModal(true);

  return (
    <div>
      <Modalcentered show={modal} onHide={() => setModal(false)} />
      <div className="bg-image">
        <div className="home-text text-center py-section">
          <div className="d-flex justify-content-center align-items-center h-100 flex-column">
            <h1 className="display-2 text-secondaryColor">
              <CountUp end={10000000} duration={5} className="text-center" />
            </h1>
            <Fade bottom>
              <h1 className="text-white">An easy way to raise funds</h1>
            </Fade>
            <Fade bottom>
              <div className="text-white display-4 font-demi">
                What if donations becomes transparent?
              </div>
            </Fade>
            <Button title="Donate Now" className="mt-4 mb-5" handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="features container mb-3">
        <div className="row mt-5">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12 bg-primaryColor text-white text-center center py-5">
            <Fade bottom>
              <p className="font-demi font-22">The Primary capibilities of Funding Blocks</p>
            </Fade>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-12 font-regular bg-white py-3">
            <div className="container">
              <div className="row mt-3">
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
              </div>
              <div className="row my-4">
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center box py-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
