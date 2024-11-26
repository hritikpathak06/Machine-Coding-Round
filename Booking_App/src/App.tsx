import { useEffect, useState } from "react";

const App = () => {
  const [selectedSeat, setSelectedSeat] = useState<any[]>([]);

  const seatingArrangements = {
    "5*5": 5,
    "6*6": 6,
    "7*7": 7,
  };

  const handleSelect = (index: any) => {
    if (selectedSeat.length > 4) {
      alert("You cant select the seat more than 5 at once");
      return;
    }

    setSelectedSeat((prev) =>
      prev.includes(index)
        ? prev.filter((seat) => seat !== index)
        : [...prev, index]
    );
  };

  console.log("selected seat==>> ", selectedSeat);

  const handleConfirm = () => {
    if (selectedSeat.length < 0) {
      alert("Please select any seat");
      return;
    }
    alert(selectedSeat);
  };

  return (
    <>
      <div className="container">
        <h1>Booking App</h1>
        {Object.entries(seatingArrangements).map(([key, value], idx) => {
          return (
            <>
              <div key={idx}>{key}</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${value}, 1fr)`,
                }}
              >
                {Array.from({ length: value * value }, (_, idx) => {
                  const selectedIndex = `${key}, ${idx + 1}`;
                  return (
                    <>
                      <button
                        style={{
                          padding: "10px",
                          backgroundColor: selectedSeat.includes(selectedIndex)
                            ? "green"
                            : "gray",
                        }}
                        onClick={() => handleSelect(selectedIndex)}
                      >
                        {idx + 1}
                      </button>
                    </>
                  );
                })}
              </div>
              <div>
                <button onClick={handleConfirm}>Confirm</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
