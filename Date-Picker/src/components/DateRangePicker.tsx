import { useState, useEffect } from "react";

function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysBetween, setDaysBetween] = useState(0);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysBetween(daysDifference);
    } else {
      setDaysBetween(0);
    }
  }, [startDate, endDate]);

  const handleDateSelect = (date:Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date > startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
    setCalendarOpen(false);
  };

  const handleMonthChange = (offset:any) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  const generateCalendar = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const daysInMonth = [];

    for (let i = 1 - startOfMonth.getDay(); i <= endOfMonth.getDate(); i++) {
      daysInMonth.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }
    return daysInMonth;
  };

  const renderCalendar = () => {
    const calendarDays = generateCalendar();

    return (
      <div className="absolute top-12 left-0 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-72 z-10">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-gray-500 hover:text-gray-800"
          >
            {"<"}
          </button>
          <span className="font-semibold">
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-gray-500 hover:text-gray-800"
          >
            {">"}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="font-semibold text-sm text-gray-600">
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center cursor-pointer rounded-full ${
                day.getMonth() !== currentMonth.getMonth()
                  ? "text-gray-300"
                  : "text-gray-800"
              } ${
                startDate && day.toDateString() === startDate.toDateString()
                  ? "bg-blue-500 text-white"
                  : endDate && day.toDateString() === endDate.toDateString()
                  ? "bg-blue-500 text-white"
                  : startDate && endDate && day > startDate && day < endDate
                  ? "bg-blue-200"
                  : "hover:bg-blue-100"
              }`}
              onClick={() =>
                day.getMonth() === currentMonth.getMonth() &&
                handleDateSelect(day)
              }
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative inline-block">
      <input
        type="text"
        value={
          startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} (${daysBetween} days)`
            : startDate
            ? `${startDate.toLocaleDateString()}`
            : ""
        }
        placeholder="Select date range"
        onFocus={() => setCalendarOpen(true)}
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isCalendarOpen && renderCalendar()}
    </div>
  );
}

export default DateRangePicker;
