import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "No songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albumId: 1,
        },
      },
    ]);
    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "No featured songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albumId: 1,
        },
      },
    ]);
    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "No made for you songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
          albumId: 1,
        },
      },
    ]);
    if (!songs || songs.length === 0) {
      return res.status(404).json({ error: "No trending songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};
