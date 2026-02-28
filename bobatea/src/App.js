import { useEffect, useState } from "react";
import boba1 from "./assets/boba1.jpeg";
import boba2 from "./assets/boba2.jpeg";
import poisonImg from "./assets/poison.jpeg";
import cupImg from "./assets/bobb.png";
import heartImg from "./assets/hearty.png";

function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [cupX, setCupX] = useState(50);
  const [items, setItems] = useState([]);

  // Move cup with mouse 
  const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = ((e.clientX - rect.left) / rect.width) * 100;

  // Prevent cup from going outside screen
  const min = 8;   // left boundary
  const max = 92;  // right boundary

  const clamped = Math.max(min, Math.min(max, percent));

  setCupX(clamped);
};

  // Spawn falling items
  useEffect(() => {
    const interval = setInterval(() => {
      const isPoison = Math.random() < 0.3;
      setItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 90,
          y: 0,
          type: isPoison ? "poison" : Math.random() < 0.5 ? "boba1" : "boba2",
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animate falling
  useEffect(() => {
    const fall = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 2 }))
          .filter((item) => item.y < 100)
      );
    }, 50);

    return () => clearInterval(fall);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="game-container" onMouseMove={handleMouseMove}>
        <div className="game-content">

          {/* Top UI */}
          <div className="top-bar">
            <div className="hearts">
              {[...Array(lives)].map((_, i) => (
                <img key={i} src={heartImg} alt="heart" />
              ))}
            </div>
            <div className="score">Boba: {score}/20</div>
          </div>

          {/* Falling Items */}
          {items.map((item) => (
            <img
              key={item.id}
              src={item.type === "boba1" ? boba1 : item.type === "boba2" ? boba2 : poisonImg}
              className="falling-item"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              alt=""
            />
          ))}

          {/* Cup */}
          <img
            src={cupImg}
            alt="cup"
            className="cup"
            style={{ left: `${cupX}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;