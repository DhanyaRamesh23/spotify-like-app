import Rating from "./Rating";

import Axios from "axios";
import { authHeader } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

import "../styles/songsListing.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function SongsListing({ songs }) {
  return (
    <div className="songs-listing">
      {songs && songs.length > 0 ? (
        songs.map((song, id) => {
          return <SongItem key={id} song={song} />;
        })
      ) : (
        <>No songs available</>
      )}
    </div>
  );
}

function SongItem({ song }) {
  const navigate = useNavigate();

  const UserRateSubmitHandler = (rate) => {
    if (!window.confirm("Are you sure you want to submit the rating?")) return;
    //Submit rating to server
    Axios.post(
      SERVER_URL + "api/ratings",
      { song_id: song.song_id, rating: rate },
      authHeader()
    )
      .then((res) => {
        if (res.status === 200) {
          //Reload

          navigate(0);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.alert("Login to Rate a song!");
        } else console.log(err);
      });
  };
  return (
    <div className="song-item card">
      <div className="song-cover-image">
        <img
          src={FormatCoverImage(song.cover_image_path)}
          alt={song.name + "Cover image"}
        />
      </div>
      <div className="song-text">
        <h3 className="song-name">{song.name}</h3>
        <div className="song-release-date faded">
          Release date: {FormatDate(song.release_date)}
        </div>
        <div className="song-artists">Artists: {song.artists || "NaN"}</div>
      </div>
      <div className="song-ratings">
        <div className="song-average-rating">
          Average rating :
          <Rating rating={song.avg_rating || 0} />
        </div>
        <div className="song-user-rating">
          User rating :
          <Rating
            rating={song.user_rating || 0}
            canRate={song.user_rating == null ? true : false}
            submitRateHandler={UserRateSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
}

const FormatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const FormatCoverImage = (imgPath) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  return SERVER_URL + imgPath;
};
