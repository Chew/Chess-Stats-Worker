# Chess Stats

I made this goofy lil site for our Discord server's chess community. It's used to track intra-server games and stats. It's a work in progress, but it's functional.

## How to use

This site uses a D1 database with 2 tables, the schema is listed below:

```
table name: players
columns:
id - number (primary)
username - string
```

```
table name: games
columns:
id - number (primary)
date - string (YYYY-MM-DD)
white - number (foreign key to players)
black - number (foreign key to players)
winner - number (foreign key to players) or null, if a draw
link - string (a link to the game)
```

## Pages

There are only 2 pages, the home page, and a page to view a user's breakdown.
