import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const CreateTaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
        return null;
    }

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user/myProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setCurrentUser(data);
                    setAssignTo(data.id);
                } else {
                    throw new Error(data.msg || "Failed to fetch profile");
                }
            } catch (err) {
                console.error("Error fetching myProfile:", err);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user/allUsers", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                if (res.ok && Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    throw new Error("Invalid response: Expected an array of users");
                }
            } catch (err) {
                console.error("Error fetching allUsers:", err);
                setUsers([]);
            }
        };

        fetchMyProfile();
        fetchUsers();
    }, [token]);

    const handleCreateTask = async () => {
        console.log({title, description, assignTo, assignBy: currentUser?.id});

        if (!title || !description || !assignTo || !currentUser?.id) {
            alert("All fields are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/task/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    assignBy: currentUser.id,
                    assignTo,
                }),
            });

            const data = await res.json();
            console.log("Task creation response:", data);

            if (!res.ok) throw new Error(data.msg || "Failed to create task");

            alert("Task created successfully!");
            setTitle("");
            setDescription("");
            setAssignTo("");
        } catch (error) {
            console.error("Error creating task:", error);
            alert(error.message || "Something went wrong.");
        }
    };

    return (
        <>
            <h2 style={{ color: "black" }}>Create Task</h2>
            <Input
                label="Title"
                type="text"
                placeholder="Write your Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                label="Description"
                type="text"
                placeholder="Write your Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label="Assign By"
                type="text"
                value={currentUser?.name || ""}
                disabled
            />

            <div className="form-control">
                <label htmlFor="assignTo" style={{ color: "#000", fontWeight: "bold" }}>Assign To</label>
                <select
                    id="assignTo"
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    required
                >
                    <option value="">Select User</option>
                    {Array.isArray(users) && users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name} ({user.role})
                        </option>
                    ))}
                </select>
            </div>

            <Button text="Create Task" onClick={handleCreateTask} />
            <Button text="Close" onClick={() => window.location.reload()} style={{ marginLeft: "10px" }} />
        </>
    );
};

export default CreateTaskForm;
