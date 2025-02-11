import React, { useState } from "react";

const DummyFormWithDynamicColumns = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "123-456-7890",
      occupation: "Software Engineer",
      company: "TechCorp",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 28,
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      phone: "987-654-3210",
      occupation: "Graphic Designer",
      company: "DesignHub",
    },
  ]);

  // Initial columns to be shown
  const defaultColumns = [
    "name",
    "email",
    "age",
    "address",
  ];

  // All available columns with their labels
  const allColumns = [
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "age", label: "Age" },
    { field: "company", label: "Company" },
    { field: "address", label: "Address" },
    { field: "city", label: "City" },
    { field: "occupation", label: "Occupation" },
    { field: "state", label: "State" },
    { field: "zip", label: "ZIP" },
    { field: "phone", label: "Phone" },
  ];

  const [selectedColumns, setSelectedColumns] = useState(defaultColumns);

  // Handle column visibility toggle
  const handleColumnToggle = (field) => {
    setSelectedColumns((prevState) =>
      prevState.includes(field)
        ? prevState.filter((col) => col !== field)
        : [...prevState, field]
    );
  };

  const handleInputChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        name: "",
        email: "",
        age: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        occupation: "",
        company: "",
      },
    ]);
  };

  const deleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", rows);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dummy Form with Dynamic Columns</h2>

      {/* Multi-Selector for Columns */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Columns to Display:</h3>
        {allColumns.map((column) => (
          <label key={column.field} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedColumns.includes(column.field)}
              onChange={() => handleColumnToggle(column.field)}
            />
            {column.label}
          </label>
        ))}
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            {allColumns
              .map((column) => (
                // Ensure columns in `selectedColumns` are rendered while respecting the order
                selectedColumns.includes(column.field) && (
                  <th key={column.field}>{column.label}</th>
                )
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {allColumns
                .map((column) => (
                  // Render only selected columns
                  selectedColumns.includes(column.field) && (
                    <td key={column.field}>
                      <input
                        type="text"
                        value={row[column.field]}
                        onChange={(e) =>
                          handleInputChange(row.id, column.field, e.target.value)
                        }
                      />
                    </td>
                  )
                ))}
              <td>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} style={{ marginTop: "10px" }}>
        Add Row
      </button>
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Submit
      </button>
    </div>
  );
};

export default DummyFormWithDynamicColumns;
