import React from "react";
import CardImage from "../../assets/images/card.jpg";
import { Link } from "react-router-dom";
import Button from "../button";

const Card = ({ type }) => {
  if (type === "blockDetails") {
    return (
      <div className={`box blockDetails_card`}>
        <div
          className={`card-body d-flex align-items-stretch justify-content-between`}
        >
          <img src={CardImage} alt="card-image" />
          <div className="px-xl-4 pt-3 pt-xl-0">
            <h4 className="card-title text-primaryColor">Tsunami</h4>
            <p className="card-text text-muted font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <Button title="Donate" className="mt-4" />
            {/* <div className="card-actions w-30 d-flex justify-content-around ">
              <span>
                <i className="fas fa-arrow-up"></i>
              </span>
              <span>
                <i className="fas fa-arrow-down"></i>
              </span>

            </div> */}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link to={`/blockDetails/1`}>
      <div>
        <div className={`box`}>
          <div className={`card-body`}>
            <img src={CardImage} alt="card-image" className="card-img-top" />
            <div>
              <h4 className="card-title mt-4 text-primaryColor">Card title</h4>
              <p className="card-text text-muted font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="d-flex justify-content-center">
            <Button title="Donate" className="mt-4" type="outline"/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
