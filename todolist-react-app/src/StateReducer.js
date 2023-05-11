//initialState
export const initialState = {
  listItems: [],
  completed: [],
  formMode: undefined,
  currentItem: undefined,
  displayForm: false,
};

/* reducer takes two arguments state and action. 
Based on a particular action which is dispatched from the respective component, 
the reducer provides the modified state to the datalayer which provides state to all the children */

export const reducer = (state, action) => {
  switch (action.type) {
    //this action is dispatched from FromContent component for adding a new item to the list
    case "add":
      let existingList = [...state.listItems];
      if (!existingList.includes(action.currentItem.title))
        existingList.push(action.currentItem);
      return {
        ...state,
        listItems: existingList,
        currentItem: action.currentItem,
        formMode: action.formMode,
        displayForm: action.displayForm,
      };

    //this action is dispatched from ToDoBox component for viewing an existing item in detailed view from the list
    case "view":
      return {
        ...state,
        currentItem: action.currentItem,
        listItems: state.listItems.map((item) =>
          item.id === action.currentItem.id ? action.currentItem : item
        ),
        formMode: action.formMode,
        displayForm: action.displayForm,
      };

    //this action is dispatched from ToDoBox component for deleting an existing item from the list
    case "delete":
      return {
        ...state,
        currentItem: action.currentItem,
        formMode: undefined,
        displayForm: false,
      };

    //this action is dispatched from ToDoBox component for rendering and displaying the FormContent component
    case "show_form":
      return {
        ...state,
        displayForm: true,
        formMode: action.formMode === "add" ? "add" : "edit",
      };

    //this action is dispatched from FormContent component for hiding the FormContent component and rerendering the Container component
    case "hide_form":
      return {
        ...state,
        formMode: action.formMode,
        displayForm: action.displayForm,
      };

    //this action is dispatched from ToDoBox component for fetching the listItems and initiazing the state
    case "list_data":
      return {
        ...state,
        listItems: action.listItems,
      };

    //this action is dispatched from ToDoBox component for fetching the completed items and initiazing the state
    case "completed":
      let existingCompleted = [...state.completed];
      if (!existingCompleted.includes(action.currentItem.title))
        existingCompleted.push(action.currentItem);
      return {
        ...state,
        listItems: state.listItems.filter(
          (item) => item.id !== action.currentItem.id
        ),
        completed: existingCompleted,
        currentItem: action.currentItem,
      };

    //this action is dispatched from ToDoBox component for resetting the original listItems after clicking the clear button in search bar
    case "todo":
      let existing = [...state.listItems];
      if (!existing.includes(action.currentItem.title))
        existing.push(action.currentItem);
      return {
        ...state,
        completed: state.completed.filter(
          (item) => item.id !== action.currentItem.id
        ),
        listItems: existing,
        currentItem: action.currentItem,
      };

    default:
      //returns default state for any other default action
      return state;
  }
};
