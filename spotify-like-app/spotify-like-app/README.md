# Spotify Like App



---

## Instructions to install

- Clone the repo to your system and cd to the root of the repo

- Create a new database and Initialize the tables with these sql queries

  ```SQL
  create table if not exists users(
    user_id int NOT NULL AUTO_INCREMENT,
    name varchar(70) NOT NULL,
    email varchar(320) NOT NULL,
    hashed_password varchar(72) NOT NULL,
    PRIMARY KEY (user_id)
  )engine=innodb
  default charset=utf8
  default collate=utf8_unicode_ci;

  create table if not exists songs(
    song_id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    release_date date NOT NULL,
    cover_image_path varchar(255),
    PRIMARY KEY (song_id)
  )engine=innodb
  default charset=utf8
  default collate=utf8_unicode_ci;

  create table if not exists artists(
    artist_id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    dob date NOT NULL,
    bio varchar(360),
    PRIMARY KEY (artist_id)
  )engine=innodb
  default charset=utf8
  default collate=utf8_unicode_ci;

  create table if not exists song_artists(
    artist_id int,
    song_id int,
    UNIQUE(artist_id, song_id),
    CONSTRAINT fk__song_artists__artists FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk__song_artists__songs FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=innodb
  default charset=utf8
  default collate=utf8_unicode_ci;


  create table if not exists ratings(
    rating_id int NOT NULL AUTO_INCREMENT,
    song_id int,
    user_id int,
    rating_value int CHECK (rating_value >= 1 AND rating_value <= 5),

    UNIQUE(song_id, user_id),
    PRIMARY KEY (rating_id),
    CONSTRAINT fk__ratings__users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk__ratings__songs FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE ON UPDATE CASCADE
  )engine=innodb
  default charset=utf8
  default collate=utf8_unicode_ci;
  ```

- Create a `.env` at `\server\` and configure it with these values

  ```Shell
    PORT = 5000
    DB_HOST = "localhost"
    DB_USER = "your_db_user"
    DB_PASS = "your_db_password"
    DB_NAME = "your_db_name"
    JWT_TOKEN_SECRET = "random_string_here"
  ```

- Open a terminal and run these commands to start the server

  ```Shell
      cd /server
      npm i
      npm start
  ```

- Open another instance of terminal and run these commands to start the front end

  ```Shell
    cd /front-end
    npm i
    npm start
  ```
