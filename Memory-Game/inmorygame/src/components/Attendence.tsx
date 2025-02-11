import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserTypes {
  name: String;
  role: String;
  department: String;
  attendance: any[];
}

const AttendanceTable = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [pages, setPages] = useState<number>(2);

  const navigate = useNavigate();

  const users: UserTypes[] = [
    {
      name: "Adarsh Gupta",
      role: "Sales Executive",
      department: "Sales",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Ritik Pathak",
      role: "Manager",
      department: "Sales",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Aman Sharma",
      role: "Software Engineer",
      department: "IT",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Sanya Verma",
      role: "HR Manager",
      department: "Human Resources",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Rahul Mehta",
      role: "Marketing Lead",
      department: "Marketing",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Neha Kapoor",
      role: "Accountant",
      department: "Finance",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Vikas Yadav",
      role: "Data Analyst",
      department: "Analytics",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Pooja Singh",
      role: "Content Writer",
      department: "Marketing",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Rohan Das",
      role: "Graphic Designer",
      department: "Design",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Anjali Nair",
      role: "Sales Representative",
      department: "Sales",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Siddharth Rao",
      role: "Software Engineer",
      department: "IT",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Meera Joshi",
      role: "HR Executive",
      department: "Human Resources",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Kunal Bansal",
      role: "Finance Manager",
      department: "Finance",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Divya Patel",
      role: "Business Analyst",
      department: "Operations",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Manoj Tiwari",
      role: "Technical Lead",
      department: "IT",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Shruti Saxena",
      role: "Recruiter",
      department: "Human Resources",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Rajesh Kumar",
      role: "Operations Manager",
      department: "Operations",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Swati Mishra",
      role: "Software Developer",
      department: "IT",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Nitin Aggarwal",
      role: "Customer Support Executive",
      department: "Support",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
    {
      name: "Komal Arora",
      role: "Product Manager",
      department: "Product",
      attendance: Array.from(
        { length: new Date(year, month, 0).getDate() },
        () => (Math.random() > 0.5 ? "Present" : "Absent")
      ),
    },
  ];

  console.log("Saerch Input===>> ", searchInput);

  const daysInMonth = new Date(year, month, 0).getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filtered_users = users.filter((user: UserTypes) => {
    return (
      user.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ||
      user.role.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
  });

  const totalPages = filtered_users.length / 10;

  const start_index = (pages - 1) * 10;
  const end_index = start_index + 10;

  const sliced_users = filtered_users.slice(start_index, end_index);

  
  useEffect(() => {
    const search_params = new URLSearchParams();
  
    if (searchInput.trim() !== "") {
      search_params.set("name", searchInput);
    }
    if (month) {
      search_params.set("month", monthNames[month - 1]);
    }
    if (year) {
      search_params.set("year", year.toString());
    }

  
    navigate(`?${search_params.toString()}`, { replace: true });
  }, [searchInput, month, year, navigate]); 
  

  return (
    <div className="p-4 w-full">
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e: any) => setYear(e.target.value)}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e: any) => setMonth(e.target.value)}
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Type Name or role"
          className=" border text-sm p-1"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="w-full overflow-x-auto  h-[80vh]">
        <table className="w-full border-collapse border border-black text-sm min-w-[1000px]">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-2 border w-[320px] bg-gray-900 ">User Name</th>
              <th className="p-2 border w-[10%]  bg-gray-900">No. of Days</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="p-2 border w-[5%] min-w-[50px]">
                  {monthNames[month - 1].slice(0, 3)}, {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered_users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border text-left">
                  <strong>{user.name}</strong>
                  <br />
                  <span className="text-gray-500">{user.role}</span>
                  <br />
                  <span className="text-gray-500">{user.department}</span>
                </td>
                <td className="p-2 border">
                  {
                    user.attendance.filter((status) => status === "Present")
                      .length
                  }
                </td>
                {user.attendance.map((status, i) => (
                  <td key={i} className={`p-2 border `}>
                    {status === "Present" ? "Present" : "~~"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className=" flex flex-col items-end w-full  px-4 mt-5">
        <div className=" flex gap-2 items-center">
          <button>{"<"}</button>
          <h1>
            page {pages} out of {totalPages}
          </h1>
          <button>{">"}</button>
        </div>
      </div> */}
    </div>
  );
};

export default AttendanceTable;
