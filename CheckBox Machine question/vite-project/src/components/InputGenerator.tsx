import React, { useState } from "react";

const InputGenerator = () => {
  const [forms, setForms] = useState([
    {
      id: 1,
      inputs: [
        { label: "Name", value: "" },
        { label: "Age", value: "" },
      ],
    },
  ]);
  const [activeForm, setActiveForm] = useState(1);

  // Add a new form
  const addForm = () => {
    const newForm = {
      id: forms.length + 1,
      inputs: [
        { label: "Email", value: "" },
        { label: "Phone", value: "" },
      ],
    };
    setForms([...forms, newForm]);
    setActiveForm(newForm.id);
  };

  // Remove the current form
  const removeForm = () => {
    if (forms.length > 1) {
      const updatedForms = forms.filter((form) => form.id !== activeForm);
      setForms(updatedForms);
      setActiveForm(updatedForms[0]?.id || 1);
    }
  };

  // Handle input change
  const handleInputChange = (formId: any, index: any, value: any) => {
    const updatedForms = forms.map((form) =>
      form.id === formId
        ? {
            ...form,
            inputs: form.inputs.map((input, idx) =>
              idx === index ? { ...input, value } : input
            ),
          }
        : form
    );
    setForms(updatedForms);
  };

  // Render current active form
  const activeFormContent = forms.find((form) => form.id === activeForm);

  return (
    <div className="bg-red-300 w-1/2 mx-auto p-4 rounded-md shadow-md">
      <h1 className="text-center text-xl font-bold">Multi-Form Generator</h1>

      {/* Render Active Form */}
      {activeFormContent && (
        <div className="bg-white p-4 rounded-md shadow mt-4">
          <h2 className="font-semibold mb-2">Form {activeFormContent.id}</h2>
          {activeFormContent.inputs.map((input, idx) => (
            <div key={idx} className="mb-4">
              <label className="block mb-1 font-medium">{input.label}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={input.value}
                onChange={(e) =>
                  handleInputChange(activeFormContent.id, idx, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addForm}
        >
          Add Form
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={removeForm}
        >
          Remove Form
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex justify-center gap-2">
        {forms.map((form) => (
          <button
            key={form.id}
            className={`px-4 py-2 rounded ${
              form.id === activeForm
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveForm(form.id)}
          >
            Form {form.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputGenerator;
