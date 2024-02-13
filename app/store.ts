import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducer";
import loadingReducer from "./reducers/loadingReducer";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    loading: loadingReducer,
  },
});
