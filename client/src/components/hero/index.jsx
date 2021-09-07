import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Button from "../button";
import Modalcentered from "../modals/Modalcentered";
import { Fade } from "react-reveal";
import { getBalance } from "../../api";

const HomeHero = () => {
  const [modal, setModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleSubmit = () => setModal(true);

  useEffect(() => {
    getBalance().then((value) => setBalance(value / 1000000));
  }, []);

  return (
    <div>
      <Modalcentered show={modal} onHide={() => setModal(false)} />
      <div className="bg-image">
        <div className="home-text text-center py-section">
          <div className="d-flex justify-content-center align-items-center h-100 flex-column">
            <h1 className="display-2 text-secondaryColor">
              <CountUp end={balance} duration={2} decimals={6} className="text-center" /> ꜩ
            </h1>
            <Fade bottom>
              <h1 className="text-white">An easy way to raise funds</h1>
            </Fade>
            <Fade bottom>
              <div className="text-white display-4 font-demi">
                What if donations becomes transparent?
              </div>
            </Fade>
            <Button
              title="Contribute Now ❤️"
              className="mt-4 mb-5 px-3"
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="bg-light"></div>
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
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/donors.png"
                          alt="earthquake"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Donors can raise fund before a calamity.
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/certificate.png"
                          alt="NFT"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Get Certificate for donation as NFT
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/funding.png"
                          alt="funding"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Funds cannot be stolen
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/profit.png"
                          alt="fund-withdrawn"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Cannot be withdrawn without any need
                      </p>
                    </div>
                  </Fade>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/total-amount.png"
                          alt="total-amount"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Total amount collected is always transparent
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/vote.png"
                          alt="flood"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Donors vote for the amount to be withdrawn
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/gross.png"
                          alt="gross"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Amount withdrawn is fully transparent
                      </p>
                    </div>
                  </Fade>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 text-center py-2">
                  <Fade bottom>
                    <div className="box h-100">
                      <div>
                        <img
                          src="/images/hourglass.png"
                          alt="hourglass"
                          className="img-fluid px-lg-5 px-3"
                        />
                      </div>
                      <p className="font-medium text-primaryColor text-center mt-2">
                        Total time can be just a couple of minutes
                      </p>
                    </div>
                  </Fade>
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
