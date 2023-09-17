import React, { useState } from 'react';
import useTasks from "../../hooks/useTasks";

const TaskItemClosed = ({ task, setOpen }) => {
    const [isSelected, setIsSelected] = useState(false);
    const { updateTask, deleteTask } = useTasks();

    const handleRadioChange = (e) => {
        e.stopPropagation();
        setIsSelected(!isSelected);
        const updatedTask = { ...task, completed: true };
        updateTask(task.id, updatedTask);

    };

    const handleDivClick = () => {
        setOpen(false);
    };

    return (
        <div>
            <div
                className="task-inner"
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
                        {/* {task.type} */} Personal
                    </p>
                    <p className="task-title">
                        {task.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TaskItemClosed