import TaskItem from "./TaskItem"
import TaskItemOpen from "./TaskItemOpen"

const TaskList = ({ tasks }) => {

    return (
        <div>
            {tasks.map(task => (
                <div
                    key = { task.id }
                >
                    <TaskItem task={task} />
                    <TaskItemOpen task={task} />
                </div>
            ))}
        </div>
    )
}

export default TaskList