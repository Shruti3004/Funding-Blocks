import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-input-slider";
import Button from "../button";
import { vote, getBalance, getAccount, getUser } from "../../api";
import Confetti from "react-confetti";
import swal from "sweetalert";

const VoteModal = (props) => {
  const [state, setState] = useState({ x: 1, y: 10 });
  const [balance, setBalance] = useState(10000);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleVote = async () => {
    setShowLoading(true);
    try {
      if (await isLoggedIn()) {
        await vote(state.x * 1000000, props.block?.key);
        setShowConfetti(true);
      } else {
        swal("Oops!", "You need to sign up first", "error");
      }
    } catch (error) {}
    setShowLoading(false);
  };

  const isLoggedIn = async () => {
    let result;
    await getAccount().then((res) =>
      getUser(res.address).then(async (user) => {
        if (user) result = true;
        else result = false;
      })
    );
    return result;
  };

  useEffect(
    () =>
      (async () => {
        setBalance((await getBalance()) / 1000000);
      })(),
    []
  );

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {showConfetti && <Confetti width="800" height="380" />}
        <Modal.Header closeButton>
          <div className="bg-primaryColor px-4 text-white text-center w-100">
            <h3 className="text-white mt-2 ">How much should they get?</h3>
          </div>
        </Modal.Header>
        {!showLoading ? (
          <>
            <div className="bg-light p-lg-5 p-3">
              <h4>Select the amount</h4>
              <p>Your vote can save multiple lives. Be a hero today.</p>
              <div className="w-80 d-flex justify-content-between align-items-center">
                <Slider
                  styles={{
                    active: {
                      backgroundColor: "#1ebe59",
                    },
                    track: {
                      backgroundColor: "grey",
                    },
                    disabled: {
                      opacity: 0.7,
                    },
                  }}
                  className="w-75"
                  axis="x"
                  xmin={1}
                  x={state.x}
                  xmax={balance}
                  xstep={0.000001}
                  onChange={({ x }) => setState((state) => ({ ...state, x }))}
                />
                <span style={{ marginLeft: "10px" }}>ꜩ</span>
                <input
                  type="number"
                  value={state.x}
                  className="form-control w-25"
                  style={{ marginLeft: "20px" }}
                  step=".000001"
                  onChange={(e) => setState((state) => ({ ...state, x: e.target.value }))}
                />
              </div>
            </div>
            <Modal.Footer>
              <Button title="Vote" handleSubmit={handleVote} />
            </Modal.Footer>
          </>
        ) : (
          <div className="font-18 my-5 text-primaryColor text-center font-demi">
            Wait!! Voting is in the process.
          </div>
        )}
      </Modal>
    </>
  );
};

export default VoteModal;
