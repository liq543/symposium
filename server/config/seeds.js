// Require a connection to the database and import our models
const db = require('./connection');
const { User, Playlist, Song } = require('../models');

// 
db.once('open', async () => {
  await Song.deleteMany();

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

  console.log('Songs seeded!');

  await Playlist.deleteMany();

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

  console.log('Playlists seeded');

  await User.deleteMany();

  await User.create({
    username: 'TestUser123',
    email: 'testuser@email.com',
    password: 'password12345',
    playlists: ['Playlist01']
  });

  console.log('users seeded');

  process.exit();
});
