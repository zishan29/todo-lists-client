"use client";

import { MouseEvent, useState } from "react";

export default function TaskInput({
  updateTasks,
}: {
  updateTasks: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function addTask(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
    };
    try {
      let res = await fetch("https://todo-lists-api.adaptable.app/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        let resData = await res.json();
        console.log(resData);
        updateTasks();
        setName("");
        setDescription("");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="bg-neutral-700 px-4 py-6 grid grid-cols-3 gap-2 w-1/2">
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <button
          onClick={addTask}
          className="row-span-2 bg-orange-400 text-white rounded-3xl w-max h-max px-4 py-2 self-center ml-auto font-semibold text-sm"
        >
          Add Todo
        </button>
        <input
          type="text"
          id="name"
          className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          id="description"
          className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
    </>
  );
}
