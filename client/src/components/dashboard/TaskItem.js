import { useState } from 'react'
import TaskItemClosed from './TaskItemClosed'
import TaskItemOpen from './TaskItemOpen'

const TaskItem = ({ task }) => {
    const [open, setOpen] = useState(false)

    return (
        open ? <TaskItemOpen task={task} setOpen={setOpen} />
            : <TaskItemClosed task={task} setOpen={setOpen} />
    )
}

export default TaskItem