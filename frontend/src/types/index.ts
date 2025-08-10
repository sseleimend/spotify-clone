export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  duration: number; // in seconds
  audioUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  releaseYear: number;
  songs: Song[];
}
