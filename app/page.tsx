"use client";

import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

interface Task {
  name?: string;
  description?: string;
  status?: string;
  _id?: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    updateTasks();
  }, []);

  async function updateTasks() {
    try {
      let res = await fetch("https://todo-lists-api.adaptable.app/tasks");
      if (res.ok) {
        let resData = await res.json();
        setTasks(resData.tasks);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-neutral-800 gap-6">
      <div className="text-white font-semibold text-3xl">My Todos</div>
      <TaskInput updateTasks={updateTasks} />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} updateTasks={updateTasks} />
      ) : (
        <div className="text-white text-lg">No todos to display</div>
      )}
    </main>
  );
}
