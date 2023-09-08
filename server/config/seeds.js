// Require a connection to the database and import our models
const db = require('./connection');
const { User, Playlist, Song } = require('../models');

// Seeds the database once the connection is open
db.once('open', async () => {
  // Remove all songs
  await Song.deleteMany();

  // Insert default songs into the database
  const songs = await Song.insertMany([
    {  
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera'
    },
    {  
      title: 'Hey Jude',
      artist: 'The Beatles',
      album: 'Hey Jude'
    },
    {  
      title: 'Welcome to the Jungle',
      artist: 'Guns N\' Roses',
      album: 'Appetite for Destruction'
    },
    {  
      title: 'The Final Countdown',
      artist: 'Europe',
      album: 'The Final Countdown'
    },
    {  
      title: 'Thunderstruck',
      artist: 'AC/DC',
      album: 'The Razors Edge'
    },
  ]);

  // Show in the console that the songs are seeded to the database
  console.log('Songs seeded!');

  // Remove all playlists
  await Playlist.deleteMany();

  // Create a default playlist for the default user
  const playlists = await Playlist.insertMany([
    {
      playlistName: 'Playlist01',
      songs: [
        {  
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          album: 'A Night at the Opera'
        },
        {  
          title: 'Hey Jude',
          artist: 'The Beatles',
          album: 'Hey Jude'
        },
      ]
    }
  ]);

  // Show in the console that the playlist is seeded to the database
  console.log('Playlists seeded');

  // Remove all users
  await User.deleteMany();

  // Create a default user with their credentials
  await User.create({
    username: 'TestUser123',
    email: 'testuser@email.com',
    password: 'password12345',
    playlists: ['Playlist01']
  });

  // Show in the console that the user is seeded to the database
  console.log('users seeded');

  process.exit();
});
