import React, { useEffect, useState } from "react";
import { updateItem, viewAllItems } from "../../apiCalls";
import { useStateValue } from "../../StateProvider";

function ToDoBox() {
  //state context from datalayer
  const [state, dispatch] = useStateValue();
  const { listItems, completed } = state;

  //search bar searchtext
  const [listTitle, setlistTitle] = useState("");

  //this makes the component render once and everytime there is a change in listTitle
  useEffect(() => {
    if (listTitle.length > 0) {
      setList();
    } else {
      resetList();
    }
  }, [listTitle]);

  //this method sets the listItems array by filtering the title that was searched in the searchbar
  const setList = () => {
    viewAllItems().then((data) => {
      let todoList = data.filter((item) => item.completed === false);
      let completedList = data.filter((item) => item.completed === true);

      let setTodoList = todoList.filter(
        (item) => item.title.toLowerCase() === listTitle.toLowerCase()
      );
      let setCompletedList = completedList.filter(
        (item) => item.title.toLowerCase() === listTitle.toLowerCase()
      );

      console.log(data);
      dispatch({
        ...state,
        type: "list_data",
        listItems: setTodoList.length > 0 ? setTodoList : setCompletedList,
      });
    });
  };

  //this function resets the list to original listItems array
  const resetList = () => {
    viewAllItems().then((data) => {
      console.log(data);
      dispatch({
        ...state,
        type: "list_data",
        listItems: data.filter((item) => item.completed === false),
      });
    });
  };

  //this function triggers on clicking add button that opens up the form component for adding a new record
  const setAddButtonActions = () => {
    dispatch({
      ...state,
      type: "show_form",
      formMode: "add",
      displayForm: true,
    });
  };

  //this function triggers on clicking view button that opens up the form component for updating an existing record
  const setViewButtonActions = (e, listItem) => {
    dispatch({
      ...state,
      type: "view",
      formMode: "view",
      displayForm: true,
      currentItem: listItem,
    });
  };

  //this function triggers on marking an item as complete
  const setMarkAsCompleteActions = async (e, listItem) => {
    const changes = {
      completed: true,
    };

    const updatedItem = await updateItem(changes, listItem.id);

    dispatch({
      ...state,
      type: "completed",
      formMode: undefined,
      displayForm: false,
      currentItem: updatedItem,
    });
  };

  //this function triggers on marking an item as incomplete
  const setMarkAsToDoActions = async (e, listItem) => {
    const changes = {
      completed: false,
    };

    const updatedItem = await updateItem(changes, listItem.id);
    dispatch({
      ...state,
      type: "todo",
      formMode: undefined,
      displayForm: false,
      currentItem: updatedItem,
    });
  };

  return (
    <>
      {/* This box contains list items */}
      <div className="todo_box">
        {/* todo title */}
        <div className="todo_title_box">
          <h3 className="todo_title">To Do List</h3>
        </div>

        {/* todo content box contains list of items */}
        <div className="todo_content_box" id="content_box">
          {/* button to trigger a form to add new task  --> */}
          <button
            className="btn_add"
            id="btn_add"
            value="add"
            onClick={setAddButtonActions}
          >
            Add
          </button>

          {/* list title */}
          <div className="search_bar">
            <input
              type="search"
              id="id_title"
              name="title"
              placeholder="Search Titles"
              onChange={(e) => setlistTitle(e.target.value)}
              value={listTitle}
            />
          </div>

          {/* list of incomplete tasks */}
          <div
            id="todo_list"
            style={{
              display: listItems.length > 0 ? "block" : "none",
            }}
          >
            <h5 id="tasks">Tasks</h5>
            <ul id="todo_ul">
              {listItems.map((listItem, index) => (
                <li
                  key={`listItem-${index}`}
                  id={`listItem-${index}`}
                  className={listItem}
                  style={{ marginBottom: "10px" }}
                >
                  <span>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => setMarkAsCompleteActions(e, listItem)}
                    />
                    {listItem.title}
                  </span>
                  <button onClick={(e) => setViewButtonActions(e, listItem)}>
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* list of completed tasks */}
          <div
            id="completed_list"
            style={{
              display: completed.length > 0 ? "block" : "none",
            }}
          >
            <h5 id="completed">Completed</h5>
            <ul id="completed_ul">
              {completed.map((listItem, index) => (
                <li
                  key={`listItem-${index}`}
                  id={`listItem-${index}`}
                  className={listItem}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ textDecorationLine: "line-through" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => setMarkAsToDoActions(e, listItem)}
                    />
                    {listItem.title}
                  </span>
                  <button onClick={(e) => setViewButtonActions(e, listItem)}>
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoBox;
