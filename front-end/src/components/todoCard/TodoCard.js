import React from 'react';
import "./todoCard.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en";  // To ensure proper localization, e.g., AM/PM format

dayjs.extend(utc);
dayjs.extend(timezone);

const TodoCard = ({ todo, id, delId, toggleDisplay, updateId, toBeUpdate, toggleStatus }) => {
    const convertToIST = (utcDate) => {
        // Convert the UTC date string to IST and format it nicely
        return dayjs(utcDate).tz("Asia/Kolkata").format("dddd, MMMM D, YYYY [at] h:mm A");
    };

    const utcDate = todo.deadline;
    const istDate = convertToIST(utcDate); // Convert deadline to IST

    const togglea = () => {
        toggleDisplay(id);
        toBeUpdate(updateId);
    };

    return (
        <div className="todo relative min-h-[20vh] h-[30vh] flex flex-col w-[22vw] bg-gradient-to-r from-slate-600 via-slate-700 to-slate-900 text-white px-6 py-2 rounded-2xl shadow-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
    <div className="h-[100%]">
        {/* Title */}
        <h5 className="self-auto p-1   text-center mb-1 font-bold text-3xl align-content-center bg-[#5b45457c] border-none outline-none shadow-lg rounded-lg text-[#090909] break-words overflow-hidden text-ellipsis line-clamp-1">
            {todo.title}
        </h5>
        {/* Body */}
        <p onClick={togglea} className="h-[37%] break-words  text-[#ffffff] text-2xl line-clamp-4 mb-1">
  {todo.body}
</p>
        {/* Deadline */}
        <p className="absolute bottom-12 p-1 text-sm text-[#f97400] font-bold">
            <span className="text-lg font-bold text-[#f91300] ">Deadline:</span> {istDate}
        </p>
    </div>

    <div className="flex justify-around gap-2">
        {/* Update Button */}
        <button
            onClick={togglea}
            className="bg-green-600 h-[2rem] flex items-center justify-center w-[4rem] text-white px-3 rounded-full shadow-md hover:bg-green-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:w-auto"
        >
            Update
        </button>

        {/* Conditional styling for task status */}
        <button
            onClick={() => toggleStatus(todo._id, todo.status)}
            className={`px-3 py-1 rounded-full h-[2rem] flex items-center justify-center shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:w-auto
                ${todo.status === 'Completed' ? 'bg-[#0b9706] hover:bg-green-700' : 'bg-[#f46060] hover:bg-red-700'}`}
        >
            {todo.status === 'Completed' ? 'Incomplete' : 'Complete'}
        </button>

        {/* Delete Button */}
        <button
            onClick={() => delId(id)}
            className="bg-red-600 h-[2rem] flex items-center justify-center w-[4rem] text-white px-3 py-1 rounded-full shadow-md hover:bg-red-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:w-auto"
        >
            Delete
        </button>
    </div>
</div>

    );
};

export default TodoCard;
