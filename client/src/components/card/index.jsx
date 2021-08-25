import React from "react";
import CardImage from "../../assets/images/card.jpg";

const Card = () => {
  return (
    <div className="box">
      <div className="card-body">
        <img src={CardImage} alt="card-image" className="card-img-top" />
        <h4 className="card-title mt-4">Card title</h4>
        <p className="card-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
};

export default Card;
