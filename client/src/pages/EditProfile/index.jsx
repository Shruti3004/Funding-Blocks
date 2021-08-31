import React, { useState, useEffect } from "react";
import Button from "../../components/button";
// import { Redirect } from "react-router-dom";
import { updateProfile, getAccount, getUser, getBalance, fundingBlockify } from "../../api";
// import Swal from "sweetalert2";

function EditProfile() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    voted: {},
    donated: "",
    upvoted: [],
    downvoted: [],
  });

  useEffect(() => {
    getAccount().then(async (res) => {
      if (res.result) {
        setBalance((await getBalance(res.address)) / 1000000);
        setAddress(res.address);
        getUser(res.address).then((data) => setFormData(data));
      } else window.location.href = "/signup";
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData.bio, formData.name);
    // .then((res) => {
    //   Swal.fire("You agreed with T&C :)");
    // })
    // .catch((e) => {
    //   Swal.fire("You agreed with T&C :)");
    // });
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
              <h1 className="text-center font-demi text-primaryColor">My Profile</h1>
              <hr />
              <br />
              <h4 className="text-center">
                Total Donation: <code>{parseInt(formData?.donated) / 1000000} ꜩ</code>
              </h4>
              <br />
              <h6>
                Address: <code>{address}</code>
              </h6>
              <h6>
                Balance: <code>{balance} ꜩ</code>
              </h6>
              <form onSubmit={handleSubmit}>
                <label className="font-regular text-muted font-14 mt-4 fields-required">
                  Your Name
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="font-regular text-muted font-14 mt-4 fields-required">Bio</label>
                <div className="input-group">
                  <textarea
                    type="text"
                    className="form-control"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="5"
                    required
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
