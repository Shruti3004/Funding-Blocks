import React from "react";
import CardImage from "../../assets/images/card.jpg";
import { Link } from "react-router-dom";
import Button from "../button";
import { Dropdown } from "react-bootstrap";
import CardButton from "../cardButton";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Card = ({ type }) => {
  if (type === "fundDetails") {
    return (
      <Link to={`/blockDetails/1`}>
        <div>
          <div className={`box`}>
            <div>
              <Button
                title="Contribute Now ❤️"
                className="mt-4 w-100 bg-secondaryColor"
                type="outline"
              />
            </div>
            <div className={`card-body`}>
              <hr />
              <div className="font-22 font-bold text-primaryColor mt-4">
                ₹ 2,76,63,065 <span className="text-muted font-14 font-regular">raised of </span>{" "}
                <br />
                <span className="text-muted font-demi">₹ 5,00,00,000 </span>
                <span className="text-muted font-14 font-regular">goal</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "blockDetails") {
    return (
      <div className={`box blockDetails_card`}>
        <div className={`card-body `}>
          <img src={CardImage} alt="card-image" className="card-img-top" />
          <div className="pt-3">
            <div className="d-flex justify-content-between">
              <h4 className="card-title text-primaryColor mt-3">About</h4>
              {/* <CardButton type="share" className="px-4">
                    <i className="fas fa-share-alt"></i>&nbsp;&nbsp;&nbsp;Share Now&nbsp;&nbsp;
                  </CardButton> */}
              <EmailShareButton subject="se" body="x" />
              <WhatsappShareButton title="Share" />
            </div>
            <hr />
            <p className="card-text text-muted font-medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem
              Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industrys standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen book. It has survived
              not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only
              five centuries, but also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <CardButton className="mt-4">Donate</CardButton>
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
              <h4 className="card-title mt-4 text-primaryColor font-demi font-22">
                Schooling Special Needs Children With Custom Education
              </h4>
              <p className="card-text text-muted font-medium mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <hr />
              <div className="font-22 font-bold text-primaryColor mt-3">
                ₹ 2,76,63,065 <span className="text-muted font-14 font-regular">raised of </span>{" "}
                <br />
                <span className="text-muted font-demi">₹ 5,00,00,000 </span>
                <span className="text-muted font-14 font-regular">goal</span>
              </div>
              <div className="progress mt-3">
                <div
                  className="progress-bar bg-tertiarColor w-75"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Total Contribution
                </div>
              </div>
              <hr />
            </div>
            <div className="d-flex justify-content-center">
              <CardButton className="mt-2 mb-3 w-100">Donate</CardButton>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
