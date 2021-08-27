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
        <div className="row d-flex justify-content-center">
          <div className="col-md-9 col-lg-9 col-12">
            <Card type="blockDetails" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
