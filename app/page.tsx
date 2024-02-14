"use client";

import { useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { setTasks } from "./reducers/taskReducer";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./reducers/loadingReducer";

interface LoadingState {
  loading: boolean;
}

interface Task {
  name?: string;
  description?: string;
  status?: string;
  _id?: string;
}

interface TaskState {
  tasks: Task[];
}

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: { tasks: TaskState }) => state.tasks.tasks);
  const loading = useSelector(
    (state: { loading: LoadingState }) => state.loading.loading
  );

  useEffect(() => {
    updateTasks();
  }, []);

  async function updateTasks() {
    try {
      dispatch(setLoading(true));
      let res = await fetch("https://todo-lists-api.adaptable.app/tasks");
      if (res.ok) {
        let resData = await res.json();
        dispatch(setTasks(resData.tasks));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 bg-neutral-800 gap-6">
      <div className="text-white font-semibold text-3xl">My Todos</div>
      <TaskInput updateTasks={updateTasks} />
      {loading ? (
        <div className="flex-col gap-4 w-max flex">
          <div className="w-8 h-8 border-4 text-orange-400 text-4xl animate-spin border-white flex items-center border-t-orange-400 rounded-full"></div>
        </div>
      ) : tasks.length > 0 ? (
        <TaskList tasks={tasks} updateTasks={updateTasks} />
      ) : (
        <div className="text-white text-lg">No todos to display</div>
      )}
    </main>
  );
}
