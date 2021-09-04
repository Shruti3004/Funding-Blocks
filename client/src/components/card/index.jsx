import React from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import CardButton from "../cardButton";
import { upVote, downVote, donate } from "../../api";
import { ProgressBar } from "react-bootstrap";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { Fade } from "react-reveal";
import { Button as BootstrapButton } from "react-bootstrap";

const Card = ({ type, block, setModal }) => {
  let percent = block ? (block.value.target_amount / block.value.final_amount) * 100 : 0;
  percent = percent.toString().substr(0, 2);
  percent = parseInt(percent);
  console.log("k", typeof percent);
  if (type === "fundDetails") {
    return (
      <div>
        <div className={`box`}>
          <div>
            <Button
              title="Contribute Now ❤️"
              className="mt-4 w-100 bg-secondaryColor"
              type="outline"
              handleSubmit
            />
          </div>
          <div className={`card-body`}>
            <hr />
            <div className="font-22 font-bold text-primaryColor mt-4">
              ꜩ {block && block?.value?.final_amount}
              <span className="text-muted font-14 font-regular"> decided of </span> <br />
              <span className="text-muted font-demi">ꜩ {block && block?.value?.target_amount}</span>
              <span className="text-muted font-14 font-regular">goal</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "blockDetails") {
    console.log(setModal);
    return (
      <Fade bottom>
        <div className={`box blockDetails_card`}>
          <div className={`card-body `}>
            <img src={block?.value?.image} alt="card-image" className="card-img-top" />
            <div className="pt-3">
              <div className="d-flex justify-content-between">
                <h4 className="card-title text-primaryColor mt-3">About</h4>
                <EmailShareButton subject="se" body="x" />
                <WhatsappShareButton title="Share" />
              </div>
              <hr />
              <p className="card-text text-muted font-medium">
                {block && block?.value?.description}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <CardButton setModal={setModal} className="mt-4">
                  Vote
                </CardButton>
                <CardButton typeB="report" setModal={setModal} className="mt-4">
                  Report
                </CardButton>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
  return (
    <Fade bottom>
      <div className="box card-hover">
        <div className={`card-body`}>
          <div>
            <Link to={`/blockDetails/${block?.key}`}>
              <img
                src={block?.value?.image}
                alt="card-image"
                height="160px"
                style={{ objectFit: "cover" }}
                className="card-img-top"
              />
            </Link>
          </div>
          <div>
            <Link to={`/blockDetails/${block?.key}`}>
              <h4 className="card-title mt-4 text-primaryColor font-demi font-22">
                {block && block?.value?.title}
              </h4>
              <p className="card-text text-muted font-medium mt-3">
                {block && block?.value?.description}
              </p>
            </Link>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="font-22 font-bold text-primaryColor mt-3">
                ꜩ {block && block?.value?.final_amount}
                <span className="text-muted font-14 font-regular"> decided of </span> <br />
                <span className="text-muted font-demi">
                  ꜩ {block && block?.value?.target_amount}
                </span>
                <span className="text-muted font-14 font-regular">needed</span>
              </div>
            </div>
            <div className="progress mt-3">
              <ProgressBar
                animated
                style={{ width: "100%" }}
                now={!isNaN(percent) ? percent : 0}
                label={`${!isNaN(percent) ? `${percent}%` : "0%"}`}
              />
            </div>
            <hr />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <i onClick={() => upVote(block?.key)} className="far fa-heart"></i>
            <Link to={`/blockDetails/${block?.key}`}>
              <Button title="Details" />
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Card;
