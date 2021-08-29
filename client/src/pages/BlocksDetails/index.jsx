import React, { useEffect } from "react";
import Card from "../../components/card";

import "../../styles/blockDetails.css";

const BlockDetails = () => {
  useEffect(() => {
    console.log("Use Effect");
  }, []);
  return (
    <div className="bg-light py-5">
      <div className="container py-4">
        <h3 className="text-center my-2 text-primaryColor">
          My Little Boy’s Cancer Has Relapsed Twice But I’m Helpless. Please Save Him
        </h3>
        <div className="row d-flex justify-content-center align-items-start">
          <div className="col-md-6 col-lg-6 col-12 py-3">
            <Card type="blockDetails" />
          </div>
          <div className="col-md-4 col-lg-4 col-12 py-3">
            <Card type="fundDetails" />
            <div>
              <div className={`box mt-4`}>
                <div className="font-22 font-demi text-primaryColor">Deadline:</div>
              </div>
            </div>
            <div>
              <div className={`box mt-4`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
