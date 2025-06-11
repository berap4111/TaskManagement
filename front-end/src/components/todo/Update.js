import axios from "axios";
import { useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Update = ({ toggle, data, update }) => {
    const [Input, setInput] = useState({ title: "", body: "" });

    useEffect(() => {
        if (update) {
            setInput({ title: update.title || "", body: update.body || "" });
        }
    }, [update]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    };

    const handleSave =async () => {
        await axios.put(`http://localhost:5000/api/v2/updateTask/${update._id}`,Input).then((response)=>{
            toast.success(response.data.message);
            toggle()
        })
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 h-[400px]">
            <div className="w-[90vw] sm:w-[50vw] bg-white rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Todo</h2>
                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>
                        <input
                            onChange={handleInputChange}
                            value={Input.title}
                            type="text"
                            id="title"
                            name="title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the title"
                        />
                    </div>
                    {/* Body Input */}
                    <div>
                        <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            onChange={handleInputChange}
                            value={Input.body}
                            id="body"
                            name="body"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the description"
                        ></textarea>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button
                        onClick={handleSave}
                            type="button"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
                        >
                            Update Todo
                        </button>
                        <button
                            onClick={toggle}
                            type="button"
                            className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-200"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
