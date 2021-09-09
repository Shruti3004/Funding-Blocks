import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../button";
import CardButton from "../cardButton";
import {
  upVote,
  downVote,
  donate,
  deleteBlock,
  isAuthor,
  claimBlockAmount,
  getBalance,
  isLiked,
} from "../../api";
import { ProgressBar } from "react-bootstrap";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { Fade } from "react-reveal";

const Card = ({ type, block, setModal, setVotemodal }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [balance, setBalance] = useState(1);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const slug = useParams().id;

  useEffect(() => {
    isAuthor(slug).then((value) => setIsOwner(value));
    getBalance().then((value) => setBalance(value));
    isLiked(block?.key).then((res) => setIsUpvoted(res));
  }, []);

  const percent = block
    ? Math.ceil((block.value.final_amount / block.value.target_amount) * 100)
    : 0;

  if (type === "fundDetails") {
    return (
      <div>
        <div className={`box`}>
          <div className="px-3">
            <Button
              title="Contribute Now ❤️"
              className="mt-4 w-100 bg-secondaryColor"
              type="outline"
              handleSubmit={() => setModal(true)}
            />
          </div>
          <div className={`card-body`}>
            <hr />
            <div className="font-22 font-bold text-primaryColor mt-4">
              ꜩ {block && parseFloat(block?.value?.final_amount / 1000000).toFixed(6)}
              <span className="text-muted font-14 font-regular"> decided of </span> <br />
              <span className="text-muted font-demi">
                ꜩ {block && parseFloat(block?.value?.target_amount / 1000000).toFixed(6)}
              </span>
              <span className="text-muted font-14 font-regular"> needed</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "blockDetails") {
    return (
      <Fade bottom>
        <div className={`box blockDetails_card`}>
          <div className={`card-body `}>
            <div className="img-container">
              <img src={block?.value?.image} alt="card-image" className="card-img-top" />
            </div>
            <div className="pt-3">
              <div className="d-flex justify-content-between">
                <h4 className="card-title text-primaryColor mt-3">About</h4>
                <EmailShareButton subject="se" body="x" />
                <WhatsappShareButton title="Share" />
              </div>
              <hr />
              <p className="card-text text-muted font-medium">
                <span className="font-30 text-primaryColor text-uppercase font-demi">
                  {block && block?.value?.description[0]}
                </span>
                {block && block?.value?.description.substring(1, block?.value?.description.length)}
              </p>
              <hr />
              <div className="text-primaryColor font-18 font-medium">
                For more information
                <a href={block?.value?.actions}> visit.</a>
              </div>
              <hr />
              {block.value.active ? (
                <div className="d-flex justify-content-between align-items-center">
                  {isOwner ? (
                    <CardButton
                      typeB="redirect"
                      vote={() => (window.location.href = "/blockDetails/" + slug + "/edit")}
                      className="mt-4"
                    >
                      Edit Block
                    </CardButton>
                  ) : (
                    <CardButton setVotemodal={setVotemodal} setModal={setModal} className="mt-4">
                      Vote
                    </CardButton>
                  )}
                  {isOwner && (
                    <Button
                      title="Withdraw"
                      handleSubmit={() => claimBlockAmount(slug)}
                      className="mt-4"
                    >
                      Withdraw
                    </Button>
                  )}
                  {isOwner ? (
                    <CardButton typeB="delete" block={block} vote={deleteBlock} className="mt-4">
                      Delete
                    </CardButton>
                  ) : (
                    <CardButton
                      typeB="report"
                      block={block}
                      vote={downVote}
                      setModal={setModal}
                      className="mt-4"
                    >
                      Report
                    </CardButton>
                  )}
                </div>
              ) : (
                <div className="font-18 font-demi alert-secondary py-2 text-center">
                  Block Inactive
                </div>
              )}
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
          <div className="img-container">
            <Link to={`/blockDetails/${block?.key}`}>
              {block?.value?.active ? (
                <div className="img-container">
                  <img
                    src={block?.value?.image}
                    alt="card-image"
                    className="card-img-top"
                    height="160px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="card">
                  <div className="card-img-top">
                    <img
                      src={block?.value?.image}
                      alt="card-image"
                      className="card-img-top"
                      height="160px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-content-inactive">
                    <div className="text-white font-demi h-100 flex-column font-22 d-flex justify-content-center align-items-center">
                      Funded Block
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
          <div>
            <div className="card-content-height">
              <h4 className="card-title mt-4 text-primaryColor font-demi font-22">
                {block && block?.value?.title}
              </h4>
              <p className="card-text text-muted font-medium mt-3">
                {block && block?.value?.description.substring(0, 100)}...
              </p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="font-22 font-bold text-primaryColor mt-3">
                ꜩ {block && parseFloat(block?.value?.final_amount / 1000000).toFixed(6)}
                <span className="text-muted font-14 font-regular"> decided of </span> <br />
                <span className="text-muted font-demi">
                  ꜩ {block && parseFloat(block?.value?.target_amount / 1000000).toFixed(6)}
                </span>
                <span className="text-muted font-14 font-regular"> needed</span>
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
            <div>
              {isUpvoted ? (
                <i
                  className="fas fa-heart fa-2x"
                  style={{ cursor: "not-allowed", color: "red" }}
                ></i>
              ) : (
                <i
                  onClick={() => upVote(block?.key)}
                  className="far fa-heart fa-2x"
                  style={{ cursor: "pointer" }}
                ></i>
              )}
              <span style={{ marginLeft: "10px" }} className="font-demi">
                {(parseInt(block?.value?.upvoted_average) / 1000).toFixed(2)}%
              </span>
            </div>
            <Link to={`/blockDetails/${block?.key}`}>
              <Button title="View Details" />
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Card;
