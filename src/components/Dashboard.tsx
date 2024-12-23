import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

interface UserInfo {
  id: string;
  name: string;
}

const Dashboard = () => {
  const { authState, logout } = useAuth(); // Assuming `useAuth` is where authentication context is managed
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState.token) {
      // Call the user info API if token exists
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("https://api-yeshtery.dev.meetusvr.com/v1/user/info", {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
            params: {
              email: "dev.aert@gmail.com", // Replace with dynamic email if needed
              password: "helloworld", // Replace with dynamic password if needed
              isEmployee: true,
            },
          });

          if (response.status === 200) {
            setUserInfo({
              id: response.data.id,
              name: response.data.name,
            });
          }
        } catch (err: any) {
          console.error(err);
          setError("Failed to fetch user info.");
        }
      };

      fetchUserInfo();
    }
  }, [authState.token]); // Run this effect when the token changes

  if (!authState.token) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {userInfo ? (
        <div className="flex flex-col gap-4 p-10">
          <h1 className="text-lg font-bold">
            User ID: <span className="text-xl">{userInfo.id}</span>
          </h1>
          <p className="text-lg font-bold">
            User Name: <span className="text-xl ">{userInfo.name}!</span>
          </p>

          <button
            onClick={() => {
              logout();
              //   navigate("/login");
            }}
            className="btn bg-[#9414FF] py-2 px-3 w-fit rounded-lg text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>Loading user information...</div>
      )}
    </div>
  );
};

export default Dashboard;
