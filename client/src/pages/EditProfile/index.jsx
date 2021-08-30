import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import { updateProfile, getAccount } from "../../api";
import Swal from "sweetalert2";

function EditProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    if (getAccount()) setIsLoggedIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData.bio, formData.name)
      .then((res) => {
        Swal.fire("You agreed with T&C :)");
      })
      .catch((e) => {
        Swal.fire("You agreed with T&C :)");
      });
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
              <h1 className="text-center font-demi text-primaryColor">Edit Your Profile</h1>
              <hr />
              <form onSubmit={handleSubmit}>
                <label className="font-regular text-muted font-14 mt-4">Your Name</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4">Bio</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className="form-control"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="5"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button title="Update" className="mt-5" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
