import React, { useState } from "react";

const OptionSelector = () => {
  const [checkBoxData, setCheckBoxData] = useState<any[]>([
    {
      id: 1,
      name: "Checkd1",
      isChecked: false,
    },
    {
      id: 2,
      name: "Checkd2",
      isChecked: false,
    },
    {
      id: 3,
      name: "Checkd3",
      isChecked: false,
    },
  ]);

  const [optionData, setOptionData] = useState<any[]>([
    {
      id: 4,
      name: "Option1",
      isChecked: false,
    },
    {
      id: 5,
      name: "Option2",
      isChecked: false,
    },
    {
      id: 6,
      name: "Option3",
      isChecked: false,
    },
  ]);

  const handleChecked = (checkedId: any) => {
    setCheckBoxData((prev) =>
      prev.map((pr) =>
        pr.id === checkedId ? { ...pr, isChecked: !pr.isChecked } : pr
      )
    );
  };

  const handleSwap = () => {
    let updated_checkbox_data = [...checkBoxData];
    let updated_option_data = [...optionData];

    updated_checkbox_data.map((item, idx) => {
      if (item.isChecked) {
        let temp = updated_checkbox_data[idx].name;
        updated_checkbox_data[idx].name = updated_option_data[idx].name;
        updated_option_data[idx].name = temp;
      }
    });

    setCheckBoxData(updated_checkbox_data);
    setOptionData(updated_option_data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "23px" }}>CheckBox Data</h1>
          {checkBoxData.map((d) => {
            return (
              <>
                <label
                  key={d.id}
                  style={{ display: "block", marginBottom: "10px" }}
                />
                <input
                  type="checkbox"
                  checked={d.checked}
                  onClick={() => handleChecked(d.id)}
                />
                {d.name}
              </>
            );
          })}
        </div>

        <div>
          <h1 style={{ fontSize: "23px" }}>Option Data</h1>
          {optionData.map((d) => {
            return (
              <>
                <div>
                  <h1>{d.name}</h1>
                </div>
              </>
            );
          })}
        </div>

        <button
          style={{ background: "black", color: "white", padding: "10px 20px" }}
          onClick={handleSwap}
        >
          Swap
        </button>
      </div>
    </>
  );
};

export default OptionSelector;
