import React, { useState } from 'react';
import useTasks from "../../hooks/useTasks";

const TaskItemOpen = ({ task, setOpen }) => {
    const [isSelected, setIsSelected] = useState(false);
    const { updateTask, deleteTask } = useTasks();

    const handleRadioChange = (e) => {
        e.stopPropagation();
        setIsSelected(!isSelected);
        // set task completed to true, and update task(updatedTask)
        const updatedTask = { ...task, completed: true };
        updateTask(task.id, updatedTask);
        
    };

    const handleDivClick = () => {
        setOpen(false);
    };

    return (
        <div 
            className={`task-inner ${isSelected ? 'selected-task' : ''}`}
            onClick={handleDivClick}
        >
            <div className="task-btn">
                <input 
                    type="radio"
                    checked={isSelected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleRadioChange}
                />
            </div>
            <div className="task-info">
                <p className="task-type">
                    {task.type || "DefaultType"}
                </p>
                <p className="task-title">
                    {task.title || "DefaultTitle"}
                </p>
                <div className="task-info__details">
                    <div className="task-date">
                        <p className="task-date__datetext">
                            Date:
                        </p>
                        <p className="task-date__deadline">
                            {task.date}
                        </p>
                    </div>
                    <div className="task-duration">
                        <p className="duration-text">
                            Duration:
                        </p>
                        <p className="duration-time">
                            {task.duration}
                        </p>
                    </div>
                    <div className="task-priority">
                        <p className="priority-text">
                            Priority:
                        </p>
                        <p className="priority-id">
                            {task.priority}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItemOpen;