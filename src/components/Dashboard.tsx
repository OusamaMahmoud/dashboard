import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const Dashboard = () => {
  const { isAuthanticated, userInfo, token, setUserInfo } = useAuthStore();

  useEffect(() => {
    if (isAuthanticated && token) {
      // Call the user info API if token exists
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                email: "dev.aert@gmail.com", // Replace with dynamic email if needed
                password: "helloworld", // Replace with dynamic password if needed
                isEmployee: true,
              },
            }
          );

          if (response.status === 200) {
            setUserInfo({
              id: response.data.id,
              name: response.data.name,
            });
          }
        } catch (err: any) {
          console.error(err);
        }
      };

      fetchUserInfo();
    }
  }, [token, isAuthanticated]); // Run this effect when the token changes

  if (!token) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div>
      {userInfo ? (
        <div className="flex flex-col gap-4 p-10">
          <h1 className="text-lg font-bold">
            User ID: <span className="text-xl">{userInfo.id}</span>
          </h1>
          <p className="text-lg font-bold">
            User Name: <span className="text-xl ">{userInfo.name}!</span>
          </p>
        </div>
      ) : (
        <div className="flex w-96 flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
