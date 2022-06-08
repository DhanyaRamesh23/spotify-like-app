const { RateSong } = require("../../../controllers/SongController");
const { auth } = require("../../../utils/auth");
const router = require("express").Router();

router.post("/", auth, (req, res) => {
  const { song_id, rating } = req.body;
  const user_id = req.user.user_id;
  // Validate

  RateSong(song_id, user_id, rating, req, res);
});

module.exports = router;
