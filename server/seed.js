const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.song.create({
        data: {
            title: 'Travel 2',
            artist: 'Griffin Gore',
            file: 'songs/travel_2.mp3',
            duration: 113000,
            album: `Griffin's Songs`,
            albumImage: 'images/bonzi.png',
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