import React, { useEffect, useState } from "react";

const Increment = ({ title, count }: { title: string; count: number }) => {
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(count / (1100 / 40));
    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        setTotalCount(count);
      } else {
        setTotalCount(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <>
      <div>
        <h1>{title}</h1>
        <h2>{totalCount}+</h2>
      </div>
    </>
  );
};

const Counter = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "ButtonShadow",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <Increment title="Clients" count={500} />
      <Increment title="Developers" count={100} />
      <Increment title="Projects" count={150} />
    </div>
  );
};

export default Counter;
