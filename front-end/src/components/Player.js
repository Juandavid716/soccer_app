import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerTemplate from "./PlayerTemplate";

function Player() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("http://localhost:5000/api/v1/players");

      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="playerContainer">
        {!data ? (
          <div className="m-4"> Loading ...</div>
        ) : (
          <ul className="">
            <PlayerTemplate data={data} />
          </ul>
        )}
      </div>
    </div>
  );
}

export default Player;
