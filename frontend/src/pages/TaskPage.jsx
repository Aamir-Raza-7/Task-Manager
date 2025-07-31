import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterSearchBar from "../components/FilterSearchBar";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import CreateTaskForm from "../components/CreateTaskForm";
import { useNavigate } from "react-router-dom";
import "./TaskPage.css";

const TaskPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({ user: "", status: "" });
    const [tasks, setTasks] = useState([]);
    const [createTask, setCreateTask] = useState(false);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8000/api/task/allTask", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setTasks(data.tasks || []);
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Failed to fetch tasks.");
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            alert("Something went wrong while fetching tasks.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (newFilters) => setFilters(newFilters);
    const uniqueRoles = [...new Set(tasks.map(task => task.assignBy?.role).filter(Boolean))];
    const handleTaskCreated = () => {
        fetchTasks();
    };



    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUser =
            !filters.user ||
            task.assignBy?.role === filters.user;

        const matchesStatus =
            !filters.status || task.status.toLowerCase() === filters.status.toLowerCase();

        return matchesSearch && matchesUser && matchesStatus;
    });

    return (
        <>
            <Navbar />
            <div className="task-container">
                <h1 style={{ color: "black" }}>Tasks</h1>
                <Button text="Create Task" onClick={() => setCreateTask(true)} />
                {createTask && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <CreateTaskForm
                                onClose={() => setCreateTask(false)}
                                onTaskCreated={handleTaskCreated}
                            />
                        </div>
                    </div>
                )}

            </div>

            <div className="search-container">
                <FilterSearchBar
                    search={searchTerm}
                    SearchChange={handleSearchChange}
                    onFilterChange={handleFilterChange}
                    userOptions={uniqueRoles}
                />
            </div>

            <div className="card-container">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => <TaskCard key={index} {...task} />)
                ) : (
                    <p style={{ textAlign: "center" }}>No tasks found.</p>
                )}
            </div>
        </>
    );
};

export default TaskPage;
