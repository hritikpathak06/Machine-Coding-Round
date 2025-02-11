import { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState<number>(2);
  const [cards, setCards] = useState<{ id: number; number: number }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = Array.from({ length: pairCount }, (_, i) => i + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({ id: index, number }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setWon(false);
  };

  const handleClickFunc = (id: number) => {
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      setDisabled(true);
      setFlipped((prevFlipped) => [...prevFlipped, id]);
      checkMatch(id);
    }
  };

  const checkMatch = (id: number) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[id].number) {
      setSolved((prevSolved) => [...prevSolved, firstId, id]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isFlipped = (id: number) => flipped.includes(id) || solved.includes(id);

  const handleButtonClick = () => {
    initializeGame();
  };

  useEffect(() => {
    if (gridSize >= 2 && gridSize <= 10) {
      initializeGame();
    }
  }, [gridSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-2">
        <h1 className="text-3xl font-extrabold">Memory Game</h1>

        {/* Input */}
        <div className="mb-4">
          <label htmlFor="gridSize" className="mr-2">
            Grid Size: (max 10)
          </label>
          <input
            type="number"
            id="gridSize"
            min={2}
            max={10}
            value={gridSize}
            onChange={handleGridSizeChange}
            className="border-2 border-gray-300 rounded py-1 px-2"
          />
        </div>

        {/* Game Board */}
        <div
          className={`grid gap-2 mb-4`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: `min(100%, ${gridSize * 5.5}rem)`,
          }}
        >
          {cards.map((card, idx) => (
            <div
              className={`aspect-square flex justify-center items-center text-xl font-bold rounded-lg border cursor-pointer transition-all duration-300 bg-gray-200 hover:bg-slate-200 ${
                isFlipped(card.id) ? "bg-blue-500 text-white" : ""
              }`}
              key={idx}
              onClick={() => handleClickFunc(card.id)}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          ))}
        </div>

        {/* Result */}
        {won && (
          <h1 className="mt-4 text-4xl font-extrabold text-green-600 animate-bounce">
            Hurray!! You Won 😎
          </h1>
        )}

        {/* Reset/Play Again */}
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-800"
          onClick={handleButtonClick}
        >
          {won ? "Play Again" : "Reset"}
        </button>
      </div>
    </>
  );
};

export default MemoryGame;
