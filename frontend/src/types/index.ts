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

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  clerkId: string;
  fullName: string;
  imageUrl: string;
}
