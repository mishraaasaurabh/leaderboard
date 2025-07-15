import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addinputbox from './Addinputbox';
import { toast } from 'react-toastify';
import useStore from '../store/zstore.js';

const DropDown = () => {
    const { save, setSave, setClaim } = useStore();
    const [user, setUser] = useState('');
    const [UserList, setUserList] = useState([]);
    const [showAddInput, setShowAddInput] = useState(false);
    const [claimLoading, setClaimLoading] = useState(false);

    const getUserList = async () => {
        const loadingToast = toast.loading("Fetching users...");
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users");
            setUserList(response.data);
            toast.dismiss(loadingToast);
            toast.success("User list updated!", { position: "top-center" });
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error fetching user list",err);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    useEffect(() => {
        if (save) {
            getUserList();
            setSave(false);
        }
    }, [save, setSave]);

    const handleClaim = async () => {
        if (!user) {
            toast.error("Please select a user to claim points.");
            return;
        }
        setClaimLoading(true);
        let min = 1;
        let max = 10;
        let points = Math.floor(Math.random() * (max - min + 1) + min);

        const selectedUser = UserList.find(u => u._id === user);
        const username = selectedUser?.Name || selectedUser?.username || selectedUser?.name;

        const loadingToast = toast.loading(`Claiming ${points} points for ${username}...`);

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/claim", {
                userId: user,
                points: points
            });
            toast.dismiss(loadingToast);
            toast.success(`${username} successfully claimed ${points} points`);
            getUserList();
            setClaim(true);
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Error claiming points. Please try again.");
        } finally {
            setClaimLoading(false);
        }
    };

    return (
        <div className="bg-[#192725] text-white min-h-screen flex items-center justify-center px-16 ">
            <div className="bg-[#1a2b2f] p-8 rounded-2xl shadow-2xl border border-[#2f3e3c] w-full max-w-md transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Select User</h2>
                    <button
                        className="bg-green-600 hover:bg-green-700 transition mx-5 px-4 py-1 rounded-full text-sm"
                        onClick={() => setShowAddInput(true)}
                    >
                        Add New User
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="user-select" className="block text-sm mb-2">
                            Select a User:
                        </label>
                        <select
                            id="user-select"
                            className="w-full p-3 rounded-full bg-[#1e2d2b] border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                        >
                            <option value="">-- Select User --</option>
                            {UserList.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.Name || user.username || user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            className="w-32 rounded-full p-2 mt-1 text-lg font-medium bg-green-600 hover:bg-green-700 transition duration-200 disabled:opacity-50"
                            onClick={handleClaim}
                            disabled={!user || claimLoading}
                        >
                            {claimLoading ? "Claiming..." : "Claim"}
                        </button>
                    </div>
                </div>
            </div>
            {showAddInput && (
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <Addinputbox setShowAddInput={setShowAddInput} />
                </div>
            )}
        </div>
    );
};

export default DropDown;