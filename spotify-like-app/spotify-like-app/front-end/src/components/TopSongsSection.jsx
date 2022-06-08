import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SongsListing from "./shared/SongsListing";

import Axios from "axios";

import { authHeader } from "../services/Auth";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export default function TopSongsSection() {
  const navigate = useNavigate();
  const addSongClickHandler = (e) => {
    e.preventDefault();
    navigate("/add-song");
  };

  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    if (!topSongs || topSongs.length <= 0) {
      Axios.get(SERVER_URL + "api/songs", authHeader())
        .then((res) => {
          setTopSongs(res.data);
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <section>
      <h2>Top 10 Songs</h2>
      <button id="add-song-btn" onClick={addSongClickHandler}>
        Add song
      </button>
      <SongsListing songs={topSongs} />
    </section>
  );
}
