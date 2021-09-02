import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import { updateProfile, getAccount, getUser, getBalance, fundingBlockify } from "../../api";
import { Fade } from "react-reveal";

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
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() =>
    getAccount().then((res) => {
      if (!res.result) window.location.href = "/";
      getUser(res.address).then(async (user) => {
        if (user) {
          setBalance((await getBalance(res.address)) / 1000000);
          setAddress(res.address);
          setFormData(user);
        } else window.location.href = "/signup";
      });
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData?.bio, formData?.name);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-light">
      <div className="bg-secondaryColor py-section">
        <div className="container">
          <h1 className="text-white text-center">Your contribution in saving the lives.</h1>
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
                  <label className="font-demi text-primaryColor font-14 mt-4 fields-required">
                    Your Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData?.name}
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
                      name="bio"
                      value={formData?.bio}
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
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
