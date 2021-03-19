import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
Modal.setAppElement("#root");

const UpdateRoutineForm = ({routines, setRoutines, routineId}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('')
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const updateRoutine = (event) => {
    event.preventDefault()
    fetch(`https://still-plains-94282.herokuapp.com/api/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name: name,
      goal: goal
    })
    }).then(response => response.json())
      .then(result => {
        if(result) {
          const updatedRoutine = routines.map((routine) => {
            if(routine.id === routineId){
              return result
            } else {
              return routine
            }
          })
          setRoutines(updatedRoutine)
        }
      })
      .catch(console.error);
      event.target.reset()
  }
  


  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setModalIsOpen(true);
        }}
      >
        UPDATE ROUTINE
      </button>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 300,
            left: 500,
            right: 500,
            bottom: 600,
            backgroundColor: "light purple"
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "5px solid gold",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "10px",
          },
        }}
        isOpen={modalIsOpen}
      >
    <form onSubmit={updateRoutine}>
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
      
      <button  type="submit">
            Update Routine
          </button>
          <button
            className="closeModalButton"
            onClick={() => {
              setModalIsOpen(false)
            }}
          >
            Close
          </button>
    </form>
      </Modal>
    </div>
  );
};


export default UpdateRoutineForm;
