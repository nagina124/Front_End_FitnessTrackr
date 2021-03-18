import React, { useState } from "react";
import { getToken } from "../auth";

const AddRoutineForm = ({routines, setRoutines, authenticate}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const makeRoutine = (event) => {
    event.preventDefault();

    if (getToken() && authenticate) {
      fetch("https://still-plains-94282.herokuapp.com/api/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: true,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          const newRoutines = [...routines];
          console.log(newRoutines, "line 28")
          newRoutines.push(result);
          setRoutines(newRoutines);
          console.log(newRoutines)
        })
        .catch(console.error);
    }
  };

  return <>
    <form onSubmit={makeRoutine}>
    <label>Routine Name</label>
      <input 
        type="text" 
        placeholder="Enter name of Routine"
        onChange={(event) => {setName(event.target.value)}}
      />
      <label>Routine Goal</label>
       <input 
        type="text" 
        placeholder="Enter name of Routine"
        onChange={(event) => {setGoal(event.target.value)}}
      />
      <button type="submit">Create Routine</button>
    </form>
  </>;
};

export default AddRoutineForm;
