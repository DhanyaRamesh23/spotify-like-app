const { db } = require("../utils/Database");

const AddSong = (songs, res) => {
  let sql = `INSERT INTO songs (name, release_date, cover_image_path) VALUES (?,?, ?);`; // Run into some trouble where the date was given as a string
  db.query(
    sql,
    [songs.name, songs.release_date, songs.cover_image_path],
    (err, rows) => {
      if (err) {
        res.status(500).send({
          message: "Error! Song not created!",
        });
        console.log(err);
        res.status(500).send();
      }

      // Populate song_artists table with necessary entries
      const added_song_id = rows.insertId;

      songs.artists_id_list.forEach((artist) => {
        sql = `INSERT INTO song_artists SELECT artists.artist_id, songs.song_id FROM artists, songs WHERE artists.artist_id = ${artist} and songs.song_id = ${added_song_id};`;
        db.query(sql, (err, rows) => {
          if (err) {
            if (err.errno !== 1062) {
              // Duplicate error;
              console.log("Duplicate error is disregarded");
            } else {
              console.log(err);
              res.status(500).send();
            }
          }
        });
      });

      res.status(200).send({ message: "Created the new song!" });
    }
  );
};

const GetSong = (req, res) => {
  let sql = `SELECT songs.*,ROUND(AVG(ratings.rating_value)) as "avg_rating", GROUP_CONCAT(artists.name SEPARATOR ', ') as "artists" from songs LEFT JOIN song_artists ON songs.song_id = song_artists.song_id LEFT JOIN artists ON song_artists.artist_id = artists.artist_id LEFT JOIN ratings ON ratings.song_id = songs.song_id GROUP BY songs.song_id ORDER BY avg_rating DESC LIMIT 10;`;
  if (req.user != null) {
    sql = `SELECT songs.*,ROUND(AVG(ratings.rating_value)) as "avg_rating", UR.rating_value as "user_rating", GROUP_CONCAT(artists.name SEPARATOR ', ') as "artists" from songs LEFT JOIN song_artists ON songs.song_id = song_artists.song_id LEFT JOIN artists ON song_artists.artist_id = artists.artist_id LEFT JOIN ratings ON ratings.song_id = songs.song_id LEFT JOIN (SELECT song_id, ratings.rating_value FROM ratings LEFT JOIN users AS T ON T.user_id = ratings.user_id WHERE T.user_id = ${req.user.user_id}) AS UR ON UR.song_id = songs.song_id GROUP BY songs.song_id ORDER BY avg_rating DESC LIMIT 10;;`;
  }
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send({
        message: "Error!",
      });
      console.log(err);
      res.status(500).send();
    }

    res.status(200).send(rows);
  });
};

const RateSong = (song_id, user_id, rating, req, res) => {
  let sql = `INSERT INTO ratings (song_id,user_id,rating_value) SELECT songs.song_id, users.user_id, (SELECT ?) as rating_value FROM songs JOIN users WHERE songs.song_id = ? and users.user_id = ?;`;
  db.query(sql, [rating, song_id, user_id], (err, rows) => {
    if (err) {
      if (err.errno !== 1062) {
        // Duplicate error;
        console.log("Duplicate error is disregarded");
      } else {
        console.log(err);
        res.status(500).send();
      }
    } else {
      res.status(200).send({ id: rows.insertId });
    }
  });
};
module.exports = { AddSong, GetSong, RateSong };
