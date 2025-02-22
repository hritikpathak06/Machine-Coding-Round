import { useState } from "react";

const App = () => {
  const data = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      buttonName: "Next",
      placeHolderName: "Enter Your name",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      buttonName: "Next",
      placeHolderName: "Enter Your Email ",
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      buttonName: "Submit",
      placeHolderName: "Enter Your Password",
    },
  ];

  const [forms, setForms] = useState(data);

  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFormChange = (e: any) => {
    console.log(e.target.value);
    const { value } = e.target;
    const name = forms[currentIndex].id;
    console.log("value", value);
    console.log("name", name);

    setFormData((prev: any) => {
      return { ...prev, [name]: value };
    });

    console.log("FormData==>> ", formData);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (currentIndex === forms.length - 1) {
      // console.log("Now submit the form");
      alert(JSON.stringify(formData));
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="conatainer">
        <form action="" className="form_container">
          <label htmlFor="">{forms[currentIndex].label}</label>
          <input
            type={forms[currentIndex].inputType}
            placeholder={forms[currentIndex].placeHolderName}
            value={formData[forms[currentIndex].id]}
            onChange={handleFormChange}
          />
          {currentIndex > 0 && (
            <button onClick={() => setCurrentIndex(currentIndex - 1)}>
              prev
            </button>
          )}
          <button onClick={handleClick}>
            {forms[currentIndex].buttonName}
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
