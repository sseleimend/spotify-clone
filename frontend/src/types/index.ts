export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  duration: number; // in seconds
  audioUrl: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  releaseYear: number;
  songs: Song[];
}

export interface Stats {
  songs: number;
  albums: number;
  users: number;
  artists: number;
}
