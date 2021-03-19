import React, { useState } from "react";
import { getToken } from "../auth";
import Modal from "react-modal";
Modal.setAppElement("#root");

const UpdateActivityForm = ({routines, setRoutines, routineActivityId}) => {
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('')
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const updateRoutineActivity = (event) => {
    event.preventDefault()
    fetch(`https://still-plains-94282.herokuapp.com/api/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          count: count,
          duration: duration
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
          const updatedActivityInfo = routines.map((routine) => {
              routine.activities.map((activity) => {
                  if(activity.id === routineActivityId){
                      return result;
                  }
              })
              return routine
          })
          setRoutines(updatedActivityInfo)
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
        UPDATE ACTIVITY ON ROUTINE
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
    <form onSubmit={updateRoutineActivity}>
    <label>Activity Count</label>
      <input 
        type="text" 
        placeholder="enter count"
        onChange={(event) => {setCount(event.target.value)}}
      />
      <label>Activity Duration</label>
       <input 
        type="text" 
        placeholder="enter duration"
        onChange={(event) => {setDuration(event.target.value)}}
      />
      
      <button  type="submit">
            Update Activity
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

export default UpdateActivityForm;
