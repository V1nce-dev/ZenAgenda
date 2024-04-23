import React, { useEffect, useState } from "react";
import useTask from "@/hooks/useTask";

interface Task {
  task: string;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const { fetchTask, createTask, deleteTask } = useTask();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTask();
      if (response) {
        setTasks(response.data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createTask(newTask);
    if (response) {
      setTasks([...tasks, { task: newTask }]);
      setNewTask("");
    }
  };

  const handleDelete = async (index: number) => {
    const response = await deleteTask();
    if (response) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} onClick={() => handleDelete(index)}>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
