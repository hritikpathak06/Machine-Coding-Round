import { useRef } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const carouselRef = useRef<any>(null);

  const { theme, toggleTheme } = useTheme();

  console.log("Theme===>> ", theme);

  const handleForward = () => {
    carouselRef.current.scrollLeft += 400;
    // Detect end and reset position for infinite effect
    if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  const handleBackward = () => {
    if (carouselRef.current.scrollLeft <= 0) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
    }
    carouselRef.current.scrollLeft -= 400;
  };

  return (
    <div className="container">
      <h1>Carousel Demo</h1>
      <button onClick={toggleTheme}>Change Theme</button>
      <div className="sub_container" ref={carouselRef}>
        {data.map((image, idx) => (
          <div key={idx} className="image_container">
            <img src={image} alt={`Carousel item ${idx + 1}`} />
          </div>
        ))}
      </div>

      <div className="btn_box">
        <button onClick={handleBackward}>Prev</button>
        <button onClick={handleForward}>Next</button>
      </div>
    </div>
  );
};
export default App;

export const data = [
  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbCFD9hBq5ZBfdDqHa1IPFZORSL3EkPSxU2tomxsaeiOcuOyQMbUhNN-htl5xLTtZwvMU&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s",
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
];
