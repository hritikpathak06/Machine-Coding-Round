import { useEffect, useState } from "react";
import "./index.css";

const Progress = ({ val }: { val: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(val);
    }, 100);

    return () => clearTimeout(timeout);
  }, [val]);

  return (
    <div className="progress-container">
      <div className="outer">
        <div className="inner" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

const ProgressBar = () => {
  const progressValues = [10, 20, 30, 40, 60, 40, 75, 80];

  return (
    <div>
      <h1>Progress Bar Demo</h1>
      {progressValues.map((val, index) => (
        <Progress key={index} val={val} />
      ))}
    </div>
  );
};

export default ProgressBar;
