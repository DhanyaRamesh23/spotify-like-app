const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { AddSong, GetSong } = require("../../../controllers/SongController");
const { auth, authWithOutResponse } = require("../../../utils/auth");
const storage = multer.diskStorage({
  destination: "public/uploads/cover-images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}); // 10 MB limit

router.get("/", authWithOutResponse, (req, res) => {
  GetSong(req, res);
});

router.post("/", auth, upload.single("cover_image"), (req, res) => {
  let { song_name, release_date, artists_id_list } = req.body;
  const cover_image = req.file;

  //Validation
  if (song_name.trim().length === 0) {
    res.status(400).send();
  } else if (release_date.trim().length === 0) {
    res.status(400).send();
  } else if (!cover_image) {
    res.status(400).send();
  } else if (!artists_id_list || artists_id_list.length === 0) {
    res.status(400).send();
  }

  if (artists_id_list) {
    artists_id_list = artists_id_list.split(",");
  }

  if (!req.file || !song_name || !release_date || !artists_id_list)
    res.sendStatus(400).send({ message: "Bad request!" });

  const song = {
    name: song_name,
    release_date: release_date,
    cover_image_path: "public/uploads/cover-images/" + cover_image.filename,
    artists_id_list,
  };
  // Register new songs

  AddSong(song, res);
});

module.exports = router;
