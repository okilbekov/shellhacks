import TaskItem from "./TaskItem"
import TaskItemOpen from "./TaskItemOpen"

const TaskList = ({ tasks }) => {

    return (
        <div>
            {tasks.map(task => (
                <>
                    <TaskItem task={task} />
                    <TaskItemOpen task={task} />
                </>
            ))}
        </div>
    )
}

export default TaskList