import TaskItem from "./TaskItem"
import TaskItemOpen from "./TaskItemOpen"
import useTasks from "../../hooks/useTasks"

const TaskList = () => {
    const { tasks } = useTasks()

    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TaskList