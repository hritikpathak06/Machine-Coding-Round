import React, { useRef } from "react";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const InfiniteCarousel = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    if(scrollRef.current){
        scrollRef.current.scrollLeft += 100
    }

    if(scrollRef.current?.scrollLeft === 500){
        scrollRef.current.scrollTo += 0
    }
  }

  const handlePrev = () => {

  }

  return (
    <>
      <div className="carousel">
        <div className="sub_carousel" ref={scrollRef}>
          {items.map((item, key) => {
            return (
              <div className="box" key={key}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleNext}>prev</button>
      <button onClick={handlePrev}>next</button>
    </>
  );
};

export default InfiniteCarousel;
