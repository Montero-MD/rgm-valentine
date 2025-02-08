import { useEffect, useState } from "react";
import styles from "../styles/FloatingHearts.module.css"; // Create this CSS file for styling

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        { id: Math.random(), left: Math.random() * 90 + 5 }, // Prevents hearts from appearing at the extreme edges
      ]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.slice(1));
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heartContainer}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={styles.heart}
          style={{
            left: `${heart.left}vw`, // Ensures hearts spread smoothly
            animationDuration: `${3 + Math.random() * 2}s`, // Varying speed for natural effect
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;