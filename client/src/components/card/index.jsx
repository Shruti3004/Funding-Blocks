import React from "react";
import CardImage from "../../assets/images/card.jpg";

const Card = ({type}) => {
  return (
    <div className={`box ${type === "blockDetails" ? "blockDetails_card" : ""}`} >
      <div className={`card-body`}>
        <img src={CardImage} alt="card-image" className="card-img-top" />
        <div>
        <h4 className="card-title mt-4 text-primaryColor">Card title</h4>
        <p className="card-text text-muted font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
