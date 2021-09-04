import React, { useEffect } from "react";
import Card from "../../components/card";
import { getAllBlocks } from "../../api";
import Loader from "../../components/loader";

const Blocks = () => {
  const [blocks, setBlocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getAllBlocks().then((res) => {
      setBlocks(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="bg-light">
        <div className="container pb-5">
          <div className="row d-flex justify-content-center pt-5 pb-4 ">
            {blocks.map((block) => (
              <div key={block.id} className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                <Card block={block} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blocks;
