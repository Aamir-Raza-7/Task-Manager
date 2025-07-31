import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:8000/api/user/myProfile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setUserData(data);
                } else {
                    console.error("Error fetching user data:", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1 style={{ color: "black" }}>Hello, {userData ? userData.name : "Loading..."}</h1>
            </div>
        </div>
    );
};

export default DashboardPage;
