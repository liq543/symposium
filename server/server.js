// Requiring Express, the Apollo Server for GraphQL, and the authentication middleware
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');
const routes = require('./routes/route');
const songsRouter = require('./routes/songs');
const db = require('./config/connection');

// Initialize Prisma client and other variables
const prisma = new PrismaClient();
const { typeDefs, resolvers } = require('./schemas');
const PORT = process.env.PORT || 3001;
const app = express();

// Setup Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use('/songs', express.static(path.join(__dirname, 'songs')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/songs', songsRouter);

// API routes
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

app.get('/api/playlists/:id', async (req, res) => {
  try {
    const myplaylist = await prisma.playlist.findUnique({
      where: { id: req.params.id },
      include: {
        playlistSongs: {
          include: {
            song: true,
          },
        },
      },
    });
    res.json(myplaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching playlist" });
  }
});

// Serve static assets and frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the Apollo server
startApolloServer();
