CREATE TABLE heroes(
    superhero TEXT UNIQUE,
    publisher TEXT,
    alter_ego TEXT,
    first_appearance TEXT,
    id INTEGER PRIMARY KEY,
    votes INTEGER DEFAULT 0
);