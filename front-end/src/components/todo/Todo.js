/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Todo.css';
import TodoCard from '../todoCard/TodoCard.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update.js';
import axios from "axios";
import note2 from '../../asset/note2.jpg'


import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

let toUpdateArray = [];
const Todo = () => {
    let id = sessionStorage.getItem("id")
    const [Input, setInput] = useState({ title: "", body: "", deadline: null });
    const [Array, setArray] = useState([]);
    const [showTextarea, setShowTextarea] = useState(false);




    const [selectedId, setSelectedId] = useState([]);


    const changeDate = (newDate) => {
        // Check if the newDate is a valid dayjs object before calling toISOString
        if (newDate && newDate.isValid()) {
            setInput(prevState => ({
                ...prevState,
                deadline: newDate.toISOString(), // Store the date in ISO format
            }));
        } else {
            // If the date is invalid, reset the deadline to null
            console.error("Invalid date value:", newDate);
            setInput(prevState => ({
                ...prevState,
                deadline: null, // Reset to null if invalid date
            }));
        }
    };


    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    };

    const submit = async () => {
        if (Input.title && Input.body && Input.deadline) {
            if (id) {
                // Ensure Input.deadline is a dayjs object, then convert it to an ISO string
                const deadlineISOString = dayjs(Input.deadline).toISOString();

                await axios.post("http://localhost:5000/api/v2/addTask", {
                    title: Input.title,
                    body: Input.body,
                    id: id,
                    deadline: deadlineISOString, // Send the ISO string of the deadline
                }).then((response) => {
                    console.log(response);
                });

                setInput({ title: "", body: "", deadline: "" });
                toast.success("You added successfully");
            } else {
                setArray([...Array, Input]);
                setInput({ title: "", body: "", deadline: "" });
                toast.success("You added successfully");
                toast.error("Please sign up");
            }
        } else {
            console.log("Both fields are required!");
        }
    };


    const handleFocus = () => {
        if (showTextarea) {
            setShowTextarea(false); // Hide the textarea if it is visible
        }
    };


    const handleClick = () => {
        setShowTextarea((prev) => !prev); // Toggle between true and false
    };
    const del = async (cardid) => {
        if (id) {
            await axios.delete(`http://localhost:5000/api/v2/deleteTask/${cardid}`, {
                data: { id: id },

            }).then((response) => {
                toast.success("your task is deleted")
            })
        } else {
            toast.error("please signup")
        }

    };

    const toggleDisplay = (id) => {
        const displayComponent = document.getElementById('displayComponent');
        if (displayComponent.style.display === 'none') {
            displayComponent.style.display = 'block'; // Show the component
        } else {
            displayComponent.style.display = 'none';
        }
        setSelectedId(Array[id]);

    };

    const update = (value) => {
        toUpdateArray = Array[value]
    }

    const toggleStatus = async (taskId) => {
        if (id) {
            const task = Array.find((task) => task._id === taskId);
            const newStatus = task.status === 'Completed' ? 'Incomplete' : 'Completed';

            try {
                // PATCH request to update task status
                const response = await axios.patch(
                    `http://localhost:5000/api/v2/updateTaskStatus/${taskId}`,  // <-- This line was modified
                    { status: newStatus }
                );

                // Update the task in the state with the new status
                setArray((prevArray) =>
                    prevArray.map((task) =>
                        task._id === taskId ? { ...task, status: newStatus } : task
                    )
                );
                toast.success(response.data.message);
            } catch (error) {
                toast.error('Failed to update task status');
            }
        } else {
            toast.error('Please sign up');
        }
    };


    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios.get(`http://localhost:5000/api/v2/getTask/${id}`).then((response) => {
                    setArray(response.data.list)
                })
            }
            fetch()
        } else {
            toast.error("please signup!");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, submit])

    return (
        <>
            <div className="max-w-[100vw] h-screen bg-cover bg-center relative  body" style={{
        backgroundImage: `url(${note2})`,
        backgroundSize: 'cover', // Ensures the background image covers the whole element
        backgroundPosition: 'center', // Centers the background image
        backgroundRepeat: 'no-repeat', // Prevents background repetition
        width: '100vw', // Full width of the viewport
        height: '100vh', // Full height of the viewport
      }}>
                <ToastContainer />
                {/* Input Section */}
                <div className="mx-auto flex justify-center mt-8">
                    <div className="w-full sm:w-[40vw] rounded-xl shadow-lg bg-gradient-to-r from-indigo-200 via-pink-300 to-yellow-200 p-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 animate__animated animate__fadeIn">
                            Create a New Task
                        </h2>
                        <div>
                            {/* Title input field */}
                            <input
                                className="p-4 w-full block h-[5vh] border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4 transition-all duration-300 hover:bg-indigo-100 focus:outline-none placeholder:transition-all placeholder:duration-300 placeholder:text-gray-500 focus:placeholder:text-indigo-500"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={Input.title}
                                onChange={change}
                                onClick={handleClick} // Trigger animation for textarea visibility
                            />


                            {/* Body textarea, only rendered when showTextarea is true */}
                            {showTextarea && (
                                <textarea
                                    className="p-4 w-full block h-[15vh] border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4 transition-all duration-500 opacity-100 ease-linear"
                                    placeholder="Body"
                                    name="body"
                                    value={Input.body}
                                    onChange={change}
                                />

                            )}
                        </div>

                        <div onFocus={handleFocus}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Deadline"
                                        value={Input.deadline ? dayjs(Input.deadline) : null} // Convert the deadline to dayjs format
                                        onChange={changeDate} // Add the onChange handler
                                        className="transition-all duration-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" // Tailwind styling added here
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                        </div>

                        <button
                            onClick={submit}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow-lg transition-all duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add Task
                        </button>
                    </div>

                </div>

                {/* Tasks Section */}
                <div className='flex justify-center '>
                    <div className='shadow-lg  outline-none h-[40vh] border-none flex  justify-center gap-5 flex-wrap m-4 bg-[#0000006a] w-[95vw] p-5 rounded-lg  max-h-[80vh] overflow-x-hidden overflow-y-scroll'>
                        {Array && Array.map((item, index) => (
                            <div key={index}> <TodoCard
                                todo={item}
                                id={item._id}
                                delId={del} toggleDisplay={toggleDisplay}
                                updateId={index}
                                toBeUpdate={update}
                                toggleStatus={toggleStatus} /></div>


                        ))}
                    </div>
                </div>

            </div>
            <div id="displayComponent" style={{ display: 'none' }} className='duration-100 absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]  '>
                <Update toggle={toggleDisplay} data={selectedId} update={toUpdateArray} /></div>
        </>
    );
};

export default Todo;
