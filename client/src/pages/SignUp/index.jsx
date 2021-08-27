import React, { useState, useContext } from "react";
import Button from "../../components/button";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
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
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12 col-12 form-center">
            <div className="bg-white my-5 box py-5 px-lg-5 px-4">
              <h1 className="text-center font-demi text-primaryColor">Register yourself!</h1>
              <hr />
              <form>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Your Name
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What should we call you?"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4">Bio</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Tell us about yourself."
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="5"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button title="Register" className="mt-5" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
