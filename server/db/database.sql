CREATE DATABASE twitter_clone;

CREATE EXTENSION "uuid-ossp";



CREATE TABLE users( 
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilepic VARCHAR(255) DEFAULT '/img/default.jpg',
    likes int [],
    datetime timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (likes) REFERENCES status(id)
)

CREATE TABLE status( 
    status_id SERIAL,
    user_id UUID,
    pinned BOOL DEFAULT 'false',
    text VARCHAR(255),
    likes text [],
    datetime timestamp NOT NULL DEFAULT NOW(),
     PRIMARY KEY (status_id),
     FOREIGN KEY (user_id) REFERENCES users(id),
    --  FOREIGN KEY (likes) REFERENCES users(id)

)


ALTER TABLE users
  ADD COLUMN likes int
  REFERENCES status(status_id)

INSERT INTO users (username, email, password ) VALUES ('Owen', 'tes@gmail.com', 'pass')
INSERT INTO status (user_id, username, text) values ('b429c2ce-0e53-49f0-9669-eb8951ce3ff0', 'Owen', 'clean room');
