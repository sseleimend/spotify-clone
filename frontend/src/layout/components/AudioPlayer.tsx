import { usePlayer } from "@/stores/usePlayer";
import { useEffect, useRef } from "react";

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayer();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    audio?.addEventListener("ended", playNext);

    return () => audio?.removeEventListener("ended", playNext);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    const audio = audioRef.current;

    // check if this is actually a new song
    const isDiffSong = currentSong?.audioUrl !== prevSongRef.current;

    if (isDiffSong && audio) {
      audio.src = currentSong?.audioUrl || "";
      audio.load();
    }

    prevSongRef.current = currentSong?.audioUrl || null;

    if (isPlaying) audio?.play();
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
}

export default AudioPlayer;
