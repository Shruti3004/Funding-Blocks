import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-input-slider";
import Button from "../button";
import { donate } from "../../api";

const Modalcentered = (props) => {
  const [state, setState] = useState({ x: 1000, y: 10 });

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <div className="bg-primaryColor px-4 text-white text-center w-100">
          <h3 className="text-white mt-2 ">Become the saviour</h3>
        </div>
      </Modal.Header>
      <div className="bg-light p-5">
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
                opacity: 0.5,
              },
            }}
            className="w-75"
            axis="x"
            xmin={1000}
            x={state.x}
            xmax={1000000000}
            onChange={({ x }) => setState((state) => ({ ...state, x }))}
          />
          <span>muTez</span>
          <input
            type="number"
            value={state.x}
            className="form-control w-25"
            style={{ marginLeft: "20px" }}
            onChange={(e) => setState((state) => ({ ...state, x: e.target.value }))}
          />
        </div>
      </div>
      <Modal.Footer>
        <Button title="Contriute now" handleSubmit={() => donate(state.x / 1000000)} />
      </Modal.Footer>
    </Modal>
  );
};

export default Modalcentered;
