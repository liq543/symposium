var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  const songs = await prisma.song.findMany();
  res.json(songs);
});

router.get('/:id', async (req, res, next) => {
  const song = await prisma.song.findUnique({
    where: { id: req.params.id }
  });
  if (song) {
    res.json(song);
  } else {
    res.status(404).send('Song not found');
  }
});

module.exports = router;