import React, { useEffect, useState } from "react";
import { addItem, updateItem } from "../../apiCalls";
import { useStateValue } from "../../StateProvider";

function FormContent() {
  //state context from datalayer
  const [state, dispatch] = useStateValue();
  const { formMode, displayForm, currentItem } = state;

  //triggers once the component is rendered and everytime there is a change in state
  useEffect(() => {
    if (formMode === "add")
      //if the form is displayed for adding a new item, form fields are set to default values
      resetFieldValues();
    //if the form is displayed for updating existing values, form fields are set to existing values
    else setFieldValues(currentItem);
  }, [state]);

  //maintaining state of form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  //triggers for setting the form field values with existing record values
  const setFieldValues = (item) => {
    setTitle(item?.title);
    setDescription(item?.description);
    setDueDate(item?.due_date);
    setTime(item?.time);
  };

  //trigers for setting the form field values with default values
  const resetFieldValues = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setTime("");
  };

  //triggers this event when form is submitted
  const setAddorEditActions = async (e) => {
    e.preventDefault();
    const item = {
      title: title,
      description: description,
      due_date: dueDate,
      time: time,
    };

    if (formMode === "add") {
      const addedItem = await addItem(item);

      dispatch({
        ...state,
        type: formMode,
        displayForm: false,
        currentItem: addedItem,
      });
    } else if (formMode === "view") {
      const updatedItem = await updateItem(item, currentItem.id);

      dispatch({
        ...state,
        type: formMode,
        displayForm: false,
        currentItem: updatedItem,
      });
    }
    console.log(displayForm);
  };

  //triggers when hide button is clicked for hiding the form component
  const setHideButtonActions = (event) => {
    event.preventDefault();
    dispatch({
      ...state,
      type: "hide_form",
      formMode: undefined,
      currentItem: undefined,
      displayForm: false,
    });
  };

  return (
    <div
      className="form_content"
      //when displayForm is set to true, form component is displayed, when set to false, it is hidden
      style={{ display: displayForm === true ? "block" : "none" }}
    >
      {/* this box contains form element */}
      <form onSubmit={setAddorEditActions}>
        {/* list title */}
        <div className="form_group1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="id_title"
            name="title"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        {/* list description */}
        <div className="form_group2">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="id_desc"
            name="desc"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        {/* list due date */}
        <div className="form_group3">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="id_duedate"
            name="due_date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </div>

        {/* list time */}
        <div className="form_group4">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="id_time"
            name="time"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />
        </div>

        {/* list time */}
        <div class="form_group5">
          <label for="status">Status</label>
          <input
            type="text"
            id="id_status"
            name="status"
            value={currentItem?.completed ? "Completed" : "To Be Completed"}
            readOnly
          />
        </div>

        {/* this form group contains two buttons "Hide" ( to hide the form ) "Add/Update" (to add/update the task) */}
        <div className="form_group6">
          <button className="submit_btn" type="submit">
            {formMode === "add" ? "Add" : "Update"}
          </button>
          <button className="exit_btn" onClick={setHideButtonActions}>
            Hide
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormContent;
