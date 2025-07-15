    import axios from "axios";
    import React, { useState } from "react";
    import {  toast } from 'react-toastify';
    import  useStore  from "../store/zstore.js";




    const Addinputbox = (props) => {
        const {save,claim, setSave,setClaim } = useStore();
        const [userName, setUserName] = useState('');

        const handleSave = ()=>{
            props.setShowAddInput(false)
            axios.post(import.meta.env.VITE_BACKEND_URL+"/register",{
                username: userName
            })
            .then(response=>{
                toast.success("User added successfully!");
                console.log("User added successfully:", response.data);
                setSave(true);
            })
            .catch(err=>{
                console.error("Error adding user:", err);
            })
        }

        return (
            <>
            <div className="bg-[#0e1621] text-white h-[250px] w-[450px] flex items-center justify-center relative inset-0 border rounded-2xl  z-52">
                <div className="p-8  shadow-lg  border-[#2f3e3c] w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Add New User</h2>
                        <button className="bg-green-600 hover:bg-green-700 transition px-4 py-1 rounded-full text-sm"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>

                    <div>
                        <label htmlFor="user-name" className="block text-sm mb-2">User Name:</label>
                        <input
                            type="text"
                            id="user-name"
                            className="w-full p-3 rounded-full bg-[#1e2d2b] border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e)=>setUserName(e.target.value)}
                            />
                    </div>
                </div>
            </div>

                            </>
        )
    }
    export default Addinputbox;