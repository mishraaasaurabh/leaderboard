import axios from "axios";
import { useState } from "react";
import UseStore from "../store/zstore.js";

const LeaderBoard = () => {
    const {save,claim,setSave,setClaim} = UseStore();
  const [UserList, setUserList] = useState([]);

  const getUserList = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users")
      .then((response) => {
        setUserList(response.data);
        setSave(false);
        setClaim(false);
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
      });
  };

  if(save||claim){
    getUserList();
  }


  return (
    <div className="bg-[#1a2b2f] text-white  mx-auto mt-10 p-6 mb-[100px] rounded-2xl md:w-2/5 shadow-xl border border-[#2f3e3c] ">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Leaderboard</h2>

      {UserList.length === 0 ? (
        <p className="text-center text-gray-400">No users found.</p>
      ) : (
        <div className="space-y-4 h-[700px] overflow-y-auto max-h-[550px]">
              {/* <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2"> */}

          {UserList.sort((a, b) => b.Points - a.Points).map((user, index) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-[#223536] p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold px-2">
                  #{index + 1} {user.Name}
                </span>
              </div>
              <span className="text-green-400 font-bold">{user.Points} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;