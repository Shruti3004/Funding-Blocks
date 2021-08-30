import React from "react";
import CardImage from "../../assets/images/card.jpg";
import { Link } from "react-router-dom";
import Button from "../button";
import { Dropdown } from "react-bootstrap";
import CardButton from "../cardButton";
import { upVote, downVote } from "../../api";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Card = ({ type, block }) => {
  if (type === "fundDetails") {
    return (
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
              ₹ {block && block?.value?.final_amount}{" "}
              <span className="text-muted font-14 font-regular">raised of </span> <br />
              <span className="text-muted font-demi">
                {" "}
                ₹ {block && block?.value?.target_amount}{" "}
              </span>
              <span className="text-muted font-14 font-regular">goal</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "blockDetails") {
    return (
      <div className={`box blockDetails_card`}>
        <div className={`card-body `}>
          <img src={block?.value?.image} alt="card-image" className="card-img-top" />
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
            <p className="card-text text-muted font-medium">{block && block?.value?.description}</p>
            <CardButton className="mt-4">Donate</CardButton>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link to={`/blockDetails/${block?.key}`}>
      <div>
        <div className={`box`}>
          <div className={`card-body`}>
            <div>
              <img src={block?.value?.image} alt="card-image" className="card-img-top" />
            </div>
            <div>
              <h4 className="card-title mt-4 text-primaryColor font-demi font-22">
                {block && block?.value?.title}
              </h4>
              <p className="card-text text-muted font-medium mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="font-22 font-bold text-primaryColor mt-3">
                  ₹ {block && block?.value?.final_amount}{" "}
                  <span className="text-muted font-14 font-regular">raised of </span> <br />
                  <span className="text-muted font-demi">
                    ₹ {block && block?.value?.target_amount}{" "}
                  </span>
                  <span className="text-muted font-14 font-regular">goal</span>
                </div>
                <div className="votes text-primaryColor" style={{ marginRight: "10px" }}>
                  <i
                    onClick={() => {
                      upVote(block?.key);
                    }}
                    className="fas fa-arrow-alt-circle-up fa-2x mt-3"
                  ></i>
                  <br />
                  <i
                    onClick={() => {
                      downVote(block?.key);
                    }}
                    className="fas fa-arrow-alt-circle-down fa-2x"
                  ></i>
                </div>
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
