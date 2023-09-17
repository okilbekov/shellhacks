const TaskItem = ({ task }) => {

    return (
        <div>
             <div className="task-inner">
            <div className="task-btn">
                <input type="radio" />
            </div>
            <div className="task-info">
                <p className="task-type">
                    {/* {task.type} */} Personal
                </p>
                <p className="task-title">
                    {task.title }
                </p>
            </div>
        </div>
        </div>
    )
}

export default TaskItem