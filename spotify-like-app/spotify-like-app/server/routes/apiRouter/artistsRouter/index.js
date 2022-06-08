const {
  AddArtist,
  GetArtists,
  GetTopTenArtists,
} = require("../../../controllers/ArtistController");

const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.query.top_ten == "true") {
    GetTopTenArtists(req, res);
  } else {
    GetArtists(req, res);
  }
});

router.post("/", (req, res) => {
  // Register new artists

  const { artist_name, artist_dob, artist_bio } = req.body;
  // Validate

  AddArtist({ name: artist_name, dob: artist_dob, bio: artist_bio }, res);
});

module.exports = router;
