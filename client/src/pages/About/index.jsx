import React from "react";
import CardImage from "../../assets/images/card.jpg";

const About = () => {
  return (
    <>
      <section className="bg-light">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-stretch py-5">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <h2>About US</h2>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                expedita enim minus accusamus in ratione nam explicabo
                praesentium corporis deserunt, ipsa aspernatur officia nemo
                adipisci natus numquam, dolores illo aut?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="custom-blue-bg">
        <div className="container py-5 text-white">
          <div className="row d-flex justify-content-center align-items-stretch my-3 py-2">
            <div className="col-lg-7 col-md-7 col-sm-7 col-11">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              harum maxime nobis itaque voluptas inventore culpa voluptates.
              Tempora eaque nesciunt reiciendis dignissimos eius nam officia eos
              architecto autem! Voluptas optio, veniam at ea ab quibusdam
              consequatur. Sequi, error facere nobis pariatur perferendis
              maiores, itaque in, voluptates quam debitis enim delectus?
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-11">
              <img src={CardImage} alt="about-illustration" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-stretch py-2">
            <div className="col-lg-4 col-md-4 col-sm-4 col-11">
              <img src={CardImage} alt="about-illustration" />
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 col-11">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              harum maxime nobis itaque voluptas inventore culpa voluptates.
              Tempora eaque nesciunt reiciendis dignissimos eius nam officia eos
              architecto autem! Voluptas optio, veniam at ea ab quibusdam
              consequatur. Sequi, error facere nobis pariatur perferendis
              maiores, itaque in, voluptates quam debitis enim delectus?
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
