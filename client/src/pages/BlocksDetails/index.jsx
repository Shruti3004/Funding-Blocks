import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { useParams } from "react-router-dom";
import Map from "../../components/map/Map";
import "../../styles/blockDetails.css";
import Modalcentered from "../../components/modals/Modalcentered";
import VoteModal from "../../components/voteModal";
import { getBlock, getBalance } from "../../api/";
import Loader from "../../components/loader";

const BlockDetails = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [block, setBlock] = useState({});
  const [votemodal, setVotemodal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(
    () =>
      (async () => {
        setBalance((await getBalance()) / 1000000);
      })(),
    []
  );

  useEffect(() => {
    getBlock(params.id)
      .then((data) => {
        setBlock(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => setBlock({});
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <Modalcentered show={modal} onHide={() => setModal(false)} />
      <VoteModal block={block} show={votemodal} onHide={() => setVotemodal(false)} />
      {block.value ? (
        <div className="bg-light py-5">
          <div className="container py-4">
            <h3 className="text-center my-2 text-primaryColor">{block && block?.value?.title}</h3>
            <div className="row d-flex justify-content-center align-items-start">
              <div className="col-md-6 col-lg-6 col-12 py-3">
                <Card
                  type="blockDetails"
                  block={block}
                  setModal={setModal}
                  setVotemodal={setVotemodal}
                />
              </div>
              <div className="col-md-4 col-lg-4 col-12 py-3">
                <Card
                  type="fundDetails"
                  block={block}
                  setVotemodal={setVotemodal}
                  setModal={setModal}
                />
                <div>
                  <div className={`box mt-4`}>
                    <div style={{ height: "50vh", width: "100%" }}>
                      <Map
                        coordinates={{
                          lat: parseFloat(block?.value?.location?.latitude),
                          lng: parseFloat(block?.value?.location?.longitude),
                        }}
                        type="view"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-primaryColor my-5 py-5">
          No fundraiser exist with such name
        </h1>
      )}
    </>
  );
};

export default BlockDetails;
