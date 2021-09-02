import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Slider from "react-input-slider";

const Modalcentered = (props) => {
  const [state, setState] = useState({ x: 10, y: 10 });
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <div className="bg-primaryColor px-4 text-white">
          <h3 className="text-white mt-2">Donate</h3>
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
            x={state.x}
            xmax={15000}
            onChange={({ x }) => setState((state) => ({ ...state, x }))}
          />
          <span className="font-demi">ꜩ {state.x}</span>
        </div>
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalcentered;
