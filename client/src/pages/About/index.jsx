import React, { useEffect } from "react";
import CardImage from "../../assets/images/card.jpg";
import workflow from "../../assets/images/how-it-works.webm";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <section className="bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-stretch py-5">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 text-center">
              <h1> About US </h1>
              <p className="text-center font-medium">
                Funding Blocks is the first of its kind decentralized donation app. It eliminates
                the majority of obstacles and risk factors that we face while Donating relief funds.
                It ensures transparency in a trustless environment, enabling rapid action to any
                disaster in the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="custom-blue-bg">
        <div className="container py-5 text-white">
          <div className="row d-flex justify-content-center align-items-stretch my-3 py-2">
            <div className="col-lg-7 col-md-7 col-sm-7 col-11">
              <h2 className="font-demi">Where’s the Problem?</h2>
              <p className="font-regular mt-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </p>
              <ul className="font-14 mt-5">
                <li>People donate less.</li>
                <li>No trust on the organisations.</li>
                <li>They don’t get anything in return.</li>
                <br />
                <li>Sometimes It takes weeks to raise the minimum amount needed.</li>
                <li>Average person gets aware in around 24 hours.</li>
                <li>Spreading awareness consumes majority of time.</li>
                <br />
                <li>What if they raised 100k but only used 80k?.</li>

                <li>No one knows.</li>

                <li>But the donors have a right to know.</li>
                <br />
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-11">
              <img src={CardImage} alt="about-illustration" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-section">
        <div className="container d-flex justify-content-center flex-column">
          <h1 className="mb-2 text-center text-primaryColor">How we tackle the scenario</h1>
          <video autoPlay loop>
            <source src={workflow} type="video/webm" />
          </video>
        </div>
      </section>
    </>
  );
};

export default About;
