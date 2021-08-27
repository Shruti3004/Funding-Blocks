import React, { useState, useContext } from "react";
import Button from "../../components/button";

function CreateBlock() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    amount: "",
    deadline: "",
    image: "",
    action: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-7 col-md-8 col-sm-12 col-12 form-center">
            <div className="bg-white my-5 box py-5 px-lg-5 px-4">
              <h1 className="text-center font-demi text-primaryColor">Funding-Blockification</h1>
              <hr />
              <div className="text-muted font-demi font-14">
                Pro Tip:&nbsp;
                <span className="font-regular">
                  The more accurate and brief details you write the more donors will trust you.
                </span>
              </div>
              <form>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Title
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What is it called?"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Block Description
                </label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter the Block Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="5"
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Location
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Location of mishappening"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Target Amount
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What is your target amount?"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Deadline
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Image URL
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Actions
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the link"
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="font-14 text-muted font-demi mt-2">
                  Help:{" "}
                  <span className="font-regular">
                    Link should consist of thank you statement and legal statement.
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <Button title="Create" className="mt-5" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlock;
