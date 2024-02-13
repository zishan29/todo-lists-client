"use client";

import { MouseEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../reducers/loadingReducer";

interface LoadingState {
  loading: boolean;
}

interface Errors {
  name: string[];
  description: string[];
}

export default function TaskInput({
  updateTasks,
}: {
  updateTasks: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: { loading: LoadingState }) => state.loading.loading
  );

  async function addTask(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(setLoading(true));
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
        updateTasks();
        setName("");
        setDescription("");
      }
      if (res.status === 400) {
        let resData = await res.json();
        setErrors(resData.errors);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <>
      <div className="bg-neutral-700 px-4 py-6 hidden md:grid grid-cols-3 gap-2 md:w-4/5 lg:w-1/2 ">
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <div className="ml-auto row-span-2 flex items-center gap-3">
          <div className="text-white text-lg self-center ">
            {loading ? (
              <div className="flex-col gap-4 w-full flex">
                <div className="w-8 h-8 border-4 text-orange-400 text-4xl animate-spin border-white flex items-center border-t-orange-400 rounded-full"></div>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={addTask}
            className=" bg-orange-400 text-white rounded-3xl w-max h-max px-4 py-2 self-center font-semibold text-sm hover:bg-white hover:text-orange-400 active:bg-gray-200 transition-all transform outline-none focus:outline-orange-400 focus:outline-offset-2"
          >
            Add Todo
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="name"
            className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors && errors.name !== null ? (
            <div className="text-gray-200 text-sm">{errors.name}</div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="description"
            className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors && errors.description !== null ? (
            <div className="text-gray-200 text-sm">{errors.description}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bg-neutral-700 px-4 py-6 grid md:hidden grid-cols-2 gap-2 w-11/12">
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="name"
            className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors && errors.name !== null ? (
            <div className="text-gray-200 text-sm">{errors.name}</div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="description"
            className="rounded-lg h-8 border border-orange-400 px-1 outline-orange-400"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors && errors.description !== null ? (
            <div className="text-gray-200 text-sm">{errors.description}</div>
          ) : (
            ""
          )}
        </div>
        <div className="ml-auto col-span-2 self-center flex items-center gap-3">
          <div className="text-white text-lg self-center ">
            {loading ? (
              <div className="flex-col gap-4 w-full flex">
                <div className="w-8 h-8 border-4 text-orange-400 text-4xl animate-spin border-white flex items-center border-t-orange-400 rounded-full"></div>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={addTask}
            className=" bg-orange-400 text-white rounded-3xl w-max h-max px-4 py-2 self-center font-semibold text-sm hover:bg-white hover:text-orange-400 active:bg-gray-200 transition-all transform outline-none focus:outline-orange-400 focus:outline-offset-2"
          >
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
}
