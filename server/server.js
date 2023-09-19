// Requiring Express, the Apollo Server for GraphQL, and the authentication middleware
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const routes = require('./routes/route');
var songsRouter = require('./routes/songs');


// Requiring the schemas and connecting to our database
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Establishes our port, starts the Apollo server, and passes in the schemas and authentication
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use('/songs', express.static(path.join(__dirname, 'songs')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/songs', songsRouter);
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        playlistSongs: {
          include: {
            song: true,
          },
        },
      },
    });

    // Transform the data to have songs directly under each playlist
    const transformedPlaylists = playlists.map(playlist => {
      return {
        ...playlist,
        songs: playlist.playlistSongs.map(playlistSong => playlistSong.song),
      };
    });

    res.json(transformedPlaylists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching playlists" });
  }
});


// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

// Creates directory for final build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serves the index.html file to the client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer();
