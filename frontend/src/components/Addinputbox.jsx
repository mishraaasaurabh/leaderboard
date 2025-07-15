import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import useStore from "../store/zstore.js";

const Addinputbox = (props) => {
    const { setSave } = useStore();
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!userName.trim()) {
            toast.error("Username cannot be empty!");
            return;
        }
        setLoading(true);
        const loadingToast = toast.loading("Adding user...");
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/register", {
                username: userName
            });
            toast.dismiss(loadingToast);
            toast.success("User added successfully!");
            setUserName('');
            setSave(true);
            props.setShowAddInput(false);
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error(err.response?.data?.error || "Error adding user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0e1621] text-white h-[250px] w-[450px] flex items-center justify-center relative inset-0 border rounded-2xl z-52">
            <div className="p-8 shadow-lg border-[#2f3e3c] w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add New User</h2>
                    <button
                        className="bg-green-600 hover:bg-green-700 transition px-4 py-1 rounded-full text-sm disabled:opacity-50"
                        onClick={handleSave}
                        disabled={!userName.trim() || loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
                <div>
                    <label htmlFor="user-name" className="block text-sm mb-2">User Name:</label>
                    <input
                        type="text"
                        id="user-name"
                        className="w-full p-3 rounded-full bg-[#1e2d2b] border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Addinputbox;