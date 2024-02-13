"use client";

import { MouseEvent } from "react";
import clsx from "clsx";

interface Task {
  name?: string;
  description?: string;
  status?: string;
  _id?: string;
}

export default function TaskList({
  tasks,
  updateTasks,
}: {
  tasks: Task[];
  updateTasks: () => void;
}) {
  async function updateTask(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const updatedData = {
      status: "Completed",
      id: id,
    };
    try {
      let res = await fetch("https://todo-lists-api.adaptable.app/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        updateTasks();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    const data = {
      id: id,
    };
    try {
      let res = await fetch("https://todo-lists-api.adaptable.app/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        updateTasks();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="grow text-white w-1/2 flex flex-col gap-1">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-neutral-700 w-full flex px-4 py-3 gap-4"
          >
            <div className="flex flex-col mr-auto">
              <div className="text-orange-400 text-3xl font-semibold">
                <span
                  className={clsx({
                    "line-through": task.status === "Completed",
                    "text-neutral-500": task.status === "Completed",
                  })}
                >
                  {task.name}
                </span>
              </div>
              <div
                className={clsx("", {
                  "line-through": task.status === "Completed",
                  "text-neutral-500": task.status === "Completed",
                })}
              >
                {task.description}
              </div>
            </div>
            {task.status === "InComplete" ? (
              <button
                onClick={(e) => updateTask(e, task._id as string)}
                className="row-span-2 self-center bg-white text-green-500 border border-green-500 w-max h-max px-3 py-1 rounded-2xl text-sm font-semibold hover:bg-green-500 hover:text-white active:bg-green-600 transition-all transform outline-none focus:outline-green-500 focus:outline-offset-2"
              >
                Complete
              </button>
            ) : (
              ""
            )}

            <button
              onClick={(e) => deleteTask(e, task._id as string)}
              className="row-span-2 self-center bg-white text-red-500 border border-red-500 w-max h-max px-3 py-1 rounded-2xl text-sm font-semibold hover:bg-red-500 hover:text-white active:bg-red-600 transition-all transform outline-none focus:outline-red-500 focus:outline-offset-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
