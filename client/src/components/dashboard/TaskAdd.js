const TaskAdd = () => {
    return (
        <div className="tasks-add">
            <input className="task-input" type="text" id="name" name="name" placeholder="Add task" />
            <div className="task-submit btn">
                Submit
            </div>
        </div>
    );
}

export default TaskAdd;