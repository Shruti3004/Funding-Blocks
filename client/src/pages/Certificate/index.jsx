import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCertificate } from "../../api";

const Certificate = () => {
  const params = new URLSearchParams(window.location.search);
  const [certificate, setCertificate] = useState({ id: params.get("id"), result: "404 Not Found" });
  const id = params.get("id") || 123;
  const o = params.get("owner") || "abc";

  useEffect(() => {
    getCertificate(id, o).then((data) => {
      if (data) setCertificate(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-10 col-sm-12 col-12">
          <div className="certificate-border my-5 p-5 bg-light">
            <code>{JSON.stringify(certificate)}</code>
            <h1 className="text-primaryColor text-center">Certificate of Donation</h1>
            <h3 className="text-secondaryColor text-center mt-5">
              Haiti Earthquake and Tropical Storm Grace
            </h3>
            <p className="font-regular font-14 text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>
            <h3 className="text-secondaryColor text-center mt-5">
              Haiti Earthquake and Tropical Storm Grace
            </h3>
            <p className="font-regular font-14 text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <span>20/10/2020</span>
              <span>30/12/2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
