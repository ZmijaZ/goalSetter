import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");

    console.log("Goal button clicked");
  };

  return (
    <>
      <h1>Goal form</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={onChange}
        />
        <button type="submit">Set a goal</button>
      </form>
    </>
  );
};

export default GoalForm;
