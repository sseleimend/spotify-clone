import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllStats = async (req, res, next) => {
  try {
    const [songsCount, albumsCount, artistsCount, usersCount] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
        User.countDocuments(),
      ]);

    res.status(200).json({
      songs: songsCount,
      artists: artistsCount[0]?.count || 0,
      albums: albumsCount,
      users: usersCount,
    });
  } catch (error) {
    next(error);
  }
};
