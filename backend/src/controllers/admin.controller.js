import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadFile(audioFile);
    const imageUrl = await uploadFile(imageFile);

    const song = await Song.create({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl,
      imageUrl,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $addToSet: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadFile(imageFile);

    const album = await Album.create({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Admin access granted" });
  } catch (error) {
    next(error);
  }
};
