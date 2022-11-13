import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import {Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
} from "./store/task";
const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <p>Errors: {error}</p>;
  }

  return (
    <>
      <h1> App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>
              Change title
            </button>
            <button onClick={() => deleteTask(el.id)}>
              Delete
            </button>
            <button onClick={() => deleteTask(el.id)}>
              Create
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
