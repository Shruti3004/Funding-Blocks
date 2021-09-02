import React, { useState, useEffect } from "react";
import { registerUser, getAccount, getUser } from "../../api";
import Button from "../../components/button";
import { Fade } from "react-reveal";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(
    () =>
      getAccount().then((res) => {
        if (!res.result) window.location.href = "/";
        getUser(res.address).then((user) => {
          if (user) window.location.href = "/";
        });
      }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(formData.bio, formData.name).then((res) => {
      if (res.result) window.location.href = "/";
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="bg-light">
      <div className="bg-secondaryColor py-section">
        <div className="container">
          <h1 className="text-white text-center">Serve yourself for the noble cause.</h1>
          <div className="text-white font-18 font-medium text-center">
            ​0% platform fees for funds raised on Funding Blocks
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-12 col-12 form-center">
            <Fade bottom>
              <div className="bg-white form-margin mb-5 box py-5 px-lg-5 px-4">
                <h1 className="text-center font-demi text-primaryColor">Register yourself!</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                  <label className="font-demi text-primaryColor font-14 mt-4 fields-required">
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
                  <label className="font-demi text-primaryColor font-14 mt-4 fields-required">
                    Bio
                  </label>
                  <div className="input-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Tell us about yourself."
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="5"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button title="Register" className="mt-5" />
                  </div>
                </form>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
