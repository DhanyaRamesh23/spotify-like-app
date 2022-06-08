const { db } = require("../utils/Database");

const AddArtist = (artist, res) => {
  let sql = "INSERT INTO artists (name, dob, bio) VALUES (?, ?, ?);";
  console.log(typeof artist.dob);
  db.query(sql, [artist.name, artist.dob, artist.bio], (err, rows) => {
    if (err) {
      res.status(500).send({
        message: "Error! Artists not created!",
      });
      console.log(err);
      res.status(500).send();
      return;
    }

    sql = "SELECT * FROM artists WHERE artist_id = " + rows.insertId;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(200).send({
          message: "Created the new artist",
          newArtist: null,
        });
      }

      res.status(200).send({
        message: "Created the new artist",
        newArtist: rows[0],
      });
    });
  });
  return null;
};

const GetArtists = (req, res) => {
  let filters = req.query.filters;
  const artistColumns = ["artist_id", "name", "dob", "bio"];
  let neededColumns;
  if (filters !== undefined) {
    filters = filters.split(",");
    neededColumns = artistColumns.filter((x) => !filters.includes(x));
    if (neededColumns.length <= 0) {
      res.status(400).send({ message: "All coloumns are filtered" });
    }
  }

  let sql = `SELECT ${
    neededColumns !== undefined ? neededColumns.toString(",") : "*"
  } FROM artists`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    res.status(200).send(rows);
  });
};

const GetTopTenArtists = (req, res) => {
  let sql = `SELECT artists.*, GROUP_CONCAT(SAVG.name SEPARATOR ', ' ) AS "songs", ROUND(AVG(SAVG.rating_value)) as "avg_rating" FROM artists LEFT JOIN song_artists ON artists.artist_id = song_artists.artist_id LEFT JOIN (SELECT songs.song_id, songs.name, AVG(rating_value) AS rating_value FROM songs LEFT JOIN ratings ON ratings.song_id = songs.song_id GROUP BY songs.song_id) AS SAVG ON SAVG.song_id = song_artists.song_id GROUP BY artists.artist_id ORDER BY avg_rating DESC LIMIT 10;`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    res.status(200).send(rows);
  });
};

module.exports = { AddArtist, GetArtists, GetTopTenArtists };
