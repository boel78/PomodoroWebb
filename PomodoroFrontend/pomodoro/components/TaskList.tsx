import { Button } from "./ui/button";
import InputWithLabel from "./ui/input-with-label";

type TaskListProps = {
    taskList: {id: number, text: string}[]
    setTaskList: React.Dispatch<React.SetStateAction<{id: number, text:string}[]>>
    handleCompleteTask: () => void
}

export default function TaskList({taskList, setTaskList, handleCompleteTask} : TaskListProps){

    const addTask = () => {
        const newTaskObj = { id: taskList.length, text: "" };
        setTaskList([...taskList, newTaskObj])
    }

    const handleTask = (id:number, newText:string) => {
        const newTaskList = taskList.map((task) => {
            if(task.id === id){
                return {id: task.id, text: newText}
            }
            return task
        })
        setTaskList(newTaskList)
    }

    const deleteTask = (id:number) => {
        const newTaskList = taskList.filter((task) => task.id !== id)
        setTaskList(newTaskList)
        handleCompleteTask()
    }

    return(
        <div className="flex flex-col gap-4 items-center bg-tomato-100 w-full rounded-md shadow-md pb-5">
            <h2 className='font-medium'>Task List</h2>
            {taskList.map((task) => {
                return(
                    <div key={task.id} className="flex flex-nowrap w-4/6 items-end gap-4">
                        <InputWithLabel label="Text" name="Text" id="Text" value={task.text} onChange={(e) => handleTask(task.id, e.target.value)}/>
                        <Button variant={'destructive'} onClick={() => deleteTask(task.id)}>Delete</Button>
                    </div>
                )
            })}
            <Button variant={'outline'} className="bg-tomato-700 min-w-20 w-1/3 text-white" onClick={addTask}>New Task</Button>
        </div>
    )
}