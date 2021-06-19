import React, { useState } from "react";
import axios from "axios";
import PlayerTemplate from "./PlayerTemplate";

function Team() {
  const [search, setSearch] = useState(``);

  const searchTeam = (e) => {
    var value = e;
    if (value === " " || value.length === 0) {
      setSearch("");
    } else {
      const fetchData = async () => {
        console.log(value);
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/api/v1/team",
          data: {
            name: value,
          },
        });
        setSearch(response.data);
      };

      fetchData();
      console.log(search);
    }
  };
  return (
    <div>
      <div className="searchBar">
        <h1 className="m-4">Find any team in the world</h1>{" "}
        <input
          type="text"
          className="input m-4"
          onChange={(e) => searchTeam(e.target.value)}
          placeholder="Search..."
        />
      </div>

      {search === "" ? (
        <div className="m-4">
          {" "}
          <h3>Start to search </h3>{" "}
        </div>
      ) : (
        <div className="row">
          <div className="playerContainer">
            <PlayerTemplate data={search.players} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;
