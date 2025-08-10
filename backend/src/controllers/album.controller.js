import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    if (!albums || albums.length === 0) {
      return res.status(404).json({ error: "No albums found" });
    }
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id).populate("songs");
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
