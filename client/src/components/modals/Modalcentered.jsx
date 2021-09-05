import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-input-slider";
import Button from "../button";
import { donate, getBalance, getAccount } from "../../api";

const Modalcentered = (props) => {
  const [state, setState] = useState({ x: 1, y: 10 });
  const [balance, setBalance] = useState(10000);

  useEffect(() => {
    getAccount().then(async (res) => {
      if (res.result) setBalance((await getBalance(res.address)) / 1000000);
    });
  }, []);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <div className="bg-primaryColor px-4 text-white text-center w-100">
          <h3 className="text-white mt-2 ">Become the saviour</h3>
        </div>
      </Modal.Header>
      <div className="bg-light p-lg-5 p-3">
        <h4>Select the amount</h4>
        <p>Your donation can save multiple lives. Be a hero today.</p>
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
        <Button title="Donate" handleSubmit={() => donate(state.x)} />
      </Modal.Footer>
    </Modal>
  );
};

export default Modalcentered;
