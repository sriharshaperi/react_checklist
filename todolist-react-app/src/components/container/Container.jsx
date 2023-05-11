import React from "react";
import FormContent from "../formcontent/FormContent";
import ToDoBox from "../todobox/ToDoBox";

function Container() {
  return (
    <div className="container">
      {/* This is a container */}

      {/* This component contains list items */}
      <ToDoBox />

      {/* this component contains form element */}
      <FormContent />
    </div>
  );
}

export default Container;
