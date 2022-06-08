import React, { useEffect, useState } from "react";

import Axios from "axios";
import ArtistsListing from "./shared/ArtistsListing";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function TopArtistsSection() {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!topArtists || topArtists.length <= 0) {
      Axios.get(SERVER_URL + "api/artists?top_ten=true")
        .then((res) => {
          setTopArtists(res.data);
        })
        .catch((err) => console.log(err));
    }
  });
  return (
    <section>
      <h2>Top 10 Artists</h2>
      <ArtistsListing artists={topArtists} />
    </section>
  );
}
