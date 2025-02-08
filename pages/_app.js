import { useEffect, useRef } from "react";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Try playing immediately
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Autoplay started successfully");
          })
          .catch((error) => {
            console.log("Autoplay blocked. Attempting workaround...");

            // Autoplay blocked, wait for user interaction
            const enableAudio = () => {
              audio.play();
              document.removeEventListener("click", enableAudio);
              document.removeEventListener("touchstart", enableAudio);
            };

            document.addEventListener("click", enableAudio);
            document.addEventListener("touchstart", enableAudio);
          });
      }
    }
  }, []);

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop muted={false}>
        <source src="/music/Made For Me.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Component {...pageProps} />
    </>
  );
}
