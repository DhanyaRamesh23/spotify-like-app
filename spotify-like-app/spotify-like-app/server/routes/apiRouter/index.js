const router = require("express").Router();
const songsRouter = require("./songsRouter");
const artistsRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const ratingsRouter = require("./ratingsRouter");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use("/songs", songsRouter);
router.use("/artists", artistsRouter);
router.use("/user", userRouter);
router.use("/ratings", ratingsRouter);

module.exports = router;
