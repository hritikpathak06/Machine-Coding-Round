import { useEffect, useState } from "react";

// Define form fields properly
const all_fields = [
  {
    fields_1: [
      {
        type: "text",
        name: "username",
        label: "Username",
        placeholder: "Enter Your User Name",
      },
      {
        type: "email",
        name: "email",
        label: "Your Email",
        placeholder: "Enter Your Email",
      },
      {
        type: "password",
        name: "password",
        label: "Your Password",
        placeholder: "Enter Your Password",
      },
    ],
  },
  {
    fields_2: [
      {
        type: "text",
        name: "location",
        label: "Your Location",
        placeholder: "Enter Your Location",
      },
      {
        type: "text",
        name: "city",
        label: "Your City",
        placeholder: "Enter Your City",
      },
    ],
  },
];


const Form1 = ({ field, handleValueChange }: any) => {
  return (
    <div>
      <label htmlFor={field.name}>{field.label}</label>
      <input
        type={field.type}
        placeholder={field.placeholder}
        name={field.name}
        onChange={(e) => handleValueChange(e)}
      />
    </div>
  );
};

const MultiStepForm = () => {
  const storedData = localStorage.getItem("formData");
  const initialFormData = storedData
    ? JSON.parse(storedData)
    : {
        username: "",
        email: "",
        password: "",
        location: "",
        city: "",
      };

  const [formData, setFormData] = useState(initialFormData);
  const [currentForm, setCurrentForm] = useState(0);

  // Save formData to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleValueChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    localStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleNext = () => {
    if (currentForm < all_fields.length - 1) {
      setCurrentForm(currentForm + 1);
    }
  };

  const handlePrev = () => {
    if (currentForm > 0) {
      setCurrentForm(currentForm - 1);
    }
  };


  return (
    <div>
      <h1>Multi-Step Form</h1>

      {Object.values(all_fields[currentForm])[0].map((field: any) => (
        <Form1
          key={field.name}
          field={field}
          handleValueChange={handleValueChange}
        />
      ))}

      <div>
        {currentForm > 0 && <button onClick={handlePrev}>Previous</button>}
        {currentForm < all_fields.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={() => alert("Form Submitted!")}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
