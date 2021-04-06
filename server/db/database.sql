CREATE DATABASE twitter_clone;

CREATE EXTENSION "uuid-ossp";

-- TODO : STILL DEBUG PIC PROFILE
CREATE TABLE users( 
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profilepic BYTEA,
    datetime timestamp NOT NULL DEFAULT NOW(),
)

CREATE TABLE users( 
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilepic VARCHAR(255) DEFAULT /img/default.jpg,
    datetime timestamp NOT NULL DEFAULT NOW()
)
INSERT INTO users (username, email, password ) VALUES ('Owen', 'tes@gmail.com', 'pass')
