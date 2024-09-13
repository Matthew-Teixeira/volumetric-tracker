import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateTanksCard from "../components/UpdateTanksCard";
import Auth from "../utils/auth";

const UpdateTanks = () => {
  const [tankData, setTankData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();
  const userToken = Auth.getToken();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    const getDashData = async () => {
      fetch("/api/tanks", {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTankData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getDashData();
  }, [loading]);

  return (
    <div className="flex justify-evenly items-center flex-wrap min-h-[calc(100vh-64px)] h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        tankData.map((tank) => (
          <UpdateTanksCard key={tank._id} tankData={tank} />
        ))
      )}
    </div>
  );
};

export default UpdateTanks;
