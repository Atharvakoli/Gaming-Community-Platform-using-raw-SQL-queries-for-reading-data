const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './db/database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.send('Assignment_2');
});

// games apis functions
async function getAllGames(req, res) {
  let query = 'SELECT * FROM games';

  try {
    let games = await db.all(query, []);

    if (games.length === 0) {
      res.status(404).json({ games: 'Games, NOT FOUND' });
      return;
    }

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGameById(req, res) {
  let id = req.params.id;
  let query = 'SELECT * FROM games WHERE id == ?';

  try {
    let games = await db.all(query, [id]);

    if (games.length === 0) {
      res.status(404).json({ games: 'Games of ' + id + ' ID, NOT FOUND' });
      return;
    }

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGameByGenre(req, res) {
  let genre = req.params.genre;
  let query = 'SELECT * FROM games WHERE genre == ?';

  try {
    let games = await db.all(query, [genre]);

    if (games.length === 0) {
      res
        .status(404)
        .json({ games: 'Games of ' + genre + ' Genre, NOT FOUND' });
      return;
    }

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGameByPlatform(req, res) {
  let platform = req.params.platform;
  let query = 'SELECT * FROM games WHERE platform == ?';

  try {
    let games = await db.all(query, [platform]);

    if (games.length === 0) {
      res
        .status(404)
        .json({ games: 'Games of ' + platform + ' Platform, NOT FOUND' });
      return;
    }

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getGameOrderedByRating(req, res) {
  let query = 'SELECT * FROM games ORDER BY rating DESC';

  try {
    let games = await db.all(query, []);

    if (games.length === 0) {
      res.status(404).json({ games: 'Games, NOT FOUND' });
      return;
    }

    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// players apis function
async function getAllPlayers(req, res) {
  let query = 'SELECT * FROM players';

  try {
    let players = await db.all(query, []);

    if (players.length === 0) {
      res.status(404).json({ players: 'Players, NOT FOUND' });
      return;
    }

    res.status(200).json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlayerByID(req, res) {
  let id = req.params.id;
  let query = 'SELECT * FROM players WHERE id == ?';

  try {
    let players = await db.all(query, [id]);

    if (players.length === 0) {
      res.status(404).json({ players: 'Players of ' + id + ' ID, NOT FOUND' });
      return;
    }

    res.status(200).json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlayerByPlatform(req, res) {
  let platform = req.params.platform;
  let query = 'SELECT * FROM players WHERE platform == ?';

  try {
    let players = await db.all(query, [platform]);

    if (players.length === 0) {
      res
        .status(404)
        .json({ players: 'Players of ' + platform + ' Platform, NOT FOUND' });
      return;
    }

    res.status(200).json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPlayerOrderedByRating(req, res) {
  let query = 'SELECT * FROM players ORDER BY rating DESC';

  try {
    let players = await db.all(query, []);

    if (players.length === 0) {
      res.status(404).json({ players: 'Players, NOT FOUND' });
      return;
    }

    res.status(200).json({ players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Tournaments apis functions

async function getAllTournaments(req, res) {
  let query = 'SELECT * FROM tournaments';

  try {
    let tournaments = await db.all(query, []);

    if (tournaments.length === 0) {
      return res.status(404).json({ tournaments: 'Tournaments, Not Found' });
      return;
    }

    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTournamentById(req, res) {
  let id = req.params.id;
  let query = 'SELECT * FROM tournaments WHERE id == ?';

  try {
    let tournaments = await db.all(query, [id]);

    if (tournaments.length === 0) {
      return res
        .status(404)
        .json({ tournaments: 'Tournaments of ' + id + ' ID, Not Found' });
      return;
    }

    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTournamentByGameId(req, res) {
  let id = req.params.id;
  let query = 'SELECT * FROM tournaments WHERE gameId == ?';

  try {
    let tournaments = await db.all(query, [id]);

    if (tournaments.length === 0) {
      return res
        .status(404)
        .json({ tournaments: 'Tournaments of ' + id + ' ID, Not Found' });
      return;
    }

    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTournamentsOrderedByprizePool(req, res) {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';

  try {
    let tournaments = await db.all(query, []);

    if (tournaments.length === 0) {
      res.status(404).json({ tournaments: 'Tournaments, NOT FOUND' });
      return;
    }

    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Games apis
app.get('/games', getAllGames);
app.get('/games/details/:id', getGameById);
app.get('/games/genre/:genre', getGameByGenre);
app.get('/games/platform/:platform', getGameByPlatform);
app.get('/games/sort-by-rating', getGameOrderedByRating);

// playes apis
app.get('/players', getAllPlayers);
app.get('/players/details/:id', getPlayerByID);
app.get('/players/platform/:platform', getPlayerByPlatform);
app.get('/players/sort-by-rating', getPlayerOrderedByRating);

// tournaments api
app.get('/tournaments', getAllTournaments);
app.get('/tournaments/details/:id', getTournamentById);
app.get('/tournaments/game/:id', getTournamentByGameId);
app.get('/tournaments/sort-by-prize-pool', getTournamentsOrderedByprizePool);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
