import { useState, useRef, useEffect } from "react";
import "./TaskCard.css";
import Button from "./Button";

const TaskCard = ({ title, description, assignBy, assignTo, status, date }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsHovered(true);
      document.body.classList.add("global-blur");
    }, 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setIsHovered(false);
    document.body.classList.remove("global-blur");
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      document.body.classList.remove("global-blur");
    };
  }, []);

  const handleEdit = () => {
    console.log("Edit button clicked");
  }

  const handleDelete = () => {
    console.log("Delete button clicked");
  }
  

  return (
    <div
      className={`task-card ${status.toLowerCase().replace(/\s/g, "-")} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-top">
        <div className="card-title-desc">
          <h3>{title}</h3>
          <p className={`description ${isHovered ? "expanded" : ""}`}>
            {description}
          </p>
        </div>
        <div className={`status-box ${status.toLowerCase()}`}>
          {status}
        </div>
      </div>

      <div className="card-bottom">
        <div className="assign-info">
          <small><strong>AssignBy:</strong> {assignBy?.name || "Unknown"} ({assignBy?.role})</small>
          <small><strong>AssignTo:</strong> {assignTo?.name || "Unknown"} ({assignTo?.role})</small>
        </div>
        <div className="date-info">
          <small>
            <strong>Date:</strong>{" "}
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
        </div>
      </div>
      <span>
        <Button text="edit" onClick={() => console.log("Edit button clicked")} />
      </span>
      <span>
        <Button text="delete" onClick={() => console.log("Delete button clicked")} />
      </span>
    </div>
  );
};

export default TaskCard;
