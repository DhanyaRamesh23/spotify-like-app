import React from "react";
import TopArtistsSection from "../components/TopArtistsSection";
import TopSongsSection from "../components/TopSongsSection";

export default function HomePage() {
  return (
    <div id="home">
      <TopSongsSection />
      <TopArtistsSection />
    </div>
  );
}
