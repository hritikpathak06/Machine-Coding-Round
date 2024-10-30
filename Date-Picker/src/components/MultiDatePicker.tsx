import { useState, useEffect } from "react";

function MultiDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  ); // Next month
  const [daysBetween, setDaysBetween] = useState(0);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysBetween(daysDifference);
    }
  }, [startDate, endDate]);

  const handleDateSelect = (date: any, type: any) => {
    if (type === "start") {
      setStartDate(date);
      if (endDate && date > endDate) setEndDate(null); // Reset endDate if it's before startDate
    } else {
      setEndDate(date);
    }
  };

  const handleMonthChange = (offset: any, type: any) => {
    if (type === "start") {
      setStartMonth(
        new Date(startMonth.getFullYear(), startMonth.getMonth() + offset, 1)
      );
    } else {
      setEndMonth(
        new Date(endMonth.getFullYear(), endMonth.getMonth() + offset, 1)
      );
    }
  };

  const generateCalendar = (month: any) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInMonth = [];

    for (let i = 1 - startOfMonth.getDay(); i <= endOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return daysInMonth;
  };

  const renderCalendar = (month: any, type: any) => {
    const calendarDays = generateCalendar(month);

    return (
      <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-72">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => handleMonthChange(-1, type)}
            className="text-gray-500 hover:text-gray-800"
          >
            {"<"}
          </button>
          <span className="font-semibold">
            {month.toLocaleString("default", { month: "long" })}{" "}
            {month.getFullYear()}
          </span>
          <button
            onClick={() => handleMonthChange(1, type)}
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
                day.getMonth() !== month.getMonth()
                  ? "text-gray-300"
                  : "text-gray-800"
              } ${
                day.getTime() === (startDate && startDate.getTime()) ||
                day.getTime() === (endDate && endDate.getTime())
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() =>
                day.getMonth() === month.getMonth() &&
                handleDateSelect(day, type)
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
      {/* Single input field for the date range */}
      <input
        type="text"
        value={
          startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} (${daysBetween} days)`
            : ""
        }
        placeholder="Select date range"
        onFocus={() => setCalendarOpen(true)}
        readOnly
        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Render two calendars if open */}
      {isCalendarOpen && (
        <div className="flex gap-8 absolute top-12 z-10">
          {renderCalendar(startMonth, "start")}
          {renderCalendar(endMonth, "end")}
        </div>
      )}
    </div>
  );
}

export default MultiDatePicker;
