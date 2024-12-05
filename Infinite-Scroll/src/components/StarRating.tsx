import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: any) => {
    //  console.log("Index==>> ",index)
    setRating(index);
  };

  return (
    <div className="calculator">
      <h1>Star Rating</h1>

      <div className=" star">
        {Array.from({ length: 5 }, (_, i: number) => {
          const currentIndex = i + 1;
          return (
            <>
              <span
                className={`star_rating ${
                  rating >= currentIndex ? "on" : ""
                }  `}
                key={currentIndex}
                onClick={() => handleClick(currentIndex)}
              >
                &#9733;
              </span>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
