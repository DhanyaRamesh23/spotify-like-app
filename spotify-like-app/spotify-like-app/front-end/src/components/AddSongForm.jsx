import React, { useContext, useEffect } from "react";

import Select from "react-select";

import Modal from "../components/shared/Modal";
import { useState } from "react";
import AddArtistSection from "./AddArtistSection";
import Axios from "axios";
import DataContext from "../contexts/DataContext";
import { authHeader } from "../services/Auth";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function AddSongForm() {
  // Add artist modal
  const [addSongModalOpen, setAddSongModalOpen] = useState(false);

  const addSongModalCloseHandler = () => {
    setAddSongModalOpen(false);
  };

  const addSongBtnClickHandler = (e) => {
    e.preventDefault();
    setAddSongModalOpen(true);
  };

  // Add songs
  const [songName, setSongName] = useState("");
  const [dateReleased, setDateReleased] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [artists, setArtists] = useState([]);

  const { artistsList, setArtistsList } = useContext(DataContext);

  useEffect(() => {
    if (!artistsList || artistsList.length === 0) {
      Axios.get(SERVER_URL + "api/artists?filters=dob,bio").then((res) => {
        setArtistsList(res.data);
      });
    }
  });

  const artistListToSelectOption = (artistsList) => {
    return artistsList.map((a) => {
      const b = {};
      b.value = a.artist_id;
      b.label = a.name;

      return b;
    });
  };

  const coverImageChangeHandler = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    // Validation

    if (songName.trim().length === 0) {
      window.alert("Song name required!");
      return;
    } else if (dateReleased.trim().length === 0) {
      window.alert("Release date required!");
      return;
    } else if (!coverImage) {
      window.alert("Cover Image required!");
      return;
    } else if (!artists || artists.length === 0) {
      window.alert("Atleast one artist is required!");
      return;
    }

    const formdata = new FormData();
    formdata.append("song_name", songName);
    formdata.append("release_date", dateReleased);
    formdata.append("cover_image", coverImage);
    formdata.append(
      "artists_id_list",
      artists.map((a) => a.value)
    );

    Axios.post(SERVER_URL + "api/songs", formdata, authHeader())
      .then((res) => {
        if (res.status === 200) {
          window.alert("Song added successfully!");
          setSongName("");
          setDateReleased("");
          setCoverImage("");
          setArtists([]);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          window.alert("You must login to add a song");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <form encType="multipart/form-data">
        <div className="input-group">
          <label htmlFor="song-name">Song name</label>
          <input
            type="text"
            className="form-control"
            name="song-name"
            value={songName}
            onChange={(e) => {
              setSongName(e.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="song-release-date">Release date</label>
          <input
            type="date"
            name="song-release-date"
            value={dateReleased}
            onChange={(e) => {
              setDateReleased(e.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="song-cover-image">Cover image</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            name="song-cover-image"
            onChange={coverImageChangeHandler}
          />
        </div>

        <div className="artists-input-section">
          <div className="input-group">
            <label htmlFor="song-artists">Artists</label>
            <Select
              className="input-select"
              isMulti
              options={artistListToSelectOption(artistsList)}
              value={artists}
              onChange={(val) => {
                setArtists(val);
              }}
            />
          </div>
          <button id="add-artists" onClick={addSongBtnClickHandler}>
            Add artist
          </button>
        </div>
        <button type="submit" onClick={SubmitHandler}>
          Submit
        </button>
      </form>
      <Modal
        name="add-artist"
        isOpen={addSongModalOpen}
        onCloseHandler={addSongModalCloseHandler}
      >
        <AddArtistSection />
      </Modal>
    </>
  );
}
