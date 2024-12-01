import { useState } from "react";

const sampleData = ["Delhi", "Hydrebad", "Jharkhand", "Mumbai", "Banglore"];

const CheckBox = () => {
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleOnChange = (e: any, data: any) => {
    if (e.target.checked) {
      console.log("Data-==>>> ", data);
      setSelectedData((prev: any) => [...prev, data]);
    } else {
      setSelectedData((prev) => prev.filter((val) => val != data));
    }
  };

  return (
    <>
      <div>
        {sampleData.map((data, idx) => {
          return (
            <>
              <div key={idx}>
                <input
                  type="checkbox"
                  onChange={(e) => handleOnChange(e, data)}
                />
                <label htmlFor="">{data}</label>
              </div>
            </>
          );
        })}

        <div>
          <h1>Output Box</h1>
          {selectedData.length > 0 ? (
            <>
              <ul>
                {selectedData.map((data, idx) => {
                  return <li key={idx}>{data}</li>;
                })}
              </ul>
            </>
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckBox;
