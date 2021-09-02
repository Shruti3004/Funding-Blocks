import React from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import CardButton from "../cardButton";
import { upVote, downVote } from "../../api";
import { ProgressBar } from "react-bootstrap";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Fade } from "react-reveal";

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
            />
          </div>
          <div className={`card-body`}>
            <hr />
            <div className="font-22 font-bold text-primaryColor mt-4">
              {block && block?.value?.final_amount} ꜩ{" "}
              <span className="text-muted font-14 font-regular">raised of </span> <br />
              <span className="text-muted font-demi">
                {" "}
                {block && block?.value?.target_amount} ꜩ{" "}
              </span>
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
                {/* <CardButton type="share" className="px-4">
                    <i className="fas fa-share-alt"></i>&nbsp;&nbsp;&nbsp;Share Now&nbsp;&nbsp;
                  </CardButton> */}
                <EmailShareButton subject="se" body="x" />
                <WhatsappShareButton title="Share" />
              </div>
              <hr />
              <p className="card-text text-muted font-medium">
                {block && block?.value?.description}
              </p>

              <CardButton setModal={setModal} className="mt-4">
                Donate
              </CardButton>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
  return (
    <Fade bottom>
      <div className={`box`}>
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
            <h4 className="card-title mt-4 text-primaryColor font-demi font-22">
              {block && block?.value?.title}
            </h4>
            <p className="card-text text-muted font-medium mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="font-22 font-bold text-primaryColor mt-3">
                {block && block?.value?.final_amount} ꜩ{" "}
                <span className="text-muted font-14 font-regular">raised of </span> <br />
                <span className="text-muted font-demi">
                  {block && block?.value?.target_amount} ꜩ{" "}
                </span>
                <span className="text-muted font-14 font-regular">goal</span>
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
          <div className="d-flex justify-content-between">
            <CardButton typeB="success" className="bg-secondaryColor" block={block} vote={upVote}>
              Support
            </CardButton>
            <CardButton typeB="report" block={block} vote={downVote}>
              Report
            </CardButton>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Card;
