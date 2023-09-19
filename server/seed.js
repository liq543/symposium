const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

    // Create a user
    const user = await prisma.user.create({
        data: {
            email: 'sample@email.com',
            username: 'SampleUser',
            hashedPassword: 'hashedSamplePassword123', // This is just a placeholder, you should hash passwords actually obviously lol
            profilePicture: 'images/bonzi.png' // Placeholder path
        }
    });

    // Create a song
    const song = await prisma.song.create({
        data: {
            title: 'Travel 2',
            artist: 'Griffin Gore',
            file: 'songs/travel_2.mp3',
            duration: 113000,
            album: `Griffin's Songs`,
            albumImage: 'images/bonzi.png',
        }
    });

    // Create another song using the ID you provided as an example
    const song2 = await prisma.song.create({
        data: {
            id: '65095e5aca85f004b65442bf',
            title: 'Hills',
            artist: 'Griffin Gore',
            file: 'songs/hills.mp3',
            duration: 57000,
            album: `Griffin's songs`,
            albumImage: 'images/bonzi.png',
        }
    });

    // Create a playlist and associate it with the user
    const playlist = await prisma.playlist.create({
        data: {
            name: `Sample Playlist`,
            description: `Description for sample playlist`,
            image: 'path/to/playlist_image.jpg', // Placeholder path
            user: {
                connect: {
                    id: user.id
                }
            },
            playlistSongs: {
                create: [
                    {
                        songId: song.id
                    },
                    {
                        songId: song2.id
                    }
                ]
            }
        }
    });

}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
