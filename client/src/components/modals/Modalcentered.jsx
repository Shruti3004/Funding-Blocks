import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Slider from "react-input-slider";

const Modalcentered = (props) => {
  const [state, setState] = useState({ x: 10, y: 10 });
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select the amount</h4>
        <p>Your donation can save multiple lives. Be a hero today.</p>
        <div className="w-80 d-flex justify-content-around align-items-center">
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
            axis="x"
            x={state.x}
            xmax={15000}
            onChange={({ x }) => setState((state) => ({ ...state, x }))}
          />
          ꜩ {state.x}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modalcentered;
