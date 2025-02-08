import { useEffect, useRef, useState } from "react";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Autoplay started successfully");
            setIsPlaying(true);
          })
          .catch(() => {
            console.log("Autoplay blocked. Waiting for user interaction...");

            // Function to manually play audio on user interaction
            const enableAudio = () => {
              audio.muted = false; // Ensure unmuted
              audio.play()
                .then(() => {
                  setIsPlaying(true);
                  console.log("Audio playing after user interaction!");
                })
                .catch(err => console.log("Manual play error:", err));

              // Remove event listeners after successful play
              document.removeEventListener("click", enableAudio);
              document.removeEventListener("touchstart", enableAudio);
            };

            // Listen for user interaction to trigger audio play
            document.addEventListener("click", enableAudio);
            document.addEventListener("touchstart", enableAudio);
          });
      }
    }
  }, []);

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/music/Made For Me.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Fallback Button if Tap Doesn't Work */}
      {!isPlaying && (
        <button
          onClick={() => {
            const audio = audioRef.current;
            if (audio) {
              audio.muted = false;
              audio.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Button play error:", err));
            }
          }}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ff4d6d",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            zIndex: 1000
          }}
        >
          Tap to Play Music
        </button>
      )}

      <Component {...pageProps} />
    </>
  );
}
