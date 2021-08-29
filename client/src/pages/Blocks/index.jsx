import React, { useEffect } from "react";
import Card from "../../components/card";
import { getAllBlocks } from "../../api";

const Blocks = () => {
  useEffect(() => {
    getAllBlocks().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <div className="bg-light">
        <div className="container pb-5">
          <div className="row d-flex justify-content-center pt-5 pb-4 ">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
          </div>
          <div className="row d-flex justify-content-center pb-4">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
          </div>
          <div className="row d-flex justify-content-center pb-4">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blocks;
