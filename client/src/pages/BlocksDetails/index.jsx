import React, { useEffect } from "react";
import Card from "../../components/card";
import Map from "../../components/map/Map";
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
                <div style={{ height: "50vh", width: "100%" }}>
                  <Map coordinates={{ lat: 25, lng: 79 }} type="view" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetails;
