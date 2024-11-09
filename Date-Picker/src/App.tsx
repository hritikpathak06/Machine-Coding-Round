import { useState } from "react";
import DatePicker from "./components/DatePicker";
import DateRangePicker from "./components/DateRangePicker";
import MultiDatePicker from "./components/MultiDatePicker";
import CustomModal from "./hooks/CustomeModal";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Open Modal
        </button>

        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-lg font-bold">Modal Title</h2>
          <p className="mt-2 text-gray-600">This is the modal content.</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </CustomModal>
      </div>

      <div className=" p-4 flex flex-col items-center justify-center gap-5">
        <h1 className=" text-3xl text-center font-extrabold ">Date Picker</h1>
        <DatePicker />
        <MultiDatePicker />
        <DateRangePicker />
      </div> */}

      {/* Landing Page */}
      <LandingPage />
    </>
  );
};

export default App;
